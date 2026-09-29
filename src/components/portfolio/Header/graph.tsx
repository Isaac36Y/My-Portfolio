'use client'

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'

// apexcharts touches `window` at import time, so it can never be part of the
// server render. Loading it through next/dynamic with ssr:false keeps this file
// importable from anywhere in the app.
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

export type ContributionDay = {
  /** ISO calendar date, "YYYY-MM-DD", as GitHub returns it. */
  date: string
  count: number
}

const DAY = 86400000
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** "2026-08-19" -> epoch ms at UTC midnight. */
function toUtcMs(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

/** The Sunday that starts the week containing a day = that week's column x. */
function weekStartOf(ms: number) {
  return ms - new Date(ms).getUTCDay() * DAY
}

// x is the week's Sunday (so the column lines up); the cell's true date is
// stashed on the datum for the tooltip, since x can't carry it — all 7 weekdays
// in a column share the same x.
type CalCell = { x: number; y: number; date: number }

function buildSeries(days: ContributionDay[]): ApexAxisChartSeries {
  const rows = WEEKDAYS.map((name) => ({ name, data: [] as CalCell[] }))

  for (const day of days) {
    const ms = toUtcMs(day.date)
    rows[new Date(ms).getUTCDay()].data.push({
      x: weekStartOf(ms),
      y: day.count,
      date: ms,
    })
  }

  // Rows read Sun (top) -> Sat (bottom). ApexCharts draws the last series on
  // top, so reverse the weekday order before returning.
  return rows.reverse() as unknown as ApexAxisChartSeries
}

function buildOptions(days: ContributionDay[]): ApexOptions {
  // Pad half a week on each side so the first and last columns are full width.
  const firstWeek = weekStartOf(toUtcMs(days[0].date))
  const lastWeek = weekStartOf(toUtcMs(days[days.length - 1].date))

  return {
    chart: {
      height: 186,
      width: '100%',
      type: 'heatmap',
      toolbar: { show: false },
      animations: { enabled: false },
    },
    dataLabels: { enabled: false },
    // A small light gap between cells, like a contributions calendar.
    stroke: { width: 3, colors: ['var(--color-bg)'] },
    legend: { show: false },
    states: { active: { filter: { type: 'none' } } },
    plotOptions: {
      heatmap: {
        radius: 2,
        // Flat bucket colors (no within-range shading), so each level is one color.
        enableShades: false,
        colorScale: {
          ranges: [
            { from: 0, to: 0, name: '0', color: 'var(--graph-low)' },
            { from: 1, to: 3, name: '1-3', color: 'var(--graph-med-low)' },
            { from: 4, to: 7, name: '4-7', color: 'var(--graph-med)' },
            { from: 8, to: 11, name: '8-11', color: 'var(--graph-med-high)' },
            { from: 12, to: 9999, name: '12+', color: 'var(--graph-high)' },
          ],
        },
      },
    },
    xaxis: {
      type: 'datetime',
      min: firstWeek - 3.5 * DAY,
      max: lastWeek + 3.5 * DAY,
      position: 'top',
      labels: {
        format: 'MMM',
        datetimeUTC: false,
        style: { colors: '#767676', fontSize: '12px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
      crosshairs: { show: false },
    },
    yaxis: {
      // Show only alternate weekday labels (Mon / Wed / Fri), like GitHub's.
      labels: {
        formatter: (val: unknown) =>
          ['Mon', 'Wed', 'Fri'].includes(String(val)) ? String(val) : '',
        style: { colors: ['#767676'], fontSize: '12px' },
      },
    },
    grid: { yaxis: { lines: { show: false } } },
    tooltip: {
      // Custom tooltip so it can show the cell's real date (stashed on the
      // datum) plus the count, e.g. "5 contributions on Jan 8, 2026".
      custom: ({ seriesIndex, dataPointIndex, w }: any) => {
        const cell: CalCell = w.config.series[seriesIndex].data[dataPointIndex]
        const when = new Date(cell.date).toLocaleDateString('en-US', {
          dateStyle: 'medium',
          timeZone: 'UTC',
        })
        const count =
          cell.y === 0
            ? 'No contributions'
            : `${cell.y} contribution${cell.y === 1 ? '' : 's'}`
        return `<div style="padding:6px 10px;font-size:13px"><b>${count}</b> on ${when}</div>`
      },
    },
  }
}

export default function ContributionsGraph({
  days,
}: {
  days: ContributionDay[]
}) {
  // Both builders read days[0]/days.at(-1), so an empty response has to be
  // handled before either of them runs.
  const chart = useMemo(
    () =>
      days.length > 0
        ? { series: buildSeries(days), options: buildOptions(days) }
        : null,
    [days],
  )

  if (!chart) return null

  return (
    <div style={{ width: '100%' }}>
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="heatmap"
        height={170}
      />
    </div>
  )
}

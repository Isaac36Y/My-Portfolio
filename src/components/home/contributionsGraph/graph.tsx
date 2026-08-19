'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { ApexOptions, ApexAxisChartSeries } from 'apexcharts'

// apexcharts touches `window` at import time, so it can never be part of the
// server render. Loading it through next/dynamic with ssr:false keeps this file
// importable from anywhere in the app.
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })

// A contribution-style calendar heatmap built on the standard heatmap: 7 rows
// (one weekday each) x one column per week. The trick that makes the
// columns line up is that every cell in a week shares the SAME x = the date of
// that week's Sunday. Because the x axis is datetime, the cells sit on a real
// time scale and the axis labels the months for us (continuous-x heatmap).
//
// The window runs from ~26 weeks (about 6 months) ago through today, and a
// cell is emitted only for real in-range days: the first and last weeks are partial, so their
// off-range corners are simply left blank (the "hanging" edges of the view)
// rather than padded. In-range days with zero activity still get a cell (the
// lightest color); only days outside the range are absent. All dates are in
// UTC so a day is always exactly 86400000 ms (no daylight-saving drift that
// would shift a cell into the wrong weekday).
var DAY = 86400000

var calNow = new Date()
var calEnd = Date.UTC(
  calNow.getUTCFullYear(),
  calNow.getUTCMonth(),
  calNow.getUTCDate(),
)
// How many weeks of history the calendar shows (26 ~= 6 months).
var CAL_WEEKS = 26
var calStart = calEnd - (CAL_WEEKS * 7 - 1) * DAY

// The Sunday that starts the week containing a given day = that week's column x.
function weekStartOf(ms: number) {
  return ms - new Date(ms).getUTCDay() * DAY
}

type CalCell = { x: number; y: number; date: number }

function buildCalendar(): ApexAxisChartSeries {
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var byDay = weekdays.map(function (n) {
    return { name: n, data: [] as CalCell[] }
  })

  // Deterministic PRNG so the demo looks the same on every reload.
  var seed = 20240407
  function rand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }

  var totalWeeks = Math.round(
    (weekStartOf(calEnd) - weekStartOf(calStart)) / (7 * DAY),
  )
  for (var t = calStart; t <= calEnd; t += DAY) {
    var dow = new Date(t).getUTCDay()
    var wk = Math.round((weekStartOf(t) - weekStartOf(calStart)) / (7 * DAY))
    // A gentle seasonal wave so some months look busier than others.
    var season = 0.5 + 0.5 * Math.sin((wk / totalWeeks) * Math.PI * 2 - 1)
    var count = 0
    // ~55% of days have activity; weekends are lighter.
    if (rand() < 0.35 + 0.4 * season) {
      var bias = dow === 0 || dow === 6 ? 0.5 : 1
      // rand()*rand() skews toward the low buckets, like real activity.
      count = Math.round(rand() * rand() * 16 * bias) + 1
    }
    // x is the week's Sunday (so the column lines up); the cell's true date is
    // stashed on the datum for the tooltip (x can't carry it: all 7 weekdays in
    // a column share the same x).
    byDay[dow].data.push({ x: weekStartOf(t), y: count, date: t })
  }

  // Rows read Sun (top) -> Sat (bottom). ApexCharts draws the last series on
  // top, so reverse the weekday order before returning.
  // `date` is an extra field Apex passes through untouched; the published datum
  // type doesn't model it, hence the cast.
  return byDay.reverse() as unknown as ApexAxisChartSeries
}

var calendarData = buildCalendar()

// Pad half a week on each side so the first and last columns are full width.
var calMinX = weekStartOf(calStart) - 3.5 * DAY
var calMaxX = weekStartOf(calEnd) + 3.5 * DAY

const chartOptions: ApexOptions = {
  chart: {
    height: 186,
    width: '100%',
    type: 'heatmap',
    toolbar: { show: false },
    animations: { enabled: false },
  },
  /* title: {
    text: 'Contribution activity',
    align: 'center',
    style: { fontSize: '14px', fontWeight: 600 },
  }, */
  dataLabels: { enabled: false },
  // A small light gap between cells, like a contributions calendar.
  stroke: { width: 3, colors: ['#fff'] },
  legend: { show: false },
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  plotOptions: {
    heatmap: {
      radius: 2,
      // Flat bucket colors (no within-range shading), so each level is one color.
      enableShades: false,
      colorScale: {
        ranges: [
          { from: 0, to: 0, name: '0', color: '#ebedf0' },
          { from: 1, to: 3, name: '1-3', color: '#9be9a8' },
          { from: 4, to: 7, name: '4-7', color: '#40c463' },
          { from: 8, to: 11, name: '8-11', color: '#30a14e' },
          { from: 12, to: 100, name: '12+', color: '#216e39' },
        ],
      },
    },
  },
  xaxis: {
    type: 'datetime',
    min: calMinX,
    max: calMaxX,
    position: 'top',
    labels: {
      format: 'MMM',
      datetimeUTC: false,
      style: { colors: '#767676', fontSize: '12px' },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
    tooltip: { enabled: false },
    crosshairs: {
      show: false,
    },
  },
  yaxis: {
    // Show only alternate weekday labels (Mon / Wed / Fri), like the original.
    labels: {
      formatter: function (val: any) {
        return ['Mon', 'Wed', 'Fri'].indexOf(val) >= 0 ? val : ''
      },
      style: { colors: ['#767676'], fontSize: '12px' },
    },
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  tooltip: {
    // Custom tooltip so it can show the cell's real date (stashed on the datum)
    // plus the count, e.g. "5 contributions on Jan 8, 2024".
    custom: function (opts: any) {
      var pt = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
      var n = pt.y
      var when = new Date(pt.date).toLocaleDateString('en-US', {
        dateStyle: 'medium',
        timeZone: 'UTC',
      })
      var count =
        n === 0
          ? 'No contributions'
          : n + (n === 1 ? ' contribution' : ' contributions')
      return (
        '<div style="padding:6px 10px;font-size:13px">' +
        '<b>' +
        count +
        '</b> on ' +
        when +
        '</div>'
      )
    },
  },
}

const ApexChart = () => {
  const [state] = React.useState<{
    series: ApexAxisChartSeries
    options: ApexOptions
  }>({
    series: calendarData,
    options: chartOptions,
  })

  return (
    <div style={{width: '100%'}}>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="heatmap"
          height={150}
        />
      </div>
    </div>
  )
}

export default ApexChart

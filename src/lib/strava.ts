const getStravaActivities = async () => {
    const payload = {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        refresh_token: process.env.STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token'
    }
    const res1 = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data1 = await res1.json()
    const accessToken = data1.access_token

    const res2 = await fetch('https://www.strava.com/api/v3/athlete/activities', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })

    const activities = await res2.json()
    return activities
}

export default async function filterStravaActivities() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 7);
    const activities = await getStravaActivities();
    const last7Days = activities.filter((item: { start_date: string }) => {
        const itemDate = new Date(item["start_date"]);
        return itemDate >= cutoffDate;
    });
    return last7Days
}
export async function getQuincyRes(messages: {sender: string, message: string}[]) {
    const res = await fetch('/api/quincy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
    })

    const data = await res.json()

    if (!res.ok) {
        return data.message
    }
    
    return data.content[0].text
}
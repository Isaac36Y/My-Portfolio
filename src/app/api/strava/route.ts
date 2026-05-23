export async function GET(request: Request) {
    const data = { miles: 12 }

    return Response.json(data)
}
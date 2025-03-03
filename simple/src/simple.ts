import Elysia, { t } from "elysia";

export const app = new Elysia().post('/weather-alert', ({ body }) => {
    const { temperature, type } = body;

    if (type === 'rain') {
        console.log("Rain Alert!")
    }

    return {
        message: "Alert sent!"
    }

}, {
    body: t.Object({
        temperature: t.Number(),
        type: t.String()
    })
}).listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
})
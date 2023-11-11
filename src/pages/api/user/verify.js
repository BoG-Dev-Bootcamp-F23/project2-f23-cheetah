import verifyUser from "../../../../server/mongodb/actions/verifyUser"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        try {
            const ret = await verifyUser(body);
            return res.status(200).send(ret)
        } catch (e) {
            return res.status(e.statusCode).send(e.message)
        }
    }
}
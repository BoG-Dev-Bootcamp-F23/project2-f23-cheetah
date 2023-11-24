import verifyUser from "@/../server/mongodb/actions/verifyUser"

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const body = req.body;
            const ret = await verifyUser(body);
            return res.status(200).json({success: true, message: ret})
        } catch (e) {
            return res.status(e.statusCode).json({success: false, message: e.message})
        }
    }
}
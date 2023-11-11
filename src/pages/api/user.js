import createUser from "../../../server/mongodb/actions/createUser"
import deleteUser from "../../../server/mongodb/actions/deleteUser"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        try {
            await createUser(body);
            return res.status(200).send("Success")
        } catch (e) {
            return res.status(e.statusCode).send(e.message)
        }
    } else if (req.method === "DELETE") {
        try {
            await deleteUser(req.query.userId)
            return res.status(200).send("Success")
        } catch (e) {
            return res.status(e.statusCode).send(e.message)
        }
    }
}
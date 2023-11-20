import createUser from "../../../server/mongodb/actions/createUser"
import deleteUser from "../../../server/mongodb/actions/deleteUser"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const body = req.body;
        try {
            const newUser = await createUser(body);
            return res.status(200).json({message: newUser})
        } catch (e) {
            return res.status(e.statusCode).json({message: e.message})
        }
    } else if (req.method === "DELETE") {
        try {
            await deleteUser(req.query.identifier)
            return res.status(200).send("Success")
        } catch (e) {
            return res.status(e.statusCode).json({message: e.message})
        }
    }
}
import verifyUser from "@/../server/mongodb/actions/verifyUser"
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";

const MAX_AGE = 60*60; // 1 hour

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const body = req.body;
            const ret = await verifyUser(body);
            const { userId, username, email, password, admin } = ret;

            const secret = process.env.JWT_SECRET || ""
            const token = jwt.sign({ userId, }, secret, { expiresIn: MAX_AGE, })
            const serialized = serialize("OurSiteJWT", token, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: MAX_AGE,
                path: "/"
            })

            const response = {
                message: "Authenticated"
            }

            res.setHeader('Set-Cookie', serialized)
            // return res.status(200).json({success: true, message: ret})
            return res.status(200).json({success: true, message: ret})

        } catch (e) {
            console.log("v")
            console.log(e)
            return res.status(e.statusCode).json({success: false, message: e.message})
        }
    }
}
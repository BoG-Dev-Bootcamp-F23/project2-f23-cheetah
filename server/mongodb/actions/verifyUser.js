import connectDB from "../index";
import User from "../models/User";
import { ServerError, UserError } from "../../utils/errors"

export default async function verifyUser(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to database")
    }

    try {
        const user = await User.findOne({ email: data.email, password: data.password})
        return user
    } catch (e) {
        throw new ServerError("Invalid/insufficient information")
    }
}
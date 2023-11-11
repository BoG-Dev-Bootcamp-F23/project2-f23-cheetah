import connectDB from "../index";
import User from "../models/User";
import { ServerError, UserError } from "../../utils/errors"

export default async function createUser(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to database")
    }

    try {
        const { email, password } = data
        const user = await User.findOne({ email: email, password: password})
        return { "_id": user._id, "admin": user.admin }
    } catch (e) {
        throw new ServerError("Invalid/insufficient information")
    }
}
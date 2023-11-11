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
        const user = new User(data);
        await user.save();
        return true;
    } catch (e) {
        
        if (e._message === "User validation failed" | e.name === "CastError") {
            throw new UserError("Invalid/insufficient information")
        } else {
            throw new ServerError("Server Failure")
        }
    }
}
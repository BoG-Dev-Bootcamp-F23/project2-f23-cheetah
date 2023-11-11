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
        const identifier = data;
        if (identifier === undefined) {
            throw new UserError("Invalid/insufficient information")
        }
        const deleteJob = await User.findByIdAndDelete(identifier);
        if (deleteJob === null) {
            throw new UserError("User Not Found")
        }
    } catch (e) {
        if (e.statusCode === 400) {
            throw e
        } else if (e.name === "CastError") {
            throw new UserError("Invalid/insufficient information")
        } else {
            throw new ServerError("Server Failure")
        }
    }
}
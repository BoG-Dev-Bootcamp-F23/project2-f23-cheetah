import connectDB from "../index";
import User from "../models/User";
import { ServerError, UserError } from "../../utils/errors"
import bcrypt from "bcrypt";
export default async function createUser(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to database")
    }

    try {
        data.password = await bcrypt.hash(data.password,11); //10 is the number of saltrounds.
        const user = new User(data);
        await user.save();
        return user;
    } catch (e) {
        
        if (e._message === "User validation failed" | e.name === "CastError") {
            throw new UserError("Invalid/insufficient information")
        } else {
            throw new ServerError("Server Failure")
        }
    }
}
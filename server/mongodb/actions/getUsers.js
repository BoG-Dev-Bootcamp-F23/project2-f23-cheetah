import connectDB from "../index";
import User from "../models/User";
import { ServerError, UserError } from "../../utils/errors"

export default async function getUsers(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to database")
    }

    try {
        const pageSize = undefined; //Lets it get all users.
        const lastObjectId = data;

        let query = {}
        if (lastObjectId) {
            query._id = { $lt: lastObjectId}
        }
        const users = await User.find(query, { password: 0})
            .sort({ _id: 1})
            .limit(pageSize)
        return users
    } catch (e) {
        throw new ServerError("Server failure")    
    }
}
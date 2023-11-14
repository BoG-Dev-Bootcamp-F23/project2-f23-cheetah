import connectDB from "../index";
import Animal from "../models/Animal.js";
import { ServerError, UserError } from "../../utils/errors.js"

export default async function getAnimals(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to the database.")
    }

    try {
        const lastObjectId = data
        const pageSize = 10
        let query = {}
        if (lastObjectId) {
            query = await Animal.find({"_id": {'$lt': lastObjectId}}).sort({_id:1}).limit(pageSize)
        } else {
            query = await Animal.find().sort({_id:1}).limit(pageSize)
        }
        return query
    } catch (e) {
        throw new ServerError("Server Failure.")
    }
}
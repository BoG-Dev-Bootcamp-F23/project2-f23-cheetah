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
        const pageSize = undefined;
        const lastObjectId = data;

        let query = {}
        if (lastObjectId) {
            query._id = { $lt: lastObjectId}
        }
        const animals = await Animal.find(query)
            .sort({ _id: 1})
            .limit(pageSize)
        return animals
    } catch (e) {
        throw new ServerError("Server failure")    
    }
}
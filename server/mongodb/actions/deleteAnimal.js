import connectDB from "../index";
import Animal from "../models/Animal.js";
import { ServerError, UserError } from "../../utils/errors.js"

export default async function deleteAnimal(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to the database.")
    }

    try {
        const identifier = data
        if (identifier === undefined) {
            throw new UserError("Invalid information.")
        }

        const deleteAnimal = await Animal.findByIdAndDelete(identifier);
        if (deleteAnimal === null) {
            throw new UserError("Animal was not found.")
        }
    } catch (e) {
        if (e.statusCode === 400) {
            throw new UserError("Invalid information.")
        } else {
            throw new ServerError("Server Failure.")
        }
    }
}
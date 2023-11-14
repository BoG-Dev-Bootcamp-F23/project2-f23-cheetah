import connectDB from "../index";
import Animal from "../models/Animal.js";
import { ServerError, UserError } from "../../utils/errors.js"

export default async function createAnimal(data) {
    try {
        await connectDB();
    } catch (e) {
        throw new ServerError("Failed to connect to the database.")
    }

    try {
        const animal = new Animal(data)
        await animal.save()
        return true;
    } catch (e) {
        if (e.statusCode === 400) {
            throw new UserError("Invalid information.")
        } else {
            throw new ServerError("Server Failure.")
        }
    }
}
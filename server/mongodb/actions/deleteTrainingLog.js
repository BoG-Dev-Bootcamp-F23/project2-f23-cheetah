import TrainingLog from "../models/TrainingLog";

import connectDB from "../index.js";

import { ServerError, UserError } from "../../utils/errors";

export default async function deleteTrainingLog(identifier) {
    try {
        connectDB();
    }catch {
        throw new ServerError("Failed to connect to Database.");
    }
    //Below case should not happen, but just included it to be sure
    if (identifier === undefined) {
        //No parameter given.
        throw new UserError("No Training Log Identifier given.");
    }
    //Checking if the identifier is null
    try {
        deletedTrainingLog = await TrainingLog.findByIdAndDelete(identifier);
    }catch (e) {
        console.log(e);
        throw new UserError("Invalid Identifier given.");
    }    
    if (deleteTrainingLog === null) {
        throw new UserError("No Training Log exists with such an identifier.");
    }

}
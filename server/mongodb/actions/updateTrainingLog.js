import TrainingLog from "../models/TrainingLog";
import { ServerError, UserError } from "../../utils/errors";
export default async function updateTrainingLog(data) {
    //Pass in an object containing the identifier of the trainingLog you wish to update, passed in as "identifier", as well as other parameters I wish to alter.
    try {
        connectDB();
    }catch {
        throw new ServerError("Failed to connect to Database.");
    }
    //Check if data is passed
    if (data === undefined || data === null) {
        throw new UserError("No information passed.");
    }
    try {
        const {identifier} = data;
        delete data.identifier;
        const oldLog = await TrainingLog.findByIdAndUpdate(identifier,data);
    }catch {
        throw new UserError("Incorrect or Insufficient information passed.");
    }
    if (oldLog === null) {
        throw new UserError("No such Training Log exists.");
    }
}
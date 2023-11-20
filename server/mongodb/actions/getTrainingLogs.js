import TrainingLog from "../models/TrainingLog";
import connectDB from "../index";
import { ServerError, UserError } from "../../utils/errors";
export default async function getTrainingLogs(data) {
    try {
        connectDB()
    }catch {
        throw new ServerError("Failed to connect to database");
    }
    try {
        console.log("Here");
        const {pageSize, lastObjectId} = data;
        let cursor =  {}
        console.log(lastObjectId);
        if (lastObjectId) {
        //If pageSize is null or undefined it should just do no limits
            //Sorts in ascending order
            console.log("Here2");
            cursor = await TrainingLog.find({"_id": {'$lt': lastObjectId}}).sort({_id:1}).limit(pageSize); //Gt or lt?

        }else {
            console.log("Here3");
            cursor = await TrainingLog.find().sort({_id:1}).limit(pageSize);

        }
        console.log("Here4");
        return cursor;

    }catch (e) {
        console.log(e);
        throw new UserError("Incorrect parameters passed in.");
    }
}
import createTrainingLog from "../../../server/mongodb/actions/createTrainingLog";


export default async function handler(req,res) {
    if (req.method === "POST") {
    try {
        await createTrainingLog(req.body);
    }catch (e) {
        res.status(e.statusCode).send(e.message);

    }
    res.status(200).send("Success");
    }else if (req.method === "PATCH") {
        


    }else {
        res.status(400).send("Only POST method available at this API endpoint.");
    }

}
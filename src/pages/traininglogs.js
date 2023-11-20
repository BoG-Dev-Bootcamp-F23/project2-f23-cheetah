import Sidebar from '../components/Sidebar'
import useId from '../hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay';
import styles from "@/styles/TrainingPage.module.css";
import {useState, useEffect} from "react";

const sampleTrainingObject = {
    _id: "655ad54dd57dbc42b4779bca",
    user: "655712cf04789adf1b86d592",
    animal: "655acf6bb111395b7a319bec",
    title: "Complete Sit Lessons",
    date: "2020-09-21T04:00:00.000Z",
    description: "Lucy finishes the sit lessons very well today. Should give here a treat.",
    hours: 23,
    __v: 0
};
//I will likely need to call the database to get access to animal and user information when displaying the trainingLog.
export default function TrainingLogPage() {
    const {id, login, logout} = useId();
    //Use useId() to do conditional rendering based on whether this user is an admin or not.
    console.log(id);
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <TrainingLogDisplay {...sampleTrainingObject}/>
            
        </div>
    )
}
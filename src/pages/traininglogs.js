import Sidebar from '../components/Sidebar'
import useId from '../hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay';
import styles from "@/styles/TrainingPage.module.css";
import {useState, useEffect} from "react";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
import TrainingLogCreation from "@/components/TrainingLogCreation";
//I will likely need to call the database to get access to animal and user information when displaying the trainingLog.

export default function TrainingLogPage() {
    const {id, login, logout, admin} = useId();
    const [logList,setLogList] = useState([]);
    useEffect(() => {
        //Set training logList and everything
        async function createList() {
            const response = await fetch("/api/admin/training");
            const data = await response.json();
            setLogList(data);

        }
        createList();
    },[]);
    //Use useId() to do conditional rendering based on whether this user is an admin or not.
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <div className={styles.trainingStuff}>
            <div className = {styles.headerBox}>
            <div className={styles.header}>

                <span>Training Logs</span>
                <span className={styles.create}>
                    <Image src={add} width="15"/>
                    Create new</span>
               
            </div>
            </div>
            <TrainingLogCreation/>
            {logList.map((logItem) => (
                <TrainingLogDisplay key={logItem._id} {...logItem} />
                //Key prop provides react with a unique identifier for each object, making it easier for it to render.
            ))}
            
            </div>
            
            
        </div>
        
    )
}
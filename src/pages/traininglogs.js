import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay';
import styles from "@/styles/TrainingPage.module.css";
import {useState, useEffect} from "react";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
import TrainingLogCreation from "@/components/TrainingLogCreation";
import TrainingLogEdit from "@/components/TrainingLogEdit";
import useDebounce from "@/hooks/useDebounce";
//I will likely need to call the database to get access to animal and user information when displaying the trainingLog.

export default function TrainingLogPage() {
    const [create,setCreate] = useState(false);
    const [edit,setEdit] = useState(false);
    const [logList,setLogList] = useState([]);
    const debouncedEdit = useDebounce(edit, 400);
    useEffect(() => {
        //Set training logList and everything
        
        async function createList() {
            const response = await fetch("/api/admin/training");
            const data = await response.json();
            setLogList(data);

        }
        createList();
    },[create,debouncedEdit]);
    //Use useId() to do conditional rendering based on whether this user is an admin or not.
    return (
        <div className={styles.mainPage}>
            <Sidebar />
            <div className={styles.trainingStuff}>
            
            <div className = {styles.headerBox}>
            <div className={styles.header}>

                <span>Training Logs</span>
                {(create || edit) ? <></>: <button className={styles.create} onClick={()=>{setCreate(true)}}>
                    <Image src={add} alt="" width="15"/>
                    Create new</button>}
                
               
            </div>
            </div>
            {edit ? <TrainingLogEdit setEdit = {setEdit} edit={edit}/>: <></>}
            {create ? <TrainingLogCreation setCreate={setCreate}/> : <></>}
            {(create || edit) ? <></> : <div>
            {logList.map((logItem) => (
                <TrainingLogDisplay key={logItem._id} setEdit={setEdit}edit={edit}{...logItem} debouncedEdit={debouncedEdit} />
                //Key prop provides react with a unique identifier for each object, making it easier for it to render.
            ))}
            </div>}
            
            
            </div>
            
            
        </div>
        
    )
}
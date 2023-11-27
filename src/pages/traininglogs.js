import Sidebar from '@/components/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import TrainingLogDisplay from '@/components/TrainingLogDisplay';
import styles from "@/styles/TrainingPage.module.css";
import {useState, useEffect} from "react";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
import TrainingLogCreation from "@/components/TrainingLogCreation";
import TrainingLogEdit from "@/components/TrainingLogEdit";
import SearchBar from '@/components/SearchBar';
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from 'next/router';


//I will likely need to call the database to get access to animal and user information when displaying the trainingLog.

export default function TrainingLogPage() {
    const {userId, admin, username, login, logout} = useAuth();
    const [currentSearch,setCurrentSearch] = useState("");
    const [selected,setSelected] = useState("traininglogs");
    console.log(userId);
    const router = useRouter();
    useEffect(()=>{
        if (userId === null) {
        
            //Reroute back to login page.
            router.push("/login");
            
        }

    },[]);
    
     
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
        <div>
            <SearchBar setCurrentSearch={setCurrentSearch}/>
        <div className={styles.mainPage}>
            <Sidebar selected={selected} setSelected={setSelected}/>
            
            
            <div className={styles.trainingStuff}>
            
            <div className = {styles.headerBox}>
            <div className={styles.header}>

                <span>Training Logs</span>
                {(create || edit) ? <></>: <button className={styles.create} onClick={()=>{setCreate(true)}}>
                    <Image src={add} alt="" width="15"/>
                    Create new</button>}
                
               
            </div>
            </div>
            {edit ? <TrainingLogEdit setEdit = {setEdit} edit={edit} userId={userId}/>: <></>}
            {create ? <TrainingLogCreation setCreate={setCreate} userId={userId}/> : <></>}
            {(create || edit) ? <></> : <div>
            {logList.map((logItem) => {
                console.log(logItem.user);
                if (logItem.user === userId) {
                    //Now check and ensure that the search query exists is in a created search query string.
                    //Let the TrainingLogDisplay decide whether to conditionally render itself or not.
                    return <TrainingLogDisplay key={logItem._id} setEdit={setEdit}edit={edit}{...logItem} debouncedEdit={debouncedEdit} currentSearch={currentSearch} />
                }
                
                //Key prop provides react with a unique identifier for each object, making it easier for it to render.
            })}
            </div>}
            
            
            </div>
            
            
        </div>
        </div>
        
    )
}
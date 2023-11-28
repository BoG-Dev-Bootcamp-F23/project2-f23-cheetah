import Sidebar from '@/components/Sidebar'
import SearchBar from '@/components/SearchBar';
import AllUsers from '@/components/AllUsers';
import TrainingLogs from "@/components/TrainingLogs";
import Header from '@/components/Header';
import { useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';


export default function Dashboard() {
    const [ currentSearch, setCurrentSearch ] = useState("");
    const [ selected, setSelected ] = useState("traininglogs");
    const [ create, setCreate ] = useState(false);
    const [ edit, setEdit ] = useState(false);
    const router = useRouter();
    const {userId, admin, username, login, logout} = useAuth();

    function display() {
        if (selected === "usersadmin") {
            return <AllUsers />
        } else if (selected === "traininglogs") {
            return <TrainingLogs />
        } else {
            return <div>to do</div>
        }
    }

    useEffect(() => {
        if (userId === null) {
            router.push("/login")
        } else {
            display();
        }
    }, [selected])
    
    return (
        <div>
            <SearchBar setCurrentSearch = {setCurrentSearch} />
            <div className = {styles.main_page}>
                <Sidebar selected = {selected} setSelected = {setSelected} />
                {display()}
            </div>
        </div>
    )
}

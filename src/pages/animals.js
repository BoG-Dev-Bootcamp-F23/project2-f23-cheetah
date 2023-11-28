import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Animals.module.css";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
import { useEffect, useState } from "react";
import Animal from '@/components/Animal';
import SearchBar from '@/components/SearchBar';
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router';


export default function AnimalsPage() {
    const {userId, admin, username, login, logout} = useAuth();
    const [animals, setAnimals] = useState(null)
    const [currentSearch,setCurrentSearch] = useState("");
    //Use currentSearch as the state for your filter, it already takes input from the search bar.
    // const [loading, setLoading] = useState(false)
    const router = useRouter();
    useEffect(()=>{
        if (userId === null) {
        
            //Reroute back to login page.
            router.push("/login");
            
        }

    },[]);
    const [selected,setSelected] = useState("animals");
    async function getData() {
        const response = await fetch("/api/admin/animals")
        const data = await response.json()
        // setLoading(true)
        setAnimals(data)
        console.log(animals)
    }

    useEffect(() => {
        getData()
    },[])

    return ( 
        <div>
            <SearchBar setCurrentSearch={setCurrentSearch}/>
    <div className={styles.animalsPage}>
        
        <Sidebar selected={selected} setSelected={setSelected}/>
        <div className={styles.animalContent}>
            <div className = {styles.headerBox}>
                <div className={styles.header}>
                    <span className={styles.contentType}>Animals</span>
                    <span className={styles.create}>
                        <Image src={add} width="15"/>
                        Create new</span>
                </div>
            </div>
            <div className={styles.animalList}> 
                {animals?.map((animal) => {
                    return <Animal key={animal._id} animal={animal}></Animal>
                })}
            </div>
        </div>
    </div>
    </div>
    )
}
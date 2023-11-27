import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Animals.module.css";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
import { useEffect, useState } from "react";
import Animal from '@/components/Animal';


export default function AnimalsPage() {

    const [animals, setAnimals] = useState(null)
    // const [loading, setLoading] = useState(false)

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
    <div className={styles.animalsPage}>
        <Sidebar></Sidebar>
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
    )
}
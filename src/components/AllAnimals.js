import Animal from '@/components/Animal';
import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import styles from "@/styles/Animals.module.css";
import { useAuth } from '@/hooks/useAuth';

export default function AllAnimals(props) {
    const [ animals, setAnimals ] = useState(null)
    const {currentSearch} = props;
    const {userId, admin, username, login, logout} = useAuth();
    useEffect(() => {
        async function getData() {
            const response = await fetch("/api/admin/animals")
            const data = await response.json()
            setAnimals(data)
        }

        getData();
    },[])

    return (
        <div className={styles.animal_container}>
            <Header title="All Animals" createFeature={false} />
            <div className={styles.animal_card_container}> 
                {animals?.map((animal) => {
                    return <Animal key={animal._id} animal={animal} currentSearch={currentSearch} />
                })}
            </div>
        </div>
    )
}
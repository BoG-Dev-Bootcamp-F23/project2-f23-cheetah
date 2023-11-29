import { useAuth } from '@/hooks/useAuth';
import Animal from '@/components/Animal';
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Animals.module.css";

export default function Animals() {
    const { userId, admin, username, login, logout } = useAuth();
    const [ animals, setAnimals ] = useState(null)
    const [ currentSearch, setCurrentSearch ] = useState("");

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
            <Header title="Animals" createFeature={true} />
            <div className={styles.animal_card_container}> 
                {animals?.map((animal) => {
                    if (animal.owner === userId) {
                        return <Animal key={animal._id} animal={animal} />
                    }
                })}
            </div>
        </div>
    )
}
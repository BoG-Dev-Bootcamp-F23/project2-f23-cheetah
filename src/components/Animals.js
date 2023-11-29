import { useAuth } from '@/hooks/useAuth';
import Animal from '@/components/Animal';
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import styles from "@/styles/Animals.module.css";

<<<<<<< HEAD
export default function Animals(props) {
=======
export default function Animals() {
    const { userId, admin, username, login, logout } = useAuth();
>>>>>>> 08671579bbb22eff44db5879d29ef3e6c1cd207c
    const [ animals, setAnimals ] = useState(null)
    const {currentSearch} = props;

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
<<<<<<< HEAD
                    return <Animal key={animal._id} animal={animal} currentSearch={currentSearch} />
=======
                    if (animal.owner === userId) {
                        return <Animal key={animal._id} animal={animal} />
                    }
>>>>>>> 08671579bbb22eff44db5879d29ef3e6c1cd207c
                })}
            </div>
        </div>
    )
}
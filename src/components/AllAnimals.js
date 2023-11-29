import { useAuth } from '@/hooks/useAuth'
import styles from "@/styles/AnimalPage.module.css";
import { useEffect, useState } from "react";
import Animal from '@/components/AnimalDisplay';
import Header from "@/components/Header";
import AnimalCreation from "@/components/AnimalCreation";
// import AnimalEdit from "@/components/AnimalEdit";
import useDebounce from "@/hooks/useDebounce";



export default function Animals() {
    const {userId, admin, username, login, logout} = useAuth();
    const [currentSearch,setCurrentSearch] = useState("");

    const [create,setCreate] = useState(false);
    const [edit,setEdit] = useState(false);
    const [animals,setAnimals] = useState([]);
    const debouncedEdit = useDebounce(edit, 400);

    async function getData() {
        const response = await fetch("/api/admin/animals")
        const data = await response.json()
        // setLoading(true)
        setAnimals(data)
    }

    useEffect(() => {
        getData()
    },[create,debouncedEdit])

    return (
        <div>
        <div className={styles.mainPage}>
            <div className={styles.animalStuff}>
            
            <Header title="Animals" createFeature={true} setEdit={setEdit} setCreate={setCreate}/>
            {edit ? <AnimalEdit setEdit = {setEdit} edit={edit} userId={userId}/>: <></>}
            {create ? <AnimalCreation setCreate={setCreate} userId={userId}/> : <></>}
            {(create || edit) ? <></> : <div className={styles.animalList}>
            {animals.map((animal) => {
                    return <Animal key={animal._id} setEdit={setEdit}edit={edit}{...animal} debouncedEdit={debouncedEdit} currentSearch={currentSearch} />
            })}
            </div>}
            
            
            </div>
            
            
        </div>
        </div>
        
    )
}
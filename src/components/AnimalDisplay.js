import { useEffect, useState } from "react";
import styles from "@/styles/Animal.module.css";

export default function Animal(props) {
    const {setEdit, edit, debouncedEdit, currentSearch, admin} = props;
    const [username,setUsername] = useState("");
    const [animalBreed,setAnimalBreed] = useState("");
    const [animalName,setAnimalName] = useState(""); 
    const [hoursTrained,setHoursTrained] = useState(""); 
    const [profilePicture,setProfilePicture] = useState(""); 

    useEffect(() => {
        //This useEffect will run when loading to set username and animal breed and animal name.
        async function getInfo(user,animal) {
            const URL = `/api/getinfo?user=${user}&animal=${animal}`;
           
            const response = await fetch(URL);
            const data = await response.json();
            console.log("Updating about this animal:",data.animalname); 
            //Perhaps by the time this runs the database has not been updated yet.
            setUsername(data.username);
            console.log(username)
            setAnimalBreed(data.breed);
            setAnimalName(data.animalname);
            setHoursTrained(data.hoursTrained)
            setProfilePicture(data.profilePicture)
        }
        getInfo(props.owner,props._id)},[debouncedEdit]);

        let checkString = `${hoursTrained}${animalBreed}${animalName}${username}`;
        checkString = checkString.toLowerCase();

        if (currentSearch === "" || checkString.includes(currentSearch)) {
            

        
            return (<>
            <div className={styles.animal}>
            <img className={styles.picture} src={profilePicture} width="350" height="260"></img>
            <div className={styles.info}>
                <div className={styles.user_logo}>
                    <b className={styles.first_letter}>{username.charAt(0).toUpperCase()}</b>
                </div>
                <div className={styles.inforight}>
                    <div className={styles.animalInfo}>{animalName} - {animalBreed}</div>
                    <div className={styles.trainingInfo}>{username} • Trained: {hoursTrained}</div> 
                </div>
            </div>
            <div></div>
        </div>
            </>);
            }else {
                return <></>;
            }
}
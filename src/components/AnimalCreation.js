import styles from "@/styles/LogCreation.module.css";
import {useState, useEffect} from "react";

// //Create API endpoint that gets all animals assosciated with a user.
//For now, the way it is implemented, a user can only create a log 
//associated with itself, even if it is admin, it can only delete any traininglog,
//But can't edit user assosciated with such a training log.
//Create an ERROR state that shows if it is not "", and shows an error message
//right above the submit button.




export default function AnimalCreation(props) {
    const {setCreate} = props;
    const user = props.userId;
    //Temporary current user id.
    ;
    const [animalSelections,setAnimalSelections] = useState([]);
    const [errorMessage,setErrorMessage] = useState(" ");
   
    async function saveLog(name, breed, hours, profilePicture) {
        console.log("Saved log???");
        if (name === "" || breed === "" || hours === "" || profilePicture === "") {
            setErrorMessage("One or more entries is empty.");
            return;
        }
        if (hours < 0) {
            setErrorMessage("Hours trained cannot be negative.");
            return;
        }
       
        const URL = `/api/animal`;

       
        const data = {name:name, breed:breed, owner:user, hoursTrained:hours, profilePicture: profilePicture};
        console.log(data);
        await fetch(URL,{method: "POST",headers: {'Content-Type': 'application/json'}, body:JSON.stringify(data)});
        console.log("Posted to database");
        setErrorMessage(" ");
        setCreate(false);
        //Create animal selection criteria
    }
    function cancel() {
        setCreate(false);
    }
    // useEffect(()=>{
       
    //     async function createAnimalSelections(user) {
            
    //         const URL = `/api/animal?user=${user}`;
          
    //         const response = await fetch(URL);
            
    //         const animals = await response.json();
    //         const animalSelectionsList = [];
       
    //         animals.forEach((animal)=> {
    //             animalSelectionsList.push([animal._id,animal.name,animal.breed,animal.owner, animal.hoursTrained, animal.profilePicture]);
    //         });
            
    //         setAnimalSelections(animalSelectionsList);
            
    //     }
        
    //     createAnimalSelections(user);
        
    // },[]);

    return <div className={styles.form}>
            <label className={styles.button}>
                Name
            <input type="text" id="name" className = {styles.input} placeholder="Name" />
            </label>
            {/* Put selection for dog here, will need to put code elsewhere as well. */}
            <label className={styles.button}>
                Breed
                <input type="text" id="breed" className = {styles.input} placeholder="Breed" />
            </label>
            <label className={styles.button}>
                Total Hours Trained
            <input type="number" id="hours"className = {styles.input} placeholder="Hours" min="0" />
            </label>
            <label className={styles.button}>
                Profile Picture
                <input type="text" id="profilePicture" className = {styles.input} placeholder="Profile Picture" />
            </label>
            <div>
            {errorMessage}
            </div>
            <div className={styles.buttons} id="save">
            <button className={styles.input} onClick={() => {
            console.log("Name: ",document.getElementById("name")?.value);
            saveLog(document.getElementById("name")?.value,
            document.getElementById("breed")?.value,
            document.getElementById("hours")?.value,
            document.getElementById("profilePicture")?.value)
        
            }}>Save</button>
            <button onClick={cancel} id="cancel" className={styles.input}>Cancel</button>
            </div>
        </div>

}
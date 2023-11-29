import { useEffect, useState } from "react";
import styles from "@/styles/Animals.module.css";
import { useAuth } from '@/hooks/useAuth'


export default function Animal(props) {
<<<<<<< HEAD
    const {animal, currentSearch} = props;
    const tempAnimalName = animal.name.toLowerCase();
    if (tempAnimalName.includes(currentSearch)) {

    
        return (
            <div className={styles.animal}>
                <img className={styles.picture} src={animal.profilePicture} width="350" height="260"></img>
                <div className={styles.info}>
                    <div className={styles.user_logo}>
                        <b className={styles.first_letter}>{"Test".charAt(0).toUpperCase()}</b>
                    </div>
                    <div className={styles.inforight}>
                        <div className={styles.animalInfo}>{animal.name} - {animal.breed}</div>
                        <div className={styles.trainingInfo}>Username • Trained: {animal.hoursTrained}</div> {/* Need to find a way to put the users actual name instead of username*/}
                    </div>
=======
    const {userId, admin, username, login, logout} = useAuth();
    const { animal } = props

    console.log(animal)

    return (
        <div className={styles.animal}>
            <img className={styles.picture} src={animal.profilePicture} width="350" height="260"></img>
            <div className={styles.info}>
                <div className={styles.user_logo}>
                    <b className={styles.first_letter}>{animal.name.charAt(0).toUpperCase()}</b>
                </div>
                <div className={styles.inforight}>
                    <div className={styles.animalInfo}>{animal.name} - {animal.breed}</div>
                    <div className={styles.trainingInfo}>{username} • Trained: {animal.hoursTrained} hours</div> {/* Need to find a way to put the users actual name instead of username*/}
>>>>>>> 08671579bbb22eff44db5879d29ef3e6c1cd207c
                </div>
                <div></div>
            </div>
        )
    }else {
        return <></>;
    }
}
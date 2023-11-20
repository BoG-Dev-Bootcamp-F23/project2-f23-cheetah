import styles from "@/styles/TrainingLog.module.css";
import Image from "next/image";
import moment from "moment";
import redpen from "@/images/redpen.png";
import {useEffect, useState} from "react";

export default function TrainingLogDisplay(props) {
    const username =  "Ankith";
    const animalBreed = "Golden Retriever";
    const animalName = "Lucy";
    const day = moment(props.date).format("D");
    const monthAndYear = moment(props.date).format("MMM - YYYY");

    return <>
    <div className = {styles.log}>
        
        <div className = {styles.dateStuff}>
            <div className = {styles.day}>
                {day}
            </div>
            <div className = {styles.otherDate}>
                {monthAndYear}
            </div>
            
        </div>

        <div className = {styles.description}>
            <div className = {styles.upperDescription}>
                <div className={styles.title}>{props.title}</div>
                • {props.hours} hours
            </div>
            <div className = {styles.middleDescription}>
                {username} - {animalBreed} - {animalName}
            </div>
            <div>{props.description}</div>
        </div>
    <div className={styles.redpen}>
    <Image src={redpen} width="50"/>
    </div>
    </div>
    </>

}
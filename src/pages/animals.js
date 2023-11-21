import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Animals.module.css";
import Image from "next/image";
import add from "@/images/icon-park-outline_addadd.png";
export default function() {
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
        </div>
    </div>
    )
}
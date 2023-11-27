import styles from "@/styles/SearchBar.module.css";
import Image from "next/image";
import focus from "@/images/Vectorsearchbar.png";
import progress from "@/images/Titleprogress.png";

export default function SearchBar(props) {
    const {setCurrentSearch} = props;
    //Use conditional rendering based on whether setCurrentSearch is passed in to determine whether search should show or not.
    return <div className={styles.titleBar}>
        <Image src={progress} height="33"/>
        {setCurrentSearch === undefined ? <></>:
        <div className={styles.search}>
            <Image src={focus} alt="" width="20"/>
        <input type="text" id="search" className = {styles.input} placeholder="Search" onChange={()=>{
            let newString = search.value.trim();
            newString = newString.toLowerCase();
            setCurrentSearch(search.value);
        }}/>
        
        </div>}
        <span></span>
    </div>

}
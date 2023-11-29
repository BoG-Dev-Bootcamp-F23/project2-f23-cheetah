import styles from '@/styles/UserCard.module.css'

export default function UserCard(props) {
    const data = props.data
    const currentSearch = props.currentSearch;
    const tempUsername = data.fullName.toLowerCase();
    if (tempUsername.includes(currentSearch)) {

    
        return (
            <div className={styles.user_info_container}>
                <div className={styles.user_logo}>
                    <b className={styles.first_letter}>{data.fullName?.charAt(0).toUpperCase()}</b>
                </div>
                <div>
                    <p className={styles.user_name}><b>{data.fullName}</b></p>
                    {data.admin? <p className={styles.user_identifier}>Admin</p>: <p>User</p>}
                </div>
            </div>
        )
    }else {
        return <></>;
    }
}
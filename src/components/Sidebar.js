import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import styles from '@/styles/Sidebar.module.css'
import Image from 'next/image'
import all_animals_icon from '@/images/all_animals_icon.png'
import all_training_icon from '@/images/all_training_icon.png'
import all_users_icon  from '@/images/all_users_icon.png'
import animals_icon from '@/images/animals_icon.png'
import training_logs_icon from '@/images/training_logs_icon.png'
import training_logs_icon_white from '@/images/training_logs_icon_white.png'
import logout_icon from '@/images/logout.png'


export default function Sidebar() {
    const {userId, admin, username, login, logout} = useAuth();

    return (
        <div>
            <div className={styles.sidebar}>
                <div className={styles.user_container}>
                    <div className={styles.sidebar_tab_activated}>
                        <Image src={training_logs_icon_white} width={20} height={20} className={styles.sidebar_icon}/>
                        <p>Training logs</p>
                    </div>
                    <div className={styles.sidebar_tab}>
                        <Image src={animals_icon} width={20} height={20} className={styles.sidebar_icon}/>
                        <p>Animals</p>
                    </div>
                </div>
                {admin? <div className={styles.admin_container}>
                    <p className={styles.sidebar_header}><b>Admin access</b></p>
                    <div className={styles.sidebar_tab}>
                        <Image src={all_training_icon} width={20} height={20} className={styles.sidebar_icon}/>
                        <p>All training</p>
                    </div>
                    <div className={styles.sidebar_tab}>
                        <Image src={all_animals_icon} width={20} height={20} className={styles.sidebar_icon}/>
                        <p>All animals</p>
                    </div>
                    <div className={styles.sidebar_tab}>
                        <Image src={all_users_icon} width={20} height={20} className={styles.sidebar_icon}/>
                        <p>All users</p>
                    </div>
                </div>: <></>}
                <div className={styles.user_info_container}>
                    <div className={styles.user_info_left}>
                        <div className={styles.user_logo}>
                            <b className={styles.first_letter}>{username?.charAt(0).toUpperCase()}</b>
                        </div>
                        <div>
                            <p className={styles.user_name}><b>{username}</b></p>
                            {admin? <p className={styles.user_identifier}>Admin</p>: <p>User</p>}
                        </div>
                    </div>
                    <Link href='../'>
                        <Image src={logout_icon} width={25} height={25} className={styles.sidebar_icon} onClick={logout}/>
                    </Link>
                    
                </div>
            </div>
        </div>
        
    )
}
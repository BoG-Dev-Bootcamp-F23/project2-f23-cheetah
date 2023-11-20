import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

async function handleClick(fullName, email, password, confirm_password, admin, router) {
    if (password !== confirm_password) {
        document.getElementById("error_message1").style.display='block'
        document.getElementById("error_message2").style.display='none'
    } else if (fullName === "" || email === "" || password === "") {
        document.getElementById("error_message2").style.display='block'
        document.getElementById("error_message1").style.display='none'
    } else {
        document.getElementById("error_message1").style.display='none'
        document.getElementById("error_message2").style.display='none'
        console.log("Reached API ednpoint")
        const response = await fetch("/api/user", {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: fullName,
                    email: email,
                    password: password,
                    admin: admin
                })
        });
        console.log("Response received");
        const data = await response.json();
        console.log("Response parsed");
        console.log(data);
        if (data.message === "Success") {
            router.push("traininglogs")
        }
    } 
}

export default function CreateAccount() {
    const router = useRouter()

    return (
        <div>
            <div className = {styles.loginContainer}>
                <h1 className = {styles.header}>Create Account</h1>
                <input id="full_name" type="text" placeholder="Full Name" className = {styles.input}/>
                <input id="email" type="text" placeholder="Email" className = {styles.input}/>
                <input id="password" type="password" placeholder="Password" className = {styles.input}/>
                <input id="confirm_password" type="password" placeholder="Confirm Password" className = {styles.input}/>
                <div className={styles.adminContainer}>
                    <input id="admin_checkbox" type="checkbox" className={styles.adminCheckbox}/>
                    <p>Admin access</p>
                </div>
                <p id="error_message1" className={styles.errorMessage}>Passwords do not match</p>
                <p id="error_message2" className={styles.errorMessage}>Please fill in all fields</p>
                <button className={styles.loginButton} onClick={() => {
                    console.log("Reached click");
                    handleClick(document.getElementById("full_name")?.value,
                                document.getElementById("email")?.value,
                                document.getElementById("password")?.value,
                                document.getElementById("confirm_password")?.value,
                                document.getElementById("admin_checkbox")?.checked,
                                router
                    )
                }}>Sign up</button>
                <Link href="/login" className={styles.link}><p>Already have an account? <b>Sign in</b></p></Link>
            </div>
        </div>
    )
}
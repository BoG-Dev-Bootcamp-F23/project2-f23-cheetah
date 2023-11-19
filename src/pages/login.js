import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useId from '@/hooks/useAuth'

async function handleClick(email, password, router, login) {
    try {
        const response = await fetch("/api/user/verify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const res = await response.json();
        console.log(res)

        if (res.message === "Invalid/insufficient information") {
            document.getElementById("error_message").style.display = 'block'
        } else {
            document.getElementById("error_message").style.display = 'none'
            console.log(res.message)
            login(res.message._id)
            router.push("/traininglogs")
            console.log("move to training logs dashboard")
        }  
    } catch (e) {
        console.log("error: ", e)
    } 
}

export default function LoginPage() {
    const router = useRouter()
    const {id, login, logout} = useId();

    return (
        <div>
            <div className = {styles.loginContainer}>
                <h1 className = {styles.header}>Login</h1>
                <input id="email" type="text" placeholder="Email" className = {styles.input}/>
                <input id="password" type="password" placeholder="Password" className = {styles.input}/>
                <p id = "error_message" className={styles.errorMessage}>Username or password incorrect</p>
                <button className={styles.loginButton} onClick={() => handleClick(document.getElementById("email")?.value, document.getElementById("password")?.value, router, login)}>Log in</button>
                <Link href="/signup" className = {styles.link}><p>Don't have an account? <b>Sign up</b></p></Link>
            </div>
        </div>
    )
}
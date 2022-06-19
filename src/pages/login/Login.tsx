import styles from './Login.module.css';
import {useState} from "react";
import {useLogin} from "../../hooks/useLogin";
import {useNavigate} from "react-router-dom";
import {alert_Error} from "../../helpers/AlertHelpers";

const Login = () =>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {login, isLoading, error} = useLogin();
    const navigate = useNavigate();

    const submitHandler = (e:any) =>{
        e.preventDefault()

        console.log(email, password);
        login(email, password)
            .then(()=>{
                setEmail("")
                setPassword("")
                navigate('/')
            })

    }
    return(
        <div className={styles.main}>
            <form onSubmit={submitHandler}>
                <h2 className={styles['page-title']}>Login</h2>
                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required value={email}
                           onChange={(e)=> {
                               setEmail(e.target.value)
                           }} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" required value={password}
                           onChange={(e)=> {
                               setPassword(e.target.value)
                           }} />
                </div>
                <div className="mb-4 flex justify-center">
                    {isLoading
                        ? (<button disabled className={styles.btnDisabled}>Loading...</button>)
                        : (<button className={styles.btnSubmit}>Sign Up</button>)
                    }
                </div>
                <div className="text-xs">
                    { alert_Error(error) }
                </div>
            </form>
        </div>
    )
}

export default Login;
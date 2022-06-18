import styles from './Signup.module.css';
import {useState} from "react";
import {alert_Error} from "../../helpers/AlertHelpers";
import {useSignup} from "../../hooks/useSignup";

const Signup = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbNailError, setThumbNailError] = useState<string|null>(null);

    const {error, isLoading, signup} = useSignup()

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        console.log(email, password, displayName, thumbnail);
    }
    const handleFileChange = (e:any) =>{
        setThumbnail(null)
        let selected = e.target.files[0]
        if(!selected){
            setThumbNailError("Please select a File")
            return
        }
        if(!selected.type.includes('image')){
            setThumbNailError("Select an Image File")
            return
        }
        if(selected.size > 100000){
            setThumbNailError("File size must be  < 100kb")
            return
        }
        setThumbNailError(null)
        setThumbnail(selected)
    }


    return(
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles['page-title']}>Create Account</h2>
                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required value={email}
                           onChange={(e)=> {
                               setEmail(e.target.value)
                           }} />
                </div>
                <div className="mb-4">
                    <label htmlFor="displayName">Display Name:</label>
                    <input type="text" id="displayName" required value={displayName}
                           onChange={(e)=> {
                               setDisplayName(e.target.value)
                           }} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password </label>
                    <input type="password" id="password" required value={password}
                           onChange={(e)=> {
                               setPassword(e.target.value)
                           }} />
                </div>

                <div className="mb-4">
                    <label >Profile Image:</label>
                    <input className={styles.profImage}
                           onChange={handleFileChange}
                           type="file" required />
                    <div className="text-xs">
                        {alert_Error(thumbNailError)}
                    </div>
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

export default Signup;


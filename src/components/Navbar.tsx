import styles from './Navbar.module.css';
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

const Navbar = () =>{
    // @ts-ignore
    const {user} = useAuthContext()
    const {logout} = useLogout()

    return(
        <div className={styles.main}>
            <div className={styles.navTitle}>
                <Link to="/"> <h1>Project Mx</h1> </Link>
            </div>
            <div className="flex items-center">
                {user
                    ? ( <div className={styles.navItems}>
                            <div className="text-white inline-block">
                                Hello, {user.displayName}
                            </div>
                            <button onClick={logout}
                                    className={styles.btnLogout}
                            >Logout</button>
                        </div>
                    )
                    : ( <div className={styles.navItems}>
                            <Link className={styles.signup} to="/signup">
                                Signup
                            </Link>
                            <Link className={styles.login} to="/login">
                                Login
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;
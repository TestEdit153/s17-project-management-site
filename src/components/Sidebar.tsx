import styles from './Sidebar.module.css';
import DashboardIcon from '../assets/dashboard.svg'
import AddIcon from '../assets/add_icon.svg'
import {NavLink} from "react-router-dom";
import Avataar from "./Avataar";
import {useAuthContext} from "../hooks/useAuthContext";
import OnlineUsers from "./OnlineUsers";

const Sidebar = () =>{
    //@ts-ignore
    const {user} = useAuthContext();

    return(
        <div className={styles.main}>
            <div className={styles["sidebar-content"]}>
                <Avataar user={user} />
                <div className={styles.user}> hey {user.displayName} </div>
                <div className={styles["navlinks"]}>
                    <ul>
                        <li>
                            <NavLink to="/" >
                                <img src={DashboardIcon} alt="dashboard"/>
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="dashboard"/>
                                <span>Add Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <OnlineUsers />
        </div>
    )
}

export default Sidebar;
import styles from './Sidebar.module.css';
import DashboardIcon from '../assets/dashboard.svg'
import AddIcon from '../assets/add_icon.svg'
import {NavLink} from "react-router-dom";

const Sidebar = () =>{
    return(
        <div className={styles.main}>
            <div className="sidebar-content">
                <div className={styles["user"]}> Hey User </div>
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
        </div>
    )
}

export default Sidebar;
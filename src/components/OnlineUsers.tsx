import styles from './Onlineusers.module.css';
import {useCollection} from "../hooks/useCollection";
import {alert_Error} from "../helpers/AlertHelpers";
import Avataar from "./Avataar";

const OnlineUsers = () =>{
    const {error, documents} = useCollection("users")
    return(
        <div className={styles.main}>
            <h2 className="font-bold text-gray-400 p-4 pl-0">All Users</h2>
            {alert_Error(error)}
            {documents
                ? (documents.map((user)=>{
                    return(
                        <div key={user.id}
                             className="flex items-center mb-2">
                        <span
                            className={
                                user.online
                                    ? styles.online
                                    : styles.offline
                            }>
                        </span>
                        <Avataar user={user}/>
                        <span className="pl-2">{user.displayName}</span>
                    </div>)
                }))
                : (<div>No Users found..</div>)
            }

        </div>
    )
}

export default OnlineUsers;
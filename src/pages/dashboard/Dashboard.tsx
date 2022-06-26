import styles from './Dashboard.module.css';
import {useCollection} from "../../hooks/useCollection";
import {alert_Error} from "../../helpers/AlertHelpers";
import ProjectList from "../../components/project/ProjectList";

const Dashboard = () =>{
    const {error, documents} = useCollection('projects')
    return(
        <div className={styles.main}>
            <h2 className={styles.title}>Dashboard</h2>
            {alert_Error(error)}
            {documents
                ? ( <ProjectList documents={documents}/> )

                // Message to show while documents are being fetched
                : ( <div>Checking for Project Records..</div> )
            }
        </div>
    )
}

export default Dashboard;


import { Project } from '../types/Project';
import styles from './ProjectList.module.css';
import {Link} from "react-router-dom";

// When Project is fetched from DB, it has ID
type ProjectDoc = Project & {id:string}

const ProjectList = (props:any) =>{
    const documents:Array<ProjectDoc> = props.documents;

    return(
        <div className={styles.main}>
            {/* --- Check if documents is an empty array --- */}
            { documents.length === 0 ? <p>No Projects to show</p> : ""}

            {/* --- If there are documents, then map them --- */}
            { documents.map(doc => {
                return  (
                    <div className={styles.card} key={doc.id}>
                        <Link to={`/projects/${doc.id}`} >
                            <h4>{doc.name}</h4>
                            <p>Due date: {doc.dueDate.toDate().toDateString()}</p>
                            <div className={styles["assigned-to"]}>
                                <ul>
                                    {doc.assignedUsers.map(user =>{
                                        return <li key={user.id}>
                                            {user.displayName}
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </Link>
                    </div>
                )
            })
            }
        </div>
    )
}

export default ProjectList;
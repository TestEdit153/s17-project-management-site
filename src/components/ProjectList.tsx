import { Project } from '../types/Project';
import styles from './ProjectList.module.css';


const ProjectList = (props:any) =>{
    const documents:Array<Project> = props.documents;
    return(
        <div className={styles.main}>
            {/* --- Check if documents is an empty array --- */}
            { documents.length === 0 ? <p>No Projects to show</p> : ""}

            {/* --- If there are documents, then map them --- */}
            { documents.map(doc => {
                    return <p key={doc.createdBy.id}>{doc.name}</p>
                })
            }
        </div>
    )
}

export default ProjectList;
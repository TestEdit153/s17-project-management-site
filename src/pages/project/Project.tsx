import styles from './Project.module.css';
import {useParams} from "react-router-dom";
import useDocument from "../../hooks/useDocument";
import ProjectDetails from "../../components/project/ProjectDetails";
import ProjectComments from "./ProjectComments";

const Project = () =>{
    const {id} = useParams();
    const docID = id as string
    const {error, document} = useDocument('projects', docID)
     console.log("Document", document);

    // Return if there is an error
    if(error){ return <div className="alert error">{error}</div> }

    // if document is not ready from the useDocument Hook
    if(!document){ return <div>Loading Document...</div> }

    // When document is ready
    return(
        <div className={styles.main}>
                <ProjectDetails project={document} />
                <ProjectComments project={document} />
        </div>
    )
}

export default Project;


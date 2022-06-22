import styles from './ProjectDetails.module.css';

const ProjectDetails = (props:any) =>{
    return(
        <div className={styles.main}>
            <h2 className="text-3xl"> {props.documentDetails.name} </h2>

        </div>
    )
}

export default ProjectDetails;
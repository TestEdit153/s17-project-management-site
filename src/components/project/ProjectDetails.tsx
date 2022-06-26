import styles from './ProjectDetails.module.css';
import {UserBase} from '../../types/UserBase';

const ProjectDetails = (props: any) => {
    return (
        <div className={styles.main}>
            <h2 className="text-3xl"> {props.project.name} </h2>
            <p>Due date: {props.project.dueDate.toDate().toDateString()}</p>
            <h3 className="text-xl my-3">The Project is assigned to:</h3>
            {props.project.assignedUsers.map((user: UserBase) =>
                 (<span key={user.id} className="mx-2 border px-4 bg-slate-200 pt-1 pb-2 rounded-full"> {user.displayName} </span>)
            )}

        </div>
    )
}

export default ProjectDetails;
import styles from './ProjectComments.module.css';
import {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {timestamp} from "../../firebase/config";
import {useFirestore} from "../../hooks/useFirestore";
import {v4 as uuidv4} from 'uuid'

const ProjectComments = (props) => {
    const {updateDocument, response} = useFirestore('projects')
    const [newComment, setNewComment] = useState("");
    const {user} = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuidv4()
        }
        console.log("commentToAdd",commentToAdd);
        await updateDocument(props.project.id, {
            comments:[...props.project.comments, commentToAdd]
        })
        if(!response.error){
            setNewComment("")
        }
    }

    return (<div className={styles.main}>
        <form className={styles['add-comment']} onSubmit={handleSubmit}>
            <h2>Comments</h2>
            <div className={styles["form-control"]}>
                <label htmlFor="details" className="mb-4">Add Comment: </label>
                <textarea rows={3} id="details" required className={styles.details}
                          placeholder={"New comment here"} value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                />
            </div>
            <div className={styles["btnSubmit"]}>
                <button>Submit</button>
            </div>
        </form>
    </div>)
}

export default ProjectComments;
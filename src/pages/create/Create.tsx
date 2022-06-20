import styles from './Create.module.css';
import {useState} from "react";

type Users = [{
  displayName:string
  online:boolean
  photoURL:string
}] | []

const Create = () =>{
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState<Users>([]);

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        console.table()
    }
    return(
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <h3>Create a New Project</h3>
                <div className={styles["form-control"]}>
                    <label htmlFor="name" className="mb-4"> Name: </label>
                    <input type="text" id="name" required className={styles.name}
                           value={name}
                           onChange={(e)=>{
                               setName(e.target.value)
                           }}
                    />
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="details" className="mb-4">Details: </label>
                    <textarea rows={3} id="details" required className={styles.details}
                           value={details}
                           onChange={(e)=>{
                               setDetails(e.target.value)
                           }}
                    />
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="dueDate" className="mb-4">Due Date: </label>
                    <input type="date" id="dueDate" required className={styles.dueDate}
                           value={dueDate}
                           onChange={(e)=>{
                               setDueDate(e.target.value)
                           }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className={styles["form-control"]}>
                        <label htmlFor="category" className="mb-4">Category: </label>
                        <input type="text" id="category" required className={styles.category} value={category}
                               onChange={(e)=>{
                                   setCategory(e.target.value)
                               }}
                        />
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="assignedUsers" className="mb-4">Assigned Users: </label>
                        <input type="text" id="assignedUsers" required className={styles.assignedUsers}
                               onChange={(e)=>{

                               }}
                        />
                    </div>
                </div>

                <div className={styles["btnSubmit"]}>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Create;


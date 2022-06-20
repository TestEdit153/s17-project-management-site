import styles from './Create.module.css';
import {useEffect, useState} from "react";
import Select from 'react-select';
import {useCollection} from "../../hooks/useCollection";
import { alert_Error } from '../../helpers/AlertHelpers';

type User = { displayName: string, online: boolean, photoURL: string }
type Users = Array<User> | []

const categories = [
    {value: 'development', label: "Development"},
    {value: 'design', label: "Design"},
    {value: 'sales', label: "Sales"},
    {value: 'marketing', label: "Marketing"}
]

const Create = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState<any>('');

    const [formError, setFormError] = useState<string | null>(null);

    // 1. Users is Array<User>
    const [users, setUsers] = useState<Users>([])
    const [assignedUsers, setAssignedUsers] = useState<Users>([]);

    // 1. Get all users with useCollection Hook
    const {error, documents} = useCollection('users')

    // 2. useEffect maps users document for Select options
    useEffect(() => {
        const options: any = documents?.map((user: User) => {
            return {value: user, label: user.displayName}
        })
        setUsers(options)
    }, [documents])


    const handleSubmit = (e: any) => {
        e.preventDefault();
        setFormError(null);
        if (!category) {
            setFormError('Category cannot be Empty')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError("Project should have atleast one user")
            return
        }

        console.log({name, details, dueDate, category, assignedUsers})
    }

    return (
        <div className={styles.main}>
            <form onSubmit={handleSubmit}>
                <h3>Create a New Project</h3>
                <div className={styles["form-control"]}>
                    <label htmlFor="name" className="mb-4"> Name: </label>
                    <input type="text" id="name" required className={styles.name}
                           value={name} placeholder={"Name for the Project"}
                           onChange={(e) => {
                               setName(e.target.value)
                           }}
                    />
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="details" className="mb-4">Details: </label>
                    <textarea rows={3} id="details" required className={styles.details}
                              value={details} placeholder={"Describe the Project here"}
                              onChange={(e) => {
                                  setDetails(e.target.value)
                              }}
                    />
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="dueDate" className="mb-4">Due Date: </label>
                    <input type="date" id="dueDate" required className={styles.dueDate}
                           value={dueDate}
                           onChange={(e) => {
                               setDueDate(e.target.value)
                           }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className={styles["form-control"]}>
                        <label htmlFor="category" className="mb-4"> Category: </label>
                        <Select options={categories}
                                onChange={(option) => {
                                    setCategory(option)
                                }}
                        />
                    </div>

                    <div className={styles["form-control"]}>
                        <label htmlFor="asgUsers" className="mb-4">
                                Assigned Users:
                        </label>
                        <Select options={users}
                                onChange={(option) => {
                                    // @ts-ignore
                                    setAssignedUsers(option)
                                }}
                                isMulti
                        />
                    </div>
                </div>

                {alert_Error(formError)}
                {alert_Error(error)}
                <div className={styles["btnSubmit"]}>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Create;


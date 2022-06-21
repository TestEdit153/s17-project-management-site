import styles from './Create.module.css';
import {useEffect, useState} from "react";
import Select from 'react-select';
import {useCollection} from "../../hooks/useCollection";
import { alert_Error } from '../../helpers/AlertHelpers';
import * as _ from "lodash";
import firebase from 'firebase/app'
import {timestamp} from "../../firebase/config";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useFirestore} from "../../hooks/useFirestore";
import {useNavigate} from "react-router-dom";
import {UserBase} from "../../types/UserBase";

type OnlineStatus = {online: boolean}

type UserOnline = UserBase & OnlineStatus
type UsersOnline = Array<UserOnline> | []

type AssignedUser = {label:string, value:UserOnline}
type AssignedUsersList = Array<AssignedUser> | []

type Project = {
    name:string, details:string,
    dueDate: firebase.firestore.Timestamp,
    comments: string[],
    category: string,
    createdBy: UserBase
    assignedUsers: Array<UserBase> | []
}

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
    // 1. Users is Array<UserOnline>
    const [users, setUsers] = useState<UsersOnline>([])
    const [assignedUsers, setAssignedUsers] = useState<AssignedUsersList>([]);

    // 1. Get all users with useCollection Hook
    const {error, documents} = useCollection('users')
    const [formError, setFormError] = useState<string | null>(null);
    // @ts-ignore
    const {user} = useAuthContext();
    const {response, addDocument} = useFirestore('projects')
    const navigate = useNavigate();

    // 2. useEffect maps users document for Select options
    useEffect(() => {
        const options: any = documents?.map((user: UserOnline) => {
            return {value: user, label: user.displayName}
        })
        setUsers(options)
    }, [documents])

    // Filters state users to remove the AssignedUser
    useEffect(() =>{
        setAssignedUsers(prevState => {
            return _.differenceWith(prevState, users, _.isEqual)
        })
    }, [users])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setFormError(null);
        if (!category) {
            setFormError('Category cannot be Empty')
            return
        }
        // @ts-ignore
        if (assignedUsers.length < 1) {
            setFormError("Project should have atleast one user")
            return
        }

        // @ts-ignore
        console.log("Form data", {name, details, dueDate, category, assignedUsers})

        const createdBy:UserBase = {
            displayName: user.displayName,
            id: user.uid,
            photoURL: user.photoURL
        }
        const assignedUserList = assignedUsers.map(au =>{
            return {
                id: au.value.id,
                displayName: au.value.displayName,
                photoURL: au.value.photoURL
            }
        })
        const project:Project = {
            name, details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments:[],
            createdBy,
            assignedUsers: assignedUserList
        }

        console.log("Project Data", project);
        await addDocument(project)
        if(!response.error){
           navigate("/", {replace:true})
        }
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


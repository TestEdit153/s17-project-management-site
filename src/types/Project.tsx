import firebase from "firebase";
import {UserBase} from "./UserBase";

export type Project = {
    name:string, details:string,
    dueDate: firebase.firestore.Timestamp,
    comments: string[],
    category: string,
    createdBy: UserBase
    assignedUsers: Array<UserBase> | []
}
import styles from './Avataar.module.css';

const Avataar = (props:any) =>{
    return(
        <div className={styles.main}>
            <div className={styles["avataar"]}>
                <img src={props.user.photoURL} alt=""/>
            </div>
        </div>
    )
}

export default Avataar;
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import style from "./ProfileInfo.module.css";
import {useState} from "react";
import {ProfileData} from "./ProfileData";
import {ProfileDataReduxForm} from "./ProfileDataForm";
import Contacts from "./Contacts";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    }
    let onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.updatePhoto(e.target.files[0])
        }
    }
    let onSubmit = (formData) => {
        props.saveProfile(formData)
            .then(() =>setEditMode(false))
    }
    return (
        <div>
            <img src={props.profile.photos.large || userPhoto} className={style.avatar}/>
            {props.isOwner && <input onChange={onMainPhotoSelected} type={'file'}/>}
            {editMode ?
                <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                <ProfileData profile={props.profile}
                             isOwner={props.isOwner}
                             goToEditMode={() => {setEditMode(true)}}/>}
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
        </div>
    )
}

export default ProfileInfo
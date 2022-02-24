import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import addPhotoImg from '../../../assets/images/addPhoto.png'
import style from "./ProfileInfo.module.css";
import {useState} from "react";
import {ProfileData} from "./ProfileData";
import {ProfileDataReduxForm} from "./ProfileDataForm";

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
        <div className={style.profileInfoWrapper}>
            <div className={style.profileImage}>
                <img src={props.profile.photos.large || userPhoto} className={style.avatar}/>
                {props.isOwner &&
                <div className={style.addPhotoInput}>
                    <input onChange={onMainPhotoSelected} type={'file'} id={'file'}/>
                    <label htmlFor={"file"}>
                        <img src={addPhotoImg}
                             className={style.addPhotoImage}
                             alt="" />
                    </label>
                </div>}
            </div>
            <div className={style.nameAndStatus}>
                <b className={style.userName}>{props.profile.fullName}</b>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
            <div className={style.profileData}>
                {editMode ?
                    <ProfileDataReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={props.profile}
                                 isOwner={props.isOwner}
                                 goToEditMode={() => {setEditMode(true)}}/>}
            </div>
            <div>

            </div>
        </div>
    )
}

export default ProfileInfo
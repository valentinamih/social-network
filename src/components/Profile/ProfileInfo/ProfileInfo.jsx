import style from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div>{props.profile.fullName}</div>
        <img src={props.profile.photos.large}></img>

            <div>About: {props.profile.aboutMe}</div>
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            <div>Looking for a job: {props.profile.lookingForAJobDescription}
            </div>
        </div>
    )
}

export default ProfileInfo
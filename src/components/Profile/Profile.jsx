import style from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
    return (
        <div className={style.content}>
            <ProfileInfo updatePhoto={props.updatePhoto}
                         isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         saveProfile={props.saveProfile}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
            </div>
    )
}
export default Profile
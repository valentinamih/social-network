import style from "./Profile.module.css"
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";
import {ProfileType} from "../../types/types";

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updatePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    updateStatus: (status: string) => void
}
const Profile:React.FC<PropsType> = (props) => {
    return (
        <div>
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
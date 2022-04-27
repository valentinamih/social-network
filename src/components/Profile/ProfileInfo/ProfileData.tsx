import Contacts from "./Contacts";
import Button from "../../common/Buttons/Button";
import React from "react";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    goToEditMode: () => void
}

export const ProfileData:React.FC<PropsType> = (props) => {
    return  <div>
        <div>
            {props.isOwner && <Button onClickFunction={props.goToEditMode} text={'Edit'} />}
        </div>
        <div>
            <b>About me: </b> {props.profile.aboutMe || 'didn t add about yet;('}
        </div>
        <div>
            <b>Looking for a job: </b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            <b>My professional skills: </b> {props.profile.lookingForAJob && props.profile.lookingForAJobDescription}
        </div>
        <div>
            Contacts: {Object.keys(props.profile.contacts).map((contact: string) => {
                return <Contacts contactType={contact}
                                 contactValue={props.profile.contacts[contact as keyof ContactsType]}
                                 key={contact} />
        })}
        </div>
    </div>
}

import {createField, Input} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "./ProfileInfo.module.css";
import React from "react";
import Button from "../../common/Buttons/Button";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileFormNamesPropsType = Extract<keyof ProfileType, string>

export const ProfileFormData: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {props.error && <div >
            {props.error}
        </div>}
        <div>
            <b>Full name: </b> {createField<ProfileFormNamesPropsType>(Input, [], 'fullName', 'enter your name')}
        </div>
        <div>
            <b>About me: </b> {createField<ProfileFormNamesPropsType>(Input, [], 'aboutMe', 'write anything you want ;)')}
        </div>
        <div>
            <b>Looking for a job: </b> {createField<ProfileFormNamesPropsType>(Input, [], 'lookingForAJob', '', {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills: </b> {createField<ProfileFormNamesPropsType>(Input, [], 'lookingForAJobDescription', 'tell about your skills')}
        </div>
        <div>
            Contacts: {Object.keys(props.profile.contacts).map((contact) => {
            return <div className={style.contact} key={contact}>
                {contact}: {createField(Input, [], 'contacts.' + contact, contact)}
            </div>
        })}
        </div>
        <div>
                <Button text={'Submit'} />
        </div>

    </form>
}

export const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
    form: 'profile-data'
})(ProfileFormData)
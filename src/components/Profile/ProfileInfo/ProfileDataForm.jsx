import {createField, Input} from "../../common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import style from "./ProfileInfo.module.css";
import React from "react";
import Button from "../../common/Buttons/Button";


export const ProfileFormData = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit}>
        {error && <div >
            {error}
        </div>}
        <div>
            <b>Full name: </b> {createField(Input, [], 'fullName', 'enter your name')}
        </div>
        <div>
            <b>About me: </b> {createField(Input, [], 'aboutMe', 'write anything you want ;)')}
        </div>
        <div>
            <b>Looking for a job: </b> {createField(Input, [], 'lookingForAJob', '', {type: 'checkbox'})}
        </div>
        <div>
            <b>My professional skills: </b> {createField(Input, [], 'lookingForAJobDescription', 'tell about your skills')}
        </div>
        <div>
            Contacts: {Object.keys(profile.contacts).map((contact) => {
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

export const ProfileDataReduxForm = reduxForm({
    form: 'profile-data'
})(ProfileFormData)
import Contacts from "./Contacts";
import style from './ProfileInfo.module.css'
import Button from "../../common/Buttons/Button";

export const ProfileData = (props) => {
    return  <div className={style.profileDataWrapper}>
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
            Contacts: {Object.keys(props.profile.contacts).map((contact) => {
                return <Contacts contactType={contact}
                                 contactValue={props.profile.contacts[contact]}
                                 key={contact} />
        })}
        </div>
    </div>
}

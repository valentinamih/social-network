import Contacts from "./Contacts";

export const ProfileData = (props) => {
    return  <div>
        <div>
            {props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div>}
        </div>
        <div>
            <b>{props.profile.fullName}</b>
        </div>
        <div>
            {props.profile.aboutMe || 'didn t add about yet;('}
        </div>
        <div>
            <b>Looking for a job: </b> {props.profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        <div>
            {props.profile.lookingForAJob && props.profile.lookingForAJobDescription}
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

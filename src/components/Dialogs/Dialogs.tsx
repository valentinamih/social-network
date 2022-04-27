import style from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from 'react'
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utilits/validators/validators";
import {createField, Textarea} from "../common/FormControls/FormControls";
import Button from "../common/Buttons/Button";
import Heading from "../common/Headings/Headings";
import {InitialStateType} from "../../redux/dialogs-reducer";

type MapStatePropsType = {
    dialogsPage: InitialStateType
}
type MapDispatchPropsType = {
    addMessage: (newMessageText: string) => void
}
type OwnPropsType = {}
const Dialogs: React.FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = (props) => {
    let dialogsElements = props.dialogsPage.dialogs.map(dialog => <DialogItem link={dialog.link}
                                                                  name={dialog.name}
                                                                  key={dialog.id} id={dialog.id}/>)
    let messagesElements = props.dialogsPage.messages.map(message => <Message message={message.message}
                                                                  key={message.id}/>)
    let addMessage = (newMessageText: string) => {
        props.addMessage(newMessageText)
    }
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                <Heading heading={'Dialogs'} />
                {dialogsElements}
            </div>
            <div>
                <Heading heading={'Messages'} />
                {messagesElements}
                <AddMessageReduxForm onSubmit={addMessage} />
            </div>
        </div>
    )
}
const maxLength50 = maxLengthCreator(50)

type AddMessageDataType = {
    newMessageText: string
}
type AddMessagePropsType = Extract<keyof AddMessageDataType, string>

const AddMessageForm: React.FC<InjectedFormProps<AddMessagePropsType, OwnPropsType> & OwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddMessagePropsType>(Textarea, [required, maxLength50], 'newMessageText', 'enter yor message')}
            <Button text={"Send message"} />
        </div>
    </form>
}

const AddMessageReduxForm = reduxForm<AddMessagePropsType, OwnPropsType>({
    form: 'addMessage'
})(AddMessageForm)


export default Dialogs
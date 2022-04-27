import {maxLengthCreator, required} from "../../../utilits/validators/validators";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import style from "./MyPosts.module.css";
import {createField, Textarea} from "../../common/FormControls/FormControls";
import Button from "../../common/Buttons/Button";

const maxLength100 = maxLengthCreator(100)

type PropsType = {}
export type AddPostValuesType = {
    newPostText: string
}
type AddPostPropsType = Extract<keyof AddPostValuesType, string>

const AddPostForm: React.FC<InjectedFormProps<AddPostValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div className={style.addPostForm}>
            {createField<AddPostPropsType>(Textarea, [required, maxLength100], 'newPostText', 'this could be your post')}
            <Button text={"Add new post"} />
        </div>
    </form>
}
export default reduxForm<AddPostValuesType, PropsType>({
    form: 'addPost'
})(AddPostForm)
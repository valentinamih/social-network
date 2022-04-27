import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "./FormControls/FormControls";
import {required} from "../../utilits/validators/validators";
import {connect} from "react-redux";
import { login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './FormControls/FormControls.module.css'
import {AppStateType} from "../../redux/redux-store";

type OwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormDataType, OwnProps> & OwnProps> =
    ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginNamesPropsType>(Input, [required], 'email', 'Email')}
            {createField<LoginNamesPropsType>(Input, [required], 'password', 'Password', {type: 'password'})}
            {createField<LoginNamesPropsType>(Input, [], 'rememberMe', null, {type: 'checkbox'})}
            {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button type="submit">Login</button>
                {captchaUrl && <img src={captchaUrl} alt={'captcha'}/> }
                {captchaUrl && createField<LoginNamesPropsType>(Input, [required], 'captcha', 'enter nubmers from image')}
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormDataType, OwnProps>({
    form: 'login'
})(LoginForm)

type LoginFormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginNamesPropsType = keyof LoginFormDataType
type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => (void)
}

const Login: React.FC<MapStatePropsType & MapDispatchPropsType & OwnProps> = (props) => {
    let onSubmit = (formData: LoginFormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)
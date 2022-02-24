import React from "react";
import { reduxForm} from "redux-form";
import {createField, Input} from "./FormControls/FormControls";
import {required} from "../../utilits/validators/validators";
import {connect} from "react-redux";
import { login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './FormControls/FormControls.module.css'


const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField(Input, [required], 'email', 'Email')}
            {createField(Input, [required], 'password', 'Password', {type: 'password'})}
            {createField(Input, [], 'remember-me', null, {type: 'checkbox'})}
            {error && <div className={style.formSummaryError}>
                    {error}
                </div>}
            <div>
                <button type="submit">Login</button>
                {captchaUrl && <img src={captchaUrl} /> }
                {captchaUrl && createField(Input, [required], 'captcha', 'enter nubmers from image')}
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, {login})(Login)
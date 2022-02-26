import style from './FormControls.module.css'
import {Field} from "redux-form";
import React from "react";

export const FormControl = ({input, meta:{touched, error}, child, children}) => {
    const hasError = touched && error
    return (
        <div className={style.formControl + ' ' + (hasError ?  style.error : '')}  >
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>  }
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}> <input  {...input} {...restProps}/> </FormControl>
}

export const createField = (component, validators, name, placeholder, props = {}, text = '') => {
    return <div>
        <Field validate={validators}
               name={name}
               component={component}
               placeholder={placeholder}
               {...props} />
    </div>
}
import style from './FormControls.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import React from "react";
import {ValidatorType} from "../../../utilits/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
export const FormControl: React.FC<FormControlPropsType> = ({meta:{touched, error}, children}) => {
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
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}> <textarea {...input} {...restProps}/> </FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,...restProps} = props
    return <FormControl {...props}> <input  {...input} {...restProps}/> </FormControl>
}

export function createField<FormKeysType extends string> (component: React.FC<WrappedFieldProps>,
                                                          validators: Array<ValidatorType>,
                                                          name: FormKeysType,
                                                          placeholder: string | null,
                                                          props = {}, text = '') {
    return <div>
        <Field component={component}
               validate={validators}
               name={name}
               placeholder={placeholder}
               {...props} />
    </div>
}
import style from './Error.module.css'

const Error = (props) => {
    return <div className={style.errorWindow}>
        {props.message}
    </div>
}

export default Error
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img className={style.logoImg}
                src={logo} />
            <span className={style.mainHeading}>My social network</span>
            <div className={style.loginBlock}>
                {props.isAuth ? <div>
                        {props.login}
                     <span onClick={props.logout} className={style.loginSpan}> Logout </span>
                </div> :
                    <NavLink to={'/login'}><span className={style.loginSpan}> Login </span> </NavLink>
                }

            </div>
        </header>
    )
}

export default Header
import style from "./Navbar.module.css"
import {NavLink} from 'react-router-dom'
import SidebarContainer from "../Sidebar/SidebarContainer";
import React from "react";


const Navbar: React.FC = () => {
  return (
    <nav className={style.nav}>
      <div className={style.item}>
        <NavLink to={"/profile"} activeClassName={style.active}>Profile</NavLink>
      </div>
      <div className={style.item}>
          <NavLink to={'/dialogs'} activeClassName={style.active}>Dialogs</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to={'/news'} activeClassName={style.active}>News</NavLink>
      </div>
      <div className={style.item}>
        <NavLink to={'/music'} activeClassName={style.active}>Music</NavLink>
      </div>
      <div className={style.item}>
          <NavLink to={'settings'} activeClassName={style.active}>Settings</NavLink>
      </div>
        <div className={style.item}>
            <NavLink to={'users'} activeClassName={style.active}>Users</NavLink>
        </div>
        <SidebarContainer/>
    </nav>
  )
}


export default Navbar
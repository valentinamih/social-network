import style from "./Post.module.css"
import like from '../../../../assets/images/like.png'
import React from "react";

type PropsType = {
    photo: string;
    message: string;
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={style.post}>
            <img className={style.avatar} src={props.photo}/>
            <div className={style.postText}>
                {props.message}
            </div>
            <div >
                <img className={style.likeButton} src={like}/>
                <span>{props.likesCount}</span>
            </div>
        </div>
    )
}

export default Post
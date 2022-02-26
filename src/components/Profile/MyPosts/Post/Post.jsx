import style from "./Post.module.css"
import like from '../../../../assets/images/like.png'

const Post = (props) => {
    return (
        <div className={style.post}>
            <img className={style.avatar} src={props.photo}/>
            <div className={style.postText}>
                {props.message}
            </div>
            <div >
                <img className={style.likeButton} src={like}/>
            </div>
        </div>
    )
}

export default Post
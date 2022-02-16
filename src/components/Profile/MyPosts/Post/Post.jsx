import s from "./Post.module.css"

const Post = (props) => {
    return (
        <div className={s.item}>
            <img src="https://get.wallhere.com/photo/1600x1200-px-action-adventure-alien-aliens-Avatar-fantasy-fi-fighting-futuristic-sci-warrior-1635355.jpg"/>
            {props.message} <br />
            <span>like! {props.likesCount}</span>
        </div>
    )
}

export default Post
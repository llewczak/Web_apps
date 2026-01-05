import './comment.css'
import {useState} from 'react'

export interface User {
    id: number;
    username: string;
    fullName: string;
}

export interface CommentProps {
    id: number;
    body: string;
    postId: number;
    likes: number;
    user: User;
}

export const Comment = (props: CommentProps) => {
    const [likeCounter, setLikeCounter] = useState(props.likes)
    const [isLikeClicked, setIsLikeClicked] = useState(false)
    const [isDislikeClicked, setIsDislikeClicked] = useState(false)

    const likeClicked = () => {
        if (isLikeClicked) {
            setIsLikeClicked(false);
            setLikeCounter(prevState => prevState - 1);
            return;
        }
        if (isDislikeClicked) {
            setIsDislikeClicked(false);
            setLikeCounter(prevState => prevState + 1);
        }

        setIsLikeClicked(true);
        setLikeCounter(prevState => prevState + 1);
    }

    const dislikeClicked = () => {
        if (isDislikeClicked) {
            setIsDislikeClicked(false);
            setLikeCounter(prevState => prevState + 1);
            return;
        }
        if (isLikeClicked) {
            setIsLikeClicked(false);
            setLikeCounter(prevState => prevState - 1);
        }

        setIsDislikeClicked(true);
        setLikeCounter(prevState => prevState - 1);
    }

    return (
        <div style={{margin: '20px', backgroundColor: 'white', width: '500px', height: '200px', color: 'black'}}>
            <div style={{display: 'flex'}}>
                <div>User: {props.user.username}</div>
                <div style={{marginLeft: 'auto'}}>{likeCounter}♥️</div>
                <button className="likeButtons" onClick={likeClicked} style={{backgroundColor: isLikeClicked ? 'green' : 'white'}}>👍</button>
                <button className="likeButtons" onClick={dislikeClicked} style={{backgroundColor: isDislikeClicked ? 'red' : 'white'}}>👎</button>
            </div>
            <div style={{width: '500px',height: '150px', fontSize: '1cqw', textAlign: 'start'}}>{props.body}</div>
        </div>
    );
}
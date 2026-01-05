import type {CommentProps} from './Comment.tsx'
import {Comment} from './Comment.tsx'
import {useEffect, useState} from 'react'

interface ApiResponse {
    comments: CommentProps[];
    total: number;
    skip: number;
    limit: number;
}

export const Comments = () => {
    const [comments, setComments] = useState<CommentProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/comments');

                if (!response.ok) {
                    throw new Error('Blad pobierania danych');
                }

                const data: ApiResponse = await response.json();

                setComments(data.comments);
            } catch (e) {
                console.error('Coś poszło nie tak:', e);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h3 style={{marginTop: '30px'}}>---Comments---</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {comments.map((comment) => (
                    <Comment id={comment.id} body={comment.body} postId={comment.postId} likes={comment.likes} user={comment.user}/>
                ))}
            </div>
        </>
    );
}
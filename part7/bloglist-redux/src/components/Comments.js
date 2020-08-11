import React from 'react';

const Comments = (props) => {
    return (
        <>
            <h2>Comments:</h2>
            {props.comments.map(comment => <li>{comment.comment}</li>)}
        </>
    );
};

export default Comments;
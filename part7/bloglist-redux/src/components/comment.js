import React from 'react';

const Comments = ({comment}) => {
    return (
        <>
           
            {props.blog.comments.length
                    ? props.blog.comments.map((comment, i) => <ListGroup.Item as="li" key={`${i}-comment`}>{comment}</ListGroup.Item>)
                    : <ListGroup.Item as="li">No Comments Yet, Leave One!</ListGroup.Item>
            }

        </>
    );
};

export default Comments;
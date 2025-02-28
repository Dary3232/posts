import React from 'react';
import { Link } from '../../../ui/Link';
import * as SC from './styles'


export const Post = ({ post }) => {
    const image = post.image || 'https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg'
    return (
        <SC.Post>
            <SC.Image src={image} alt={post.title}/>
            <SC.Title>{post.title}</SC.Title>
            <Link to={`/posts/${post.id}`}>Читать далее...</Link>
        </SC.Post>
    )
}
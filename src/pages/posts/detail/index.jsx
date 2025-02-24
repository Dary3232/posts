import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typo } from "../../../components/Typo";
import { Container } from "../../../components/Container";
import { Link } from "../../../components/Link"
import {  getPostById, showPost } from "../../../redux/slices/postsSlice";
import * as SC from "./styles"


export const DetailPostPage = () => {
    const { id } = useParams();
    const { list } = useSelector((state) => state.posts.posts)
    const postForView = useSelector((state) => state.posts.postForView);
    const dispatch = useDispatch();

        useEffect(() => {
            const intId = Number(id);
            const findedPosts = list ? list.find((item) => item.id === intId) : undefined;

            if (findedPosts) {
                dispatch(showPost(findedPosts))
            } else {
               dispatch(getPostById(intId)) 
            }
            
        }, [id, list, dispatch])

    if (postForView.loading) {
        return <>loading...</>
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <>Пост не найден</>
    }

    const { post } = postForView;

    const image = post.image || 'https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg'

    return <Container>
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
        </SC.LinkWrapper>
    </Container>
}
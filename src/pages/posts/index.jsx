import React, { useEffect } from 'react'
import { Posts } from "../../components/Posts";
import { Container } from "../../components/Container";
import { Typo } from "../../components/Typo";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../redux/slices/postsSlice';


export const PostsPage = () => {
    const { list, loading } = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!list) {
          dispatch(getPosts());  
        }
    },[list, dispatch])

    if (!list && loading) {
        return <Container>Loading...</Container>
    }

    if (!list) {
        return <>404</>
    }
    

    return <Container>
        <Typo>Публикации</Typo>
        <Posts posts={list} />
    </Container>
}
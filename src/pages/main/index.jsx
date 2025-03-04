import React, { useEffect } from 'react';
import { Posts } from '../../components/Posts';
import { Container } from '../../components/ui/Container';
import { Typo } from '../../components/ui/Typo';
import { useDispatch, useSelector } from 'react-redux';
import { getFreshPosts } from '../../redux/slices/postsSlice';
import { Loader } from '../../components/ui/Loader';

export const MainPage = () => {

    const { post } = useSelector((state) => state.posts.postForView);
    const { posts, loading } = useSelector((state) => state.posts.freshPosts);
    const dispatch = useDispatch();
 

    useEffect(() => {
        if(!posts) { 
           dispatch(getFreshPosts()) 
        }
    }, [posts, dispatch])

    return <Container>
        {loading && <Loader />}
        {posts && posts.length > 0 ? ( 
                <>
                    <Typo>Свежие публикации</Typo>
                    <Posts posts={posts} />
                </>
            ) : (
                <Typo>Свежих публикаций нет</Typo>
            )}
        {post &&
            <>
                <Typo>Последний просмотренный пост</Typo>
                <Posts posts={[post]} />
            </>
        }
    </Container>
}



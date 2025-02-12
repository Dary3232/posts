import React from 'react';
import { Posts } from '../../components/Posts';
import { Container } from '../../components/Container';
import { Typo } from '../../components/Typo';

const INITIAL_POSTS = [
    {
        id: 1,
        title: 'Post 1',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg'
    },
    {
        id: 2,
        title: 'Post 2',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg'
    },
    {
        id: 3,
        title: 'Post 3',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg'
    },
]



export const MainPage = () => (
    <>
        <Container>
            <Typo>Свежие публикации</Typo>
            <Posts posts={INITIAL_POSTS} />
        </Container>
    </>
)
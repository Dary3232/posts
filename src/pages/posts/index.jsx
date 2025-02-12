import { Posts } from "../../components/Posts";
import { Container } from "../../components/Container";
import { Typo } from "../../components/Typo";

export const INITIAL_POSTS = [
    {
        id: 1,
        title: 'Post 1',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
    {
        id: 2,
        title: 'Post 2',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
    {
        id: 3,
        title: 'Post 3',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
    {
        id: 4,
        title: 'Post ',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
    {
        id: 5,
        title: 'Post 5',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
    {
        id: 6,
        title: 'Post 6',
        image: 'https://yakutia24.ru/images/econa-article-images/64756/full/Koshki.jpg',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eius molestiae totam qui earum veniam minus, tempora voluptates molestias repellendus delectus veritatis quam! Alias itaque corporis nobis ex voluptates explicabo.'
    },
]

export const PostsPage = () => (
    <Container>
        <Typo>Публикации</Typo>
        <Posts posts={INITIAL_POSTS} />
    </Container>
)
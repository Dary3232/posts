import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typo } from "../../../components/ui/Typo";
import { Container } from "../../../components/ui/Container";
import { Link } from "../../../components/ui/Link"
import { getPostById, showPost, deletePost } from "../../../redux/slices/postsSlice";
import * as SC from "./styles"


export const DetailPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { list } = useSelector((state) => state.posts.posts)
    const postForView = useSelector((state) => state.posts.postForView);

    const [postForDelete, setPostForDelete] = useState(null);

    const onDeletePost = () => {
        dispatch(deletePost(postForDelete));
        setPostForDelete(null);
        navigate('/posts');
    }

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
        {postForDelete &&
            <SC.ModalWrapper>
                <SC.Modal>
                    <SC.ModalText>Вы точно уверены, что хотите удалить публикацию c ID - {postForDelete.id}?</SC.ModalText>
                    <SC.ModalContent>
                        <SC.DeleteButton onClick={onDeletePost}>Да</SC.DeleteButton>
                        <button onClick={() => setPostForDelete(null)}>Нет</button>
                    </SC.ModalContent>
                </SC.Modal>
            </SC.ModalWrapper>
        }
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
            {list && <Link to={`/posts/${post.id}/edit`}>Редактировать</Link>}
            {list && <SC.DeleteButton onClick={() => setPostForDelete(post)}>Удалить</SC.DeleteButton>}
        </SC.LinkWrapper>
    </Container>
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typo } from "../../../components/ui/Typo";
import { Container } from "../../../components/ui/Container";
import { Link } from "../../../components/ui/Link"
import { getPostById, showPost, deletePost } from "../../../redux/slices/postsSlice";
import { Loader } from "../../../components/ui/Loader";
import * as SC from "./styles"
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";

export const DetailPostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list } = useSelector((state) => state.posts.posts);
    const postForView = useSelector((state) => state.posts.postForView);
    const { user } = useSelector((state) => state.auth)

    const [postForDelete, setPostForDelete] = useState(null);

    const showEditAndDeleteBtn = list && user;

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
        return <Loader />
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <>Пост не найден</>
    }

    const { post } = postForView;

    const image = post.image || 'https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg'

    return <Container>
        {postForDelete &&
            <Modal text={`Вы точно уверены, что хотите удалить публикацию c ID - ${postForDelete.id}?`}>
                <Button onClick={onDeletePost} label={'Да'} variant="danger" />
                <Button onClick={() => setPostForDelete(null)} label={'Нет'} />
            </Modal>
        }
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
            {showEditAndDeleteBtn && <Link to={`/posts/${post.id}/edit`}>Редактировать</Link>}
            {showEditAndDeleteBtn && <Button onClick={() => setPostForDelete(post)} label={'Удалить'} variant="danger" />}
        </SC.LinkWrapper>
    </Container>
}
import React, { useEffect, useState } from 'react';
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Input } from "../../components/ui/Input";
import { Typo } from "../../components/ui/Typo";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../../redux/slices/postsSlice';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/ui/Loader';
import * as SC from './styles';
import { debounce } from 'lodash';

export const PostsPage = () => {
    const { list, loading, totalPosts } = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('none');
    const [searchQuery, setSearchQuery] = useState('');
    const postsPerPage = 10;

    useEffect(() => {
        dispatch(getPosts({ page: currentPage, limit: postsPerPage, sortOrder, searchQuery }));
    }, [currentPage, sortOrder, searchQuery, dispatch]);

    const handleSortChange = (order) => {
        setSortOrder(order);
        setCurrentPage(1); 
    };

    const handleSearchChange = debounce((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, 700)

    if (loading) {
        return <Loader />;
    }

    if (!list || list.length === 0) {
        return <Typo>Публикации не найдены</Typo>;
    }

    const totalPages = Math.ceil(totalPosts / postsPerPage);
  
    return (
        <Container>
            <SC.Wrapper>
                <Input
                    type="text"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Поиск по названию"
                    value={searchQuery} 
                />
                <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
                    <option value="none">-</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
            </SC.Wrapper>
            {list.length > 0 ? (
                <>
                    <Typo>Публикации</Typo>
                    <Posts posts={list} />
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <Typo>Публикации не найдены</Typo>
            )}
        </Container>
    );
};

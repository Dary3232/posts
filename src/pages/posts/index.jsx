import React, { useEffect, useState } from 'react';
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Typo } from "../../components/ui/Typo";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setSearchQuery, setSortOrder } from '../../redux/slices/postsSlice';
import { Pagination } from '../../components/Pagination';

export const PostsPage = () => {
    const { list, loading, sortOrder, searchQuery } = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    useEffect(() => {
        if (!list) {
            dispatch(getPosts());
        }
    }, [list, dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder]);

    if (loading) {
        return <Container>Loading...</Container>;
    }

    if (!list) {
        return <>404</>;
    }

    const handleSortChange = (order) => {
        dispatch(setSortOrder(order));
    };

    const handleSearchChange = (query) => {
        dispatch(setSearchQuery(query));
    };

    const getFilteredAndSortedPosts = () => {
        let filteredPosts = [...list];

        if (searchQuery) {
            filteredPosts = filteredPosts.filter(post =>
                post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortOrder) {
            const order = sortOrder === 'ASC' ? 1 : sortOrder === 'DESC' ? -1 : 0;
            filteredPosts.sort((a, b) =>
                order === 0 ? 0 : order * a.title.localeCompare(b.title)
            );
        }

        return filteredPosts;
    };

    const filteredAndSortedPosts = getFilteredAndSortedPosts();

    const totalPosts = filteredAndSortedPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const validCurrentPage = Math.min(currentPage, totalPages);
    const indexOfLastPost = validCurrentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <Container>
            <div>
                <input
                    type="text"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Поиск по названию"
                />
                <select onChange={(e) => handleSortChange(e.target.value)} defaultValue="none">
                    <option value="none">none</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
            </div>
            {loading ? (
                <Typo>Loading...</Typo>
            ) : (
                <>
                    {currentPosts.length > 0 ? (
                        <>
                            <Typo>Публикации</Typo>
                            <Posts posts={currentPosts} />
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </>
                    ) : (
                        <Typo>Публикации не найдены</Typo>
                    )}
                </>
            )}
        </Container>
    );
};
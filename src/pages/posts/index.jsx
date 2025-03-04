// import React, { useEffect, useState } from 'react';
// import { Posts } from "../../components/Posts";
// import { Container } from "../../components/ui/Container";
// import { Input } from "../../components/ui/Input"
// import { Typo } from "../../components/ui/Typo";
// import { useDispatch, useSelector } from "react-redux";
// import { getPosts, setSearchQuery, setSortOrder } from '../../redux/slices/postsSlice';
// import { Pagination } from '../../components/Pagination';
// import { Loader } from '../../components/ui/Loader';
// import * as SC from './styles'


// export const PostsPage = () => {
//     const { list, loading, sortOrder, searchQuery } = useSelector((state) => state.posts.posts);
//     const dispatch = useDispatch();

//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 12;

//     useEffect(() => {
//         if (!list) {
//             dispatch(getPosts());
//         }
//     }, [list, dispatch]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchQuery, sortOrder]);

//      if (loading) {
//         return <Loader />;
//     } 

//     if (!list) {
//         return <>404</>;
//     }

//     const handleSortChange = (order) => {
//         dispatch(setSortOrder(order));
//     };

//     const handleSearchChange = (query) => {
//         dispatch(setSearchQuery(query));
//     };

//     const getFilteredAndSortedPosts = () => {
//         let filteredPosts = [...list];

//         if (searchQuery) {
//             filteredPosts = filteredPosts.filter(post =>
//                 post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }

//         if (sortOrder) {
//             const order = sortOrder === 'ASC' ? 1 : sortOrder === 'DESC' ? -1 : 0;
//             filteredPosts.sort((a, b) =>
//                 order === 0 ? 0 : order * a.title.localeCompare(b.title)
//             );
//         }

//         return filteredPosts;
//     };

//     const filteredAndSortedPosts = getFilteredAndSortedPosts();

//     const totalPosts = filteredAndSortedPosts.length;
//     const totalPages = Math.ceil(totalPosts / postsPerPage);

//     const validCurrentPage = Math.min(currentPage, totalPages);
//     const indexOfLastPost = validCurrentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost);

//         return (
//             <Container>
//                 <SC.Wrapper>
//                     <Input
//                         type="text"
//                         onChange={(e) => handleSearchChange(e.target.value)}
//                         placeholder="Поиск по названию"
//                     />
//                     <select onChange={(e) => handleSortChange(e.target.value)} defaultValue="none">
//                         <option value="none">-</option>
//                         <option value="ASC">ASC</option>
//                         <option value="DESC">DESC</option>
//                     </select>
//                 </SC.Wrapper>
//                 {currentPosts.length > 0 ? (
//                     <>
//                         <Typo>Публикации</Typo>
//                         <Posts posts={currentPosts} />
//                         <Pagination
//                             totalPages={totalPages}
//                             currentPage={currentPage}
//                             onPageChange={(page) => setCurrentPage(page)}
//                         />
//                     </>
//                 ) : (
//                     <Typo>Публикации не найдены</Typo>
//                 )}
//             </Container>
//         );
//     };

import React, { useEffect, useState } from 'react';
import { Posts } from "../../components/Posts";
import { Container } from "../../components/ui/Container";
import { Input } from "../../components/ui/Input";
import { Typo } from "../../components/ui/Typo";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setSearchQuery, setSortOrder } from '../../redux/slices/postsSlice';
import { Pagination } from '../../components/Pagination';
import { Loader } from '../../components/ui/Loader';
import { useLocation } from 'react-router-dom';
import * as SC from './styles';

export const PostsPage = () => {
    const { list, loading, sortOrder, searchQuery } = useSelector((state) => state.posts.posts);
    const dispatch = useDispatch();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    useEffect(() => {
        if (!list) {
            dispatch(getPosts());
        }

        if (location.pathname === '/posts') {
            resetFiltersAndPagination();
        }
    }, [list, dispatch, location.pathname]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, sortOrder]);

    const resetFiltersAndPagination = () => {
        dispatch(setSearchQuery(''));
        dispatch(setSortOrder('none'));
        setCurrentPage(1);
    };

    if (loading) {
        return <Loader />;
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
    const currentPosts = filteredAndSortedPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    return (
        <Container>
            <SC.Wrapper>
                <Input
                    type="text"
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Поиск по названию"
                />
                <select onChange={(e) => handleSortChange(e.target.value)} defaultValue="none">
                    <option value="none">-</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>
            </SC.Wrapper>
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
        </Container>
    );
};

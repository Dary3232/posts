export const postsAPI = {
  fetchPosts(page = 1, limit = 10, sortOrder = 'none', searchQuery = '') {
    let sortParam = '';
    
    if (sortOrder === 'ASC') {
        sortParam = '_sort=title&_order=asc'; 
    } else if (sortOrder === 'DESC') {
        sortParam = '_sort=title&_order=desc'; 
    } else {
        sortParam = '_sort=id&_order=desc'; 
    }

    const searchParam = searchQuery ? `&q=${searchQuery}` : '';
    
    return fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}&${sortParam}${searchParam}`)
        .then((response) => {
            const totalPosts = response.headers.get('x-total-count'); 
            return response.json().then(posts => ({ posts, totalPosts }));
        });
},
 
  fetchFreshPosts(limit = 3) {
    try {
        return fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_sort=id&_order=desc`)
        .then((response) => response.json())
        .then((posts) => posts);
    } catch (ex) {
      console.log(ex);
    }
  },
  fetchById(id) {
    try {
      if (!id) {
        throw new Error("Id is broken");
      }
      return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((post) => post);
    } catch (ex) {
      console.log(ex);
    }
  },
};

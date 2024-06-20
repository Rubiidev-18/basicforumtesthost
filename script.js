document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('post-form');
    const postContent = document.getElementById('post-content');
    const postsContainer = document.getElementById('posts-container');

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const content = postContent.value.trim();
        if (content === '') {
            alert('Please enter some content.');
            return;
        }

        const date = new Date();
        const timestamp = date.toISOString();

        const post = {
            content: content,
            timestamp: timestamp
        };

        savePost(post);
        displayPosts();
        postContent.value = '';
    });

    function savePost(post) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function displayPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];

        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p>${post.content}</p>
                <small>${post.timestamp}</small>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    displayPosts();
});

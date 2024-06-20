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
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/save-post', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(post));
    }

    function displayPosts() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/posts/all', true);

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 400) {
                const posts = JSON.parse(xhr.responseText);
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
            } else {
                console.error('Failed to load posts');
            }
        };

        xhr.send();
    }

    displayPosts();
});

import  { useEffect, useState } from 'react';
import axios from 'axios';

function LandingPage() {
    const [posts, setPosts] = useState([]);
    const [notification, setNotification] = useState('');
    useEffect(() => {
        async function fetchPosts() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3003/allpost', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                console.log(response.data.posts)
                setPosts(response.data.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, []);
    console.log("123")
    console.log(notification);
    // listening for notifications via SSE
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3003/sse/notifications');
        eventSource.onmessage = (event) => {
            const { message } = JSON.parse(event.data);
            setNotification(message);
            console.log(notification)
            console.log(message)
        };
    }, [notification]);


    async function handleLike(postId) {
        try {
            await axios.put('http://localhost:3003/like', { postId });
            // Refresh posts after liking
            const response = await axios.get('http://localhost:3003/allpost');
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    }

    return (
        <div>
            <h1>Posts</h1>
            {/* {notification && <div>{notification}</div>} */}
            {posts.map(post => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p>Author: {post.postedBy.name}</p>
                    <p>Likes: {post.likes.length}</p>
                    <button onClick={() => handleLike(post._id)}>Like</button>
                </div>
            ))}
        </div>
    );
}

export default LandingPage;

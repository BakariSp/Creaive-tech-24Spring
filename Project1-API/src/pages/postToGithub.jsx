import React from 'react';

const PostToGithub = () => {
    const handleSubmit = () => {
        fetch('https://521e-8-3-223-60.ngrok-free.app/github', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => console.log(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
    };

    return (
    <div>
        <button onClick={handleSubmit}>Post to GitHub</button>
    </div>
    );
};

export default PostToGithub;

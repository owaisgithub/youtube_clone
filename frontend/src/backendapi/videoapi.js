export class VideoService {
    async getVideos() {
        return fetch('http://localhost:8000/api/v1/videos/all-videos',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());
    }

    async getVideo(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/get-video/${videoId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async getViews(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/get-views/${videoId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async postView(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/update-views/${videoId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async uploadVideo(video) {
        return fetch('http://localhost:8000/api/v1/videos/upload-video',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: video
        }).then(res => res.json());
    }

    async getComments(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/get-comments/${videoId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async postComment(videoId, comment) {
        return fetch(`http://localhost:8000/api/v1/videos/comment/${videoId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                'comment': comment
            })
        }).then(res => res.json());
    }

    async getVideoLikes(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/likes/${videoId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async likeVideo(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/like-video/${videoId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async unlikeVideo(videoId) {
        return fetch(`http://localhost:8000/api/v1/videos/unlike-video/${videoId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    // async getSubscribeChannelsListOfCurrentUser() {
    //     return fetch(`http://localhost:8000/api/v1/videos/get-subscribe-channels-list-of-current-user`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     }).then(res => res.json());
    // }

    // async getChannel(channelName) {
    //     return fetch(`http://localhost:8000/api/v1/videos/channel/${channelName}`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //         }
    //     }).then(res => res.json());
    // }

    async getVideosOfChannel(channelId) {
        return fetch(`http://localhost:8000/api/v1/videos/get-videos-of-channel/${channelId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }
}

const videoService = new VideoService();

export default videoService;
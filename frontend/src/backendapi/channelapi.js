class ChannelService {
    async createChannel(data) {
        return fetch('http://localhost:8000/api/v2/channels/create-channel', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: data
        }).then(res => res.json());
    }

    async getChannelDetails() {
        return fetch('http://localhost:8000/api/v2/channels/get-channel-details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async getChannelDetailsById(channelId) {
        return fetch(`http://localhost:8000/api/v2/channels/get-channel-details-by-id/${channelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async getSubscribers(channelId) {
        return fetch(`http://localhost:8000/api/v2/subscribers/get-subscribers/${channelId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async subscribeChannel(channelId) {
        return fetch(`http://localhost:8000/api/v2/subscribers/subscribe-channel/${channelId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async unsubscribeChannel(channelId) {
        return fetch(`http://localhost:8000/api/v2/subscribers/unsubscribe-channel/${channelId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async getSubscribeChannelsListOfCurrentUser() {
        return fetch(`http://localhost:8000/api/v2/subscribers/get-subscribe-channels-list-of-current-user`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json());
    }

    async uploadChannelBackgroundImage(formData) {
        return fetch('http://localhost:8000/api/v2/channels/upload-channel-background-image', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: formData
        }).then(res => res.json());
    }

    async uploadChannelAvatarImage(formData) {
        return fetch('http://localhost:8000/api/v2/channels/upload-channel-avatar-image', {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: formData
        }).then(res => res.json());
    }

    async changeChannelName(channelName) {
        return fetch('http://localhost:8000/api/v2/channels/change-channel-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                'channelName': channelName
            })
        }).then(res => res.json());
    }
}

const channelService = new ChannelService();

export default channelService;
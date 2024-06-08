import axiosInstance from './axios';

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
        try {
            const response = await axiosInstance.get('/channels/get-channel-details')
            return response.data;
            // .then((res) => {
            //     console.log(res.data);
            // })
            // .catch((err) => {
            //     console.log(err.response);
            // });
            // console.log(res);
            // return axiosInstance.get('/channels/get-channel-details')
            // .then(res => res);
            // return res.data;
        } catch (error) {
            return error.response.data;
        }
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
        try {
            const response = await axiosInstance.get(`/subscribers/get-subscribe-channels-list-of-current-user`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
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
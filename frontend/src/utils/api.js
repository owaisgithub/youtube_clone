let url = "http://localhost:8000/api/v1/videos";

const getVideos = () => {
    return axios.get(url + 'get-videos');
}

export {
    getVideos
}
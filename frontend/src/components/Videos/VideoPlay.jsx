import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



const VideoPlay = () => {
    const videoId = useParams('id')
    
    const [video, setVideo] = useState({})
    const [videoLoading, setVideoLoading] = useState(true)
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true)

    const addComment = async (e) => {
        e.preventDefault()
        console.log(e.target.elements.comment.value)
        const newComment = {
            comment: e.target.elements.comment.value,
            userId: 1
        }
        const result = await fetch(`http://localhost:8000/api/v1/videos/comment/${video.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
        const data = await result.json()
        console.log(data)
        e.target.elements.comment.value = ''
        setCommentsLoading(!commentsLoading)
    }

    useEffect(() => {
        const videoData = async () => {
            try {
                const result = await fetch(`http://localhost:8000/api/v1/videos/get-video/${videoId.id}`)
                const data = await result.json()
                setVideo(data.data)
                console.log(data)
            } catch (error) {
                console.log("Error getting video", error)
            } finally {
                setVideoLoading(false)
            }
        }
        videoData()
    }, [])

    useEffect(() => {
        const commentData = async () => {
            try {
                const result = await fetch(`http://localhost:8000/api/v1/videos/get-comments/${videoId.id}`)
                const data = await result.json()
                setComments(data.data)
                console.log(data)
            } catch (error) {
                console.log("Error getting comments", error)
            }
        }
        commentData()
    }, [commentsLoading])

    return (
        <div className="container-fluid">
            {videoLoading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ): (
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <video controls className="w-100 rounded-4">
                        <source src={video?.videoUrl} type="video/mp4" />
                        {/* Add additional source tags for different video formats if needed */}
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-title">
                        <h3>{video?.title}</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <img className="profile-img" src={video?.user?.avatar} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className="fw-bold">{video?.user?.username}</div>
                            <div className="text-secondary subscriber-text">{video?.subscribers} Subscribers</div>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-secondary rounded-pill">Subscribe</button>
                        </div>
                    </div>
                    <div className="text-bg-secondary rounded-2 my-2 p-2">
                        <div className="fw-bold subscriber-text">
                            <span>{video?.views} Views</span>
                            <span className="mx-4">{video?.createdAt} </span>
                            <div>
                                {video?.description}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 mb-5 pb-5">
                        <h4 className="display-7 fw-bold">{comments.length} Comments</h4>
                        <div className="row">
                            <div className="col-md-1">
                                <img className="profile-img" src="/photo.jpg" alt="" />
                            </div>
                            <div className="col-md-10 mx-2">
                                <form onSubmit={addComment}>
                                    <input className="comment-form" type="text" name="comment" placeholder="Add a comment..." />
                                </form>
                            </div>
                        </div>
                        <div className="mt-4">
                            {comments.map((comment, index ) => (
                                <div className="row" key={comment?.id}>
                                <div className="col-md-1">
                                    <img className="profile-img" src={comment?.user?.avatarUrl} alt="" />
                                </div>
                                <div className="col-md-10 mx-2">
                                    <p>{comment?.comment}</p>
                                    <p>{comment.createdAt}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    ndnjcjdhjn
                </div>
            </div>
            )}
        </div>
    )
}

export default VideoPlay
import { Link } from 'react-router-dom'
import { secondsToTime } from '../../utils/timeConversion'


const Video = ({ video }) => {

    let displayTitle = ""
    if (video.title.length > 60) {
        displayTitle = video.title.substring(0, 60) + "..."
    } else {
        displayTitle = video.title
    }


    return (
        <Link to={`/video/${video.id}`}>
            <div className="card-video">
                <div className="video-img-container">
                    <img className="video-thumbnail" src={video.thumbnailUrl} />
                    <div className="bottom-left">{secondsToTime(video.duration)}</div>
                </div>
                <div className="video-info">
                    <div className="video-profile-left">
                        <img className="profile-img" src={video.user.avatar} alt="" />
                    </div>
                    <div className="video-profile-right">
                        <div className="video-title text-dark">
                            <span>{displayTitle}</span>
                        </div>
                        <div className="channel-title">
                            <span>{video.user.username}</span>
                        </div>
                        <div className="channel-title">
                            <span>{video.views} views | {video.createdAt}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Video
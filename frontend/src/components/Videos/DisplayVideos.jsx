import Video from "./Video"

import '../../static/css/videos.css'
import { useEffect, useState } from "react"

const DisplayVideos = () => {
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('http://localhost:8000/api/v1/videos/all-videos')
                const data = await response.json()
                setVideos(data.data)
                console.log(data.data)
                console.log(typeof data)
            } catch (error) {
                console.log('Error fetching videos', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <main className="col-md-10 ms-sm-auto col-lg-10">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div className="row">
                    {videos.map((video) => (
                        <div className="col-md-4" key={video.id}>
                            <Video video={video} />
                        </div>
                    ))}
                </div>
            )}
            {/* // <Video video={}/> */}
        </main>
    )
}


export default DisplayVideos
import { ThumbsUp, ThumbsDown, Share2, User, X } from "lucide-react"
import "./VideoPlayer.css"

const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null

  const { id, snippet } = video

  return (
    <div className="video-player">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${id.videoId}`}
          title={snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-info">
        <div className="video-header">
          <h1 className="video-title">{snippet.title}</h1>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="video-stats">
          <div className="channel-info">
            <div className="channel-avatar">
              <User size={24} />
            </div>
            <span className="channel-name">{snippet.channelTitle}</span>
          </div>
          <div className="video-actions">
            <button className="action-button">
              <ThumbsUp size={20} />
              <span>Like</span>
            </button>
            <button className="action-button">
              <ThumbsDown size={20} />
              <span>Dislike</span>
            </button>
            <button className="action-button">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>
        </div>
        <div className="video-description">
          <p>{snippet.description}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer


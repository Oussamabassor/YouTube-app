import React, { useState, useEffect, useCallback } from "react"
import { Play, Clock, Share2, User, RefreshCw } from "lucide-react"
import axios from "axios"
import LoadingAnimation from "./LoadingAnimation"
import "./VideoFeed.css"

const API_KEY = "AIzaSyBGRO1Hg_HXn7vVxc6yH6YjWbKD3h0CA9g"
const BASE_URL = "https://www.googleapis.com/youtube/v3"

// Programming Language News Channels and Topics
const PROGRAMMING_LANGUAGE_QUERIES = [
  "JavaScript latest news",
  "Python programming updates",
  "React.js conference",
  "Rust programming language",
  "TypeScript ecosystem",
  "Go language developments",
  "Web development trends",
  "Coding interview insights",
  "Software engineering news",
  "Open source programming"
]

const fetchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        q: query,
        key: API_KEY,
        type: "video",
        maxResults: 10,
        order: "relevance",
        safeSearch: "moderate"
      },
    })
    return response.data.items
  } catch (error) {
    console.error("Error fetching videos:", error)
    return []
  }
}

const VideoFeed = ({ 
  onVideoSelect, 
  isSidebarExpanded, 
  searchQuery 
}) => {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentQuery, setCurrentQuery] = useState(null)

  const loadVideos = useCallback(async (query) => {
    setIsLoading(true)
    setError(null)
    try {
      // If no specific query, randomly select from programming language queries
      const finalQuery = query || 
        PROGRAMMING_LANGUAGE_QUERIES[
          Math.floor(Math.random() * PROGRAMMING_LANGUAGE_QUERIES.length)
        ]
      
      setCurrentQuery(finalQuery)
      const fetchedVideos = await fetchVideos(finalQuery)
      setVideos(fetchedVideos)
    } catch (err) {
      setError("Failed to load videos. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadVideos(searchQuery)
  }, [searchQuery, loadVideos])

  const handleRefresh = () => {
    loadVideos(null)  // Trigger random query
  }

  const handleShareVideo = (video, e) => {
    e.stopPropagation()
    const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`
    
    if (navigator.share) {
      navigator.share({
        title: video.snippet.title,
        text: "Check out this interesting video!",
        url: videoUrl
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(videoUrl)
      alert("Video link copied to clipboard!")
    }
  }

  const handleWatchLater = (video, e) => {
    e.stopPropagation()
    const watchLaterVideos = JSON.parse(localStorage.getItem('watchLater') || '[]')
    
    if (!watchLaterVideos.some(v => v.id.videoId === video.id.videoId)) {
      watchLaterVideos.push(video)
      localStorage.setItem('watchLater', JSON.stringify(watchLaterVideos))
      alert("Video added to Watch Later!")
    } else {
      alert("Video already in Watch Later!")
    }
  }

  if (isLoading) return <LoadingAnimation />
  if (error) return <div className="error">{error}</div>

  return (
    <main 
      className={`video-feed ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}
    >
      {/* <div className="video-feed-header">
        <h2 className="current-query">
          {currentQuery || "Programming Language News"}
        </h2>
        <button 
          className="refresh-btn" 
          onClick={handleRefresh}
          title="Refresh Videos"
        >
          <RefreshCw size={20} />
        </button>
      </div> */}
      
      <div className="video-grid">
        {videos.map((video) => (
          <article 
            key={video.id.videoId} 
            className="video-card" 
            onClick={() => onVideoSelect(video)}
          >
            <div className="thumbnail-container">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                loading="lazy"
              />
              <div className="video-overlay">
                <Play className="play-icon" size={48} />
              </div>
              <div className="video-actions">
                <button
                  className="action-btn"
                  onClick={(e) => handleWatchLater(video, e)}
                >
                  <Clock size={20} />
                </button>
                <button
                  className="action-btn"
                  onClick={(e) => handleShareVideo(video, e)}
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="video-info">
              <div className="channel-avatar">
                <User size={24} />
              </div>
              <div className="video-details">
                <h3 className="video-title">
                  {video.snippet.title.length > 60 
                    ? `${video.snippet.title.slice(0, 60)}...` 
                    : video.snippet.title}
                </h3>
                <p className="channel-name">{video.snippet.channelTitle}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default VideoFeed
import React from 'react';

const VideoList = ({ videos, onVideoClick }) => {
    return (
        <div className="video-list">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div
                        key={video.id.videoId}
                        className="video-item"
                        onClick={() => onVideoClick(video.id.videoId)}
                    >
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className="video-thumbnail"
                        />
                        <h3 className="video-title">{video.snippet.title}</h3>
                    </div>
                ))
            ) : (
                <div className="loading">Loading videos...</div>
            )}
        </div>
    );
};

export default VideoList;

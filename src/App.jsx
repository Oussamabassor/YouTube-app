import React, { useState } from 'react';
import { fetchVideos } from './YoutubeApi';
import VideoList from './Videolist';
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSearch = async () => {
    const fetchedVideos = await fetchVideos(query);
    setVideos(fetchedVideos);
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId); // Set the selected video when thumbnail is clicked
  };

  return (
    <div className="app-container">
      <div className="searchbar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for videos"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="selected-video">
        {selectedVideo && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-button" onClick={() => setSelectedVideo(null)}>
                &times;
              </button>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      <div className="video-list-container">
        <VideoList videos={videos} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
};

export default App;

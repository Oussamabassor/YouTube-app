import { useState } from "react"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import VideoFeed from "./components/VideoFeed"
import VideoPlayer from "./components/VideoPlayer"
import "./App.css"

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setSelectedVideo(null)
  }

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded)
  }

  const handleVideoSelect = (video) => {
    setSelectedVideo(video)
  }

  return (
    <div className={`app ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar toggleDarkMode={toggleDarkMode} onSearch={handleSearch} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Sidebar isExpanded={isSidebarExpanded} />
        <div className={`content-area ${isSidebarExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`}>
          {selectedVideo ? (
            <VideoPlayer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
          ) : (
            <VideoFeed
              onVideoSelect={handleVideoSelect}
              isSidebarExpanded={isSidebarExpanded}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App


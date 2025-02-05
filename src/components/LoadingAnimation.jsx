import "./LoadingAnimation.css"

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <svg className="loading-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="loading-circle" cx="50" cy="50" r="45" />
      </svg>
      <div className="loading-text">Searching for amazing content...</div>
    </div>
  )
}

export default LoadingAnimation


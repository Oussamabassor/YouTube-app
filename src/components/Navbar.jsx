import { useState } from "react"
import { Menu, Search, Moon, Sun, User } from "lucide-react"
import "./Navbar.css"

const Navbar = ({ toggleDarkMode, onSearch, toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    toggleDarkMode()
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="icon-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="navbar-logo">YourTube</div>
      </div>
      <form className="navbar-search" onSubmit={handleSearch}>
        <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="submit">
          <Search size={20} />
        </button>
      </form>
      <div className="navbar-actions">
        <button className="icon-button" onClick={handleToggleDarkMode}>
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className="sign-in-button">
          <User size={20} />
          <span>Sign In</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar


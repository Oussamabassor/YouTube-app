import { Home, TrendingUp, Users, Library, History, List, ThumbsUp, Clock, Settings } from "lucide-react"
import "./Sidebar.css"

const Sidebar = ({ isExpanded }) => {
  const categories = [
    { name: "Home", icon: Home },
    { name: "Trending", icon: TrendingUp },
    { name: "Subscriptions", icon: Users },
    { name: "Library", icon: Library },
    { name: "History", icon: History },
    { name: "Playlists", icon: List },
    { name: "Liked Videos", icon: ThumbsUp },
    { name: "Watch Later", icon: Clock },
  ]

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <nav>
        <ul className="sidebar-categories">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <li key={category.name}>
                <a href={`#${category.name.toLowerCase().replace(" ", "-")}`} className="sidebar-link">
                  <IconComponent size={20} />
                  <span className="link-text">{category.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <a href="#settings" className="sidebar-link">
          <Settings size={20} />
          <span className="link-text">Settings</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar


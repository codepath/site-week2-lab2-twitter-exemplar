import "./Navbar.css"

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <ul className="links flex-v-center">
          <li className="active">
            <i className="fas fa-home"></i>
            <span> Home</span>
          </li>
          <li>
            <i className="fas fa-bolt"></i>
            <span> Moments</span>
          </li>
          <li>
            <i className="far fa-bell"></i>
            <span> Notifications</span>
          </li>
          <li>
            <i className="far fa-envelope"></i>
            <span> Messages</span>
          </li>
        </ul>

        <div className="bird flex-v-center">
          <i className="fab fa-twitter"></i>
        </div>

        <div className="search flex-v-center">
          <input placeholder="Search Twitter" />
          <i className="fas fa-search"></i>
        </div>

        <div className="actions flex-v-center">
          <span className="avatar fa-stack flex-v-center">
            <i className="fas fa-circle fa-stack-2x">
              <i className="fas fa-user fa-stack-1x"></i>
            </i>
          </span>

          <button>Tweet</button>
        </div>
      </div>
    </div>
  )
}

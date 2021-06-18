import "./UserProfile.css"

function UserProfile({ user }) {
  return (
    <div className="col user-profile">
      <div className="user-info">
        <div className="card-top"></div>
        <div className="card-mid">
          <span className="fa-stack ">
            <i className="fas fa-camera fa-stack-2x">
              <i className="fas fa-plus fa-stack-1x"></i>
            </i>
          </span>
          <div className="twitter-handle">
            <h3>{user.name}</h3>
            <p>@{user.handle}</p>
          </div>
        </div>
        <div className="card-bottom">
          <p>Tweets</p>
          <p>Followers</p>
          <h3>{user.numTweets}</h3>
          <h3>{user.numFollowers}</h3>
        </div>
      </div>
    </div>
  )
}

export default UserProfile

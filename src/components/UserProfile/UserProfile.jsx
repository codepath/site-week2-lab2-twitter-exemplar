import * as React from "react"
import { formatNumTweets, formatNumFollowers } from "../../utils/format"
import "./UserProfile.css"

export default function UserProfile({ userProfile }) {
  return (
    <div className="col user-profile">
      <div className="card">
        <div className="card-bg" />
        <CardContent name={userProfile.name} handle={userProfile.handle} />
        <CardFooter numTweets={userProfile.numTweets} numFollowers={userProfile.numFollowers} />
      </div>
    </div>
  )
}

export function CardContent(props) {
  return (
    <div className="card-content">
      <span className="fa-stack add-picture-icon">
        <i className="fas fa-camera fa-stack-2x">
          <i className="fas fa-plus fa-stack-1x"></i>
        </i>
      </span>
      <div className="twitter-handle">
        <h3>{props.name}</h3>
        <p>@{props.handle}</p>
      </div>
    </div>
  )
}

export function CardFooter(props) {
  return (
    <div className="card-footer">
      <p>Tweets</p>
      <p>Followers</p>
      <span className="metric">{props.numTweets ? formatNumTweets(props.numTweets) : null}</span>
      <span className="metric">{props.numFollowers ? formatNumFollowers(props.numFollowers) : null}</span>
    </div>
  )
}

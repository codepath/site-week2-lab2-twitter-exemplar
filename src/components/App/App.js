import { useState } from "react"
import Feed from "../Feed/Feed"
import Navbar from "../Navbar/Navbar"
import UserProfile from "../UserProfile/UserProfile"
import Advertisements from "../Advertisements/Advertisements"
import "./App.css"

const defaultUserProfile = {
  name: "Code Path",
  handle: "codepath",
  numTweets: "1.2k",
  numFollowers: "2.5m",
}

export default function App({ userProfile = defaultUserProfile }) {
  const [tweets, setTweets] = useState([])

  const addTweet = (newTweet) => {
    setTweets((oldTweets) => [
      ...oldTweets,
      { ...newTweet, id: oldTweets.length, name: userProfile.name, handle: userProfile.handle },
    ])
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <UserProfile user={userProfile} />
        <Feed tweets={tweets} addTweet={addTweet} />
        <Advertisements />
      </main>
    </div>
  )
}

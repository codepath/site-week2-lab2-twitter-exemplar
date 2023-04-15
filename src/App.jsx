import { useState } from "react"
import Feed from "./components/Feed/Feed"
import Navbar from "./components/Navbar/Navbar"
import UserProfile from "./components/UserProfile/UserProfile"
import Advertisements from "./components/Advertisements/Advertisements"
import { codepathUserProfile, firstTweet, navLinks } from "./constants"

export default function App() {
  const [userProfile, setUserProfile] = useState(codepathUserProfile)
  const [tweets, setTweets] = useState([firstTweet])
  const [tweetText, setTweetText] = useState("")

  return (
    <div className="app">
      <Navbar navLinks={navLinks} />
      <main>
        <UserProfile userProfile={userProfile} setUserProfile={setUserProfile} />
        <Feed
          tweets={tweets}
          setTweets={setTweets}
          userProfile={userProfile}
          tweetText={tweetText}
          setTweetText={setTweetText}
        />
        <Advertisements />
      </main>
    </div>
  )
}

import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

export default function TweetBox({ setTweets, userProfile, tweetText = "", setTweetText }) {
  const [isFocused, setIsFocused] = React.useState(false)

  const handleOnTweetTextChange = (event) => {
    setTweetText(event.target.value)
  }

  const handleOnSubmit = () => {
    const newTweet = {
      name: userProfile?.name,
      handle: userProfile?.handle,
      text: tweetText,
      comments: 0,
      retweets: 0,
      likes: 0,
    }
    setTweets((oldTweets) => [...oldTweets, { ...newTweet, id: oldTweets.length }])
    setTweetText("")
  }

  const charactersLeft = 140 - tweetText.length
  const isDisabled = tweetText.length === 0 || tweetText.length > 140
  const isExpanded = isFocused || tweetText.length

  return (
    <div className="tweet-box">
      <TweetInput
        value={tweetText}
        handleOnChange={handleOnTweetTextChange}
        isExpanded={isExpanded}
        setIsFocused={setIsFocused}
      />

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        {/* ADD TWEET CHARACTER COUNT COMPONENT HERE */}
        <TweetCharacterCount tweetText={tweetText} charactersLeft={charactersLeft} />
        <TweetSubmitButton isDisabled={isDisabled} handleOnSubmit={handleOnSubmit} />
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {
  const { tweetText, charactersLeft } = props
  // ADD CODE HERE
  // return <span></span>
  const className = tweetText.length > 0 ? "red" : ""
  return <span className={`tweet-length ${className}`}>{tweetText.length > 0 ? charactersLeft : ""}</span>
}

export function TweetSubmitButton({ isDisabled, handleOnSubmit }) {
  return (
    <div className="submit">
      <i className="fas fa-plus-circle"></i>
      <button className="tweet-submit-button" disabled={isDisabled} onClick={handleOnSubmit}>
        Tweet
      </button>
    </div>
  )
}

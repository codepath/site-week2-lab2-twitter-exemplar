import { useState } from "react"
import "./TweetInput.css"

export default function TweetInput({ addTweet, handle }) {
  const [tweetText, setTweetText] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleOnTweetTextChange = (event) => {
    setTweetText(event.target.value)
  }

  const handleOnSubmit = () => {
    addTweet({ handle, text: tweetText })
    setTweetText("")
  }

  const charactersLeft = 140 - tweetText.length
  const isDisabled = tweetText.length === 0 || tweetText.length > 140
  const isExpanded = isFocused || tweetText.length

  return (
    <div className="tweet-container">
      <div className="tweet-box-top row">
        <span className="tweet-avatar fa-stack">
          <i className="fas fa-circle fa-stack-2x">
            <i className="fas fa-user fa-stack-1x"></i>
          </i>
        </span>

        <textarea
          name="new-tweet"
          type="text"
          onChange={handleOnTweetTextChange}
          onBlur={(e) => setIsFocused(false)}
          onFocus={(e) => setIsFocused(true)}
          value={tweetText}
          placeholder="What's Happening?"
          className={isExpanded ? "expanded" : ""}
        ></textarea>

        {isExpanded ? <i className="fas fa-smile"></i> : <i className="fas fa-image"></i>}
      </div>
      <div className=" row tweet-extras">
        <div className="icon-set">
          <i className="fas fa-image"></i>
          <i className="icon-gif">GIF</i>
          <i className="far fa-chart-bar"></i>
          <i className="fas fa-map-marker-alt"></i>
        </div>
        {tweetText.length ? (
          <span className={`tweet-length ${charactersLeft < 0 ? "red" : ""}`}>{charactersLeft}</span>
        ) : (
          <span className={`tweet-length`}>&nbsp;</span>
        )}
        <div className="submit">
          <i className="fas fa-plus-circle"></i>
          <button className="submit-button" disabled={isDisabled} onClick={handleOnSubmit}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

import * as React from "react"
import AvatarIcon from "../AvatarIcon/AvatarIcon"

export default function TweetInput({ value, handleOnChange, isExpanded, setIsFocused }) {
  return (
    <div className="tweet-textarea">
      <AvatarIcon />

      <textarea
        name="new-tweet-input"
        type="text"
        onChange={handleOnChange}
        onBlur={(e) => setIsFocused(false)}
        onFocus={(e) => setIsFocused(true)}
        value={value}
        placeholder="What's Happening?"
        className={isExpanded ? "expanded" : ""}
      ></textarea>

      {isExpanded ? <SmileIcon /> : <ImageIcon />}
    </div>
  )
}

export const SmileIcon = () => <i className="fas fa-smile"></i>
export const ImageIcon = () => <i className="fas fa-image"></i>

import "./Tweet.css"

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <div className="tweet-left">
        <span className="tweet-avatar fa-stack">
          <i className="fas fa-circle fa-stack-2x">
            <i className="fas fa-user fa-stack-1x"></i>
          </i>
        </span>
      </div>

      <div className="tweet-right">
        <div className="tweet-top-meta">
          <div className="tweet-top-name-and-handle">
            <p className="name">{tweet.name}</p>
            <span>&nbsp;@{tweet.handle}&nbsp;</span>
            <span>•&nbsp;</span>
            <span>1 min</span>
          </div>
          <i className="fa fa-angle-down"></i>
        </div>

        <p className="tweet-text">{tweet.text}</p>

        <div className="tweet-bottom-meta">
          <span>
            <i className="fa fa-comment"></i>
            {tweet.comments || 0}
          </span>
          <span>
            <i className="fa fa-retweet"></i>
            {tweet.retweets || 0}
          </span>
          <span>
            <i className="fas fa-heart"></i>
            {formatLikes(tweet.likes)}
          </span>
          <span>
            <i className="fa fa-envelope"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

const formatter = new Intl.NumberFormat("en-US")

const formatLikes = (numLikes) => {
  if (!numLikes) return 0

  if (numLikes >= 10 ** 9) {
    return String(numLikes)[0] + "." + String(numLikes)[1] + String(numLikes)[2] + "b"
  }
  if (numLikes >= 10 ** 8) {
    return String(numLikes)[0] + String(numLikes)[1] + String(numLikes)[2] + "." + String(numLikes)[3] + "m"
  }
  if (numLikes >= 10 ** 7) {
    return String(numLikes)[0] + String(numLikes)[1] + "." + String(numLikes)[2] + "m"
  }
  if (numLikes >= 10 ** 6) {
    return String(numLikes)[0] + "." + String(numLikes)[1] + String(numLikes)[2] + "m"
  }
  if (numLikes >= 10 ** 5) {
    return String(numLikes)[0] + String(numLikes)[1] + String(numLikes)[2] + "." + String(numLikes)[3] + "k"
  }
  if (numLikes >= 10 ** 4) {
    return String(numLikes)[0] + String(numLikes)[1] + "." + String(numLikes)[2] + "k"
  }
  if (numLikes >= 10 ** 3) {
    return String(numLikes)[0] + "." + String(numLikes)[1] + "k"
  }

  return formatter.format(numLikes)
}

export default Tweet

import imgSrc from "../../assets/twitter_delight_prompt_2.png"
import "./Advertisements.css"

export default function Advertisements() {
  return (
    <div className="col advertisements">
      <div className="advert">
        <img src={imgSrc} alt="old twitter" />
        <h3>Sneak a peak at the new Twitter</h3>
        <p>Bookmarks, night mode, data saver, and more — see all the new features coming to the web.</p>
        <button>Take a look</button>
      </div>
    </div>
  )
}

import "./AvatarIcon.css"

export default function AvatarIcon() {
  return (
    <span className="avatar-icon fa-stack">
      <i className="fas fa-circle fa-stack-2x">
        <i className="fas fa-user fa-stack-1x"></i>
      </i>
    </span>
  )
}

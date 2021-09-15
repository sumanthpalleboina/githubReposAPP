import './index.css'

const RepositoryItem = props => {
  const {repoItem} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repoItem
  return (
    <li className="repo-card">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="stars-folks-issues">
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon-style"
          />
          <p className="stars-count">{`${starsCount} stars`}</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon-style"
          />
          <p className="stars-count">{`${forksCount} forks`}</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open-issues"
            className="icon-style"
          />
          <p className="stars-count">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem

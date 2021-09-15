import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    avtiveTabId: languageFiltersData[0].id,
    isLoading: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getReposData()
  }

  getReposData = async () => {
    const {avtiveTabId} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${avtiveTabId}`,
    )
    const data = await response.json()
    console.log(response.status)
    if (response.ok === true) {
      const PopularReposData = {
        PopularRepos: data.popular_repos,
      }
      const {PopularRepos} = PopularReposData
      const updatedReposData = PopularRepos.map(each => ({
        avatarUrl: each.avatar_url,
        name: each.name,
        id: each.id,
        starsCount: each.stars_count,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
      }))
      this.setState({
        reposData: updatedReposData,
        isLoading: false,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  takeActiveId = avtiveTabId => {
    this.setState({avtiveTabId}, this.getReposData)
    console.log(avtiveTabId)
  }

  renderSuccessView = () => {
    const {reposData, isLoading} = this.state
    return isLoading ? (
      <div testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    ) : (
      <ul className="Repos-container">
        {reposData.map(each => (
          <RepositoryItem key={each.id} repoItem={each} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="failure-view-section">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-pic"
      />
      <h1 className="failure-quote">Something Went Wrong</h1>
    </div>
  )

  render() {
    const {apiStatus, avtiveTabId} = this.state
    let view
    if (apiStatus === 'SUCCESS') {
      view = this.renderSuccessView()
    } else {
      view = this.failureView()
    }
    return (
      <div className="app-container">
        <h1 className="papular-heading">Popular</h1>
        <ul className="menu-buttons-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              btnData={each}
              takeActiveId={this.takeActiveId}
              isActive={avtiveTabId === each.id}
            />
          ))}
        </ul>
        {view}
      </div>
    )
  }
}
export default GithubPopularRepos

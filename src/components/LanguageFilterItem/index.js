import './index.css'

const LanguageFilterItem = props => {
  const {btnData, takeActiveId, isActive} = props
  const {language, id} = btnData
  const activeBtnClassName = isActive && 'active-btn-style'
  const sendActiveId = () => {
    takeActiveId(id)
  }
  return (
    <li className="btn-item">
      <button
        type="button"
        className={`${activeBtnClassName} btn-style`}
        onClick={sendActiveId}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

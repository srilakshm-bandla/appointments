// Write your code here

import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {title, isFavorite, date, id} = appointmentDetails

  const x = new Date(date.toString())

  const dateFormat = format(x, 'dd MMMM yyyy, EEEE')

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/star-filled-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/star-outline-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <li className="list-items">
      <div>
        <p className="title">{title}</p>
        <p className="date-format">Date: {dateFormat}</p>
      </div>
      <div>
        <button
          type="button"
          className="favorite-icon-container"
          data-testid="star"
          onClick={onClickFavoriteIcon}
        >
          <img src={starImgUrl} className="favorite-icon" alt="star" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItem

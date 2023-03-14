// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isFilterStarActive: false}

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (id === each.id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  getStarredAppointments = () => {
    this.setState(prevState => ({
      isFilterStarActive: !prevState.isFilterStarActive,
    }))
  }

  render() {
    const {title, appointmentsList, isFilterStarActive} = this.state

    const filteredAppointments = appointmentsList.filter(
      each => each.isFavorite === isFilterStarActive,
    )

    const res = isFilterStarActive ? filteredAppointments : appointmentsList

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <form className="appointments" onSubmit={this.onAddAppointment}>
            <div>
              <label className="label-text" htmlFor="Title">
                TITLE
              </label>
              <br />
              <input
                id="Title"
                placeholder="Title"
                className="input"
                value={title}
                onChange={this.onChangeTitle}
              />
              <br />
              <label className="label-text" htmlFor="date">
                DATE
              </label>
              <br />
              <input
                type="date"
                id="date"
                className="input"
                onChange={this.onChangeDate}
              />
              <br />
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appImage"
              />
            </div>
          </form>

          <hr className="horizontal-line" />
          <div className="appoints-con">
            <h1 className="heading">Appointments</h1>

            <button
              type="button"
              data-testid="star"
              className="starred"
              onClick={this.getStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appoint-list-container">
            {res.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments

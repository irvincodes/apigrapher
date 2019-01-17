import React from 'react'
import PropTypes from 'prop-types'
import Grapher from './grapher.jsx'

class Graph extends React.Component {
  static get propTypes() {
    return {
      graph: PropTypes.object
    }
  }

  componentDidMount() {
    const grapher = new Grapher(this.props.graph)
    grapher.render(this.getEarthquakes(this.props.graph), this.getHolidays(this.props.graph))
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <svg id={`graph-${this.props.graph.id}`}>
          <svg>
            <g id={`points-${this.props.graph.id}`}></g>
            <g id={`lines-${this.props.graph.id}`}></g>
            <g id={`labels-${this.props.graph.id}`}></g>
          </svg>
        </svg>
      </div>
    )
  }

  getEarthquakes(graph) {
    return fetch(`/api/earthquakes?start=${graph.start}&end=${graph.end}`).then((response) => {
      return response.json()
    }).then((data) => {
      return data.features.map((obj) => { return { date: new Date(obj.properties.time), value: obj.properties.mag } })
    })
  }

  getHolidays(graph) {
    return fetch(`/api/holidays?start=${graph.start}&end=${graph.end}`).then((response) => {
      return response.json()
    }).then((data) => {
      return data.map((holiday) => { return { date: new Date(holiday.date), value: holiday.name} })
    })
  }
}

export default Graph
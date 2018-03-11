import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavItem, Nav, Grid, Row, Col, footer} from "react-bootstrap";

let Loading = 'loading';


const PLACES = [
  { name: "Хабаровск", zip: "680000" },
  { name: "Благовещенск", zip: "675000" },
  { name: "Владивосток", zip: "690000" },
  { name: "Южно-Сахалинск", zip: "693000" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state ={
      weatherData: null
    };
  }
    componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
      fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData:json });
      });
    }
    render(){
      const weatherData = this.state.weatherData;
      if (!weatherData) return <div>{Loading}</div>;
      const weather = weatherData.weather[0];
      const iconUrl = "http://openweathermap.org/img/w/"+weather.icon+".png"
      return (
        <div>
        <h1>
        {weather.main}
        <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Температура: {weatherData.main.temp}°</p>
        <p>Мах: {weatherData.main.temp_max}°</p>
        <p>Мин: {weatherData.main.temp_min}°</p>
        <p>Скорость Ветра: {weatherData.wind.speed} м/с </p>
        </div>
      );
}
}


class App extends Component {
  constructor() {
    super();
    this.state ={
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
      <label/>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        Погода на ДВ
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
  <Grid>
    <Row>
      <Col md={3} sm={3}>
        <h3>Выбирите город</h3>
        <Nav
          bsStyle="pills"
          stacked
          activeKey={activePlace}
          onSelect={index => {
            this.setState({ activePlace: index });
          }}
        >
          {PLACES.map((place, index) => (
            <NavItem key={index} eventKey={index}>{place.name}</NavItem>
          ))}
        </Nav>
      </Col>
      <Col md={7} sm={7}>
        <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
      </Col>
    </Row>
  </Grid>
  <Row>
  <Col md={9} sm={4}>
  <Navbar>
  <h3>test</h3>
    </Navbar>
  </Col>
  </Row>
  <footer>, footer</footer>
</div>
    );
  }
}

export default App;

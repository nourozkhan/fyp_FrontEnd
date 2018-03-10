import React from 'react';
import axios from 'axios';
import './App.css';
import logo from './applogo.png'
import bbsul from './logo-design.png'
//import Loading from 'react-loading-components';
import DonutChart from "react-svg-donut-chart"
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

import Paper from 'material-ui/Paper';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      srceen: 'start',
      positivity: 30.0,
      negativity: 70.0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getMainScope = this.getMainScope.bind(this);
    this.getMain = this.getMain.bind(this)
    this.start = this.start.bind(this)
    this.test = this.test.bind(this)
  }

  start(event) {
    this.setState({ srceen: 'form' })
    event.preventDefault();
  }

  handleSubmit(event) {
    console.log(this.state.value)
    this.setState({ srceen: 'stream_loading' })
    axios.get(`http://127.0.0.1:3001/sea/${this.state.value}`)
      .then((response) => {
        console.log(response);
        this.setState({ srceen: 'result' })
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  }

  getMainScope(event) {
    this.setState({ srceen: 'result_loading' })
    axios.get('http://127.0.0.1:3001/main')
      .then((response) => {
        console.log(response);
        var array = response.data.split(",")
        var pos = parseFloat(array[1])
        var neg = parseFloat(array[3])
        this.setState({ positivity: pos, negativity: neg })
        this.setState({ srceen: 'show_graph' })
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  test(event) {
    axios.get('http://127.0.0.1:3001/test')
      .then((response) => {
        console.log(response);
        var array = response.data.split(",")
        var pos = parseFloat(array[1])
        var neg = parseFloat(array[3])
        this.setState({ positivity: pos, negativity: neg })
        this.setState({ srceen: 'show_graph' })
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  getMain(event) {
    axios.get('http://127.0.0.1:3001/')
      .then((response) => {
        console.log(response);
        this.setState({ srceen: 'form' })
      })
      .catch((error) => {
        console.log(error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {

    const sty = {
      margin: 12,
    };
    const paperStyle = {
      height: 'auto',
      width: 400,
      margin: '40 auto',
      textAlign: 'center',
      display: 'inline-block',
      underlineStyle: {
        borderColor: '#006269',
      },
      floatingLabelStyle: {
        color: '#006269',
      },
    };
    const appStyle = {
      backgroundColor: "#B71C1C",
      margin: '0px 0px 40px 0px',
      textAlign: 'center'
    }

    if (this.state.srceen === 'start') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />
          <center>
            <img src={logo} alt="Logo" height='400px' width='700px' />
            <br />
            <RaisedButton
              label="Start"
              style={sty}
              type="submit"
              backgroundColor="#B71C1C"
              labelColor='#ffffff'
              onClick={this.start}
            />
          </center>
        </div>
      );
    }

    if (this.state.srceen === 'form') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />
          <center>
            <Paper style={paperStyle} zDepth={5} >
              <form onSubmit={this.handleSubmit}>
                <h3>Enter Any Name</h3>
                <TextField
                  hintText="Enter any Name" type="text"
                  value={this.state.value} onChange={this.handleChange}
                />
                <br />
                <RaisedButton
                  label="Submit"
                  style={sty}
                  type="submit"
                  backgroundColor="#B71C1C"
                  labelColor='#ffffff'
                />
              </form>
            </Paper>
          </center>

        </div>
      );
    }

    if (this.state.srceen === 'stream_loading') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />
          <center>
            <CircularProgress size={80} thickness={5} color="#B71C1C" />
          </center>
        </div>
      );
    }

    if (this.state.srceen === 'result') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />
          <center>
            <h3>tweets are collected and cleaned</h3>
            <RaisedButton
              label="generate result"
              style={sty}
              type="submit"
              backgroundColor="#B71C1C"
              labelColor='#ffffff'
              onClick={this.getMainScope}
            />
          </center>
        </div>
      );
    }

    if (this.state.srceen === 'result_loading') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />
          <center>
            <CircularProgress size={80} thickness={5} color="#B71C1C" />
          </center>
        </div>
      );
    }

    if (this.state.srceen === 'show_graph') {
      return (
        <div>
          <AppBar
            style={appStyle}
            title="ONLINE OPINION MINNING ANALYSIS"
            iconElementLeft={<img src={logo} alt="Logo" height='50px' width='70px' />}
            iconElementRight={<img src={bbsul} alt="Logo" height='50px' width='70px' />}
          />

          <DonutChart
            data={[
              {
                stroke: '#22594e',
                strokeWidth: 6,
                value: this.state.positivity
              },
              {
                stroke: '#B71C1C',
                value: this.state.negativity
              }
            ]}
            spacing={1}
          />

          <center>
            <RaisedButton
              label="Retry"
              style={sty}
              type="submit"
              backgroundColor="#B71C1C"
              labelColor='#ffffff'
              onClick={this.getMain}
            />
          </center>
        </div>
      );
    }

  }
}

export default App;

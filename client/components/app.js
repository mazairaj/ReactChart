// Entry point for your React app.

import React, { Component, PropTypes } from 'react';
var LineChart = require("react-chartjs-2").Line;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      metrics: null
    }
  }
  componentDidMount() {
    fetch('http://localhost:3000/getMetrics',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: 'https://www.stargazer.co/metrics.js'
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((metrics) => {
      this.setState({metrics: metrics});
    })
  }
  render() {
    var metrics = this.state.metrics;
    if (metrics !== null ) {
      var labelArray = [];
      var dataArray = [];
      metrics.data.forEach((item, i) => {
        var date = new Date(parseInt(item.installtime) )
        if (i % 10 === 0 && i !== 0) {
          labelArray.push(new Date(date.setFullYear(2017)));
          dataArray.push(i+1);
        }
      })
      console.log(labelArray)
      console.log(dataArray)
    }

    var data = {
      labels: labelArray,
      title: {
        text: "Date Time Formatting"
      },
      datasets: [{
        label: 'Installs',
        data: dataArray,
        borderColor: "rgb(248,169,113)",
        backgroundColor: "rgba(0,0,0,0)",
        radius: 0,
        borderWidth: 1,
        pointHitRadius: 5
      }]
    };

    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Number of Install'
      },
      tooltips: {
        mode: 'label'
      },
      hover: {
        mode: 'dataset'
      },
      scales: {
        xAxes: [
          {
            title: "time",
            type: 'time',
            gridLines: {
              lineWidth: 2
            },
            time: {
              unitStepSize: 1000,
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Value'
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 250
            }
          }
        ]
      }
    }

    return (
      <div>
      <LineChart data={data} options={options}/>
      </div>
    );
  }
}



export default App;

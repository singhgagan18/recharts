import React from "react";
import ReactDOM from "react-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush 
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2600, red: 5630
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210, red: 3500,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const color = ["#8884d8", "#82ca9d", "orange", "pink"]

class App extends React.Component {

  state = {
    type: "Line"
  }

  handleChange = (e) => {
    this.setState({type: e.target.value})
  }

  fetchChart = () => {
    const {type} = this.state
    switch(type){
      case "Line": return <MyLineChart key={type}/>
      case "Bar": return <MyBarChart key={type}/>
      case "Stacked": return <MyBarChart stacked key={type}/>
      default: return <MyLineChart />
    }
  }
  render(){
    return (
      <div>
        <select onChange={this.handleChange}>
          <option>Line</option>
          <option>Bar</option>
          <option>Stacked</option>
        </select>
      {this.fetchChart()}
      </div>
    )
  }
}

class MyLineChart extends React.Component {

  getLineChart = () => {
    const keysArr = Object.keys(data[0]).slice(1);
    const lineArr= [];
    keysArr.forEach((item, index)=> {
      lineArr.push(<Line type="monotone" dataKey={item} stroke={color[index]} />)
    })
    return lineArr;
  }

  modifyFormatter = (value, name, props) => {
    const nameJSX = <span><span style={{
      display: "inline-block",
      marginRight: "5px",
      borderRadius: "10px",
      width: "10px",
      height: "10px",
      backgroundColor: props.color
    }}></span>{name} : {value}</span>
    return [nameJSX];
  }

  render() {
    return (
      // <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
          <XAxis dataKey={Object.keys(data[0])[0]} />
          <YAxis />
          <Tooltip formatter={this.modifyFormatter}/>
          <Legend />
        {this.getLineChart()}
        <Brush dataKey={Object.keys(data[0])[0]}>
          <LineChart>
            {this.getLineChart()}
          </LineChart>
        </Brush>
        </LineChart>
      //  </ResponsiveContainer>
    );
  }
}

class MyBarChart extends React.Component {

  getBar = () => {
    const {stacked} = this.props;
    const keysArr = Object.keys(data[0]).slice(1);
    const barArr= [];
    keysArr.forEach((item, index)=> {
      barArr.push(<Bar dataKey={item} stackId={stacked ? "a" : null} fill={color[index]} />)
    })
    return barArr;
  }

  modifyFormatter = (value, name, props) => {
    console.log(value, name , props, "props");
    const nameJSX = <span><span style={{
      display: "inline-block",
      marginRight: "5px",
      borderRadius: "10px",
      width: "10px",
      height: "10px",
      backgroundColor: props.color
    }}></span>{name} : {value}</span>;
    let result = [nameJSX].reverse();
    // console.log(result, "result");
    return result;
  }

  handleSort = (item1, item2) => {
    // console.log(item1, item2);
    return 1;
  }

  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false}/>
        <XAxis dataKey={Object.keys(data[0])[0]} />
        <YAxis />
        <Tooltip formatter={this.modifyFormatter} itemSorter={this.handleSort}/>
        <Legend />
        {this.getBar()}
        <Brush dataKey={Object.keys(data[0])[0]}>
          <BarChart>
            {this.getBar()}
          </BarChart>
        </Brush>
      </BarChart>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

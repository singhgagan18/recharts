import React from "react";
import ReactDOM from "react-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush 
} from 'recharts';

const data = [
  {
    name: 'Flour', threshhold: 4000, forecast: 2400, currentInventory: 2600, Q1Sales: 5630,  Q2Sales: 3400
  },
  {
    name: 'Shampoo', threshhold: 3000, forecast: 1398, currentInventory: 2210, Q1Sales: 3500,  Q2Sales: 56000
  },
  {
    name: 'Cooking oil', threshhold: 2000, forecast: 9800, currentInventory: 2290, Q1Sales: 3500 ,  Q2Sales: 7667
  },
  {
    name: 'Tissues', threshhold: 2780, forecast: 3908, currentInventory: 2000, Q1Sales: 3500,  Q2Sales: 3345
  },
  {
    name: 'Cooking Wine', threshhold: 1890, forecast: 4800, currentInventory: 2181, Q1Sales: 3500,  Q2Sales: 3400
  },
  {
    name: 'Pasta', threshhold: 2390, forecast: 3800, currentInventory: 2500, Q1Sales: 3500,  Q2Sales: 1200
  },
  {
    name: 'Celery', threshhold: 3490, forecast: 4300, currentInventory: 2100, prevSales: 3500,  Q2Sales: 4578
  },
  {
    name: 'Apples', threshhold: 3000, forecast: 1398, currentInventory: 2210, Q1Sales: 3500,  Q2Sales: 56000
   },
  {
    name: 'Banana', threshhold: 2000, forecast: 9800, currentInventory: 2290, Q1Sales: 3500 ,  Q2Sales: 7667
  },
  {
    name: 'Oranges', threshhold: 2780, forecast: 3908, currentInventory: 2000, Q1Sales: 3500,  Q2Sales: 3345
  },
  {
    name: 'Squash', threshhold: 1890, forecast: 4800, currentInventory: 2181, Q1Sales: 3500,  Q2Sales: 3400
  },
  {
    name: 'Cantouloupe', threshhold: 2390, forecast: 3800, currentInventory: 2500, Q1Sales: 3500,  Q2Sales: 1200
  },
  {
    name: 'Brocolli', threshhold: 3490, forecast: 4300, currentInventory: 2100, prevSales: 3500,  Q2Sales: 4578
  },
];

const color = ["#8884d8", "#82ca9d", "orange", "pink"]

class App extends React.Component {

  state = {
    type: "Line",
    records: 10
  }

  handleChange = (e) => {
    this.setState({type: e.target.value})
  }

  handleRecordsChange = (e) => {
    this.setState({records: e.target.value})
  }

  fetchChart = () => {
    const {type, records} = this.state
    switch(type){
      case "Line": return <MyLineChart key={type}/>
      case "Bar": return <MyBarChart key={type} records = {records}/>
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
        <select onChange={this.handleRecordsChange}>
          <option>5</option>
          <option>10</option>
          <option>15</option>
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
    const {stacked, records} = this.props;
    const keysArr = Object.keys(data[0]).slice(1);
    const barArr= [];
    keysArr.forEach((item, index)=> {
      barArr.push(<Bar dataKey={item} stackId={stacked ? "a" : null} fill={color[index]} />)
    })
    return records ? barArr.slice(0, records) : barArr;
    //return barArr;
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
        data={data.slice(0, this.records)}
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

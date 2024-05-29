import React, { Component } from 'react';

class TableauVisualization extends Component {
  constructor(props) {
    super(props);

    this.vizList = [
      "https://public.tableau.com/views/RegionalSampleWorkbook/Flights",
      "https://public.tableau.com/views/RegionalSampleWorkbook/Obesity",
      "https://public.tableau.com/views/RegionalSampleWorkbook/College",
      "https://public.tableau.com/views/RegionalSampleWorkbook/Stocks",
      "https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
    ];

    this.state = {
      vizCount: 0,
      vizSrc: this.vizList[0]
    };
  }

  handleFirstInteractive = () => {
    console.log(`Viz loaded: ${this.state.vizSrc}`);
  };

  loadViz = (step) => {
    const newCount = (this.state.vizCount + step + this.vizList.length) % this.vizList.length;
    const newSrc = this.vizList[newCount];

    this.setState({
      vizCount: newCount,
      vizSrc: newSrc
    });

    const viz = this.refs.tableauViz;
    viz.src = newSrc;
  };

  componentDidMount() {
    const viz = this.refs.tableauViz;
    this.handleFirstInteractive();
    viz.src = this.state.vizSrc;
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <div style={{ width: '800px', height: '700px' }}>
        <tableau-viz src={this.state.vizSrc} id="tableauViz" hide-tabs ref="tableauViz"></tableau-viz>
      </div>
      <div style={{ padding: '20px' }}>
        <button style={{ width: '100px' }} id="previous" onClick={() => this.loadViz(-1)}>Previous</button>
        <button style={{ width: '100px' }} id="next" onClick={() => this.loadViz(1)}>Next</button>
      </div>
    </div>
    );
  }
}

export default TableauVisualization;

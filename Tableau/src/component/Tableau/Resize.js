import React, { Component } from 'react';
import { TableauEventType, TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

export class Resize extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         width: '',
         height: ''
      }
      
    }

    handleSize = () => {
        let viz = document.getElementById("tableauViz");
        viz.width = this.state.width;
        viz.height = this.state.height;
    }

    render() {
        return (
            <>
                <div style={{ overflow: 'auto' }}>
                    <tableau-viz id="tableauViz" src="https://public.tableau.com/views/RegionalSampleWorkbook/Stocks"
                        hide-tabs
                        >
                    </tableau-viz>
                </div>
                <div style={{ padding: 20 }}>
                    <input type="text"
                     id="resizeWidth"
                      placeholder="Width"
                       value={this.state.width}
                       onChange={(e) => this.setState({width: e.target.value})}
                       />
                    <input 
                    type="text" 
                    id="resizeHeight" 
                    placeholder="Height" 
                    value={this.state.height}
                    onChange={(e) => this.setState({height: e.target.value})}
                    />
                    <button id="resizeViz" onClick={this.handleSize}>Resize</button>
                </div>
            </>
        )
    }
}

export default Resize
import React, { Component } from 'react'

export class TableauViz extends Component {
  render() {
    return (
        <div style={{padding: '0 50px'}}>
            <tableau-viz id="tableauViz"
                src='https://public.tableau.com/views/RegionalSampleWorkbook/Storms'
                toolbar="top"
                hide-tabs
                height={window.innerHeight}
                width={window.innerWidth}
                device="phone"
            >
            </tableau-viz>
        </div>
    )
  }
}

export default TableauViz
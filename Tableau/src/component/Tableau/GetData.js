import React, { Component } from 'react'
export class getData extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         data: []
      }
    }

    handleFirstInteractive = async () => {
        const viz = document.getElementById("tableauViz");
         const sheet = viz.workbook.activeSheet.worksheets.find(sheet => sheet.name === "Storm Map Sheet");
         const tables = await sheet.getUnderlyingTablesAsync();
        const options = {
            maxRows: 10, // Max rows to return. Use 0 to return all rows.
            ignoreAliases: false,
            ignoreSelection: true,
            includeAllColumns: false
        };
        
         const underlyingTableData = await sheet.getUnderlyingTableDataAsync(tables[0].id, options);
         this.setState({data: JSON.stringify(underlyingTableData.data)})
         console.log(underlyingTableData.data);
    }

  render() {
    return (
        <div style={{width:800,height:700}}>
        <tableau-viz id="tableauViz" src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
            toolbar="bottom" hide-tabs>
        </tableau-viz>
        <div style={{margin: 20}}>
            <button onClick={this.handleFirstInteractive}>Get Data</button>
        </div>
        <p>{this.state.data}</p>
    </div>
    )
  }
}

export default getData


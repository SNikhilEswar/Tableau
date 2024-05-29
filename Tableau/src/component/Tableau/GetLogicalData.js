import React, { Component } from 'react';
import { TableauEventType } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

export class GetLogicalData extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         pages: "",
         infoData: null,
         data: []
      }
    }

    handleChange = async (e) => {
        const pageNumber = parseInt(e.target.value, 10);
        this.setState({pages: pageNumber});
    }

    getDataAsync = async (pageNumber) => {
         // get the viz from the HTML web component
      const viz = document.getElementById('tableauViz');

        const sheet = viz.workbook.activeSheet.worksheets.find(
            sheet => sheet.name === 'Storm Map Sheet'
          );

          const datasource = await sheet.getDataSourcesAsync();

           // Get the logical tables from the first data source
        const logicalTables = await datasource[0].getLogicalTablesAsync();

        logicalTables.forEach(function (table) {
            // console.log(`Name of logical table: ${table.caption}`);
            // console.log(`ID of logical table: ${table.id}`);
          });

            // Get the data from the first logical table
        const logicalTableData = await datasource[0].getLogicalTableDataAsync(
            logicalTables[0].id
          );

        //   console.log(logicalTableData);
        //   console.log(`Total row count: ${logicalTableData.totalRowCount}`);

            // Set the page size to 1000 for this sample; the default value is 10000 rows
        const pageRowCount = 1000;
        // Create the data table reader
        const pageReader = await datasource[0].getLogicalTableDataReaderAsync(
          logicalTables[0].id,
          pageRowCount
        );

        // console.log(pageReader);
        try {
            console.log(`Number of pages: ${pageReader.pageCount}`);
            const value = {
                logicalTables,
                pageRowCount,
                logicalTableData,
                pageReader,
            }
            this.setState({infoData: value});

            let currentPageDataTable = await pageReader.getPageAsync(pageNumber);
            console.log(`Page ${pageNumber} DataTable:`);
            console.log(currentPageDataTable);
            this.setState({data: JSON.stringify(currentPageDataTable.data)})
            
        } catch (e) {
            console.error(e);

        } finally {
            // Free up memory when done
            await pageReader.releaseAsync();
        }
    }
 

  render() {
    return (
        <>
            <div>
      <h1>Get Logical Data (TableDataReader) Example </h1>
      <p>
        Select a page and click <b>Get Data</b> to get logical
        table data from the viz.
      </p>

      <select
        className="form-select"
        aria-label="Default select example"
        style={{width: 200}}
        value={this.state.pages}
        onChange={this.handleChange}
      >
        <option value="" selected disabled>Select page</option>
        <option value="0">Page 0</option>
        <option value="1">Page 1</option>
        <option value="2">Page 2</option>
        <option value="3">Page 3</option>
        <option value="4">Page 4</option>
      </select>
      <button onClick={() => this.getDataAsync(this.state.pages)}>Get Data</button>

      {this.state.infoData === null ? null : 
      (
        <>
        <p>logicalTables[0].caption: {this.state.infoData.logicalTables[0].caption}</p>
        <p>logicalTables[0].id: {this.state.infoData.logicalTables[0].id}</p>
        <p>pageRowCount: {this.state.infoData.pageRowCount}</p>
        <p>totalRowCount: {this.state.infoData.logicalTableData.totalRowCount}</p>
        <p>pageCount: {this.state.infoData.pageReader.pageCount}</p>
        <p>Scroll down to view data (pages {this.state.pages})</p>
        </>
      )
      }

    </div>

    <div style={{width:800, height:700}}>
     <tableau-viz
        id="tableauViz"
        src="https://public.tableau.com/views/RegionalSampleWorkbook/Storms"
        toolbar="bottom"
        hide-tabs
      > 
      </tableau-viz>
    </div>
    <p>{this.state.data}</p>

        </>
    )
  }
}

export default GetLogicalData
import React, { Component } from 'react';
import { FilterUpdateType } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

export class Filter extends Component {

    filterState() {
        let viz = document.getElementById("tableauViz");
        console.log(viz);
        let sheet = viz.workbook.activeSheet;;
        const saleMap = sheet.worksheets.find((ws) => ws.name == "SaleMap");
        saleMap.applyFilterAsync("Region", ["East"], FilterUpdateType.Replace);
    };

    clearState() {
        let viz = document.getElementById("tableauViz");
        console.log(viz);
        let sheet = viz.workbook.activeSheet;
        const saleMap = sheet.worksheets.find((ws) => ws.name == "SaleMap");
        saleMap.clearFilterAsync("Region");
    }

    unDo() {
        let viz = document.getElementById("tableauViz");
        viz.undoAsync();
    };

    render() {
        return (
            <>
                <div>
                    <button onClick={this.filterState}>Categories</button>
                    <button onClick={this.clearState}>Clear Filter</button>
                    <button onClick={this.unDo}>Undo</button>

                </div>
                <div style={{ width: '1000px', height: '700px' }}>
                    <tableau-viz id="tableauViz"
                        src='https://public.tableau.com/views/Superstore_24/Overview'
                        toolbar="bottom" hide-tabs>
                        {/* <viz-filter field="Region" value="East"> </viz-filter> */}
                    </tableau-viz>


                </div>

            </>

        )
    }
}

export default Filter

import React, { Component } from 'react'
import { SelectionUpdateType, TableauEventType } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

export class SelectMark extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }

    SelectValue = async (value) => {
        let viz = document.getElementById("tableauViz");
        let sheet = viz.workbook.activeSheet;

        if(value =='select') {
            const selections = [
                {
                    fieldName: "College",
                    value: "Engineering",
                },
            ];
            await sheet.selectMarksByValueAsync(
                selections,
                SelectionUpdateType.Replace
            );
        } else if(value == 'add') {
            const selections = [
                {
                    fieldName: "College",
                    value: "Business",
                },
            ];

            await sheet.selectMarksByValueAsync(selections, SelectionUpdateType.Add);
        } else {
            await sheet.clearSelectedMarksAsync();
        }
    }

  render() {
    return (
        <div style={{width: 800, height: 500}}>
        <tableau-viz id="tableauViz" src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
            hide-tabs>
        </tableau-viz>
        {/* <tableau-pulse id="tableauPulse"
    src='https://online.tableau.com/site/mysite/pulse/metrics/3ec1437f-d40d-4a5d-9363-aa22cd862838'
    height="800"
    width="100%"
    token='CAtoken'>
</tableau-pulse> */}
        <div style={{margin: 20}}>
            <button onClick={() => this.SelectValue('select')}>Select a Value</button>
            <button onClick={() => this.SelectValue('add')}>Add to Section</button>
            <button onClick={this.SelectValue}>Clear</button>
        </div>
    </div>
    )
  }
}

export default SelectMark
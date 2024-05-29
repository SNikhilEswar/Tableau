import React, { Component } from 'react'
import { TableauEventType, TableauViz } from "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.js";

export class Event extends Component {


    constructor(props) {
      super(props)
    
      this.state = {
         data: [],
         marks: null
      }
    }
    

    componentDidMount() {
        let viz = document.getElementById('tableauViz');
        viz.addEventListener(TableauEventType.MarkSelectionChanged, this.getSelectedMarks);
    }

    getSelectedMarks = async (event) =>  {
        console.log(event);
        const marksSelected = await event.detail.getMarksAsync();
        const numMarks = marksSelected.data[0].data.length;
        console.log(`${numMarks} marks Selected`);
        const marksData = marksSelected.data[0];
        const pushData = [];
        if(marksData) {
            for (let markIndex = 0; markIndex < marksData.totalRowCount; markIndex++) {
                for (let columnIndex = 0; columnIndex < marksData.columns.length; columnIndex++) {
                    const data = {fieldName:marksData.columns[columnIndex].fieldName, fieldValue:marksData.data[markIndex][columnIndex].formattedValue};
                    pushData.push(data);
                }
            }
        }
        this.setState({data: pushData, marks: numMarks});
    }

 

    render() {

        return (
            <>
            <div style={{height: 600, width: 900}}>
                <tableau-viz id="tableauViz"
                    src="https://public.tableau.com/views/RegionalSampleWorkbook/College"
                    onWorkbookPublished="handleWorkbookPublish">
                </tableau-viz>
                <button onClick={this.removeEvent}>Remove</button>
            </div>
            <div>
            <p>Mark: {this.state.marks}</p>
                    {this.state.data.length > 0 ? (
                        <>
                            {this.state.data.map(res =>
                                <div key={res.fieldName}>
                                    <p>FieldName: {res.fieldName}</p>
                                    <p>Value: {res.fieldValue}</p>
                                </div>
                            )}
                        </>
                    ) : null}
                    
            </div>
            </>
        )
    }
}

export default Event
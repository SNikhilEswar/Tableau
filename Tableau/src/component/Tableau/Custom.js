import React, { Component } from 'react';
const { tableau } = window;
class TableauEmbeddingComponent extends Component {
  constructor(props) {
    super(props);
    this.viz = null;
    this.worksheet = null;
    this.contextMenuId = null;
  }

  initializeViz = () => {
    const url = "https://public.tableau.com/views/RegionalSampleWorkbook/College";
    this.viz = document.getElementById("tableauViz");
    this.viz.hideTabs = true;
    this.viz.hideToolbar = true;
    this.viz.src = url;

    this.viz.addEventListener("FirstInteractive", this.handleFirstInteractive);
    this.viz.addEventListener("CustomMarkContextMenuEvent", this.handleCustomMarkEvent);
  }

  handleFirstInteractive = (e) => {
    if (e == null) {
      console.log("Event FirstInteractive has no event object");
      return;
    }

    this.worksheet = this.viz.workbook.activeSheet;
    const menuItemNames = ["Item 0", "Item 1", "Item 2"];
    menuItemNames.forEach(name => this.addContextMenuItem(name));

    const menuName = "Custom Context Menu Name";
    const menuDescription = "A sample custom context menu";
    this.renameContextMenu(menuName, menuDescription);
  }

  handleCustomMarkEvent = async (customMarkContextMenuEvent) => {
    console.log("Reached CUSTOM_MARK_CONTEXT_MENU");
    this.contextMenuId = customMarkContextMenuEvent.detail.getContextMenuId();
    const marks = await customMarkContextMenuEvent.detail.getSelectedMarksAsync();
    this.displaySelectedMarks(marks);
  }

  displaySelectedMarks = (marks) => {
    let html = "";

    for (let markIndex = 0; markIndex < marks.data[0].data.length; markIndex++) {
      const columns = marks.data[0].columns;
      html += `<b>Mark ${markIndex}</b>, MenuId ${this.contextMenuId}:</b><ul>`;
      for (let colIndex = 0; colIndex < columns.length; colIndex++) {
        html += `<li><b>Field Name:</b> ${columns[colIndex].fieldName}`;
        html += `<br/><b>Value:</b> ${marks.data[0].data[markIndex][colIndex].formattedValue}</li>`;
      }
      html += "</ul>";
    }
    const infoDiv = document.getElementById("markDetails");
    infoDiv.innerHTML = html;
  }

  addContextMenuItem = async (menuItem) => {
    const config = { displayName: menuItem };

    try {
      await this.worksheet.appendContextMenuAsync("Ubertip", config);
    } catch (e) {
      alert("An exception was thrown: " + e);
    }
  }

  renameContextMenu = async (menuName, menuDescription) => {
    try {
      await this.worksheet.renameContextMenuAsync("Ubertip", menuName, menuDescription);
    } catch (e) {
      alert("An exception was thrown: " + e);
    }
  }

  componentDidMount() {
    this.initializeViz();
  }

  render() {
    console.log(tableau);
    return (
      <div>
        <tableau-viz id="tableauViz" width="800" height="700"></tableau-viz>
        <div id="markDetails">
          <h3 style={{ backgroundColor: 'lightgray' }}>Display Mark Data</h3>
        </div>
      </div>
    );
  }
}

export default TableauEmbeddingComponent;

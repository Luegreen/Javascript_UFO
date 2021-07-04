
/*jshint esversion: 6 */

// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");
    //console.log("row",row)
    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {
  //console.log("runningUpdateFilters");

  // 4a. Save the element that was changed as a variable.
  var dateChangeID = d3.select("#datetime");
  //var changeElement = d3.select(this); 
  console.log("dateID", dateChangeID);
  // 4b. Save the value that was changed as a variable.
  //value is not being passed
  var dateChangeValue = d3.select("#datetime").node().value;
  console.log('dateChangeValue', dateChangeValue);
  // 4c. Save the id of the filter that was changed as a variable.
  //var changeID = changeElement.attr("id");
  //var changeID = d3.select(changeElement).id;
  //console.log("ID", changeID);

  // 5. If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (dateChangeValue!== null) {
    //this next piece of code looks wrong. I want it to store the new list? to filters to be used as a filter.
    //filters[changeID] = changeValue
    filters = dateChangeValue;
  }
  else {
    delete filters[dateChangeID];
  }
  console.log("filters", filters);
  //console.log("testing changed elements", changeValue);
  // 6. Call function to apply all filters and rebuild the table
  filterTable();

}

// 7. Use this function to filter the table when data is entered.
function filterTable() {

  // 8. Set the filtered data to the tableData.
  filteredObject = tableData;
  console.log("tableData", tableData);//tableData still has all data

  // 9. Loop through all of the filters and keep any data that
  // matches the filter values
  //const filteredObject = 
  //var filteredEntries = Object.entries(tableData).filter(v) => (filters.includes(v));
  // var filteredObject = Object.fromEntries(filteredEntries);
  //var filteredObject = tableData.filter(tableData.datetime), 'return filters;'); 
 var filteredObject = Object.fromEntries(
    Object.entries(tableData).filter(
      ([key, val])=> filteredObject.includes(val)
    )
 );
 console.log("filteredObject", filteredObject);

  


    // 10. Finally, rebuild the table using the filtered data
    buildTable(tableData);

}
// 2. Attach an event to listen for changes to each filter

d3.selectAll("#datetime, #city, #state, #country, #shape").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
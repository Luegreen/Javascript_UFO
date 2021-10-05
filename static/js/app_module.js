//import the data from data.js
const tableData = data;

//Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data){
    //First, clear out any existing data
    tbody.html("");
    
//Next, loop through each object in the data
//and append a row and cells for each value in the row

data.forEach((dataRow) => {
        let row = tbody.append("tr");
    
        //Loop through each field in a the dataRow and add
        //each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
        
    });
    
}

function handleClick() {
    //Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");
    console.log(date, "date")
    let filteredData = tableData;
    
    //check to see if a date was entered and filter the data using that date. 
    if(date){
        //apply 'filter' to the table data to only keep the rows where the 'dtaetime value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    
    //Rebuild the table using the filtered data
    //Note: if no date was entered, the filteredData will be the original table
    buildTable(filteredData);
};

d3.selectAll("#filter-btn").on("click", handleClick);

buildTable(tableData);
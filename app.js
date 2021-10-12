// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 800 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const file = "/assets/data/data.csv";   

//Read the data
d3.csv(file).then(function(data) {
    console.log(data);
    var hclow = data.map(d => d.healthcareLow);
    console.log(hclow);
    var pov = data.map(d => d.poverty);
    console.log(pov);
    // Add X axis
    const x = d3.scaleLinear()
    .domain([2, 20])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([8, 23])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function (d) { return x(d.healthcareLow); } )
    .attr("cy", function (d) { return y(d.poverty); } )
        .attr("r", 6)
        .style("fill", "#69b3a2")

});

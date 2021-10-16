// set the dimensions and margins of the graph
const margin = {top: 20, right: 40, bottom: 60, left: 100},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
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
    // Format the data
    data.forEach(function(data) {
        data.obesity = +data.obesity;
        data.poverty = +data.poverty;
        });
    var hclow = data.map(d => d.obesity);
    console.log(hclow);
    var pov = data.map(d => d.poverty);
    console.log(pov);
    var state = data.map(d => d.abbr);
    console.log(state);

    // verifying format for axes
    console.log(d3.max(data, d => d.obesity));
    console.log(d3.min(data, d => d.obesity));
    console.log(d3.max(data, d => d.poverty));
    console.log(d3.min(data, d => d.poverty));



    // Add X axis
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty)-1, d3.max(data, d => d.poverty)+1])
        .range([ 0, width]);
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.obesity)-1, d3.max(data, d => d.obesity)+1])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.obesity); } )
        .attr("r", 12)
        .style("fill", "#6699cc")
    
    svg.selectAll(".label")
        .data(data)
        .enter()
        .append("text")
        .attr("font-size", "10px")
        .attr("class", "stateText")
        .attr("text-anchor", "middle", "label")
        // Add your code below this line
                .text((d) => (d.abbr))
                .attr("x", function (d) { return x(d.poverty);})
                .attr("y", function (d) { return y(d.obesity); })   
        // Add your code above this line    
    
    svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("fill", "green")
        .text("poverty");
    
    // Create axes labels
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("text-anchor", "middle")
      .attr("dy", "1em")
      .attr("class", "axisText")
      //.attr("stroke", "stateCircle")
      .text("obesity");

});

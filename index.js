const csvUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// Adding a "+" before a string, will convert it into a number.
const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
}

// Columns for the range.
const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;

// d3 margin convention.
const margin = {top: 20, right: 20, bottom: 40, left:50};

const width = window.innerWidth;
const height = window.innerHeight;    

const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);
    
// // The second argument is a funtion that takes as input a single row and replace it.  
// // First way to import data.
// d3.csv(csvUrl, parseRow).then(data => {
//     console.log(data);
// });

// This is a better way to import data.
const main = async () => {
    const data = await d3.csv(csvUrl, parseRow);

    // X scale
    const x = d3.scaleLinear()
        // Use next line to start the axis from the minimum value.
        .domain(d3.extent(data, xValue))
        // // Use next line to start the axis from 0.
        // .domain([0, d3.max(data, xValue)])
        .range([margin.left, width - margin.right]);

    // Y scale
    const y = d3.scaleLinear()
        // Use next line to start the axis from the minimum value.
        .domain(d3.extent(data, yValue))
        // // Use next line to start the axis from 0
        // .domain([0, d3.max(data, yValue)])
        .range([height - margin.bottom, margin.top]);

    const marks = data.map(d => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
    }));

    console.log(x.domain());
    console.log(y.domain());

    console.log(x.range());
    console.log(y.range());

    console.log(marks);

    svg
        .selectAll('circle')
        .data(marks)
        .join('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 5);

    // Left axis
    svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Bottom axis
    svg
        .append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x));


};
main();

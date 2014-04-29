

var width = 960,
    height = 800,
    radius = Math.min(width, height) / 2;

var colorIn = d3.scale.linear()
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    .domain([0, 15000000])
    .range(["#EDEDED", "#130091"]);

var colorOut = d3.scale.linear()
    //.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    .domain([0, 15000000])
    .range(["#EDEDED", "#3B0100"]);

var arc1 = d3.svg.arc()
    .outerRadius(240)
    .innerRadius(180);

var arc2 = d3.svg.arc()
    .outerRadius(300)
    .innerRadius(240);

var arc3 = d3.svg.arc()
    .outerRadius(360)
    .innerRadius(300);

var hoursArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];


var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


d3.csv("data/data1.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var g = svg.selectAll(".arc1")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc1");

  g.append("path")
      .attr("d", arc1)
      .style("fill", function(d) { return colorIn(d.data.population); });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc1.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });

});

d3.csv("data/data2.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var b = svg.selectAll(".arc2")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc2");

  b.append("path")
      .attr("d", arc2)
      .style("fill", function(d) { return colorOut(d.data.population); });

  b.append("text")
      .attr("transform", function(d) { return "translate(" + arc2.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });
    
});

d3.csv("data/hours.csv", function(error, data) {

  data.forEach(function(d) {
    d.population = +d.population;
  });

  var b = svg.selectAll(".arc3")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc3");

  b.append("path")
      .attr("d", arc3)
      .style("fill", "#fff");

  b.append("text")
      .attr("transform", function(d) { return "translate(" + arc3.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.age; });
    
});
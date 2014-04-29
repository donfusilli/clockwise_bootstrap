<?php
$page = "stacked";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Clockwise">

    <title>Clockwise > Stacked</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.1.1-dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
    <style>
    .axis path,
    .axis line {
      fill: none;
      stroke: #000;
      shape-rendering: crispEdges;
    }

    .bar {
      fill: steelblue;
    }

    .x.axis path {
      display: none;
    }

    .legend line {
      stroke: #000;
      shape-rendering: crispEdges;
    }

    svg {
      margin-left: 300px;
      margin-top: -50px;
    }
    </style>
    <script src="http://d3js.org/d3.v3.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Clockwise</a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Help</a></li>
          </ul>
          <form class="navbar-form navbar-right">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <?php require_once('inc/sidebar.php'); ?>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 class="page-header">Stacked Chart</h1>
          <p>Represent different levels of activities as percentages</p>
          <div class="row placeholders">
            <div class="col-lg-6 col-lg-3 placeholder">
              
              <script>
              var margin = {top: 20, right: 100, bottom: 30, left: 40},
                  width = 960 - margin.left - margin.right,
                  height = 500 - margin.top - margin.bottom;

              var x = d3.scale.ordinal()
                  .rangeRoundBands([0, width], .1);

              var y = d3.scale.linear()
                  .rangeRound([height, 0]);

              var color = d3.scale.ordinal()
                  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

              var xAxis = d3.svg.axis()
                  .scale(x)
                  .orient("bottom");

              var yAxis = d3.svg.axis()
                  .scale(y)
                  .orient("left")
                  .tickFormat(d3.format(".0%"));

              var svg = d3.select("body").append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              d3.csv("data/stacked.csv", function(error, data) {
                color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

                data.forEach(function(d) {
                  var y0 = 0;
                  d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
                  d.ages.forEach(function(d) { d.y0 /= y0; d.y1 /= y0; });
                });

                data.sort(function(a, b) { return b.ages[0].y1 - a.ages[0].y1; });

                x.domain(data.map(function(d) { return d.State; }));

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

                var state = svg.selectAll(".state")
                    .data(data)
                  .enter().append("g")
                    .attr("class", "state")
                    .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; });

                state.selectAll("rect")
                    .data(function(d) { return d.ages; })
                  .enter().append("rect")
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.y1); })
                    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
                    .style("fill", function(d) { return color(d.name); });

                var legend = svg.select(".state:last-child").selectAll(".legend")
                    .data(function(d) { return d.ages; })
                  .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d) { return "translate(" + x.rangeBand() / 2 + "," + y((d.y0 + d.y1) / 2) + ")"; });

                legend.append("line")
                    .attr("x2", 10);

                legend.append("text")
                    .attr("x", 13)
                    .attr("dy", ".35em")
                    .text(function(d) { return d.name; });

              });

              </script>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="bootstrap-3.1.1-dist/js/bootstrap.min.js"></script>
    <script src="js/docs.min.js"></script>
    <script src="js/index.js"></script>
  </body>
</html>

<?php
$page = "heatmap";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Clockwise">

    <title>Clockwise > Heatmap</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.1.1-dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">
    <style>
      rect.bordered {
        stroke: #E6E6E6;
        stroke-width:2px;   
      }

      text.mono {
        font-size: 9pt;
        font-family: Consolas, courier;
        fill: #aaa;
      }

      text.axis-workweek {
        fill: #000;
      }

      text.axis-worktime {
        fill: #000;
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
          <h1 class="page-header">Heatmap</h1>
          <p>Display activity, like amount of screen on, as heatmap for each day</p>
          <div class="row placeholders">
            <div class="col-lg-6 col-lg-3 placeholder">
              <div id="chart"></div>

              <script type="text/javascript">
              var margin = { top: 50, right: 0, bottom: 100, left: 30 },
                  width = 960 - margin.left - margin.right,
                  height = 430 - margin.top - margin.bottom,
                  gridSize = Math.floor(width / 24),
                  legendElementWidth = gridSize*2,
                  buckets = 9,
                  //colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"], // alternatively colorbrewer.YlGnBu[9]
                  colors =  ["#41b6c4","#7fcdbb","#c7e9b4","#edf8b1","#ffffd9","#C8BDD9","#A84545","#942525","#580808"],
                  days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                  times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];


              d3.tsv("data/heatmap.tsv",
                function(d) {
                  return {
                    day: +d.day,
                    hour: +d.hour,
                    value: +d.value
                  };
                },
                function(error, data) {
                  var colorScale = d3.scale.quantile()
                      .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
                      .range(colors);

                  var svg = d3.select("#chart").append("svg")
                      .attr("width", width + margin.left + margin.right)
                      .attr("height", height + margin.top + margin.bottom)
                      .append("g")
                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                  var dayLabels = svg.selectAll(".dayLabel")
                      .data(days)
                      .enter().append("text")
                        .text(function (d) { return d; })
                        .attr("x", 0)
                        .attr("y", function (d, i) { return i * gridSize; })
                        .style("text-anchor", "end")
                        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
                        .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

                  var timeLabels = svg.selectAll(".timeLabel")
                      .data(times)
                      .enter().append("text")
                        .text(function(d) { return d; })
                        .attr("x", function(d, i) { return i * gridSize; })
                        .attr("y", 0)
                        .style("text-anchor", "middle")
                        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
                        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

                  var heatMap = svg.selectAll(".hour")
                      .data(data)
                      .enter().append("rect")
                      .attr("x", function(d) { return (d.hour - 1) * gridSize; })
                      .attr("y", function(d) { return (d.day - 1) * gridSize; })
                      .attr("rx", 4)
                      .attr("ry", 4)
                      .attr("class", "hour bordered")
                      .attr("width", gridSize)
                      .attr("height", gridSize)
                      .style("fill", colors[0]);

                  heatMap.transition().duration(1000)
                      .style("fill", function(d) { return colorScale(d.value); });

                  heatMap.append("title").text(function(d) { return d.value; });
                      
                  var legend = svg.selectAll(".legend")
                      .data([0].concat(colorScale.quantiles()), function(d) { return d; })
                      .enter().append("g")
                      .attr("class", "legend");

                  legend.append("rect")
                    .attr("x", function(d, i) { return legendElementWidth * i; })
                    .attr("y", height)
                    .attr("width", legendElementWidth)
                    .attr("height", gridSize / 2)
                    .style("fill", function(d, i) { return colors[i]; });

                  legend.append("text")
                    .attr("class", "mono")
                    .text(function(d) { return "≥ " + Math.round(d); })
                    .attr("x", function(d, i) { return legendElementWidth * i; })
                    .attr("y", height + gridSize);
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

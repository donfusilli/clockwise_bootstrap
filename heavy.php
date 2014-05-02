<?php
$page = "heavy";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Clockwise">

    <title>Clockwise > Heavy</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.1.1-dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/dashboard.css" rel="stylesheet">

    <style>

    .node {
      font: 11px "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .link {
      stroke: steelblue;
      stroke-opacity: .4;
      fill: none;
    }

    svg {
      margin-left: 225px;
      margin-top: -80px;
    }

    </style>
    
    <script src="js/d3.v3.min.js"></script>

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
          <h1 class="page-header">More Complicated Example</h1>
          <p>See how well this page displays on mobile</p>

          <div class="row placeholders">
            <div class="col-lg-6 col-lg-3 placeholder">
              <!--<div id="chart"></div>-->
              <script src="http://d3js.org/d3.v3.min.js"></script>
    <script>
 
var diameter = 960,
radius = diameter / 2,
innerRadius = radius - 120;
 
var cluster = d3.layout.cluster()
.size([360, innerRadius])
.sort(null)
.value(function(d) { return d.size; });
 
var bundle = d3.layout.bundle();
 
var line = d3.svg.line.radial()
.interpolate("bundle")
.tension(.85)
.radius(function(d) { return d.y; })
.angle(function(d) { return d.x / 180 * Math.PI; });
 
var svg = d3.select("body").append("svg")
.attr("width", diameter)
.attr("height", diameter)
.append("g")
.attr("transform", "translate(" + radius + "," + radius + ")");
 
d3.json("data/readme-flare-imports.json", function(error, classes) {
var nodes = cluster.nodes(packageHierarchy(classes)),
links = packageImports(nodes);
 
svg.selectAll(".link")
.data(bundle(links))
.enter().append("path")
.attr("class", "link")
.attr("d", line);
 
svg.selectAll(".node")
.data(nodes.filter(function(n) { return !n.children; }))
.enter().append("g")
.attr("class", "node")
.attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
.append("text")
.attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
.attr("dy", ".31em")
.attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
.text(function(d) { return d.key; });
});
 
d3.select(self.frameElement).style("height", diameter + "px");
 
// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
var map = {};
 
function find(name, data) {
var node = map[name], i;
if (!node) {
node = map[name] = data || {name: name, children: []};
if (name.length) {
node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
node.parent.children.push(node);
node.key = name.substring(i + 1);
}
}
return node;
}

classes.forEach(function(d) {
find(d.name, d);
});
 
return map[""];
}
 
// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
var map = {},
imports = [];
 
// Compute a map from name to node.
nodes.forEach(function(d) {
map[d.name] = d;
});
 
// For each import, construct a link from the source to target node.
nodes.forEach(function(d) {
if (d.imports) d.imports.forEach(function(i) {
imports.push({source: map[d.name], target: map[i]});
});
});
 
return imports;
}
 
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
    <!--<script src="js/index.js"></script>-->
  </body>
</html>

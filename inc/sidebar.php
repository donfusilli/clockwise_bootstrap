
<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar">
    <li class="<?php echo ($page == "index" ? "active" : "")?>"><a href="index.php">Overview</a></li>
    <li class="<?php echo ($page == "reports" ? "active" : "")?>"><a href="#">Reports</a></li>
    <li class="<?php echo ($page == "analytics" ? "active" : "")?>"><a href="analytics.php">Analytics</a></li>
    <li class="<?php echo ($page == "export" ? "active" : "")?>"><a href="#">Export</a></li>
  </ul>
  <ul class="nav nav-sidebar">
    <li class="<?php echo ($page == "heatmap" ? "active" : "")?>"><a href="heatmap.php">Heatmap</a></li>
    <li class="<?php echo ($page == "stacked" ? "active" : "")?>"><a href="stacked.php">Stacked</a></li>
    <li class="<?php echo ($page == "donut" ? "active" : "")?>"><a href="donut.php">Donut</a></li>
    <li class="<?php echo ($page == "pie" ? "active" : "")?>"><a href="pie.php">Pie</a></li>
    <li class="<?php echo ($page == "heavy" ? "active" : "")?>"><a href="heavy.php">Heavy Test</a></li>
    <?php
    if(isset($_COOKIE['active_file'])){
      print "<li>Active File: ".$_COOKIE['active_file']."</li>";
    }
    ?>
  </ul>
</div>
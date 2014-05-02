
function getColorForApp(d){
	if(gFileData.applicationProbeColors != null) {
		return gFileData.applicationProbeColors(gFileData.applicationProbeSet[d.app_name] % 40);
	}
	return "#000";
}
function getColorForCallLog(type){
	return gFileData.callLogProbeColors[type];
}

function updateGraph() {
	var activeDate = CURRENTDATE.getMonth()+'/'+CURRENTDATE.getDate()+'/'+CURRENTDATE.getFullYear();
	
	dataScreenProve_mor = gFileData.screenProbe[activeDate] ? gFileData.screenProbe[activeDate].morning : [];
	dataScreenProve_eve = gFileData.screenProbe[activeDate] ? gFileData.screenProbe[activeDate].evening : [];
	dataRunningApplicationProbe_mor = gFileData.applicationProbe[activeDate] ? gFileData.applicationProbe[activeDate].morning : [];
	dataRunningApplicationProbe_eve = gFileData.applicationProbe[activeDate] ? gFileData.applicationProbe[activeDate].evening : [];
	dataLocationProbe_mor = gFileData.locationProbe[activeDate] ? gFileData.locationProbe[activeDate].morning : [];
	dataLocationProbe_eve = gFileData.locationProbe[activeDate] ?  gFileData.locationProbe[activeDate].evening : [];
	dataSmsProve_mor = gFileData.smsProbe[activeDate] ? gFileData.smsProbe[activeDate].morning : [];
	dataSmsProve_eve = gFileData.smsProbe[activeDate] ?  gFileData.smsProbe[activeDate].evening : [];
	dataCallLogProbe_mor = gFileData.callLogProbe[activeDate] ? gFileData.callLogProbe[activeDate].morning : [];
	dataCallLogProbe_eve = gFileData.callLogProbe[activeDate] ?  gFileData.callLogProbe[activeDate].evening : [];

	updateScreenProveGraph();
	updateRunningApplicationProbeGraph();
	updateLcationProbeGraph();
	updateSmsProbeGraph();
	updateCallLogProbeGraph();
}
function updateRunningApplicationProbeGraph() {
	global.firstAM_application.selectAll("path").data([]).exit().remove();
	global.firstPM_application.selectAll("path").data([]).exit().remove();
	if (graphStatus.appused) {
		global.firstAM_application.selectAll("path")
				.data(dataRunningApplicationProbe_mor)
				.enter()
					.append("path")
					.attr("fill", function(d){ return getColorForApp(d, gFileData.applicationProbeSet); })
					.attr("d", global.arc_application);		
		global.firstPM_application.selectAll("path")
				.data(dataRunningApplicationProbe_eve)
				.enter()
					.append("path")
					.attr("fill", function(d){ return getColorForApp(d, gFileData.applicationProbeSet); })
					.attr("d", global.arc_application);
	}
	var applicationColors = [];
	var hash = {};
	for(var i = 0; i < dataRunningApplicationProbe_mor.length; i++) {
		if(hash[dataRunningApplicationProbe_mor[i].app_name] == undefined) {
			hash[dataRunningApplicationProbe_mor[i].app_name] = 1;
			applicationColors.push({id: dataRunningApplicationProbe_mor[i].app_name, color: getColorForApp(dataRunningApplicationProbe_mor[i], gFileData.applicationProbeSet)});
		}
	}
	for(var i = 0; i < dataRunningApplicationProbe_eve.length; i++) {
		if(hash[dataRunningApplicationProbe_eve[i].app_name] == undefined) {
			hash[dataRunningApplicationProbe_eve[i].app_name] = 1;
			applicationColors.push({id: dataRunningApplicationProbe_eve[i].app_name, color: getColorForApp(dataRunningApplicationProbe_eve[i], gFileData.applicationProbeSet)});
		}
	}
	d3.select('div.first_graph_colors').selectAll('div.color').data([]).exit().remove();
	d3.select('div.first_graph_colors').selectAll('div.color')
		.data(applicationColors)
		.enter()
			.append("div")
			.attr("class", 'color')
			.attr("style", function(d){return "background-color:" + d.color;});
}
function updateScreenProveGraph() {
	global.firstAM_screen.selectAll("path").data([]).exit().remove();
	global.firstPM_screen.selectAll("path").data([]).exit().remove();

	if (graphStatus.screenprobe) {
		global.firstAM_screen.selectAll("path")
				.data(dataScreenProve_mor)
				.enter()
					.append("path")
					.attr("d", global.arc_screen);

		global.firstPM_screen.selectAll("path")
				.data(dataScreenProve_eve)
				.enter()
					.append("path")
					.attr("d", global.arc_screen);
	}
}
function updateLcationProbeGraph() {
	global.secondAM_location.selectAll("path").data([]).exit().remove();
	global.secondPM_location.selectAll("path").data([]).exit().remove();
	
	if (graphStatus.locationprobe) {
		global.secondAM_location.selectAll("path")
				.data(dataLocationProbe_mor)
				.enter()
					.append("path")
					.attr("fill", function(d){ return d.location_color; })
					.attr("d", global.arc_location);

		global.secondPM_location.selectAll("path")
				.data(dataLocationProbe_eve)
				.enter()
					.append("path")
					.attr("fill", function(d){ return d.location_color; })
					.attr("d", global.arc_location);
	}
	var locationColors = [];
	var hash = {};
	for(var i = 0; i < dataLocationProbe_mor.length; i++) {
		if(hash[dataLocationProbe_mor[i].location_id] == undefined) {
			hash[dataLocationProbe_mor[i].location_id] = 1;
			locationColors.push({id: dataLocationProbe_mor[i].location_id, color: dataLocationProbe_mor[i].location_color});
		}
	}
	for(var i = 0; i < dataLocationProbe_eve.length; i++) {
		if(hash[dataLocationProbe_eve[i].location_id] == undefined) {
			hash[dataLocationProbe_eve[i].location_id] = 1;
			locationColors.push({id: dataLocationProbe_eve[i].location_id, color: dataLocationProbe_eve[i].location_color});
		}
	}
	d3.select('div.second_graph_colors').selectAll('div.color').data([]).exit().remove();
	d3.select('div.second_graph_colors').selectAll('div.color')
		.data(locationColors)
		.enter()
			.append("div")
			.attr("class", 'color')
			.attr("style", function(d){return "background-color:" + d.color;});
}
function updateSmsProbeGraph() {
	global.thirdAM_sms.selectAll(".bar").data([]).exit().remove();
	global.thirdPM_sms.selectAll(".bar").data([]).exit().remove();

	/*global.thirdAM_sms.selectAll("path")
			.data(dataSmsProve_mor)
			.enter()
				.append("path")
				.attr("d", global.arc_sms);

	global.thirdPM_sms.selectAll("path")
			.data(dataSmsProve_eve)
			.enter()
				.append("path")
				.attr("d", global.arc_sms);*/	

	var barWidth = 8;
	if (graphStatus.socialprobe) {

		var barsAM = global.thirdAM_sms.selectAll(".bar")
			.data(dataSmsProve_mor)
				.enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d,index) {
					var startTime = new Date(d.time);
					var totalTimeDiff = (startTime.getHours() % 12)*3600 + startTime.getMinutes()*60 + startTime.getSeconds();
					var theta=(totalTimeDiff/43200 * 2 * pi) + (pi / 2);
					var thetaD = (totalTimeDiff/43200) * 360 + 90;
					return ' translate('+(INNER_RADIUS*Math.cos(theta))+','+(-INNER_RADIUS*Math.sin(theta))+') rotate('+(90-thetaD)+')'; 
				})
				.attr('x',0)
				.attr('y',INNER_RADIUS*2)
				.attr("width", barWidth)
				.attr("height", function(d) { return d.in; });
		barsAM.append("rect")
			.attr("class", ".bar-in")
			.attr("width", barWidth/2)
			.attr('x',-barWidth/4)
			.attr('y',INNER_RADIUS*2)
			.attr('fill',gFileData.smsProbeColors["in"])
			.attr("height", function(d) { return Math.min(50, d.in); }); 
		barsAM.append("rect")
			.attr("class", ".bar-out")
			.attr("width", barWidth/2)
			.attr('x',0)
			.attr('y',INNER_RADIUS*2)
			.attr('fill',gFileData.smsProbeColors["out"])
			.attr("height", function(d) { return Math.min(50, d.out); }); 
		
		var barsPM = global.thirdPM_sms.selectAll(".bar")
			.data(dataSmsProve_eve)
				.enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d,index) {
					var startTime = new Date(d.time);
					var totalTimeDiff = (startTime.getHours() % 12)*3600 + startTime.getMinutes()*60 + startTime.getSeconds();
					var theta=(totalTimeDiff/43200 * 2 * pi) + (pi / 2);
					var thetaD = (totalTimeDiff/43200) * 360 + 90;
					return ' translate('+(INNER_RADIUS*Math.cos(theta))+','+(-INNER_RADIUS*Math.sin(theta))+') rotate('+(90-thetaD)+')'; 
				})
				.attr('x',0)
				.attr('y',INNER_RADIUS*2)
				.attr("width", barWidth)
				.attr("height", function(d) { return d.in; });
		barsPM.append("rect")
			.attr("class", ".bar-in")
			.attr("width", barWidth/2)
			.attr('x',-barWidth/4)
			.attr('y',INNER_RADIUS*2)
			.attr('fill', gFileData.smsProbeColors["in"])
			.attr("height", function(d) { return Math.min(50, d.in); }); 
		barsPM.append("rect")
			.attr("class", ".bar-out")
			.attr("width", barWidth/2)
			.attr('x',0)
			.attr('y',INNER_RADIUS*2)
			.attr('fill', gFileData.smsProbeColors["out"])
			.attr("height", function(d) { return Math.min(50, d.out); });
	}
}
 function readMultipleFile(filePath)
{
	var screenProbe = "";
	for(var i = 0; i < filePath.files.length; i++)
	{
		(function(file){
			var name = file.name;
			var reader = new FileReader();
			reader.onabort = function(e) {
				console.log(e);
			}
			reader.onloadend = function(e){
			//	if(name.toLowerCase() == "RunningApplicationsProbe.csv".toLowerCase()) {
				 if (name.indexOf("RunningApplicationsProbe") != -1){
					parseApplicationDate(e.target.result, function(data, appSet){
						gFileData.applicationProbe = data;
						gFileData.applicationProbeSet = appSet;
					});
				//} else if(name.toLowerCase() == "ScreenProbe.csv".toLowerCase()) {
					} else if (name.indexOf("ScreenProbe") != -1){
					parseScreenProbe(e.target.result, function(data) {
						gFileData.screenProbe = data;
					});
			//	} else if(name.toLowerCase() == "LocationProbe.csv".toLowerCase()) {
			
				} else if (name.indexOf("LocationProbe") != -1){
					parseLocationProbe(e.target.result, function(data) {
						gFileData.locationProbe = data;
					});
				//} else if(name.toLowerCase() == "SmsProbe.csv".toLowerCase()) {
				} else if (name.indexOf("SmsProbe") != -1){
					parseSmsProbe(e.target.result, function(data) {
						gFileData.smsProbe = data;
					});
				//} else if(name.toLowerCase() == "CallLogProbe.csv".toLowerCase()) {
				} else if (name.indexOf("CallLogProbe") != -1){
					parseCallLogProbe(e.target.result, function(data) {
						gFileData.callLogProbe = data;
					});
				}
				updateGraph();
			}
			reader.readAsText(file);
			setCookie('active_file', name, 0);
		})(filePath.files[i]);
	}
}



function drawApplicationWithDate(applicationInfo, date, move_index, svg, colorSet)
{
	var currentDate = applicationInfo[date];

	var currentMorning = currentDate["morning"];
	var currentEvening = currentDate["evening"];
	dataRunningApplicationProbe_mor = [];
	for(var i = 0; currentMorning && i < currentMorning.length; i++)
	{
		var info = currentMorning[i].split(",");
		var time_stamp = info[0];
		var duration = info[1];
		var app_name = info[2];

		if(time_stamp && duration && app_name)
		{
			var hashmap = {};
			hashmap["time"] = time_stamp;
			hashmap["duration"] = parseFloat(time_stamp) + parseFloat(duration);
			hashmap["app_name"] = app_name;

			dataRunningApplicationProbe_mor.push(hashmap);
		}
	}
	dataRunningApplicationProbe_eve = [];
	for(var i = 0; currentEvening && i < currentEvening.length; i++)
	{
		var info = currentEvening[i].split(",");
		var time_stamp = info[0];
		var duration = info[1];
		var app_name = info[2];

		if(time_stamp && duration && app_name)
		{
			var hashmap = {};
			hashmap["time"] = time_stamp;
			var end_time = parseFloat(time_stamp) + parseFloat(duration);
			hashmap["duration"] = end_time;
			var startTime1 = new Date(time_stamp * 1000);
			var endTime1 = new Date(end_time*1000);
			hashmap["app_name"] = app_name;

			dataRunningApplicationProbe_eve.push(hashmap);
		}
	}
	dataRunningApplicationProb_colorSet = colorSet;
}

function drawScreenOnandOffWithDate(screenInfo, date, move_index, svg)
{
	var currentDate = screenInfo[date];

	var currentMorning = currentDate["morning"];
	var currentEvening = currentDate["evening"];
	dataScreenProve_mor = [];
	for(var i = 0; currentMorning && i < currentMorning.length; i = i + 2)
	{
		var screen_on = currentMorning[i];
		var screen_off = currentMorning[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_mor.push(hashmap);
		}
	}
	dataScreenProve_eve = [];
	for(var i = 0; currentEvening && i < currentEvening.length; i = i + 2)
	{
		var screen_on = currentEvening[i];
		var screen_off = currentEvening[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_eve.push(hashmap);
		}
	}
}

function drawScreenOnandOffWithDate(screenInfo, date, move_index, svg)
{
	var currentDate = screenInfo[date];

	var currentMorning = currentDate["morning"];
	var currentEvening = currentDate["evening"];
	dataScreenProve_mor = [];
	for(var i = 0; currentMorning && i < currentMorning.length; i = i + 2)
	{
		var screen_on = currentMorning[i];
		var screen_off = currentMorning[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_mor.push(hashmap);
		}
	}
	dataScreenProve_eve = [];
	for(var i = 0; currentEvening && i < currentEvening.length; i = i + 2)
	{
		var screen_on = currentEvening[i];
		var screen_off = currentEvening[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_eve.push(hashmap);
		}
	}
}

function drawLocationProbe(screenInfo, date, move_index, svg) {
	var currentDate = screenInfo[date];

	var currentMorning = currentDate["morning"];
	var currentEvening = currentDate["evening"];
	dataScreenProve_mor = [];
	for(var i = 0; currentMorning && i < currentMorning.length; i = i + 2)
	{
		var screen_on = currentMorning[i];
		var screen_off = currentMorning[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_mor.push(hashmap);
		}
	}
	dataScreenProve_eve = [];
	for(var i = 0; currentEvening && i < currentEvening.length; i = i + 2)
	{
		var screen_on = currentEvening[i];
		var screen_off = currentEvening[i+1];

		if(screen_on && screen_off)
		{
			var hashmap = {};
			hashmap["on"] = screen_on;
			hashmap["off"] = screen_off;

			dataScreenProve_eve.push(hashmap);
		}
	}
}
function getDateAsString(time) {
	var d = new Date(time);
	return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
}
function getDividedTimes( startTime, duration ) {
	var timesArray = [];
	var d = new Date(startTime);
	var startYear = d.getFullYear();
	var startMonth = d.getMonth();
	var startDate = d.getDate();
	var startHour = d.getHours();
	var currentSplitTime = startTime;
	var nextSplitTime = null;
	var endTime = startTime + duration;
	
	var i = 0;
	
	while(1) {
		if(startHour < 12) {
			nextSplitTime = (new Date(startYear, startMonth, startDate + i, 12)).getTime()-1;
			timesArray.push({ "date": getDateAsString(currentSplitTime), "when": "morning", "start" : currentSplitTime, "end" : Math.min(nextSplitTime, endTime)});
			currentSplitTime = (new Date(startYear, startMonth, startDate + i, 12)).getTime();
			startHour = 12;
		} else {
			nextSplitTime = (new Date(startYear, startMonth, startDate + i + 1, 0)).getTime()-1;
			timesArray.push({ "date": getDateAsString(currentSplitTime), "when": "evening", "start" : currentSplitTime, "end" : Math.min(nextSplitTime, endTime)});
			currentSplitTime = (new Date(startYear, startMonth, startDate + i + 1, 0)).getTime();
			startHour = 0;
			i++;
		}
		if (endTime < nextSplitTime) {
			break;
		}
	}
	return timesArray;
}

function parseApplicationDate(applicationData, cb)
{
	var applicationInfo = {};
	var applicationSet = {};
	var applicationLines = $.csv.toArrays(applicationData);
	var index = 1;
	for(var i = 1; i < applicationLines.length;i++)
	{
		var theLineSplit = applicationLines[i];
		var currentDate = new Date(theLineSplit[2] * 1000);
		
		var applicationName = theLineSplit[8];

		if(applicationSet[applicationName] === undefined) {
			applicationSet[applicationName] = index;
			index++;
		}
		var timeSections = getDividedTimes(currentDate.getTime(), parseFloat(theLineSplit[3]) * 1000);
		for(var j = 0; j < timeSections.length; j++) {
			var d = timeSections[j].date;
			var when = timeSections[j].when;
			if(applicationInfo[d] === undefined ) {
				applicationInfo[d] = {"morning":[], "evening":[]};
			}
			applicationInfo[d][when].push({"time": timeSections[j].start, "duration": timeSections[j].end, "app_name": theLineSplit[8]});
		}
	}
	cb(applicationInfo, applicationSet);
}

function parseScreenProbe(screenprobeData, cb)
{
	var screenInfo = {};
	var screenProbleLines = $.csv.toArrays(screenprobeData);
	
	var i = 1, mode = 0;
	var onTimeLine = [];
	var offTimeLine = [];
	var currentLine = [];
	//alert("screenArray length" + screenProbleLines);
	function addToScreenProbeArray(start, end) {
	    var onDate = new Date(start * 1000);
		var offDate = new Date(end * 1000);
		
		var timeSections = getDividedTimes(onDate.getTime(), offDate.getTime() - onDate.getTime());
		for(var i = 0; i < timeSections.length; i++) {
			var d = timeSections[i].date;
			var when = timeSections[i].when;
			if(screenInfo[d] === undefined ) {
				screenInfo[d] = {"morning":[], "evening":[]};
			}
			screenInfo[d][when].push({"on": timeSections[i].start, "off": timeSections[i].end});
		}
	}

	while( i < screenProbleLines.length) {
		currentLine = screenProbleLines[i];
		i++;
		if(currentLine.length < 3) { continue; }
		if ( mode == 0) {
			if(currentLine[3].toLowerCase()=="true") {
				mode = 1;
				onTimeLine = currentLine.slice(0);
			}
			
			continue;
		} else if ( mode == 1) {
			if(currentLine[3].toLowerCase()=="false") {
				mode = 0;
				offTimeLine = currentLine.slice(0);
				addToScreenProbeArray(onTimeLine[2], offTimeLine[2]);
			}
			continue;
		}
	}
	cb(screenInfo);
}

/*
function parseLocationProbe(locationprobeData, cb) {
	var locationInfo = {};
	var locationLines = $.csv.toArrays(locationprobeData);
		alert("hi");
	for(var i = 1; i < locationLines.length; i++) {
		var onelineSplit = locationLines[i];
		var currentDate = new Date((onelineSplit[2]*1000));
		var endDate = new Date((onelineSplit[2])*1000 + (onelineSplit[5])*1000);
		var locationID = onelineSplit[3];
		var locationColor = onelineSplit[4];

		var timeSections = getDividedTimes(currentDate.getTime(), endDate.getTime() - currentDate.getTime());
		for(var j = 0; j < timeSections.length; j++) {
			var d = timeSections[j].date;
			var when = timeSections[j].when;
			if(locationInfo[d] === undefined ) {
				locationInfo[d] = {"morning":[], "evening":[]};
			}
			locationInfo[d][when].push({"time": timeSections[j].start, "endtime": timeSections[j].end, location_id: locationID, location_color: locationColor});
		}
	}
	cb(locationInfo);
}
*/
function parseLocationProbe(locationprobeData, cb) {
	var locationInfo = {};
	var locationLines = $.csv.toArrays(locationprobeData);
	//alert("hi");
	    	for(var i = 1; i < locationLines.length; i++) {
		var onelineSplit = locationLines[i];
		var currentDate = new Date((onelineSplit[2]*1000));
		var endDate = new Date((onelineSplit[2])*1000 + (onelineSplit[5])*1000);
		var locationID = onelineSplit[3];
		var locationColor = onelineSplit[4];
    
		var timeSections = getDividedTimes(currentDate.getTime(), endDate.getTime() - currentDate.getTime());
		for(var j = 0; j < timeSections.length; j++) {
			var d = timeSections[j].date;
			var when = timeSections[j].when;
			if(locationInfo[d] === undefined ) {
				locationInfo[d] = {"morning":[], "evening":[]};
			}
			locationInfo[d][when].push({"time": timeSections[j].start, "endtime": timeSections[j].end, location_id: locationID, location_color: locationColor});
		}
	}
	cb(locationInfo);
}



function parseSmsProbe(smsprobeData, cb) {
	var smsInfo = {};
	var smsLines = $.csv.toArrays(smsprobeData);
	for(var i = 1; i < smsLines.length; i++) {
		var onelineSplit = smsLines[i];
		var currentDate = new Date(onelineSplit[0]);
		var year = currentDate.getFullYear();
		var month = currentDate.getMonth();
		var date = currentDate.getDate();
		var hour = currentDate.getHours();
		//alert("hour = "  + hour);
					var key = month + "/" + date + "/" + year;

		if(smsInfo[key] === undefined ) {
			smsInfo[key] = {"morning": [], "evening": []};
		}
		if(hour < 12) {
			smsInfo[key]["morning"].push({time: currentDate.getTime(), type: onelineSplit[1], in: onelineSplit[1], out: onelineSplit[2]});
		} else {
			smsInfo[key]["evening"].push({time: currentDate.getTime(), type: onelineSplit[1], in: onelineSplit[1], out: onelineSplit[2]});
		}
	}
	cb(smsInfo);
}




function parseCallLogProbe(calllogprobeData, cb) {
	var calllogInfo = {};
	var calllogLines = $.csv.toArrays(calllogprobeData);
//	alert("callLog" + calllogLines[1][0] + " " + calllogLines[1][1] + " " + calllogLines[1][3]);
	for(var i = 1; i < calllogLines.length; i++) {
		var onelineSplit = calllogLines[i];
		var currentDate = new Date(onelineSplit[0] );
		var endDate = new Date(onelineSplit[0]  + onelineSplit[1] * 1000);
		if(onelineSplit[1] == '0') {
			continue;
		}
		var timeSections = getDividedTimes(currentDate.getTime(), endDate.getTime() - currentDate.getTime());
		for(var j = 0; j < timeSections.length; j++) {
			var d = timeSections[j].date;
			var when = timeSections[j].when;
			if(calllogInfo[d] === undefined ) {
				calllogInfo[d] = {"morning":[], "evening":[]};
			}
			calllogInfo[d][when].push({time: timeSections[j].start, endtime: timeSections[j].end, type: onelineSplit[3]});
		}
	}
	cb(calllogInfo);
}
//onchange='readText(this)' 

function saveNote() {
	if(useHosting) {
		$.ajax({
			url: 'server.php',
			type: 'GET',
			data: {
				mode: "savenote",
				id: id,
				date: CURRENTDATE.getMonth()+'/'+CURRENTDATE.getDate()+'/'+CURRENTDATE.getFullYear(),
				note1: $("#note_1").val(),
				note2: $("#note_2").val(),
				note3: $("#note_3").val()
			},
			//dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				alert(data);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(textStatus + ': ' + errorThrown);
			}
		});
	}
}
function getNote() {
	if(useHosting) {
		$.ajax({
			url: 'server.php',
			type: 'GET',
			data: {
				mode: "getnote",
				date: CURRENTDATE.getMonth()+'/'+CURRENTDATE.getDate()+'/'+CURRENTDATE.getFullYear(),
				id: id
			},
			dataType: 'json',
			success: function(data, textStatus, jqXHR) {
				if(data.length == 1) {
					$("#note_1").val(data[0].note_1);
					$("#note_2").val(data[0].note_2);
					$("#note_3").val(data[0].note_3);
				} else {
					$("#note_1").val("");
					$("#note_2").val("");
					$("#note_3").val("");
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert(textStatus + ': ' + errorThrown);
			}
		});
	}
}
$( document ).ready(function(){
	$('#fileUploader').change();

	$('.datenav_date').on('click', function() {
		$('.date-pick').show();
		$('.date-pick').position({
			of: $(this),
			my: "center bottom",
			at: "center top"
		});
	});

/*
	function syncDate() {
		CURRENTDATE = $('.date-pick').datepicker( "getDate" );
		$('.datenav_date').text(moment($('.date-pick').datepicker( "getDate" )).format('dddd, MMMM Do, YYYY'));
		updateGraph();
		getNote();
	}

	$('.datenav_prev').on('click', function() {
		var prevDate = $('.date-pick').datepicker( "getDate" ).getTime() - 1000 * 60 * 60 * 24;
		$('.date-pick').datepicker( "setDate", (new Date(prevDate)) );
		syncDate();
	});
	$('.datenav_next').on('click', function() {
		var nextDate = $('.date-pick').datepicker( "getDate" ).getTime() + 1000 * 60 * 60 * 24;
		$('.date-pick').datepicker( "setDate", (new Date(nextDate)) );
		syncDate();
	});

	$('.date-pick').hide();
	$('.date-pick').datepicker( {
		onSelect: function(date) {
			syncDate();
			$('.date-pick').hide();
		},
		selectWeek: true,
		inline: true,
		firstDay: 1,
		dateFormat: "DD, d MM, yy"
	});
*/

	$('.graph_config input[type="checkbox"]').on('click', function() {
		graphStatus.screenprobe = $("#chk_screenon").is(":checked");
		graphStatus.appused = $("#chk_appused").is(":checked");
		graphStatus.locationprobe = $("#chk_location").is(":checked");
		graphStatus.socialprobe = $("#chk_social").is(":checked");
		graphStatus.calllogprobe = $("#chk_calllog").is(":checked");
		updateGraph();
	});
	
	drawForm();
	syncDate();
});


// COOKIES
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
var gFileData = {
		screenProbe: [],
		applicationProbe: [],
		applicationProbeSet: [],
		//applicationProbeColors: d3.scale.category20().domain(d3.range(40)),
		locationProbe: [],
		smsProbe: [],
		smsProbeColors: {"in": "#5AC8F8", "out": "#F9B548"},
		callLogProbe: [],
		callLogProbeColors: {"1": "#00C0FF", "2": "#CCC0C0"}
};


$('#fileUploader').on('change', function(){
	readMultipleFile(this);
});



function readMultipleFile(filePath) {
	
    	var screenProbe = "";
    	for(var i = 0; i < filePath.files.length; i++) {
    		
    		(function(file){
    			var name = file.name;
    			var reader = new FileReader();
				reader.onabort = function(e) {
					console.log(e);
				}
    			reader.onloadend = function(e){
    				if (name.indexOf("RunningApplicationsProbe") != -1){
    					parseApplicationDate(e.target.result, function(data, appSet){
							gFileData.applicationProbe = data;
							gFileData.applicationProbeSet = appSet;
						});
					} 
					else if (name.indexOf("ScreenProbe") != -1){
    					parseScreenProbe(e.target.result, function(data) {
							gFileData.screenProbe = data;
							$.each(gFileData.screenProbe, function(key, value){
								if(key.charAt(0) == 0){
									var dateInfo = key.split('/');
									var number = +dateInfo[1];
									var myobj = {};
									if(number > 0 && number < 8){
										myobj.week = 1;
									}
									else if(number > 7 && number < 14){
										myobj.week = 2;
									}
									else if(number > 13 && number < 21){
										myobj.week = 3;
									}
									else {
										myobj.week = 4;
									}
									if($.inArray(number, [1, 8, 15, 22]) != -1){
										myobj.day = 1;
									}
									else if($.inArray(number, [2, 9, 16, 23]) != -1){
										myobj.day = 2;
									}
									else if($.inArray(number, [3, 10, 17, 24]) != -1){
										myobj.day = 3;
									}
									else if($.inArray(number, [4, 11, 18, 25]) != -1){
										myobj.day  = 4;
									}
									else if($.inArray(number, [5, 12, 19, 26]) != -1){
										myobj.day = 5;
									}
									else if($.inArray(number, [6, 13, 20, 27]) != -1){
										myobj.day = 6;
									}
									else {
										myobj.day = 7;
									}
									var count = value.morning.length + value.evening.length;
									myobj.val = count;
									heatmapArray.push(myobj);
								}
							});
						});
						makeHeatmap(heatmapArray);
    				} 
    				else if (name.indexOf("LocationProbe") != -1){
						parseLocationProbe(e.target.result, function(data) {
							gFileData.locationProbe = data;
						});
					} 
					else if (name.indexOf("SmsProbe") != -1){
						parseSmsProbe(e.target.result, function(data) {
							gFileData.smsProbe = data;
						});
					} 
					else if (name.indexOf("CallLogProbe") != -1){
						parseCallLogProbe(e.target.result, function(data) {
							gFileData.callLogProbe = data;
						});
					}

					//updateGraph();
    			}
    			// when read operation is finished, onloadend fires
    			reader.readAsText(file);
    		})(filePath.files[i]);

    	}
    	
}




function parseScreenProbe(screenprobeData, cb) {
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

function getDateAsString(time) {
		var d = new Date(time);
		return d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
}

/*
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
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
*/
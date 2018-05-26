$(document).ready(function() {

	$('.main-menu .elem-head:not(.section-header):not(.no-active)').click(function() {
		$(this).toggleClass('active');
		$('.main-menu .elem-head').not(this).removeClass('active');
	});

	/* GOOGLE CHARTS */
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {

		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work',     11],
			['Eat',      2],
			['Commute',  2],
			['Watch TV', 2],
			['Sleep',    7]
			]);

		var options = {
			title: 'My Daily Activities'
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));

		chart.draw(data, options);
	}

	google.charts.load('current', {packages: ['corechart', 'bar']});
	google.charts.setOnLoadCallback(drawBasic);

	function drawBasic() {

		var data = google.visualization.arrayToDataTable([
			['City', '2010 Population',],
			['New York City, NY', 8175000],
			['Los Angeles, CA', 3792000],
			['Chicago, IL', 2695000],
			['Houston, TX', 2099000],
			['Philadelphia, PA', 1526000]
			]);

		var options = {
			title: 'Population of Largest U.S. Cities',
			chartArea: {width: '30%'},
			hAxis: {
				title: 'Total Population',
				minValue: 0
			},
			vAxis: {
				title: 'City'
			}
		};

		var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

		chart.draw(data, options);
	}

	google.charts.load('current', {
		'packages':['geochart'],
		// Note: you will need to get a mapsApiKey for your project.
		// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
		'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
	});
	google.charts.setOnLoadCallback(drawRegionsMap);

	function drawRegionsMap() {
		var data = google.visualization.arrayToDataTable([
			['Country', 'Popularity'],
			['Germany', 200],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['France', 600],
			['RU', 700]
			]);

		var options = {};

		var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

		chart.draw(data, options);
	}

	google.charts.load('current', { 'packages': ['map'] });
	google.charts.setOnLoadCallback(drawMap);

	function drawMap() {
		var data = google.visualization.arrayToDataTable([
			['Country', 'Population'],
			['China', 'China: 1,363,800,000'],
			['India', 'India: 1,242,620,000'],
			['US', 'US: 317,842,000'],
			['Indonesia', 'Indonesia: 247,424,598'],
			['Brazil', 'Brazil: 201,032,714'],
			['Pakistan', 'Pakistan: 186,134,000'],
			['Nigeria', 'Nigeria: 173,615,000'],
			['Bangladesh', 'Bangladesh: 152,518,015'],
			['Russia', 'Russia: 146,019,512'],
			['Japan', 'Japan: 127,120,000']
			]);

		var options = {
			showTooltip: true,
			showInfoWindow: true
		};

		var map = new google.visualization.Map(document.getElementById('chart1_div'));

		map.draw(data, options);
	};

	google.charts.setOnLoadCallback(drawTrendlines);
	function drawTrendlines() {
		var data = google.visualization.arrayToDataTable([
			['Diameter', 'Age'],
			[8, 37], [4, 19.5], [11, 52], [4, 22], [3, 16.5], [6.5, 32.8], [14, 72]]);

		var options = {
			title: 'Age of sugar maples vs. trunk diameter, in inches',
			hAxis: {title: 'Diameter'},
			vAxis: {title: 'Age'},
			legend: 'none',
	trendlines: { 0: {} }    // Draw a trendline for data series 0.
};

var chart = new google.visualization.ScatterChart(document.getElementById('trendlines_div'));
chart.draw(data, options);
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartLines);

function drawChartLines() {
	var data = new google.visualization.DataTable();
	data.addColumn('number', 'x');
	data.addColumn('number', 'values');
	data.addColumn({id:'i0', type:'number', role:'interval'});
	data.addColumn({id:'i1', type:'number', role:'interval'});
	data.addColumn({id:'i2', type:'number', role:'interval'});
	data.addColumn({id:'i2', type:'number', role:'interval'});
	data.addColumn({id:'i2', type:'number', role:'interval'});
	data.addColumn({id:'i2', type:'number', role:'interval'});
	
	data.addRows([
		[1, 100, 90, 110, 85, 96, 104, 120],
		[2, 120, 95, 130, 90, 113, 124, 140],
		[3, 130, 105, 140, 100, 117, 133, 139],
		[4, 90, 85, 95, 85, 88, 92, 95],
		[5, 70, 74, 63, 67, 69, 70, 72],
		[6, 30, 39, 22, 21, 28, 34, 40],
		[7, 80, 77, 83, 70, 77, 85, 90],
		[8, 100, 90, 110, 85, 95, 102, 110]]);
	
		// The intervals data as narrow lines (useful for showing raw source data)
		var options_lines = {
			title: 'Line intervals, default',
			curveType: 'function',
			lineWidth: 4,
			intervals: { 'style':'line' },
			legend: 'none'
		};
		
		var chart_lines = new google.visualization.LineChart(document.getElementById('chart_lines'));
		chart_lines.draw(data, options_lines);
	}

});
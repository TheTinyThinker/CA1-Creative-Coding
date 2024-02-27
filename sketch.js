let data;
let cleanData = [];
let cleanDataV2 = [];
let barCharts = [];

let fontLight;
let fontReg;
let fontBold;

let canvasWidth = 1600;
let canvasHeight = 1400;
let backgroundColour = "#e3e3e3";

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
    data = loadTable("data/CombindedSmokngDataCSV.csv", "csv", "header");
    fontLight = loadFont('Fonts/Montserrat-BlackItalic.ttf');
    fontReg = loadFont('Fonts/Montserrat-ExtraLight.ttf');
    fontBold = loadFont('Fonts/Montserrat-BoldItalic.ttf');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    angleMode(DEGREES); // Set angle mode for consistent rotation units

    // Parse CSV data properly
// Corrected Data Parsing in setup()
cleanData = data.getRows().map(row => ({
    yAxisValue: float(row.get('Total')), // Represents the bar height, should be numeric.
    xAxisLabel: row.get('Age Group'), // Represents the bar label.

}));

cleanDataV2 = data.getRows().map(row => ({
    xAxisLabel: row.get('Age Group'),
    Male: parseFloat(row.get('Male')),
    Female: parseFloat(row.get('Female')),
    total: parseFloat(row.get('Total')) // Assuming there's a 'Total' column in your CSV
}));

function transformData(rawData) {
    return rawData.map(row => {
        // Directly use yAxisValue without attempting to split into male/female
        const value = parseFloat(row.yAxisValue); // Ensure the value is a number
        if (isNaN(value)) {
//            console.error("Invalid data encountered", row);
            return null; // Skip invalid rows
        }
        return {
            xAxisLabel: row.xAxisLabel,
            yAxisValue: value, // Use directly
        };
    }).filter(item => item !== null); // Filter out any null items
}

    // Define bar chart configuration
// Updated bar chart configuration with titles
let barChartConfig = {
    x: 100,
    y: 500,
    w: 400,
    h: 400,
    data: cleanData, // Assuming cleanData is defined elsewhere
    titleSize: 20,
    titleColor: '#000', // Corrected property name for color
    titleText: 'Totals Bar chart', // Specify your chart title here
    axisTitleSize: 14,
    axisTitleColor: '#000',
    xAxisTitle: 'X-Axis Label', // Specify your X-axis title here
    yAxisTitle: 'Y-Axis Label', // Specify your Y-axis title here
    barWidth: 30,
    barColor: "#416096",
    axisLineColor: "#474747",
    axisLineThickness: 2,
    barStrokeColor: "#474747",
    barStrokeThickness: 1,
    numTicks: 5,
    tickColor: '#000',
    tickStrokeWeight: 1,
    tickStrokeLength: 10,
    tickPadding: 10,
    tickTextColor: '#000', // Corrected to match example tick color
    tickTextSize: 12,
    labelColor: '#000', // Corrected to ensure consistency in color properties
    labelTextSize: 12,
    labelPadding: 15,
    labelRotation: -65 // Adjusted to match the initial class example if needed
};

    barCharts.push(new BarChart(barChartConfig));

    let barChartConfigHor = {
        x: 650,
        y: 100, 
        w: 400,
        h: 400,
        data: cleanData, // Assume 'cleanData' is already defined
        barWidth: 30, // Used as barHeight in horizontal charts
        barColor: "#416096",
        axisLineColor: "#474747",
        axisLineThickness: 2,
        barStrokeColor: "#474747",
        barStrokeThickness: 1,
        numTicks: 5,
        tickColor: '#000',
        tickStrokeWeight: 1,
        tickStrokeLength: 10,
        tickPadding: 10,
        tickTextColor: '#000',
        tickTextSize: 12,
        labelColor: '#000',
        labelTextSize: 12,
        labelPadding: 15,
        titleText: 'Horizontal Bar Chart Smoking totals',
        titleSize: 24,
        titleColor: '#000',
        xAxisTitle: 'X-Axis Number range',
        yAxisTitle: 'Y-Axis Ages',
        axisTitleSize: 16,
        axisTitleColor: '#000',
    };
    
    barCharts.push(new BarChartHorizontal(barChartConfigHor));
    

    let transformedData = transformData(cleanDataV2);
   // console.log(transformedData)

    let stackedBarChartConfig = {
        x: 100,
        y: 1100,
        w: 400,
        h: 400,
        data: cleanDataV2, // Prepared data array
        barWidth: 30,
        axisLineColor: "#474747",
        axisLineThickness: 2,
        barColors: ['#416096', '#FF69B4'], // Example color array
        labelTextSize: 12,
        labelColor: "#474747",
        chartType: "stacked", // or "stacked" / "standard"
        numTicks: 5,
        tickLength: 10,
        tickPadding: 5,
        tickTextColor: "#474747",
        tickTextSize: 12,
        labelPadding: 90,
        xAxisTitle: "X Axis Age ranges",
        yAxisTitle: "Y Number range",
        chartTitle: "Stacked/Standard Bar chart",
        titleTextSize: 14,
        titleTextColor: "#333",
        legendText: "male",
        legendTextColor: "#000",
        legendRectColor: "red", // Matching the point color
        legendSize: 12,
        chartTitleOffset: 50, // Distance from the top of the chart to the chart title
        yAxisTitleOffset: 60, // Distance from the chart to the Y-axis title
        xAxisTitleOffset: 60, // Distance from the chart to the X-axis title
        legendOffset: {x: 350, y: 50}, // Position of the legend box relative to the chart
    };
    
   barCharts.push(new BarChartStacked2(stackedBarChartConfig));
    

    // Define bar chart configuration
    let stackedBarChartConfig2 = {
        XOffset: 600, // X offset for the chart's position
        YOffset: 1100, // Y offset for the chart's position
        titleSize: 16,
        titleColor: "#000000",
        titleText: "Stacked Bar Chart Example with average line",
        xAxisTitle: "X Axis Age range",
        yAxisTitle: "Y Axis number range",
        axisTitleColor: "#474747",
        axisTitleSize: 14,
        titleWidth: 400,
        chartWidth: 400, // Width of the chart
        chartHeight: 400, // Height of the chart
        data: cleanDataV2, // Prepared data array
        barWidth: 30,
        axisLineColor: "#474747",
        axisLineThickness: 2,
        barColors: ['#416096', '#FF69B4' , '#1CA91E'], // Color array for bars
        barStrokeThickness: 1,
        barStrokeColor: "#000000",
        labelTextSize: 12,
        labelColor: "#474747",
        labelPadding: 35, // Padding for labels below bars
        tickTextRotate: -65, // Angle for tick text rotation
        numTicks: 5,
        tickStrokeLength: 10,
        tickPadding: 5,
        tickColor: "#474747",
        tickTextColor: "#474747",
        tickTextSize: 12,
        
        tickDecimals: 0, // Number of decimal places for tick labels
        chartType: "standard", // "stacked" for stacked bars, alternative could be "standard" for regular bars
        showAverageLine: true, // Option to show the average line across the chart
        averageLineColor: "#FF0000", // Color for the average line
        averageLineThickness: 2 // Thickness for the average line
    };   
       barCharts.push(new BarChartStackedLine(stackedBarChartConfig2));

       let scatterPlotConfig = {
        XOffset: 1100,
        YOffset: 700,
        w: 400, // Chart width
        h: 400, // Chart height
        data: cleanData, // Your data array
        titleSize: 16,
        titleColor: "black",
        
        titleWidth: 400, // Assuming the width of the title or chart is 400
        axisLineColor: "#333",
        axisLineThickness: 2,
        tickColor: "#333",
        tickStrokeWeight: 1,
        tickStrokeLength: 10,
        tickPadding: 5,
        numTicksX: 5, // Number of ticks along the X-axis
        numTicksY: 5, // Number of ticks along the Y-axis
        tickTextColor: "black",
        tickTextSize: 12,
        tickDecimals: 1,
        pointSize: 7,
        pointColor: "red",
        labelTextSize: 12,
        labelTextRotate: -65,
        labelColor: "black",
        xAxisLabelOffset: 40,
        chartWidth: 400,
        chartHeight: 400,
        // New properties for titles and legend
        chartTitle: "Overall Data Distribution",
        chartTitleSize: 20,
        chartTitleColor: "#000",
        xAxisTitle: "Ages range of smokers",
        yAxisTitle: "Total amount of smokers",
        axisTitleSize: 14,
        axisTitleColor: "#000",
        legendText: "Data Points",
        legendTextColor: "#000",
        legendRectColor: "red", // Matching the point color
        legendSize: 12,
        chartTitleOffset: 50, // Distance from the top of the chart to the chart title
        yAxisTitleOffset: 60, // Distance from the chart to the Y-axis title
        xAxisTitleOffset: 60, // Distance from the chart to the X-axis title
        legendOffset: {x: 350, y: 50}, // Position of the legend box relative to the chart
    };
    barCharts.push(new ScatterPlot(scatterPlotConfig));

    let BarChartAltConfig = {
        XOffset: 1100, // X offset for the chart's position
        YOffset: 500, // Y offset for the chart's position
        titleSize: 16,
        titleColor: "#000000",
        titleText: "Stacked Bar Chart Example",
        chartTitle : 'Grouped Bar chart', // Default chart title
        xAxisTitle :'Age range', // Default X axis title
        yAxisTitle :'Total number range',
        titleWidth: 400,
        chartWidth: 400, // Width of the chart
        chartHeight: 400, // Height of the chart
        data: cleanDataV2, // Prepared data array
        barWidth: 30,
        axisLineColor: "#474747",
        axisLineThickness: 2,
        barColors: ['#416096', '#FF69B4' , '#1CA91E'], // Color array for bars
        barStrokeThickness: 1,
        barStrokeColor: "#000000",
        labelTextSize: 12,
        labelColor: "#474747",
        labelPadding: 55, // Padding for labels below bars
        tickTextRotate: -85, // Angle for tick text rotation
        numTicks: 5,
        tickStrokeLength: 10,
        tickPadding: 5,
        tickColor: "#474747",
        tickTextColor: "#474747",
        tickTextSize: 12,
        
        tickDecimals: 0, // Number of decimal places for tick labels
        //chartType: "stacked", // "stacked" for stacked bars, alternative could be "standard" for regular bars
        showAverageLine: true, // Option to show the average line across the chart
        averageLineColor: "#FF0000", // Color for the average line
        averageLineThickness: 2 // Thickness for the average line
    };
    
    barCharts.push(new BarChartStandardLineAlt(BarChartAltConfig));
    
}





function draw() {
    background(backgroundColour);
    textFont(fontLight);
    textSize(26);
    fill('#000');
    text("People who smoke and there age ranges", 20, 30);

    barCharts.forEach(barChart => barChart.render());
  
}

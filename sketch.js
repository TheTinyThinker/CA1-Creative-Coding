let data;
let cleanData = [];
let cleanDataV2 = [];
let barCharts = [];

let fontLight;
let fontReg;
let fontBold;

let canvasWidth = 1600;
let canvasHeight = 1200;
let backgroundColour = "#e3e3e3";

function preload() {
    data = loadTable("data/Combined.csv", "csv", "header");
    data = loadTable("data/CombindedSmokngDataCSV.csv", "csv", "header");
    fontLight = loadFont('Fonts/Montserrat-BlackItalic.ttf');
  //  fontReg = loadFont('Fonts/Montserrat-ExtraLight.ttf');
   // fontBold = loadFont('Fonts/Montserrat-BoldItalic.ttf');
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
    let barChartConfig = {
        x: 100,
        y: 500, 
        w: 400,
        h: 400,
        data: cleanData,
        barWidth: 30,
        barColor: "#416096",
        axisLineColor: "#474747",
        axisLineThickness: 2,
        barStrokeColor: "#474747",
        barStrokeThickness: 1,
        numTicks: 5,
        tickColor: '#000',
		titleColour: '#255',
        tickStrokeWeight: 1,
		tickStrokeLength: 10,
        tickPadding: 10,
        tickTextColor: '#255',
        tickTextSize: 12,
        labelColor: '#255', // Ensure this matches with BarChart class
        labelTextSize: 12,
        labelPadding: 15,
        labelRotation: 60 // Example rotation
    };

    barCharts.push(new BarChart(barChartConfig));

        // Define bar chart configuration
        let barChartConfigHor = {
            x: 650,
            y: 100, 
            w: 400,
            h: 400,
            data: cleanData,
            barWidth: 30,
            barColor: "#416096",
            axisLineColor: "#474747",
            axisLineThickness: 2,
            barStrokeColor: "#474747",
            barStrokeThickness: 1,
            numTicks: 5,
            tickColor: '#000',
            titleColour: '#255',
            tickStrokeWeight: 1,
            tickStrokeLength: 10,
            tickPadding: 10,
            tickTextColor: '#255',
            tickTextSize: 12,
            labelColor: '#255', // Ensure this matches with BarChart class
            labelTextSize: 12,
            labelPadding: 15,
            labelRotation: 60 // Example rotation
        };
    barCharts.push(new BarChartHorizontal (barChartConfigHor));

    let transformedData = transformData(cleanDataV2);
    console.log(transformedData)

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
    };
    
    // Initialize your bar chart with the correctly set configuration
    barCharts.push(new BarChartStacked2(stackedBarChartConfig));
    
    console.log(cleanDataV2)
    
  //  barCharts.push(new BarChartStacked(stackedBarChartConfig));
    

//         // Define bar chart configuration
//         let ScatterChartConfig = {
//             x: 600,
//             y: 600, 
//             w: 400,
//             h: 400,
//             data: cleanData,
//             barWidth: 30,
//             barColor: "#416096",
//             axisLineColor: "#474747",
//             axisLineThickness: 2,
//             barStrokeColor: "#474747",
//             barStrokeThickness: 1,
//             numTicks: 5,
//             tickColor: '#000',
//             titleColour: '#255',
//             tickStrokeWeight: 1,
//             tickStrokeLength: 10,
//             tickPadding: 10,
//             tickTextColor: '#255',
//             tickTextSize: 12,
//             labelColor: '#255', // Ensure this matches with BarChart class
//             labelTextSize: 12,
//             labelPadding: 15,
//             labelRotation: 60 // Example rotation
//         };
//     barCharts.push(new ScatterPlot(ScatterChartConfig));
//console.log(cleanData)
// let barChartConfigHor2 = {
//     x: 650,
//     y: 650, 
//     w: 400,
//     h: 500,
//     data: cleanDataV2,
//     barWidth: 20,
//     barColor: "#416096",
//     axisLineColor: "#474747",
//     axisLineThickness: 2,
//     barStrokeColor: "#474747",
//     barStrokeThickness: 1,
//     numTicks: 5,
//     tickColor: '#000',
//     titleColour: '#255',
//     tickStrokeWeight: 1,
//     tickStrokeLength: 10,
//     tickPadding: 10,
//     tickTextColor: '#255',
//     tickTextSize: 12,
//     labelColor: '#255', // Ensure this matches with BarChart class
//     labelTextSize: 12,
//     labelPadding: 15,
//     labelRotation: 60 // Example rotation
// };
// barCharts.push(new BarChartHorizontal2 (barChartConfigHor2));

// let barChartConfigGrouped = {
//     x: 1200,
//     y: 1100, 
//     w: 400,
//     h: 400,
//     data: cleanDataV2,
//     barWidth: 15,
//     barColor: "#416096",
//     axisLineColor: "#474747",
//     axisLineThickness: 2,
//     barStrokeColor: "#474747",
//     barStrokeThickness: 1,
//     numTicks: 5,
//     tickColor: '#000',
//     titleColour: '#255',
//     tickStrokeWeight: 1,
//     tickStrokeLength: 10,
//     tickPadding: 10,
//     tickTextColor: '#255',
//     tickTextSize: 12,
//     labelColor: '#255', // Ensure this matches with BarChart class
//     labelTextSize: 12,
//     labelPadding: 15,
//     labelRotation: 60 // Example rotation
// };
// barCharts.push(new BarChartGrouped (barChartConfigGrouped));

    // Define bar chart configuration
    let stackedBarChartConfig2 = {
        XOffset: 600, // X offset for the chart's position
        YOffset: 1100, // Y offset for the chart's position
        titleSize: 16,
        titleColor: "#000000",
        titleText: "Stacked Bar Chart Example",
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
        labelPadding: 15, // Padding for labels below bars
        tickTextRotate: 85, // Angle for tick text rotation
        numTicks: 5,
        tickStrokeLength: 10,
        tickPadding: 5,
        tickColor: "#474747",
        tickTextColor: "#474747",
        tickTextSize: 12,
        
        tickDecimals: 0, // Number of decimal places for tick labels
        chartType: "stacked", // "stacked" for stacked bars, alternative could be "standard" for regular bars
        showAverageLine: true, // Option to show the average line across the chart
        averageLineColor: "#FF0000", // Color for the average line
        averageLineThickness: 2 // Thickness for the average line
    };
    
    
    // Initialize your bar chart with the correctly set configuration
    barCharts.push(new BarChartStackedLine(stackedBarChartConfig2));

    let scatterPlotConfig = {
        XOffset: 1100,
        YOffset: 700,
        w: 400,
        h: 400,
        data: cleanData,
        pointSize: 15,
        axisLineColor: "#474747",
        axisLineThickness: 2,
        labelTextSize: 12,
        labelColor: "#474747",
        numTicks: 5,
        tickPadding: 5,
        tickTextColor: "#474747",
        tickTextSize: 12,
    };
    
    // Initialize your scatter plot with the correctly set configuration
   
    
    // Initialize your bar chart with the correctly set configuration
    barCharts.push(new ScatterPlot(scatterPlotConfig));

    let BarChartAltConfig = {
        XOffset: 1100, // X offset for the chart's position
        YOffset: 500, // Y offset for the chart's position
        titleSize: 16,
        titleColor: "#000000",
        titleText: "Stacked Bar Chart Example",
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
        labelPadding: 15, // Padding for labels below bars
        tickTextRotate: 85, // Angle for tick text rotation
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
    
    // Initialize your scatter plot with the correctly set configuration
   
    
    // Initialize your bar chart with the correctly set configuration
    barCharts.push(new BarChartStandardLineAlt(BarChartAltConfig));
    
}





function draw() {
    background(backgroundColour);
   // textFont(fontLight);
    textSize(16);
    fill('#000');
    text("people who smoke and there ages", 20, 30);

    barCharts.forEach(barChart => barChart.render());
  
}

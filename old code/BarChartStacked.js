// Define the BarChartStacked class
class BarChartStacked {
	// Constructor to initialize the object
	constructor(obj) {
		// Use Object.assign to set default properties and overwrite them with obj's properties
		Object.assign(this, {
			XOffset: obj.XOffset,
			YOffset: obj.YOffset,
			titleSize: obj.titleSize,
			titleColor: obj.titleColor,
			titleText: obj.titleText,
			titleWidth: obj.w,
			axisLineColor: obj.axisLineColor,
			axisLineThickness: obj.axisLineThickness,
			tickColor: obj.tickColor,
			tickStrokeWeight: obj.tickStrokeWeight,
			tickStrokeLength: obj.tickStrokeLength,
			tickPadding: obj.tickPadding,
			numTicks: obj.numTicks,
			tickTextColor: obj.tickTextColor,
			tickTextSize: obj.tickTextSize,
			tickDecimals: obj.tickDecimals,
			barWidth: obj.barWidth,
			barColors: obj.barColors, // Default colors for male and female
			barStrokeThickness: obj.barStrokeThickness,
			barStrokeColor: obj.barStrokeColor,
			labelTextSize: obj.labelTextSize,
			labelColor: obj.labelColor,
			chartWidth: obj.w,
			chartHeight: obj.h,
			
		}, obj);
		this.numBars = this.data.length; // Calculate the number of bars based on the data length
	}

	// Render function to draw the chart
	render() {
		push(); // Save the current drawing state
		translate(this.x, this.y); // Move the origin to the chart's position

		// Draw the chart axes
		stroke(this.axisLineColor);
		strokeWeight(this.axisLineThickness);
		line(0, 0, 0, -this.h); // Vertical axis
		line(0, 0, this.w, 0); // Horizontal axis

		// Calculate spacing and scaling
		let barGap = (this.w - this.numBars * this.barWidth) / (this.numBars + 1); // Calculate gap between bars

		let maxValue = this.chartType === "stacked" ?
			max(this.data.map(item => item.yAxisValues.reduce((a, b) => a + b, 0))) : // For stacked, sum values
			max(this.data.map(item => float(item.yAxisValue))); // For normal, find max value
		let scale = this.h / maxValue; // Calculate scale based on chart height and max value

		// console.log("Data for maxValue calculation:", this.data.map(item => item.yAxisValues.reduce((a, b) => a + b, 0)));
		// console.log("maxValue:", maxValue);
		// console.log("Scale:", scale);
		// Loop to draw bars
		for (let i = 0; i < this.numBars; i++) {
			let xPosition = barGap + i * (this.barWidth + barGap); // Calculate x position for each bar

			// Handling for stacked bars
			if (this.chartType === "stacked") {
				let yPos = 0; // Start position for stacked bars
				this.data[i].yAxisValues.forEach((value, index) => {
					let barHeight = value * scale; // Calculate height of each segment
					let color = index === 0 ? this.barColors.male : this.barColors.female; // Choose color based on index
					fill(color); // Set fill color using the corrected 'color' variable
					stroke(this.barStrokeColor); // Set stroke color
					strokeWeight(this.barStrokeThickness); // Set stroke weight
					rect(xPosition, yPos, this.barWidth, -barHeight); // Draw the segment
					yPos -= barHeight; // Move yPos for the next segment in the stack
				});
			} else {
				// Draw a normal bar if not stacked (This part seems to be hypothetical as your class seems designed for stacked bars)
				let barHeight = this.data[i].yAxisValue * scale;
				fill(this.barColors.male); // Example fix: use a default color or specific logic here
				stroke(this.barStrokeColor); // Set stroke color
				strokeWeight(this.barStrokeThickness); // Set stroke weight
				rect(xPosition, 0, this.barWidth, -barHeight); // Draw the bar
			}

			// Label drawing
			if (this.data[i].xAxisLabel !== undefined) {
				push(); // Save current drawing state
				translate(xPosition + this.barWidth / 2, this.labelPadding); // Move to label position
				rotate(-this.labelRotation); // Rotate for readability
				fill(this.labelColor); // Set label color
				textAlign(CENTER); // Center align text
				textSize(this.labelTextSize); // Set text size
				text(this.data[i].xAxisLabel, 0, 0); // Draw the label
				pop(); // Restore previous drawing state
			}
		}

		// Draw tick marks and labels on the y-axis
		for (let i = 0; i <= this.numTicks; i++) {
			let yPosition = -i * (this.h / this.numTicks); // Calculate y position for each tick
			let tickValue = (maxValue / this.numTicks) * i; // Calculate the value for each tick
			stroke(this.tickColor); // Set stroke color for ticks
			strokeWeight(this.tickStrokeWeight); // Set stroke weight for ticks
			line(0, yPosition, -this.tickStrokeLength, yPosition); // Draw the tick line

			fill(this.tickTextColor); // Set fill color for tick labels
			noStroke(); // Disable stroke for text
			textAlign(RIGHT, CENTER); // Align text to the right and center vertically
			textSize(this.tickTextSize); // Set text size for tick labels
			text(tickValue.toFixed(this.tickDecimals), -this.tickPadding, yPosition); // Draw the tick label
		}

		pop(); // Restore original drawing state
	}
}

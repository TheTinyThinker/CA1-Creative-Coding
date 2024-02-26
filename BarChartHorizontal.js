class BarChartHorizontal {
	constructor(obj) {
		// Similar initialization as BarChart, but adjusted for horizontal orientation
		Object.assign(this, {
			XOffset: 0,
			YOffset: 0,
			titleSize: 16,
			titleColor: "#000",
			titleText: "",
			titleWidth: obj.w,
			axisLineColor: "#000",
			axisLineThickness: 1,
			tickColor: "#000",
			tickStrokeWeight: 1,
			tickStrokeLength: 5,
			tickPadding: 10,
			numTicks: 5,
			tickTextColor: "#000",
			tickTextSize: 12,
			tickDecimals: 0,
			barHeight: 30, // For horizontal bars, we define barHeight instead of barWidth
			barColor: "#000",
			barStrokeThickness: 1,
			barStrokeColor: "#000",
			labelTextSize: 12,
			labelColor: "#000",
			chartWidth: obj.w,
			chartHeight: obj.h
		}, obj);
		this.numBars = this.data.length;
	}

	render() {
		push(); // Save the current drawing style settings and transformations
		translate(this.x, this.y); // Move the origin for the chart

		// Draw X-axis at the bottom of the chart area
		stroke(this.axisLineColor);
		strokeWeight(this.axisLineThickness);
		line(0, this.h, this.w, this.h);

		// Calculate properties for bar placement in horizontal layout
		let barGap = (this.h - this.numBars * this.barHeight) / (this.numBars + 1); // Space between bars
		let maxValue = max(this.data.map(item => float(item.yAxisValue))); // Find maximum value for scaling
		let scale = this.w / maxValue; // Scale factor to fit bars within chart width

		// Draw bars and labels for horizontal layout
		for (let i = 0; i < this.numBars; i++) {
			let barWidth = this.data[i].yAxisValue * scale; // Calculate width of each bar
			let yPosition = barGap + i * (this.barHeight + barGap); // Calculate y position of each bar

			// Draw the bar
			fill(this.barColor);
			stroke(this.barStrokeColor);
			strokeWeight(this.barStrokeThickness);
			rect(0, yPosition, barWidth, this.barHeight); // Draw horizontal bar


			// Draw the label if defined
			if (this.data[i].xAxisLabel !== undefined) {
				push(); // Save the current transformation state
				translate(-this.labelTextSize * 2, yPosition + this.barHeight / 2); // Position for the label
				fill(this.labelColor);
				textAlign(RIGHT, CENTER);
				textSize(this.labelTextSize);
				text(this.data[i].xAxisLabel, 0, 0); // Draw the label text
				pop(); // Restore the transformation state
			}
		}

		// Draw tick marks and labels on the X-axis at the bottom of the chart
		for (let i = 0; i <= this.numTicks; i++) {
			let xPosition = i * (this.w / this.numTicks); // Calculate x position for each tick
			let tickValue = (maxValue / this.numTicks) * i; // Calculate the value for each tick

			// Draw tick line at the bottom
			stroke(this.tickColor);
			strokeWeight(this.tickStrokeWeight);
			line(xPosition, this.h, xPosition, this.h + this.tickStrokeLength); // Draw tick lines extending downward

			// Draw tick label below the tick line
			fill(this.tickTextColor);
			noStroke(); // Disable stroke for text
			textAlign(CENTER, TOP);
			textSize(this.tickTextSize);
			text(tickValue.toFixed(this.tickDecimals), xPosition, this.h + this.tickPadding); // Position labels just below tick lines
		}


		pop(); // Restore the original drawing style settings and transformations
	}
}
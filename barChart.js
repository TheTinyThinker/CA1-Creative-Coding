class BarChart {
	constructor(obj) {
		// Initialize properties from the object passed to the constructor. If properties are not specified, default values are used.
		Object.assign(this, {
			XOffset: obj.x,
			YOffset: obj.y,
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
			barColor: obj.barColor,
			barStrokeThickness: obj.barStrokeThickness,
			barStrokeColor: obj.barStrokeColor,
			labelTextSize: obj.labelTextSize,
			labelColor: obj.labelColor,
			chartWidth: obj.w,
			chartHeight: obj.h
		}, obj);
		this.numBars = this.data.length; // Calculate the number of bars based on the data
	}

	render() {
		push(); // Save the current drawing style settings and transformations
		translate(this.x, this.y); // Move the origin to the bottom left of the chart

		// Draw the axes
		stroke(this.axisLineColor);
		strokeWeight(this.axisLineThickness);
		line(0, 0, 0, -this.chartHeight); // Vertical axis
		line(0, 0, this.chartWidth, 0); // Horizontal axis

		// Calculate properties for bar placement
		let barGap = (this.w - this.numBars * this.barWidth) / (this.numBars + 1); // Space between bars
		let maxValue = max(this.data.map(item => float(item.yAxisValue))); // Maximum value in the data for scaling
		let scale = this.h / maxValue; // Scale factor to fit bars within chart height

		for (let i = 0; i < this.numBars; i++) {
			let barHeight = this.data[i].yAxisValue * scale;
			let xPosition = barGap + i * (this.barWidth + barGap);

			// Draw the bar
			fill(this.barColor);
			stroke(this.barStrokeColor);
			strokeWeight(this.barStrokeThickness);
			rect(xPosition, 0, this.barWidth, -barHeight);

			// Check if label is defined
			if (this.data[i].xAxisLabel !== undefined) {
				push(); // Save the current transformation state
				// Adjust position for the label, taking into account the rotation
				translate(xPosition + this.barWidth / 2, 30); // Position for the label before rotation
				rotate(-85); // Rotate the text for readability; adjust angle as needed
				fill(this.labelColor);
				textAlign(CENTER);
				textSize(this.labelTextSize);
				text(this.data[i].xAxisLabel, -30, 0); // Draw the rotated label text
				pop(); // Restore the transformation state
			}
		}


		// Draw tick marks and labels on the y-axis
		for (let i = 0; i <= this.numTicks; i++) {
			let yPosition = -i * (this.h / this.numTicks); // Calculate y position for each tick
			let tickValue = (maxValue / this.numTicks) * i; // Calculate the value for each tick

			// Draw tick line
			stroke(this.tickColor);
			strokeWeight(this.tickStrokeWeight);
			line(0, yPosition, -this.tickStrokeLength, yPosition); // Tick line perpendicular to the y-axis

			// Draw tick label
			fill(this.tickTextColor);
			noStroke(); // Disable stroke for text
			textAlign(RIGHT, CENTER);
			textSize(this.tickTextSize);
			text(tickValue.toFixed(this.tickDecimals), -this.tickPadding, yPosition);
		}

				// Draw chart title
				push();
				fill(this.titleColor);
				textSize(this.titleSize);
				textAlign(CENTER, BOTTOM);
				text(this.titleText, this.chartWidth / 2, -this.chartHeight - 20); // Adjust position as needed
				pop();
		
				// Draw X-axis title
				push();
				fill(this.axisTitleColor);
				textSize(this.axisTitleSize);
				textAlign(CENTER, TOP);
				text(this.xAxisTitle, this.chartWidth / 2, 120); // Position below the x-axis
				pop();
		
				// Draw Y-axis title
				push();
				fill(this.axisTitleColor);
				textSize(this.axisTitleSize);
				translate(-70, -this.chartHeight / 2); // Adjust position as needed
				rotate(-90);
				textAlign(CENTER, BOTTOM);
				text(this.yAxisTitle, 0, 0);
				pop();

		pop(); // Restore the original drawing style settings and transformations
	}
}










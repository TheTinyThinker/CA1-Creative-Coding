class BarChartHorizontal {
	constructor(obj) {
		// Similar initialization as BarChart, but adjusted for horizontal orientation
		Object.assign(this, {
            XOffset: obj.x,
            YOffset: obj.y,
            titleSize: obj.titleSize,
            titleColor: obj.titleColor,
            titleText: obj.titleText,
            xAxisTitle: obj.xAxisTitle,
            yAxisTitle: obj.yAxisTitle,
            axisTitleSize: obj.axisTitleSize,
            axisTitleColor: obj.axisTitleColor,
			//titleWidth: obj.w,
			axisLineColor: obj.axisLineColor,
			axisLineThickness: obj.axisLineThickness,
			tickColor: obj.tickColor,
			tickStrokeWeight: obj.tickStrokeWeight,
			tickStrokeLength: obj.tickStrokeLength,
			tickPadding: obj.tickPadding,
			numTicks: obj.numTicks,
			tickTextColor: obj.tickTextColor,
			tickTextSize: obj.tickTextSize,
			//tickDecimals: obj.tickDecimals,
			barHeight: obj.barWidth, // For horizontal bars, we define barHeight instead of barWidth
			barColor: obj.barColor,
			barStrokeThickness: obj.barStrokeThickness,
			barStrokeColor: obj.barStrokeColor,
			labelTextSize: obj.labelTextSize,
			labelColor: obj.labelColor,
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

		 // Add rendering for the chart title
		 push();
		 textSize(this.titleSize);
		 fill(this.titleColor);
		 textAlign(CENTER, BOTTOM);
		 text(this.titleText, this.w / 2, -20); // Adjust positioning as needed
		 pop();
 
		 // Add rendering for the X-axis title
		 push();
		 textSize(this.axisTitleSize);
		 fill(this.axisTitleColor);
		 textAlign(CENTER, TOP);
		 text(this.xAxisTitle, this.w / 2, this.h + 40); // Adjust positioning as needed
		 pop();
 
		 // Add rendering for the Y-axis title
		 push();
		 textSize(this.axisTitleSize);
		 fill(this.axisTitleColor);
		 textAlign(CENTER, TOP);
		 translate(-140, this.h / 2); // Adjust positioning as needed
		 rotate(-90);
		 text(this.yAxisTitle, 0, 0);
		 pop();
 


		pop(); // Restore the original drawing style settings and transformations
	}
}
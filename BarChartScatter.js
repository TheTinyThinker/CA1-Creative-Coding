class ScatterPlot {
	constructor(obj) {
		// Initialize properties from the object passed to the constructor. If properties are not specified, default values are used.
		Object.assign(this, {
			XOffset: obj.x,
			YOffset: obj.y,
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
			numTicksX: 5,
			numTicksY: 5,
			tickTextColor: "#000",
			tickTextSize: 12,
			tickDecimals: 0,
			pointSize: 5,
			pointColor: "red",
			labelTextSize: 10,
            labelTextRotate: 85,
			labelColor: "#000",
			chartWidth: obj.w,
			chartHeight: obj.h
		}, obj);
	}

    render() {
		push(); // Save the current drawing style settings and transformations
		translate(this.XOffset, this.YOffset + this.chartHeight); // Move the origin to the bottom left of the chart

		// Draw the axes
		stroke(this.axisLineColor);
		strokeWeight(this.axisLineThickness);
		line(0, 0, 0, -this.chartHeight); // Vertical axis
		line(0, 0, this.chartWidth, 0); // Horizontal axis

		// Calculate scale factors based on data range
       // let maxXValue = this.data.length > 0 ? max(this.data.map(item => item.x)) : 0;
        let maxYValue = this.data.length > 0 ? max(this.data.map(item => item.yAxisValue)) : 0;

        
		//let xScale = this.chartWidth / maxXValue;
		//let yScale = this.chartHeight / maxYValue;
        
        let xScale = this.chartWidth / this.data.length;

        // Draw points
        for (let i = 0; i < this.data.length; i++) {
            // Use the index for positioning along the x-axis, leaving some margin
            let xPosition = (i + 0.5) * xScale; // Centering each point in its "slot"
            let yPosition = -(this.data[i].yAxisValue / maxYValue) * this.chartHeight;
        
            fill(this.pointColor);
            noStroke();
            ellipse(xPosition, yPosition, this.pointSize, this.pointSize);
        }
// Draw x-axis labels
// Draw x-axis labels
for (let i = 0; i < this.data.length; i++) {
    let xPosition = (i + 0.5) * xScale; // Aligning the label with the point

    push(); // Save the current drawing context
    // Move the origin to the position where the label is drawn
    translate(xPosition, this.tickPadding);
    
    rotate(this.labelTextRotate); // Adjust the angle as needed
    fill(this.tickTextColor);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(this.labelTextSize);
    text(this.data[i].xAxisLabel, 0, 0); // Use 0,0 because translation has moved the origin
    pop(); // Restore the previous drawing context
}

       

		// Draw tick marks and labels on the y-axis
        for (let i = 0; i <= this.numTicksY; i++) {
            let yPosition = -i * (this.chartHeight / this.numTicksY);
            let tickValueY = (maxYValue / this.numTicksY) * i;
           // console.log("Max Y Value:", maxYValue, "Num Ticks Y:", this.numTicksY);

			// Draw tick line
			stroke(this.tickColor);
			strokeWeight(this.tickStrokeWeight);
			line(0, yPosition, -this.tickStrokeLength, yPosition); // Tick line perpendicular to the y-axis

			// Draw tick label
			fill(this.tickTextColor);
			noStroke(); // Disable stroke for text
			textAlign(RIGHT, CENTER);
			textSize(this.tickTextSize);
			text(tickValueY.toFixed(this.tickDecimals), -this.tickPadding, yPosition);
		}
       // console.log("Data:", this.data);


		pop(); // Restore the original drawing style settings and transformations
	}
}

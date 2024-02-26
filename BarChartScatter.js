class ScatterPlot {
    constructor(obj) {
        // Initialize properties from the object passed to the constructor. If properties are not specified, default values are used.
        Object.assign(this, {
            XOffset: obj.XOffset || 0,
            YOffset: obj.YOffset || 0,
            titleSize: obj.titleSize || 16,
            titleColor: obj.titleColor || "#000",
            titleText: obj.titleText || "",
            titleWidth: obj.titleWidth || obj.w, // Default to obj.w if titleWidth not specified
            axisLineColor: obj.axisLineColor || "#000",
            axisLineThickness: obj.axisLineThickness || 1,
            tickColor: obj.tickColor || "#000",
            tickStrokeWeight: obj.tickStrokeWeight || 1,
            tickStrokeLength: obj.tickStrokeLength || 5,
            tickPadding: obj.tickPadding || 10,
            numTicksX: obj.numTicksX || 5,
            numTicksY: obj.numTicksY || 5,
            tickTextColor: obj.tickTextColor || "#000",
            tickTextSize: obj.tickTextSize || 12,
            tickDecimals: obj.tickDecimals || 0,
            pointSize: obj.pointSize || 5,
            pointColor: obj.pointColor || "red",
            labelTextSize: obj.labelTextSize || 10,
            labelTextRotate: obj.labelTextRotate || 85,
            labelColor: obj.labelColor || "#000",
           
            xAxisLabelOffset: obj.xAxisLabelOffset || 120, // Added new property for X-axis label offset
            chartWidth: obj.chartWidth || obj.w,
            chartHeight: obj.chartHeight || obj.h,
			chartTitle: obj.chartTitle || "Chart Title", // Default chart title
            chartTitleSize: obj.chartTitleSize || 20,
            chartTitleColor: obj.chartTitleColor || "#000",
            xAxisTitle: obj.xAxisTitle || "X-Axis Title", // Default X-axis title
            yAxisTitle: obj.yAxisTitle || "Y-Axis Title", // Default Y-axis title
            axisTitleSize: obj.axisTitleSize || 14,
            axisTitleColor: obj.axisTitleColor || "#000",
            legendText: obj.legendText || "Legend", // Default legend text
            legendTextColor: obj.legendTextColor || "#000",
            legendRectColor: obj.legendRectColor || this.pointColor, // Match the point color by default
            legendSize: obj.legendSize || 12,
            // New properties for positioning the titles and legend
            chartTitleOffset: obj.chartTitleOffset || 30,
            yAxisTitleOffset: obj.yAxisTitleOffset || 50,
            xAxisTitleOffset: obj.xAxisTitleOffset || 50,
            legendOffset: obj.legendOffset || {x: 50, y: 30}, // Object for legend position
            
            data: obj.data // Make sure to pass data as part of the configuration
        });
    }

    render() {
        push(); // Save the current drawing style settings and transformations
        translate(this.XOffset, this.YOffset + this.chartHeight); // Move the origin to the bottom left of the chart

        // Draw the axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0); // Horizontal axis

        let maxYValue = this.data.length > 0 ? max(this.data.map(item => item.yAxisValue)) : 0;
        let xScale = this.chartWidth / this.data.length;

        // Draw points
        for (let i = 0; i < this.data.length; i++) {
            let xPosition = (i + 0.5) * xScale;
            let yPosition = -(this.data[i].yAxisValue / maxYValue) * this.chartHeight;
        
            fill(this.pointColor);
            noStroke();
            ellipse(xPosition, yPosition, this.pointSize, this.pointSize);
        }

        // Draw x-axis labels
        for (let i = 0; i < this.data.length; i++) {
            let xPosition = (i + 0.5) * xScale; // Aligning the label with the point

            push(); // Save the current drawing context
            translate(xPosition, this.xAxisLabelOffset); // Adjust Y position based on xAxisLabelOffset
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
            let tickValueY = Math.round((maxYValue / this.numTicksY) * i);

            stroke(this.tickColor);
            strokeWeight(this.tickStrokeWeight);
            line(0, yPosition, -this.tickStrokeLength, yPosition);

            fill(this.tickTextColor);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(this.tickTextSize);
            text(tickValueY, -this.tickPadding, yPosition);
        }

		 // Draw chart title
		 push();
		 fill(this.chartTitleColor);
		 textSize(this.chartTitleSize);
		 textAlign(CENTER, BOTTOM);
		 text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - this.chartTitleOffset);
		 pop();
 
		 // Draw X-axis title
		 push();
		 fill(this.axisTitleColor);
		 textSize(this.axisTitleSize);
		 textAlign(CENTER, TOP);
		 text(this.xAxisTitle, this.chartWidth / 2, this.xAxisLabelOffset + 60);
		 pop();
 
		 // Draw Y-axis title
		 push();
		 fill(this.axisTitleColor);
		 textSize(this.axisTitleSize);
		 textAlign(CENTER, BOTTOM);
		 translate(-this.yAxisTitleOffset-20, -this.chartHeight / 2);
		 rotate(-90);
		 text(this.yAxisTitle, 0, 0);
		 pop();
 
		 // Draw legend
		 push();
		 fill(this.legendRectColor);
		 rect(this.legendOffset.x, -this.chartHeight - this.legendOffset.y, 20, 10);
		 fill(this.legendTextColor);
		 textSize(this.legendSize);
		 textAlign(LEFT, CENTER);
		 text(this.legendText, this.legendOffset.x + 25, -this.chartHeight - this.legendOffset.y + 5);
		 pop();

        pop(); // Restore the original drawing style settings and transformations
    }
}

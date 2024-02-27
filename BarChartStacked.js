class BarChartStacked2 {
    constructor(obj) {
        Object.assign(this, {
            XOffset: obj.x,
            YOffset: obj.y,
            chartWidth: obj.w,
            chartHeight: obj.h,
            barWidth: obj.barWidth, // Default provided in sketch.js config
            axisLineColor: obj.axisLineColor,
            axisLineThickness: obj.axisLineThickness,
            barColors: obj.barColors, // Ensure array of colors is provided in config
            labelTextSize: obj.labelTextSize,
            labelColor: obj.labelColor,
            chartType: obj.chartType, // "normal" or "stacked"
            numTicks: obj.numTicks,
            tickLength: obj.tickLength,
            tickPadding: obj.tickPadding,
            tickTextColor: obj.tickTextColor,
            tickTextSize: obj.tickTextSize,
            labelPadding: obj.labelPadding,
            xAxisTitle: obj.xAxisTitle,
            yAxisTitle: obj.yAxisTitle,
            chartTitle: obj.chartTitle,
            titleTextSize: obj.titleTextSize || 16, // Default value if not specified
            titleTextColor: obj.titleTextColor || '#000',
            legendText2: obj.legendText2,
            legendText: obj.legendText || "Legend", // Default legend text
            legendTextColor: obj.legendTextColor || "#000",
            legendRectColor2: obj.legendRectColor2,
            legendRectColor: obj.legendRectColor || this.pointColor, // Match the point color by default
            legendSize: obj.legendSize || 12,
            // New properties for positioning the titles and legend
            chartTitleOffset: obj.chartTitleOffset || 30,
            yAxisTitleOffset: obj.yAxisTitleOffset || 50,
            xAxisTitleOffset: obj.xAxisTitleOffset || 50,
            legendOffset: obj.legendOffset || {x: 50, y: 30}, // Object for legend position
            
            data: obj.data,
        });
        this.numBars = this.data.length;
    }

    render() {
        push();
        translate(this.XOffset, this.YOffset);

        // Drawing the axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis


        // Calculate scale and bar positions
        let maxValue = max(this.data.map(d => this.chartType === "stacked" ? d.total : max([d.Male, d.Female])));
        if (this.chartType === "standard") {
            maxValue = max(this.data.map(d => d.Male + d.Female)); // Use combined values for max
        }
        let scale = this.chartHeight / maxValue;
        let barGap = (this.chartWidth - this.data.length * this.barWidth) / (this.data.length + 1);

        // Drawing bars
        this.data.forEach((item, index) => {
            let xPosition = (index + 1) * barGap + index * this.barWidth;
            let maleHeight = item.Male * scale;
            let femaleHeight = item.Female * scale;

            if (this.chartType === "stacked") {
                fill(this.barColors[0]); // Male
                rect(xPosition, 0, this.barWidth, -maleHeight);
                fill(this.barColors[1]); // Female
                rect(xPosition, -maleHeight, this.barWidth, -femaleHeight);
            } else {
                let totalHeight = (item.Male + item.Female) * scale;
                fill(this.barColors[2] || '#888888'); // Neutral or combined color
                rect(xPosition, 0, this.barWidth, -totalHeight);
            }

            // Drawing X-axis labels
            fill(this.labelColor);
            noStroke();
            textAlign(CENTER, BOTTOM);
            textSize(this.labelTextSize);
            
            //text(item.xAxisLabel, xPosition + this.barWidth / 2, 10);
            push(); // Save the current drawing state
            translate(xPosition + this.barWidth / 2, this.labelPadding); // Move to the label's intended location
            rotate(-85); 
            fill(this.labelColor);
            noStroke();
            textAlign(CENTER);
            textSize(this.labelTextSize);
            text(item.xAxisLabel, 40, 0); // Draw the rotated label
            pop(); // Restore the previous drawing state
        });

// Drawing Y-axis tick marks and labels
for (let i = 0; i <= this.numTicks; i++) {
    // Calculate y position from bottom to top
    let yPosition = - (this.chartHeight / this.numTicks) * i;
    
    // Start value from 0 at the bottom
    let value = (maxValue / this.numTicks) * i;

    stroke(this.axisLineColor);
    line(-this.tickLength, yPosition, 0, yPosition); // Adjust line() call to use new yPosition
    fill(this.tickTextColor);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(this.tickTextSize);

    text(value.toFixed(0), -this.tickLength - this.tickPadding, yPosition);
}
        // Render X Axis Title
        push();
        textAlign(CENTER, TOP);
        textSize(this.titleTextSize);
        fill(this.titleTextColor);
        text(this.xAxisTitle, this.chartWidth / 2, this.tickLength + this.tickPadding * 2 +80);
        pop();

        // Render Y Axis Title
        push();
        translate(-this.tickLength * 4, -this.chartHeight / 2 );
        rotate(-90);
        textAlign(CENTER, TOP);
        textSize(this.titleTextSize);
        fill(this.titleTextColor);
        text(this.yAxisTitle, 0, -50);
        pop();

        // Render Chart Title
        push();
        textAlign(CENTER, BOTTOM);
        textSize(this.titleTextSize + 4); // Slightly larger than axis titles
        fill(this.titleTextColor);
        text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - this.tickPadding * 4);
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

         		 push();
		 fill(this.legendRectColor2);
		 rect(this.legendOffset.x, -this.chartHeight - this.legendOffset.y+20, 20, 10);
		 fill(this.legendTextColor);
		 textSize(this.legendSize);
		 textAlign(LEFT, CENTER);
		 text(this.legendText2, this.legendOffset.x + 25, -this.chartHeight - this.legendOffset.y + 25);
		 pop();


        pop();
    }
    
}

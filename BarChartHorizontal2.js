class BarChartHorizontal2 {
    constructor(obj) {
        Object.assign(this, {
            XOffset: obj.x,
            YOffset: obj.y,
            chartWidth: obj.w,
            chartHeight: obj.h,
            barHeight: obj.barHeight || 20,
            axisLineColor: obj.axisLineColor || "#000",
            axisLineThickness: obj.axisLineThickness || 1,
            barColors: obj.barColors || ['#416096', '#FF69B4'], // Default colors for male and female
            labelTextSize: obj.labelTextSize || 12,
            labelColor: obj.labelColor || "#000",
            numTicks: obj.numTicks || 5,
            tickLength: obj.tickLength || 10,
            tickPadding: obj.tickPadding || 5,
            tickTextColor: obj.tickTextColor || "#000",
            tickTextSize: obj.tickTextSize || 12,
            data: obj.data,
        });
        // Calculate the maximum value as the highest sum of male and female for any given data point
        this.maxValue = Math.max(...this.data.map(d => d.Male + d.Female));
        this.scale = this.chartWidth / this.maxValue;
    }

    render() {
        push();
        translate(this.XOffset, this.YOffset);

        // Draw the X-axis at the chart's bottom
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, this.chartHeight, this.chartWidth, this.chartHeight);

        // Render bars for each data point
        this.data.forEach((item, index, array) => {
            // Calculation for the position and gap between bars
            let gapBetweenBars = 3;
            let totalHeight = (this.barHeight * array.length * 2) + (gapBetweenBars * (array.length - 1));
            let gap = (this.chartHeight - totalHeight) / (array.length + 1);
            let yPosition = gap + (index * (2 * this.barHeight + gapBetweenBars + gap));

            // Draw Male bar
            fill(this.barColors[0]);
            rect(0, yPosition, item.Male * this.scale, this.barHeight);

            // Draw Female bar
            fill(this.barColors[1]);
            rect(0, yPosition + this.barHeight + gapBetweenBars, item.Female * this.scale, this.barHeight);

            // Draw category labels on the left side
            fill(this.labelColor);
            noStroke();
            textSize(this.labelTextSize);
            textAlign(RIGHT, CENTER); // Align text to the right of the x-position
            text(item.xAxisLabel, -this.tickPadding, yPosition + (this.barHeight + gapBetweenBars) / 2);
        });

        // Draw value tick marks and labels along the X-axis
        for (let i = 0; i <= this.numTicks; i++) {
            let xPosition = (this.chartWidth / this.numTicks) * i;
            let value = (this.maxValue / this.numTicks) * i;

            stroke(this.axisLineColor);
            line(xPosition, this.chartHeight, xPosition, this.chartHeight + this.tickLength);
            fill(this.tickTextColor);
            noStroke();
            textAlign(CENTER, TOP);
            textSize(this.tickTextSize);
            text(value.toFixed(0), xPosition, this.chartHeight + this.tickPadding);
        }

        pop();
    }
}

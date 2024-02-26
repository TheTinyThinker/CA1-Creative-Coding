class BarChartGrouped {
    constructor(obj) {
        Object.assign(this, {
            XOffset: obj.x,
            YOffset: obj.y,
            chartWidth: obj.w,
            chartHeight: obj.h,
            groupGap: obj.groupGap || 20, // Adjust this value if necessary
            barWidth: obj.barWidth || 20, // Adjust this value if necessary
            axisLineColor: obj.axisLineColor || "#000",
            axisLineThickness: obj.axisLineThickness || 1,
            barColors: obj.barColors || ['#416096', '#FF69B4'], // Default colors for male and female
            labelTextSize: obj.labelTextSize || 12,
            labelColor: obj.labelColor || "#000",
            labelRotation: obj.labelRotation,
            numTicks: obj.numTicks || 5,
            tickLength: obj.tickLength || 10,
            tickPadding: obj.tickPadding || 5,
            tickTextColor: obj.tickTextColor || "#000",
            tickTextSize: obj.tickTextSize || 12,
            data: obj.data,
        });
    }

    render() {
        push();
        translate(this.XOffset, this.YOffset);

        // Adjusted drawing axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, -this.chartHeight, this.chartWidth, -this.chartHeight); // X-axis at the bottom

        let maxValue = max(this.data.map(d => max([d.Male, d.Female])));
        let scale = this.chartHeight / maxValue;
        
        // Adjust the starting point for the first group to ensure visibility
        let adjustedChartWidth = this.chartWidth - this.groupGap; // Adjust chart width to fit all groups
        let totalGroupWidth = this.barWidth * 2 + this.groupGap;
        let barGap = (adjustedChartWidth - this.data.length * totalGroupWidth) / (this.data.length + 1);

        this.data.forEach((item, index) => {
            let groupXPosition = barGap + (index * (totalGroupWidth + barGap));
            let maleHeight = item.Male * scale;
            let femaleHeight = item.Female * scale;

            // Male bar
            fill(this.barColors[0]);
            rect(groupXPosition, -maleHeight, this.barWidth, maleHeight);

            // Female bar
            fill(this.barColors[1]);
            rect(groupXPosition + this.barWidth + this.groupGap, -femaleHeight, this.barWidth, femaleHeight);

            // Adjusted drawing labels to rotate and avoid overlap
            push();
            translate(groupXPosition + totalGroupWidth / 2, -5); // Adjust label position
            rotate(85); // Rotate labels to avoid overlap
            fill(this.labelColor);
            noStroke();
            textAlign(CENTER);
            textSize(this.labelTextSize);
            text(item.xAxisLabel, 0, 0); // Draw rotated label
            pop();
        });

        // Drawing Y-axis tick marks and labels
        for (let i = 0; i <= this.numTicks; i++) {
            let yPosition = -(this.chartHeight / this.numTicks) * i;
            let value = (maxValue / this.numTicks) * i;

            stroke(this.axisLineColor);
            line(-this.tickLength, yPosition, 0, yPosition);
            fill(this.tickTextColor);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(this.tickTextSize);
            text(value.toFixed(0), -this.tickLength - this.tickPadding, yPosition);
        }
        pop();
    }
}

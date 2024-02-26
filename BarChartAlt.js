class BarChartStandardLineAlt {
    constructor(obj) {
        Object.assign(this, {
            XOffset: obj.XOffset,
            YOffset: obj.YOffset,
            titleSize: obj.titleSize,
            titleColor: obj.titleColor,
            titleText: obj.titleText,
            titleWidth: obj.titleWidth,
            chartTitle : obj.chartTitle || 'Chart Title', // Default chart title
            xAxisTitle : obj.xAxisTitle || 'X Axis Title', // Default X axis title
            yAxisTitle : obj.yAxisTitle || 'Y Axis Title', // Default Y axis title
            titleSize : obj.titleSize || 16, // Title font size
            axisTitleSize : obj.axisTitleSize || 12,// Axis title font size
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
            tickTextRotate: obj.tickTextRotate,
            barWidth: obj.barWidth,
            barColors: obj.barColors,
            barStrokeThickness: obj.barStrokeThickness,
            barStrokeColor: obj.barStrokeColor,
            labelTextSize: obj.labelTextSize,
            labelColor: obj.labelColor,
            labelPadding: obj.labelPadding,
            chartWidth: obj.chartWidth,
            chartHeight: obj.chartHeight,
            showAverageLine: obj.showAverageLine,
            averageLineColor: obj.averageLineColor,
            averageLineThickness: obj.averageLineThickness
        }, obj);
        this.numBars = this.data.length;
        this.maxValue = this.data.reduce((acc, curr) => Math.max(acc, curr.Male, curr.Female), 0);
        this.scale = this.chartHeight / this.maxValue; // Pre-calculate scale for reuse
    
    }

    render() {
        push();
        translate(this.XOffset, this.YOffset);

                // Draw chart title
                fill(this.titleColor);
                textSize(this.titleSize);
                textAlign(CENTER);
                text(this.chartTitle, this.chartWidth / 2, -this.chartHeight - 40); // Adjust Y position as needed
        

        // Draw axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight); // Y-axis
        line(0, 0, this.chartWidth, 0); // X-axis

        let barGap = (this.chartWidth - this.numBars * this.barWidth) / (this.numBars + 1);

        for (let i = 0; i < this.numBars; i++) {
            let item = this.data[i];
            let xPosition = barGap + i * (this.barWidth + barGap);

            // Draw bars for Male and Female
            fill(this.barColors[0]); // Male color
            stroke(this.barStrokeColor);
            strokeWeight(this.barStrokeThickness);
            rect(xPosition, 0, this.barWidth / 2, -(item.Male * this.scale));

            fill(this.barColors[1]); // Female color
            rect(xPosition + this.barWidth / 2, 0, this.barWidth / 2, -(item.Female * this.scale));

            // Draw labels
            push();
            translate(xPosition + this.barWidth / 2, this.labelPadding);
            rotate(this.tickTextRotate);
            fill(this.labelColor);
            textAlign(CENTER);
            textSize(this.labelTextSize);
            text(item.xAxisLabel, 0, 0);
            pop();
        }

        // Draw Y-axis ticks and labels
        for (let i = 0; i <= this.numTicks; i++) {
            let yPosition = -i * (this.chartHeight / this.numTicks);
            let tickValue = (this.maxValue / this.numTicks) * i;

            stroke(this.tickColor);
            strokeWeight(this.tickStrokeWeight);
            line(-this.tickStrokeLength, yPosition, 0, yPosition);

            fill(this.tickTextColor);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(this.tickTextSize);
            text(tickValue.toFixed(this.tickDecimals), -this.tickPadding, yPosition);
        }

                // Draw X Axis Title
                fill(this.titleColor);
                textSize(this.axisTitleSize);
                textAlign(CENTER);
                text(this.xAxisTitle, this.chartWidth / 2, 110); // Adjust Y position as needed
        
                // Draw Y Axis Title
                push(); // Save the current drawing state
                translate(-50, -this.chartHeight / 2); // Adjust X position as needed
                rotate(-90); // Rotate to align with the Y axis
                textAlign(CENTER);
                text(this.yAxisTitle, 0, -20);
                pop(); // Restore the original drawing state

        // Draw average line if enabled
        if (this.showAverageLine) {
            let totalValue = this.data.reduce((acc, curr) => acc + curr.Male + curr.Female, 0);
            let averageValue = totalValue / (this.numBars * 2);
            let averageYPosition = -averageValue * this.scale;
            stroke(this.averageLineColor);
            strokeWeight(this.averageLineThickness);
            line(0, averageYPosition, this.chartWidth, averageYPosition);
        }

        pop();
    }
}

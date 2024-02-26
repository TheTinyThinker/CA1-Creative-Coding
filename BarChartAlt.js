class BarChartStackedLine {
    constructor(obj) {
        Object.assign(this, {
            XOffset: obj.XOffset,
            YOffset: obj.YOffset,
            titleSize: obj.titleSize,
            titleColor: obj.titleColor,
            titleText: obj.titleText,
            titleWidth: obj.titleWidth,
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
            labelPadding: obj.labelPadding, // Added for positioning labels correctly
            chartWidth: obj.chartWidth,
            chartHeight: obj.chartHeight,
            chartType: obj.chartType,
            showAverageLine: obj.showAverageLine || false, // Option to show/hide the average line
            averageLineColor: obj.averageLineColor || '#FF0000', // Default color for the average line
            averageLineThickness: obj.averageLineThickness || 2 // Default thickness for the average line
        }, obj);
        this.numBars = this.data.length;
    }

    render() {
        push();
        translate(this.XOffset, this.YOffset);
    
        // Chart axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight);
        line(0, 0, this.chartWidth, 0);
    
        let barGap = (this.chartWidth - this.numBars * this.barWidth) / (this.numBars + 1);
        let maxValue = this.data.reduce((acc, curr) => {
            let total = this.chartType === 'stacked' ? curr.Male + curr.Female : Math.max(curr.Male, curr.Female);
            return Math.max(acc, total);
        }, 0);
    
        let scale = this.chartHeight / maxValue;
    
        for (let i = 0; i < this.numBars; i++) {
            let item = this.data[i];
            let xPosition = barGap + i * (this.barWidth + barGap);
    
            if (this.chartType === 'stacked') {
                // Stacked bar chart logic
                let maleHeight = (item.Male * scale);
                let femaleHeight = (item.Female * scale);
    
                // Draw male segment
                fill(this.barColors[0]);
                stroke(this.barStrokeColor);
                strokeWeight(this.barStrokeThickness);
                rect(xPosition, 0, this.barWidth, -maleHeight);
    
                // Draw female segment on top of male segment
                fill(this.barColors[1]);
                rect(xPosition, -maleHeight, this.barWidth, -femaleHeight);
            } else {
                // Standard bar chart logic
                // Male bar
                fill(this.barColors[0]);
                stroke(this.barStrokeColor);
                strokeWeight(this.barStrokeThickness);
                rect(xPosition, 0, this.barWidth / 2, -(item.Male * scale));
    
                // Female bar, next to the male bar
                fill(this.barColors[1]);
                rect(xPosition + this.barWidth / 2, 0, this.barWidth / 2, -(item.Female * scale));
            }
    
            // Label rotation and positioning
            push();
            translate(xPosition + this.barWidth / 2, this.labelPadding + (this.chartType === 'standard' ? 20 : 0)); // Adjust label position for standard chart type
            rotate(radians(this.tickTextRotate));
            fill(this.labelColor);
            textAlign(CENTER);
            textSize(this.labelTextSize);
            text(item.xAxisLabel, 0, 0);
            pop();
        }
        console.log("data",this.data);


        // Y-axis ticks and labels
        for (let i = 0; i <= this.numTicks; i++) {
            let yPosition = -i * (this.chartHeight / this.numTicks);
            let tickValue = (maxValue / this.numTicks) * i;
            stroke(this.tickColor);
            strokeWeight(this.tickStrokeWeight);
            line(0, yPosition, -this.tickStrokeLength, yPosition);

            fill(this.tickTextColor);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(this.tickTextSize);
            text(tickValue.toFixed(this.tickDecimals), -this.tickPadding, yPosition);
        }

        // Average line
        if (this.showAverageLine) {
            let totalValue = this.data.reduce((acc, curr) => acc + curr.Male + curr.Female, 0);
            let averageValue = totalValue / (this.numBars * 2); // Dividing by numBars*2 if you want the average per gender
            let averageYPosition = -averageValue * scale;
            stroke(this.averageLineColor);
            strokeWeight(this.averageLineThickness);
            line(0, averageYPosition, this.chartWidth, averageYPosition);
        }

        pop();
    }
}

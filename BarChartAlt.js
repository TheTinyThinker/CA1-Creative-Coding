class BarChartStandardLineAlt {
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
            labelPadding: obj.labelPadding,
            chartWidth: obj.chartWidth,
            chartHeight: obj.chartHeight,
            showAverageLine: obj.showAverageLine,
            averageLineColor: obj.averageLineColor,
            averageLineThickness: obj.averageLineThickness
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
          //  console.log('Accumulator:', acc, 'Current:', curr);
            return Math.max(acc, curr.Male, curr.Female);
        }, 0);

        let scale = this.chartHeight / maxValue;

        for (let i = 0; i < this.numBars; i++) {
            let item = this.data[i];
            let xPosition = barGap + i * (this.barWidth + barGap);

            // Male bar
            fill(this.barColors[0]);
            stroke(this.barStrokeColor);
            strokeWeight(this.barStrokeThickness);
            rect(xPosition, 0, this.barWidth / 2, -(item.Male * scale));

            // Female bar, next to the male bar
            fill(this.barColors[1]);
            rect(xPosition + this.barWidth / 2, 0, this.barWidth / 2, -(item.Female * scale));

            // Label
            push();
            translate(xPosition + this.barWidth / 2, this.labelPadding);
            rotate(this.tickTextRotate);
            fill(this.labelColor);
            textAlign(CENTER);
            textSize(this.labelTextSize);
            text(item.xAxisLabel, 0, 0);
            pop();
        }
        console.log("maxValue:", maxValue, "chartHeight:", this.chartHeight, "numTicks:", this.numTicks);

        // Y-axis ticks and labels
        for (let i = 0; i <= this.numTicks; i++) {
            let yPosition = -i * (this.chartHeight / this.numTicks);
            let tickValue = (maxValue / this.numTicks) * i;
           // console.log(this.maxValue)
            stroke(this.tickColor);
            strokeWeight(this.tickStrokeWeight);
            line(0, yPosition, -this.tickStrokeLength, yPosition);

            fill(this.tickTextColor);
            noStroke();
            textAlign(RIGHT, CENTER);
            textSize(this.tickTextSize);
            console.log("Tick:", i, "tickValue:", tickValue.toFixed(this.tickDecimals), "yPosition:", yPosition);
            text(tickValue.toFixed(this.tickDecimals), -this.tickPadding, yPosition);
         

        //    console.log("maxValue:", maxValue, "scale:", scale);
// Inside the loop:
//console.log("Tick:", i, "tickValue:", tickValue.toFixed(this.tickDecimals), "yPosition:", yPosition);

        }

        // Average line
        if (this.showAverageLine) {
            let totalValue = this.data.reduce((acc, curr) => acc + curr.Male + curr.Female, 0);
            let averageValue = totalValue / (this.numBars * 2);
            let averageYPosition = -averageValue * scale;
            stroke(this.averageLineColor);
            strokeWeight(this.averageLineThickness);
            line(0, averageYPosition, this.chartWidth, averageYPosition);
        }

        pop();
    }
}

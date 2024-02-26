class ScatterPlot {
    constructor(obj) {
        
        Object.assign(this, {
            XOffset: 0,
            YOffset: 0,
            titleSize: 16,
            titleColor: "#000",
            titleText: "",
            axisLineColor: "#000",
            axisLineThickness: 1,
            tickColor: "#000",
            tickStrokeWeight: 1,
            tickStrokeLength: 5,
            tickPadding: 10,
            numTicks: 5,
            tickTextColor: "#000",
            tickTextSize: 12,
            tickDecimals: 0,
            
            labelTextSize: 10,
            labelColor: "#000",
            chartWidth: obj.w,
            chartHeight: obj.h,
            pointSize: 5, 
        }, obj);
      
        this.numPoints = this.data.length;
    }

    render() {
        push(); 
        translate(this.XOffset, this.YOffset); // 

        // Draw the axes
        stroke(this.axisLineColor);
        strokeWeight(this.axisLineThickness);
        line(0, 0, 0, -this.chartHeight); // Vertical axis
        line(0, 0, this.chartWidth, 0); // Horizontal axis

      
        let maxValueX = max(this.data.map(item => float(item.xValue)));
        let maxValueY = max(this.data.map(item => float(item.yValue)));
        let scaleX = this.chartWidth / maxValueX;
        let scaleY = this.chartHeight / maxValueY;

        // Draw points
        for (let i = 0; i < this.numPoints; i++) {
            let xPosition = this.data[i].xValue * scaleX;
            let yPosition = -this.data[i].yValue * scaleY; 

            fill('rgba(100, 149, 237, 0.6)'); 
            noStroke();
            ellipse(xPosition, yPosition, this.pointSize, this.pointSize); // Draw point
        }

        pop(); 
    }
}
import {Component} from "react";
import * as d3 from "d3"
import {createColorScale, createXScale, createYScale} from "../utils/d3helpers";

class VisualizationBar extends Component {
    constructor(props) {
        super(props);
        this.data = props.data
        this.color = createColorScale(this.data, "value")
        this.leftAxisFormat = props.leftAxisFormat
        this.leftAxisTicks = props.leftAxisTicks
        this.xAxisLabel = props.xAxisLabel
        this.yAxisLabel = props.yAxisLabel
    }

    componentDidMount() {
        const chartSize = {width: 1000, height: 600};
        const margin = {left: 80, right: 10, top: 20, bottom: 80};
        const xAxisWidth = chartSize.width - margin.left - margin.right;
        const yAxisHeight = chartSize.height - margin.top - margin.bottom;
        const y = createYScale(this.data, yAxisHeight, "value")
        const x = createXScale(this.data, xAxisWidth, "key")
        const yAxis = d3.axisLeft(y).tickFormat(this.leftAxisFormat).ticks(this.leftAxisTicks);
        const xAxis = d3.axisBottom(x);

        const svg = d3
            .select(".bar-chart")
            .append("svg")
            .attr("width", chartSize.width)
            .attr("height", chartSize.height);

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("text")
            .attr("class", "x axis-label")
            .attr("x", (chartSize.width - margin.left) / 2)
            .attr("y", chartSize.height - 30)
            .text(this.xAxisLabel);

        g.append("text")
            .attr("class", "y axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -yAxisHeight / 2)
            .attr("y", -60)
            .text(this.yAxisLabel);

        g.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        const rects = g.selectAll("rect").data(this.data);

        rects
            .enter()
            .append("rect")
            .attr("x", b => x(b.key))
            .attr("y", b => y(b.value))
            .attr("width", x.bandwidth)
            .attr("height", b => y(0) - y(b.value))
            .attr("fill", b => this.color(b.value));

        g.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${yAxisHeight})`)
            .call(xAxis);

        g.selectAll(".x-axis text").attr("x", -5).attr("y", 10)
    }

    render() {
        return <div className={"bar-chart-area"}>
            <div className={"bar-chart"}/>
        </div>
    }
}

export default VisualizationBar;
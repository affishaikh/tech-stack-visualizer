import {Component} from "react";
import * as d3 from "d3"

class VisualizationPie extends Component {

    constructor(props) {
        super(props);
        this.data = props.data
    }

    componentDidMount() {
        const width = 640
        const height = 550
        const outerRadius = Math.min(width, height) / 2
        const labelRadius = outerRadius * 0.8

        const allNames = this.data.map(d => d.name);
        const allValues = this.data.map(d => d.value);
        const I = d3.range(allNames.length).filter(i => !isNaN(allValues[i]));

        // Unique the names. This is done so that same names will have same color
        const names = new d3.InternSet(allNames);

        // Chose a default color scheme based on cardinality.
        const colors = d3.schemeSpectral[names.size];

        // Construct scales.
        const color = d3.scaleOrdinal(names, colors);

        // Compute titles.
        const formatValue = d3.format(",");
        const title = i => `${allNames[i]}\n${formatValue(allValues[i])}`;

        // Construct arcs.
        const arcs = d3.pie().padAngle(0).value(i => allValues[i])(I);
        const arc = d3.arc().innerRadius(0).outerRadius(outerRadius);
        const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

        const svg = d3.select(".pie-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(allNames[d.data]))
            .attr("d", arc)
            .append("title")
            .text(d => title(d.data));

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
            .selectAll("tspan")
            .data(d => {
                const lines = `${title(d.data)}`.split(/\n/);
                return (d.endAngle - d.startAngle) > 0.25 ? lines : lines.slice(0, 1);
            })
            .join("tspan")
            .attr("x", 0)
            .attr("y", (_, i) => `${i * 1.1}em`)
            .attr("font-weight", (_, i) => i ? null : "bold")
            .text(d => d);
    }

    render() {
        return <div className={"pie-chart-area"}>
            <div className={"pie-chart"}/>
        </div>
    }
}

export default VisualizationPie;
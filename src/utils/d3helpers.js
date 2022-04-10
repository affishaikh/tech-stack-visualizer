import * as d3 from "d3";
import _ from "lodash";

const createYScale = function (data, yAxisHeight, key) {
    return d3.scaleLinear()
        .domain([0, _.maxBy(data, key).value])
        .range([yAxisHeight, 0]);
}

const createXScale = function (data, xAxisWidth, key) {
    return d3.scaleBand()
        .range([0, xAxisWidth])
        .domain(_.map(data, key))
        .paddingInner(0.3)
        .paddingOuter(0.3);
}

const createColorScale = function (data, key) {
    return d3.scaleSequential()
        .domain([0, _.maxBy(data, key).value])
        .interpolator(d3.interpolateBlues)
}


export {createYScale, createXScale, createColorScale}
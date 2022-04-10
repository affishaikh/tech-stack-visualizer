import {Component} from "react";

class ChartData extends Component {
    constructor(props) {
        super(props);
        this.data = props.data
        this.color = props.colorScale
    }

    render() {
        return <div className={"bar-chart-data"}>
            {this.data.map((x) => <div className={"chart-data-container"}>
                <div className={"indicator"} style={{"background-color": this.color(x.value)}}/>
                <div>{x.key} {x.value}</div>
            </div>)}
        </div>
    }
}

export default ChartData;
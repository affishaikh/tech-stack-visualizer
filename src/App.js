import './App.css';
import VisualizationBar from "./components/VisualizationBar";
import VisualizationPie from "./components/VisualizationPie";

function App() {
    return (
        <div className="App">
            {/*<VisualizationBar data={[*/}
            {/*    {"key": "Java", "value": 20},*/}
            {/*    {"key": "Kotlin", "value": 15},*/}
            {/*    {"key": "Python", "value": 13},*/}
            {/*    {"key": "Golang", "value": 12},*/}
            {/*    {"key": "Rust", "value": 4},*/}
            {/*    {"key": "Clojure", "value": 2},*/}
            {/*    {"key": "Erlang", "value": 1}*/}
            {/*]} yAxisFormat={(d) => d} leftAxisTicks={10} xAxisLabel={"Language"} yAxisLabel={"No. of Projects"}/>*/}
            <VisualizationPie data={[
                {"name": "Java", "value": 20},
                {"name": "Kotlin", "value": 15},
                {"name": "Python", "value": 13},
                {"name": "Golang", "value": 12},
                {"name": "Rust", "value": 4},
                {"name": "Clojure", "value": 2},
                {"name": "Erlang", "value": 1},
            ]}/>
        </div>
    );
}

export default App;

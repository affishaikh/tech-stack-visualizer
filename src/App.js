import './App.css';
import VisualizationBar from "./components/VisualizationBar";

function App() {
    return (
        <div className="App">
            <VisualizationBar data={[
                {"key": "Java", "value": 20},
                {"key": "Kotlin", "value": 15},
                {"key": "Python", "value": 13},
                {"key": "Golang", "value": 12},
                {"key": "Rust", "value": 4},
                {"key": "Clojure", "value": 2},
                {"key": "Erlang", "value": 1}
            ]} yAxisFormat={(d) => d} leftAxisTicks={10} xAxisLabel={"Language"} yAxisLabel={"No. of Projects"}/>
        </div>
    );
}

export default App;

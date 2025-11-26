import './App.css'
import { useState } from "react";

function App() {

  const [numbers, setNumbers] = useState({
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: ""
  });

  const [avg, setAvg] = useState("");
  const [gpy, setGpy] = useState("");
  const [cv, setCv] = useState("");

  function handleChange(e) {
    setNumbers({ ...numbers, [e.target.name]: e.target.value });
  }

  function calculate() {
    const vals = Object.values(numbers).map(n => Number(n));

    if (vals.some(v => isNaN(v))) return;

    const sum = vals.reduce((a, b) => a + b, 0);
    const average = sum / vals.length;
    setAvg(average.toFixed(2));

    const g = average / 6;
    setGpy(g.toFixed(2));

    const sqDiff = vals.map(v => Math.pow(v - average, 2));
    const variance = sqDiff.reduce((a, b) => a + b, 0) / vals.length;
    const stdDev = Math.sqrt(variance);
    const cvPercent = (stdDev / average) * 100;

    setCv(cvPercent.toFixed(2) + "%");
  }

  function resetAll() {
    setNumbers({ n1: "", n2: "", n3: "", n4: "", n5: "" });
    setAvg("");
    setGpy("");
    setCv("");
  }

  return (
    <>
      <div className="table">

        <div className="row row1">
          <input type="number" name="n1" className="cell" value={numbers.n1} onChange={handleChange} />
          <input type="number" name="n2" className="cell" value={numbers.n2} onChange={handleChange} />
          <input type="number" name="n3" className="cell" value={numbers.n3} onChange={handleChange} />
          <input type="number" name="n4" className="cell" value={numbers.n4} onChange={handleChange} />
          <input type="number" name="n5" className="cell" value={numbers.n5} onChange={handleChange} />
        </div>

        <div className="row row2">
          <div className="cell display">Avg: {avg}</div>
          <div className="cell display">GPY: {gpy}</div>
          <div className="cell display">CV%: {cv}</div>
        </div>

        <div className="row row3">
          <button className="cell" onClick={resetAll}>Reset</button>
          <button className="cell" onClick={calculate}>=</button>
        </div>

      </div>
    </>
  );
}

export default App;


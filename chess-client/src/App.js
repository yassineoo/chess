import Plateau from "./Component/Plateau/Plateau";

const plateauStatus = [
  [-3, -2, -4, -5, -6, -4, -2, -3],
  [-1, -1, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [3, 2, 4, 6, 5, 4, 2, 3],
]

function App() {
  return (
    <div className="App">
      <center>
      <Plateau status={plateauStatus}/>
      </center>
    </div>
  );
}

export default App;

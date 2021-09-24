import {Spring, animated} from 'react-spring';
import Header from './Component/Header';

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
      <Spring
        from={{opacity: 0}}
        to={{opacity: 1}}
      >
      {(styles =>(
          <animated.div style={{...styles, margin:'auto'}}>
            <Header />
            <center>
              <Plateau status={plateauStatus}/>
            </center> 
          </animated.div>
      ))}
      </Spring>

    </div>
  );
}

export default App;

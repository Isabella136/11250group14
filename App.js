import './App.css';
import {Line} from 'react-chartjs-2'

function App() {
  return (
    <div className="App">
      <h1>Welcome to your Dashboard!</h1>
      <Line
        data = {{
          labels:['1','2','3','4','5','6'],
          datasets:[
            {
              label:'# of Votes',
              data:[12, 19, 3, 5, 2, 3],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 232, 0.2)',
            }
          ]
        }}
        options = {{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      ></Line>



     </div>
  );
}

export default App;

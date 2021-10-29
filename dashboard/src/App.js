import LineChart from './components/LineChart'
import ChartSettings from './components/ChartSettings'
import './App.css';

function App() {
  return (
    <div className='rowC'>
        <ChartSettings />
        <LineChart />
        <LineChart />
    </div>
  );
}

export default App;

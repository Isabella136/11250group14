import LineChart from '../../components/LineChart';
import LineChartCosts from '../../components/LineChartCosts';
import MainScreen from "../../components/main_screen";

const MyGraph = () => {
  return (
      <MainScreen title="My Graph">
        <div className='rowC'>
          <LineChart />
          <LineChartCosts />
        </div>
      </MainScreen>
  )
};

export default MyGraph;

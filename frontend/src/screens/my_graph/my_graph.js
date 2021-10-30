import LineChart from '../../components/LineChart';
import ChartSettings from '../../components/ChartSettings';
import MainScreen from "../../components/main_screen";

const MyGraph = () => {
  return (
      <MainScreen title="My Graph">
        <div className='rowC'>
          <ChartSettings />
          <LineChart />
        </div>
      </MainScreen>
  )
};

export default MyGraph;

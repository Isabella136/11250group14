import LineChartDataEntry from '../../components/LineChartDataEntry';
import LineChartCosts from '../../components/LineChartCosts';
import LineChartDataTotal from '../../components/LineChartDataTotal';
import LineChartCostsTotal from '../../components/LineChartCostsTotal';
import MainScreen from "../../components/main_screen";

const MyGraph = () => {
  //problem with total charts when adding edited data
        //<LineChartDataTotal />
        //<LineChartCostsTotal />
  return (
      <MainScreen title="My Graph">
        <div className='rowC'>
          <LineChartDataEntry />
          <LineChartCosts />
        </div>
      </MainScreen>
  )
};

export default MyGraph;

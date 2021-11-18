import MainScreen from "../../components/main_screen";
import Recommendations from "../../components/Recommendations";

const RecommendationsPage = () => {
  return (
      <MainScreen title="Recommendations">
        <div className='rowC'>
          <Recommendations />
        </div>
      </MainScreen>
  )
};

export default RecommendationsPage;

import { useEffect, useState } from 'react';

import CardContainer from '../components/CardContainer';
import Seo from '../components/Seo';
import getByCountries from '../containers/getByCountries';
import { getByCountryType, getHistoricalType, timeLineType } from '../utils/types';
import getHistorical from '../containers/getHistorical';
import ChartBar from '../components/ChartBar';

const Home: React.VFC = () => {
  const [covidData, setCovidData] = useState<getByCountryType>();
  const [historicCase, setHistoricCase] = useState<{ [date: string]: [number] }>();
  const [historicDeath, setHistoricDeath] = useState<{ [date: string]: [number] }>();
  const [lastDays, setLastDays] = useState(10);
  useEffect(() => {
    getByCountries({ country: 'kr' })
      .then((response) => response.data)
      .then((json: getByCountryType) => setCovidData(json))
      .catch((e) => console.log(e));
    getHistorical({ country: 'kr', lastdays: lastDays })
      .then((response) => response.data)
      .then((json: getHistoricalType) => {
        setHistoricCase(json.timeline.cases);
        setHistoricDeath(json.timeline.deaths);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <Seo title="Home" />
      <div className="page">
        <h2>COVID-19 대시보드</h2>
        <CardContainer data={covidData} />
        <div className="chartContainer">
          <ChartBar
            title="누적 확진자수"
            chartData={historicCase}
            color="rgba(255, 99, 132, 0.5)"
          />
          <ChartBar
            title="누적 사망자수"
            chartData={historicDeath}
            color="rgba(254, 213, 150, 0.5)"
          />
        </div>
      </div>
      <style jsx>{`
        .chartContainer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Home;

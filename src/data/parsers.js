import format from './format';
import moment from 'moment';

function parseUsStats(data) {
  const [usStatRaw] = data;
  return parseStats(usStatRaw);
}

function parseStateStats(state, data) {
  const stateRawData = data.find((d) => d.state === state);
  return parseStats(stateRawData);
}

function parseHistoricUs(historicalData) {
  return parseHistoric(historicalData);
}

function parseHistoricState(state, historicalData) {
  const stateHistoric = historicalData.filter((d) => d.state === state);
  return parseHistoric(stateHistoric);
}

function parseHistoric(historicalData) {
  return [
    {
      label: 'Cases',
      key: 'positive',
      color: 'rgb(100, 0, 200)',
    },
    {
      label: 'Recovered',
      key: 'recovered',
      color: 'rgb(100, 100, 200)',
    },
    {
      label: 'Total Tested',
      key: 'totalTestResults',
      color: 'rgb(10, 30, 100)',
    },
    {
      label: 'Hospitalized',
      key: 'hospitalizedCurrently',
      color: 'rgb(20, 100, 230)',
    },
    {
      label: 'Deaths',
      key: 'death',
      color: 'rgb(255, 99, 132)',
    },
  ].reduce((prev, next) => {
    if (historicalData.filter((d) => d[next.key]).length > 4)
      prev.push(parseChart(historicalData, next.key, next.label, next.color));
    return prev;
  }, []);
}

function parseChart(historicalData, key, label, color) {
  const chartData = historicalData.map((data) => {
    return {
      x: moment(data.date, 'YYYYMMDD'),
      y: data[key] || 0,
    };
  });

  return {
    label,
    data: chartData,
    fill: false,
    borderColor: color,
  };
}

function parseStats(rawStats) {
  return {
    cases: format.number(rawStats.positive),
    deaths: format.number(rawStats.death),
    recovered: format.number(rawStats.recovered),
    ventilators: format.number(rawStats.onVentilatorCurrently),
    hospitalized: format.number(rawStats.hospitalized),
    icu: format.number(rawStats.inIcuCurrently),
    tested: format.number(rawStats.totalTestResults),
    updated: moment(rawStats.lastModified).format('LLLL'),
  };
}

export default {
  parseUsStats,
  parseStateStats,
  parseHistoricUs,
  parseChart,
  parseHistoricState,
};

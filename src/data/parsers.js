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
};

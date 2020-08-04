import axios from 'axios';
import parsers from './parsers';

async function usStats() {
  const response = await axios.get(
    'https://covidtracking.com/api/v1/us/current.json'
  );

  return parsers.parseUsStats(response.data);
}

async function beStats() {
  const response = await axios.get('https://covid19-api.org/api/status');

  return response.data;
}

async function stateStats(state) {
  const response = await axios.get(
    'https://covidtracking.com/api/v1/states/current.json'
  );

  return parsers.parseStateStats(state, response.data);
}

async function historicUs() {
  const response = await axios.get('https://covidtracking.com/api/us/daily');

  return parsers.parseHistoricUs(response.data);
}

export default {
  usStats,
  beStats,
  stateStats,
  historicUs,
};

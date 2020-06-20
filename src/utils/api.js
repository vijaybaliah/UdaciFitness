import superagent from 'superagent';
import { AsyncStorage } from 'react-native';
import config from './config';

import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar';

export function fetchCalendarResults () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults)
}

export function submitEntry({ entry, key }) {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({ [key]: entry }));
}

export function removeEntry(key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key]
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  })
}

const formatUrl = (path, method = '') => {
  if (path[0] === 'h') {
    console.log('Path: ' + path);
    return path;
  }
  let adjustedPath = path[0] !== '/' ? '/' + path : path;
  adjustedPath = adjustedPath.replace(/\/+/g, '/');
  let formattedUrl = adjustedPath;
  // if (__DEVELOPMENT__) {
    formattedUrl = config.apiHost + adjustedPath;
  // } else if (__SERVER__) {
  //   formattedUrl = config.bePrivateHost + adjustedPath;
  // }
  console.log('formatted Path: ['+ method + '] ' + formattedUrl);
  return formattedUrl;
}

const fetch = (url, options = {}) => new Promise((resolve, reject) => {
  const { method = 'get', data } = options;
  const request = superagent[method](formatUrl(url, method))

  if (data) {
    console.log('data: ', data);
    request.send(data);
  }

  // request.withCredentials();

  request.end((err, { body } = {}) => {
    if (err) {
      console.log('error: ', (body || err));
      return reject(body || err)
    } else {
      console.log('response: ', body);
      return resolve(body)
    }
  })
});

export default fetch;

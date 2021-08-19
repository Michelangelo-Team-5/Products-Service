import http from 'k6/http';
import { sleep } from 'k6';

// export let options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: 1000,
//       timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
//       duration: '30s',
//       preAllocatedVUs: 3000, // how large the initial pool of VUs would be
//       maxVUs: 4000, // if the preAllocatedVUs are not enough, we can initialize more
//     },
//   },
// };

export let options = {
  vus: 1000,
  duration: "30s"
};

export default function () {
  // http.get(`http://localhost:3000/products?page=${Math.floor((Math.random()*(50000-20000))+20000)}`);
  // http.get(`http://localhost:3000/products/${Math.floor((Math.random()*(1000000-750000))+750000)}/related`);
  http.get(`http://localhost:3000/products/${Math.floor((Math.random()*(1000000-750000))+750000)}/styles`);
  // http.get(`http://localhost:3000/products/${Math.floor((Math.random()*(1000000-750000))+750000)}/`);
  sleep(1);
}



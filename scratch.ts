import { Body, SearchRiseSet, Observer } from "astronomy-engine";
const obs = new Observer(28.6139, 77.2090, 0);
const date = new Date("2026-04-10T00:00:00Z");
const rise = SearchRiseSet(Body.Moon, obs, 1, date, 1);
const set = SearchRiseSet(Body.Moon, obs, -1, date, 1);
console.log(rise?.date, set?.date);

/* 组装：岛 + 城堡 + 人 + 环境，统一管理剖面与昼夜过渡 */
import * as T from '../vendor/three.module.js';
import { buildIsland } from './island.js';
import { buildCastle } from './castle.js';
import { buildPeople } from './people.js';
import { buildSky } from './sky.js';
import { ENTRIES } from './content.js';
import { group } from './palette.js';

export function buildWorld(scene) {
  const root = group(scene);
  const island = buildIsland(root);
  const castle = buildCastle(root);
  const people = buildPeople(root);
  const sky = buildSky(scene);

  const hotspots = ENTRIES.filter(e => e.p).map(e => ({
    id: e.id, cat: e.cat, n: e.n, at: e.at,
  }));

  let cut = 0, cutTo = 0, night = 0, nightTo = 0;
  let lastC = -1, lastN = -1;

  return {
    hotspots,
    setCutaway(v) { cutTo = v ? 1 : 0; },
    setNight(v) { nightTo = v ? 1 : 0; },
    get nightTarget() { return nightTo; },
    get cutTarget() { return cutTo; },
    get cutValue() { return cut; },
    update(t, dt) {
      cut += (cutTo - cut) * Math.min(1, dt * 2.8);
      night += (nightTo - night) * Math.min(1, dt * 1.9);
      if (Math.abs(cut - lastC) > .0015) { castle.setCutaway(cut); lastC = cut; }
      if (Math.abs(night - lastN) > .0015) {
        castle.setNight(night); people.setNight(night); sky.setNight(night); lastN = night;
      }
      island.update(t); castle.update(t); people.update(t); sky.update(t, dt);
      return night;
    },
  };
}

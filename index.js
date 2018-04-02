/*
 * COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED
 *
 * @Author: dm@dmon-studo.com
 * @Date: 2018-04-02 14:34:45
 * @Last Modified by: dm@dmon-studo.com
 * @Last Modified time: 2018-04-02 16:52:31
 */

import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import { data } from './lib/data'

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
  type: 'fold',
  fields: ['Tokyo', 'London'], // 展开字段集
  key: 'city', // key字段
  value: 'temperature', // value字段
});
const chart = new G2.Chart({
  container: 'mountNode',
  forceFit: true,
  height: window.innerHeight
});
chart.source(dv, {
  month: {
    range: [0, 1]
  }
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.axis('temperature', {
  label: {
    formatter: val => {
      return val + '°C';
    }
  }
});
chart.line().position('month*temperature').color('city');
chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
  stroke: '#fff',
  lineWidth: 1
});
chart.render();
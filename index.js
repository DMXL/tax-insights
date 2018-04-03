/*
 * COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED
 *
 * @Author: dm@dmon-studo.com
 * @Date: 2018-04-02 14:34:45
 * @Last Modified by: dm@dmon-studo.com
 * @Last Modified time: 2018-04-03 18:04:37
 */

import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import data from './lib/data'

const ds = new DataSet();
const dv = ds.createView().source(data);

dv.transform({
  type: 'fold',
  fields: ['Taxable', 'Payable'], // 展开字段集
  key: 'kind', // key字段
  value: 'RMB', // value字段
});
const chart = new G2.Chart({
  container: 'graph',
  // forceFit: true,
  width: 600,
  height: 800
});
chart.source(dv, {
  income: {
    ticks: [4000, 8000, 12500, 38500, 58500, 83500],
    alias: '收入'
  },
  type: {
    type: 'cat',
    values: [ 'Tier Delimiter', 'Trend' ]
  }
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.axis('RMB', {
  label: {
    formatter: val => {
      return '￥' + val;
    }
  }
});
chart.axis('income', {
  title: {
    position: 'end'
  }
});
chart.line().position('income*RMB').color('kind');
chart.point().position('income*RMB').color('kind').shape('type', (type) => {
  return type === 'Tier Delimiter' ? 'circle' : 'line'
}).size('type', (type) => {
  return type === 'Tier Delimiter' ? 4 : 1
});
chart.render();
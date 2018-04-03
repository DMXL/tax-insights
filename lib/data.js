/*
 * COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED
 *
 * @Author: dm@dmon-studo.com
 * @Date: 2018-04-02 16:30:39
 * @Last Modified by: dm@dmon-studo.com
 * @Last Modified time: 2018-04-03 18:09:40
 */

const THRESHOLD = 3500
const TIERS = [
  { rate: .03, qcd: 0, min: 0, max: 1500 },
  { rate: .1, qcd: 105, min: 1501, max: 4500 },
  { rate: .2, qcd: 555, min: 4501, max: 9000 },
  { rate: .25, qcd: 1005, min: 9001, max: 35000 },
  { rate: .3, qcd: 2755, min: 35001, max: 55000 },
  { rate: .35, qcd: 5505, min: 55001, max: 80000 },
  { rate: .45, qcd: 13505, min: 80000, max: NaN }
]

const range = [0, 100000]
const interval = 500
let data = []
let delimiters = new Set()

const getTax = (income) => {
  const Taxable = income - THRESHOLD
  let Payable = 0
  // No tax you lucky bastard
  if (Taxable <= 0) {
    return Payable
  }

  for (let { rate, qcd, min, max } of TIERS) {
    if (Taxable >= min && (isNaN(max) || Taxable <= max)) {
      Payable = Taxable * rate - qcd
      break
    }
  }
  return Payable
}

for (let { max } of TIERS) {
  let income = max + THRESHOLD

  data.push({
    income,
    Taxable: max,
    Payable: getTax(income),
    type: 'Tier Delimiter'
  })

  delimiters.add(income)
}

for (let income = range[0]; income <= range[1]; income += interval) {
  if (!delimiters.has(income)) {
    data.push({
      income,
      Taxable: (income - THRESHOLD) > 0 ? income - THRESHOLD : 0,
      Payable: getTax(income),
      type: 'Trend'
    })
  }
}

export default data
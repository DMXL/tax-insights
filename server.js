/*
 * COPYRIGHT © 2018 DMON STUDIO ALL RIGHTS RESERVED
 *
 * @Author: dm@dmon-studo.com
 * @Date: 2018-04-02 16:21:57
 * @Last Modified by: dm@dmon-studo.com
 * @Last Modified time: 2018-04-03 18:16:26
 */

const express = require('express')
const app = express()
const path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/', express.static(path.join(__dirname, 'public'), {
  extensions: ['js']
}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
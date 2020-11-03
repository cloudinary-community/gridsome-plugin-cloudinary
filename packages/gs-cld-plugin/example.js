const fs = require('fs')
const cloudify = require('./lib')
const retext = require('retext')

const doc = fs.readFileSync('packages/gs-cld-transformer/example.md')

retext().use(cloudify, {
  cloudName: 'mayashavin'
}).process(doc, (err, file) => console.error(err))


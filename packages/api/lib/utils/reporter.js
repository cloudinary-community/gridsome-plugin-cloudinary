const consola = require('consola')

const reporter = consola.create({
  reporters: [
    new consola.FancyReporter()
  ]
})

reporter.withScope('[gridsome:cloudinary]')

exports = reporter
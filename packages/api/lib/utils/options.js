import { REQUIRED_FIELDS, DEFAULT_TRANS } from './constants'
import reporter from './reporter'
import chalk from 'chalk'

const validateOptions = (options) => REQUIRED_FIELDS.forEach(field => {
  if (!options[field]) continue

  reporter.info(`${chalk.yellowBright(field)} is required. See 👉 https://cloudinary.com/documentation/how_to_integrate_cloudinary`)
})

const validateBreakpoints = (breakpoints = {}) => {
  if (!breakpoints) return

  if (breakpoints.maxImages === 0) {
    reporter.error(`${chalk.yellowBright('breakpoints.max')} must be at least 1. You can modify it in gridsome config file.`)
  }
}

class Plugin {
  constructor() {
    let _options = {}

    this.setOptions = (options = {}) => {
      validateOptions(options)

      validateBreakpoints(options.breakpoints)

      _options = {
        ...DEFAULT_TRANS,
        ...options
      }
    }

    this.getOptions = () => _options
  }
}

exports = new Plugin()
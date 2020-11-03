import CImage from './cImage'
import { UrlOptions } from './types/IUrlOptions'
import { CloudOptions } from './types/CloudOptions'
import { Configuration, UseOptions, Components } from './types/Configuration'
import { pickConfigKeys, pickCloudKeys } from './utils/utils'

export const plugActions = (assets: UseOptions = {}, instance: CloudinaryApi) => {
  if (!assets.image && !assets.video) {
    const reporter = require('./utils/reporter')
    const chalk = require('chalk')
    reporter.error(`You need to define use ${chalk.yellow('image')} or/and ${chalk.red('image')}. Otherwise everything will be included.`)

    
    // this.image = plugImageActions(assets.image, this.cloudConfig)
    // this.video = plugVideoActions(assets.video)

    return
  }

  if (assets.image) {
    instance.image = plugImageActions(assets.image, {
      cloud: instance.cloudConfig,
      url: instance.urlConfig
    })
  }

  if (assets.video) {
    instance.video = plugVideoActions(assets.video, {
      cloud: instance.cloudConfig,
      url: instance.urlConfig
    })
  }
}

export const plugImageActions = (features, configs) => ((publicId: string):CImage => {
  if (!publicId) {
    const reporter = require('./utils/reporter')
    const chalk = require('chalk')
    reporter.error(`You need to define ${chalk.yellow('publicId')} so we can modify it for you.`)
  }

  return new CImage(publicId, features, configs)
})

export const plugVideoActions = (settings, configs) => (() => {})

class CloudinaryApi {
  image?: Function
  video?: Function
  urlConfig: UrlOptions
  cloudConfig: CloudOptions

  constructor(options: Configuration = { cloudName: '' }) {
    if (!options.cloudName) {
      const reporter = require('./utils/reporter')
      const chalk = require('chalk')
      reporter.error(`You need to define ${chalk.yellow('cloudName')} before starting to use Cloudinary.`)
    }

    this.urlConfig = pickConfigKeys(options)
    this.cloudConfig = pickCloudKeys(options)
    plugActions(options.use, this)
    this.plugComponents(options.components)
  }
  plugComponents(components: Components) {
    
  }
}

export default CloudinaryApi
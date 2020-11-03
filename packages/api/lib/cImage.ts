import { Actions } from './actions'
import Url from './utils/url'
import { CloudOptions } from './types/CloudOptions'
import { UrlOptions } from './types/IUrlOptions'

/** WIP */
class CImage {
  path: string //Suppose to be version/path-to-asset
  actions: string[]
  prefix: string
  border?: Function
  cutter?: Function
  rotate?: Function
  resize?: Function
  quality?: Function
  roundCorners?: Function
  overlay?: Function
  underlay?: Function
  addVariables?: Function
  customFunction?: Function
  effect?: Function
  adjust?: Function
  presetTransformation?: Function
  backgroundColor?: Function
  format?: Function
  
  constructor(publicId: string, features: string[], { url, cloud }: { url: UrlOptions, cloud: CloudOptions }) {
    //TODO: check if remoteURL? if so change resourceType to `upload`
    this.prefix = Url.getPrefix({ cloudName: cloud.cloudName, assetType: 'image', resourceType: 'upload' })
    this.path = Url.getPathToAsset({ publicId, forceVersion: false, version: 1 })
    this.actions = ['f_auto', 'q_auto']

    //need to bind the function to class scope
    features
      .filter(action => Actions[action])
      .forEach(action => this[action] = (...args) => {
        const result = require('./actions')[action](...args)
        !this.actions.includes(result) && this.actions.push(result)
      })
  }

  url() {
    const transformation = this.actions.filter(Boolean).reduce((str, action) => `${str}/${action}`, '')

    return `${this.prefix}${transformation}/${this.path}`.replace(' ', '%20')
  }
}

export default CImage
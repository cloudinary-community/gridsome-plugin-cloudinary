import Url from '../lib/utils/url'

describe('Url', () => {
  describe('getPrefix()', () => {
    it('should return a prefix with image as default', () => {
      expect(Url.getPrefix({
        cloudName: 'demo',
        resourceType: 'upload'
      })).toEqual('https://res.cloudinary.com/demo/image/upload')
    })

    it('should return a prefix', () => {
      expect(Url.getPrefix({
        cloudName: 'demo',
        resourceType: 'upload',
        assetType: 'video'
      })).toEqual('https://res.cloudinary.com/demo/video/upload')
    })
  })

  describe('getPathToAsset', () => {
    it('should force the default version', () => {
      expect(Url.getPathToAsset({
        publicId: 'a',
        forceVersion: true
      })).toEqual('v1/a')
    });

    it('should force the version when passed', () => {
      expect(Url.getPathToAsset({
        publicId: 'a',
        forceVersion: true,
        version: 2
      })).toEqual('v2/a')
    });

    it('should not force version when not enabled ', () => {
      expect(Url.getPathToAsset({
        publicId: 'a',
      })).toEqual('a')
    });

    it('should not force a version when it is a url ', () => {
      expect(Url.getPathToAsset({
        forceVersion: true,
        publicId: 'https://hello'
      })).toEqual('https://hello')
    });
    
    it('should not force a version when it already contains a version ', () => {
      expect(Url.getPathToAsset({
        forceVersion: true,
        publicId: 'v3/a'
      })).toEqual('v3/a')
    });
  })
})
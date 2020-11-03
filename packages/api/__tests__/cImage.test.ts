import CImage from '../lib/cImage'
import { Actions } from '../lib/actions'

describe('CImage', () => {
  it('should contains only the actions passed', () => {
    const cimg = new CImage('a', [ Actions.resize ], {
      cloud: {
        cloudName: 'demo'
      },
      url: {
        secure: true
      }
    })

    expect(cimg.resize).toBeDefined()
    expect(cimg.rotate).toBeUndefined()
  });

  it('should contains more than two actions passed', () => {
    const cimg = new CImage('a', [ Actions.resize, Actions.rotate ], {
      cloud: {
        cloudName: 'demo'
      },
      url: {
        secure: true
      }
    })

    expect(cimg.resize).toBeDefined()
    expect(cimg.rotate).toBeDefined()
  });

  it('should have action triggerable', () => {
      const cimg = new CImage('a', [ Actions.quality ], {
        cloud: {
          cloudName: 'demo'
        },
        url: {
          secure: true
        }
      })

      cimg.quality()

      expect(cimg.actions).toEqual(['f_auto','q_auto'])
    })

    it('should have valid url', () => {
      const cimg = new CImage('a', [ Actions.resize ], {
      cloud: {
          cloudName: 'demo'
        },
        url: {
          secure: true
        }
      })

      cimg.resize({ width: 100, height: 100 })

      expect(cimg.url()).toEqual('https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/c_scale,w_100,h_100/a')
    })

    it('should have valid url with basic transformation', () => {
      const cimg = new CImage('a', [ Actions.rotate, Actions.resize ], {
        cloud: {
          cloudName: 'demo'
        },
        url: {
          secure: true
        }
      })

      expect(cimg.url()).toEqual('https://res.cloudinary.com/demo/image/upload/f_auto/q_auto/a')
    })
});
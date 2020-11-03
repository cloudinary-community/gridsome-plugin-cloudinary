import { resize, rotate, roundCorners, quality, format, border } from '../lib/actions'

describe('Actions', () => {
  describe('resize()', () => {
    it('should return with all options', () => {
      expect(resize({type: 'crop', width: 10, height: 20})).toEqual('c_crop,w_10,h_20')
    })

    it('should return only type and height', () => {
      expect(resize({ type: 'crop', height: 20 })).toEqual('c_crop,h_20')
    })

    it('should return only type and width', () => {
      expect(resize({ type: 'crop', width: '10' })).toEqual('c_crop,w_10')
    })

    it('should auto-scale when only width and height', () => {
      expect(resize({ width:10, height: 10 })).toEqual('c_scale,w_10,h_10')
    })
  })

  describe('rotate', () => {
    it('should return rotation with angel', () => {
      expect(rotate(10)).toEqual('a_10')
    })

    it('should return empty', () => {
      expect(rotate(0)).toEqual('')
    })
  })

  describe('roundCorners()', () => {
    it('should return valid option', () => {
      expect(roundCorners('max')).toEqual('r_max')
    })
  })

  describe('quality()', () => {
    it('should return default', () => {
      expect(quality()).toEqual('q_auto')
    });

    it('should return default on undefined', () => {
      expect(quality(undefined)).toEqual('q_auto')
    })

    it('should return valid option', () => {
      expect(quality(300)).toEqual('q_300')      
    });
  });

  describe('format()', () => {
    it('should return default', () => {
      expect(format()).toEqual('f_auto')
    });

    it('should return default on undefined', () => {
      expect(format(undefined)).toEqual('f_auto')
    })

    it('should return valid option', () => {
      expect(format('webp')).toEqual('f_webp')      
    });
  });

  describe('border', () => {
    it('should return a default type and color if only width is passed', () => {
      expect(border({ width: 10 })).toEqual('bo_10px_solid_black')
    })

    it('should return options', () => {
      expect(border({ type: 'dotted', color: 'blue', width: 10 })).toEqual('bo_10px_dotted_blue')
    })
  })
})
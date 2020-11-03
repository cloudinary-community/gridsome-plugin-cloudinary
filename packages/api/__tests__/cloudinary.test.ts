import CloudinaryApi from '../lib/cloudinary'

describe('CloudinaryApi', () => {
  const mockReporterError = jest.fn()
  jest.mock('../lib/utils/reporter', () => ({
    error: mockReporterError
  }))

  it('should throw error when no cloudName defined ', () => {
    const options = {
      use: {
        image: []
      },
      components: {}
    } 

    new CloudinaryApi(options)

    expect(mockReporterError).toBeCalled()
  })

  it('should throw error when no image or video selected', () => {
    const options = {
      cloudName: 'demo',
      use: {},
      components: {}
    }

    const instance = new CloudinaryApi(options)

    expect(mockReporterError).toBeCalledTimes(1)
    expect(instance.image).toBeUndefined()
    expect(instance.video).toBeUndefined()
  })

  it('should create instance of Cloudinary with options', () => {
    const options = {
      cloudName: 'demo',
      apiKey: '123',
      api_Secret: '1234',
      private: false,
      privateCdn: true,
      secure: true,
      use: {
        image: ['rotate', 'resize']
      }
    }

    const instance = new CloudinaryApi(options)

    expect(mockReporterError).not.toBeCalled()
    expect(instance.cloudConfig).toEqual({
      cloudName: 'demo',
      apiKey: '123'
    })
    expect(instance.urlConfig).toEqual({
      secure: true,
      privateCdn: true,
    })
    expect(instance.image).toBeDefined()
    expect(instance.video).toBeUndefined()
  })

  it('should create instance of Cloudinary with only image features', () => {
    const options = {
      cloudName: 'demo',
      apiKey: '123',
      api_Secret: '1234',
      private: false,
      privateCdn: true,
      secure: true,
      use: {
        image: ['rotate', 'resize']
      }
    }

    const instance = new CloudinaryApi(options)

    expect(mockReporterError).not.toBeCalled
    expect(instance.cloudConfig).toEqual({
      cloudName: 'demo',
      apiKey: '123'
    })
    expect(instance.urlConfig).toEqual({
      secure: true,
      privateCdn: true,
    })
    expect(instance.image('sample').rotate).toBeDefined()
    expect(instance.image('sample').resize).toBeDefined()
    expect(instance.image('sample').quality).toBeUndefined()
  })

  it('should create instance of Cloudinary with only video features', () => {
    const options = {
      cloudName: 'demo',
      apiKey: '123',
      api_Secret: '1234',
      private: false,
      privateCdn: true,
      secure: true,
      use: {
        video: ['rotate', 'resize']
      }
    }

    const instance = new CloudinaryApi(options)

    expect(mockReporterError).not.toBeCalled()
    expect(instance.cloudConfig).toEqual({
      cloudName: 'demo',
      apiKey: '123'
    })
    expect(instance.urlConfig).toEqual({
      secure: true,
      privateCdn: true,
    })
    expect(instance.image).toBeUndefined()
    expect(instance.video).toBeDefined()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
});
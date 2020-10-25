"use strict";

const CloudinaryApi = require("../lib");

describe("gs-cld-source", () => {
  it("uses default options if no options is passed", () => {
    const mockApi = {
      loadSource: jest.fn()
    }

    const instance = new CloudinaryApi(mockApi)

    expect(instance._options).toEqual({})

    expect(instance._cld.config()).toEqual({
      privateCdn: false,
      secure: true
    })
  });
});

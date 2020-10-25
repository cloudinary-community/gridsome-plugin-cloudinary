export default function (Vue, options) {
  const {
    default: Cloudinary,
    CldImage,
    CldTransformation,
    CldVideo,
    CldContext,
  } = require("cloudinary-vue");

  Vue.use(Cloudinary, {
    ...options,
    components: [CldContext, CldImage, CldTransformation, CldVideo],
  });
}

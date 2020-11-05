// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Doc from '~/layouts/Doc.vue'
import Cloudinary, {TransformableImage} from '@cloudinary/base';

export default function (Vue, { head }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Doc', Doc)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Livvic:wght@400;600&display=swap'
  })

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'mayashavin'
    },
    url: {
      secure: true // force http or https
    }
  });
  
  // Plug the image type into your instance
  cld.useImage(TransformableImage);

  Vue.prototype.$cld = cld
}

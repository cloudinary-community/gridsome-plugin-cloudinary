<template>
  <Layout>
    <h1 class="font-xl mb-10 pb-5 border-b border-indigo-200">Cloudinary Transformations</h1>
    <div>
      <p class="mb-5 font-xl">The following are the available variables:</p>
      <div>
        <div v-for="field in methods" :key="field" class="grid grid-cols-2 py-1 border-t border-b border-gray-800">
          <span class="capitalize">{{field.replace(/([A-Z])/g, " $1")}}</span><code>{{field}}</code>
        </div>
      </div>
    </div>
  </Layout>
</template>
<script>
export default {
  data() {
    return {
      methods: [
        "angle",
        "audioCodec",
        "audioFrequency",
        "aspectRatio",
        "background",
        "bitRate",
        "border",
        "color",
        "colorSpace",
        "crop",
        "customFunction",
        "customPreFunction",
        "defaultImage",
        "delay",
        "density",
        "duration",
        "dpr",
        "effect",
        "else",
        "endIf",
        "endOffset",
        "fallbackContent",
        "fetchFormat",
        "format",
        "flags",
        "gravity",
        "fps",
        "height",
        "htmlHeight",
        "htmlWidth",
        "if",
        "keyframeInterval",
        "ocr",
        "offset",
        "opacity",
        "overlay",
        "page",
        "poster",
        "prefix",
        "quality",
        "radius",
        "rawTransformation",
        "size",
        "sourceTypes",
        "sourceTransformation",
        "startOffset",
        "streamingProfile",
        "transformation",
        "underlay",
        "variable",
        "variables",
        "videoCodec",
        "videoSampling",
        "width",
        "x",
        "y",
        "zoom"
        ]
    }
  }
}
</script>
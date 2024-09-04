<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const iframeRef = ref<HTMLIFrameElement>()
// ifame的load方法会在会在iframe及其内部的所有资源（如图片、样式表、脚本等）都加载完毕之后触发。
const onIframeLoad = () => {
  console.log('iframe already loaded')
}

const changeIframeText = () => {
  // const iframeContent = iframeRef.value?.contentWindow.document
  const iframeContent = iframeRef.value.contentDocument
  if (iframeContent) {
    const el = iframeContent.getElementById('iframe_text')
    el.style.color = 'yellowgreen'
  }
}

// iframe引入的相当于外部的资源，所以base会先挂载完成
onMounted(() => {
  console.log('base content already mounted')
})
</script>

<template>
  <button @click="router.push('/')">go home</button>
  <h1>Base IFrame Same Origin</h1>
  <button @click="changeIframeText" style="margin-right: 20px">change iframe text</button>
  <div id="base-title">
    <p>iframe content:</p>
  </div>
  <div class="containder">
    <iframe
      ref="iframeRef"
      src="/sameOriginPage"
      width="100%"
      height="100%"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<style scoped>
.containder {
  width: 100%;
  height: 90vh;
}
</style>

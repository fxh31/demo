<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const iframeRef = ref<HTMLIFrameElement>()
// ifame的load方法会在会在iframe及其内部的所有资源（如图片、样式表、脚本等）都加载完毕之后触发。
const onIframeLoad = () => {
  console.log('iframe already loaded')
  // 监听message事件
  setupMessageListener()
}

// 如果想在渲染一开始就监听 message 事件，则需要放在 onMounted 中
const setupMessageListener = () => {
  window.addEventListener('message', (event) => {
    console.log('事件触发', event)
    const data = event.data
    // console.log(data)
    const el = document.getElementById(data.id)
    el.style.color = 'yellowgreen'
  })
}

// 向子窗口发送消息
const postMessage = () => {
  // 获取子窗口的window对象
  const childWindow = iframeRef.value?.contentWindow
  // 向子窗口发送消息
  childWindow?.postMessage('c2', '*')
}

// iframe引入的相当于外部的资源，所以base会先挂载完成
onMounted(() => {
  console.log('base content already mounted')
  // setupMessageListener() // 渲染一开始就监听 message 事件
})
</script>

<template class="app-container">
  <div>
    <RouterLink to="/crossOrigin">非同源 iframe 通讯</RouterLink>
    <RouterLink to="/sameOrigin">同源 iframe 通讯</RouterLink>
  </div>
</template>

<style scoped>
.containder {
  width: 100%;
  height: 90vh;
}

a.router-link-exact-active {
  color: var(--color-text);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}
a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a:first-of-type {
  border: 0;
}
</style>

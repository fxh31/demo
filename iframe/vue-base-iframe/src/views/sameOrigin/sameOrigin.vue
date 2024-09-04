<script setup lang="ts">
const childConsole = () => {
  console.log('chid')
}

const changeParentText = () => {
  // const parent = window.top // top 指向顶层窗口，parent 指向父级窗口
  const parent = window.parent.document
  const el = parent.getElementById('base-title')
  el.style.color = 'red'
}
</script>

<template>
  <div>
    <div id="iframe_text">same origin：http://localhost:5176/sameOriginPage</div>
    <button @click="changeParentText" style="margin-top: 10px">change parent text</button>
  </div>
</template>

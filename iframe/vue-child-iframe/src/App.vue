<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, onMounted } from 'vue'

const postMessage = () => {
  const parentWindow = window.parent
  // 向父窗口发送消息
  parentWindow.postMessage({ type: 'dom-test', id: 'base-title' }, '*')
}

// 设置 message 事件监听器，只要没有清除监听器，默认会一直存在，并在相应的时机触发
const setupMessageListener = () => {
  window.addEventListener('message', (event) => {
    console.log('事件触发', event)
    const data = event.data
    const el = document.getElementById(data)
    el.style.color = 'red'
  })
}

onMounted(() => {
  console.log('child1 mounted')
  // postMessage() // 挂载后立刻发送消息（如果在父窗口 iframe 的 load 事件内使用message监听则无法被监听）
  setupMessageListener()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <button @click="postMessage" style="margin-right: 20px">send message</button>
    <div style="margin-right: 20px">
      <p>child1</p>
      <p id="c2">child2</p>
      <p>child3</p>
    </div>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

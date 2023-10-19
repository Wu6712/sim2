<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/iconfont/iconfont.css'; // 引入阿里巴巴图标库的样式文件

export default {
  name: 'App',
  components: {},
};
</script>

<style>
/*清楚原有样式，并使得占据整个屏幕*/
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>

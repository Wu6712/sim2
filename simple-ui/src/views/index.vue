<template>
  <div style="height: 100%;">
    <router-view/>
    <!--底部按钮，点击切换页面-->
    <van-tabbar route v-model="active" @change="onChange">
      <van-tabbar-item to="/diandan" icon="iconfont icon-diandan">点单</van-tabbar-item>
      <van-tabbar-item to="/tongji" icon="iconfont icon-tongji">统计</van-tabbar-item>
      <van-tabbar-item to="/wode" icon="iconfont icon-wode_wode">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      active: 0
    }
  },
  methods: {
    // 点击底部按钮，active的值改为点击的按钮的索引
    onChange(index) {
      this.active = index
    }
  }
}
</script>

<style scoped>

</style>
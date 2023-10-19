<template>
  <div class="app-container carBox">
    <el-card>
      User Manage Component
    </el-card>
  </div>
</template>

<script>

import { getInfo } from "@/api/user";

export default {
  name: "index",
    data() {
      return {

      }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getInfo().then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
.carBox {
  height: 100%;
}
</style>

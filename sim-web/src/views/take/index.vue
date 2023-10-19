<template>
  <div class="app-container">

    <!--表格数据-->
    <el-table
      :data="orderList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="80">
      </el-table-column>
      <el-table-column
        prop="number"
        label="订单号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="下单用户"
        width="100">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button v-if="scope.row.status === 1 || scope.row.status === 2" type="success" size="mini"
                     @click="updateOrder(scope.row)">
            接取
          </el-button>
          <el-button v-else type="primary" size="mini" disabled>
            已被接取
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "Take",
  data() {
    return {
      pageNum: 1,
      pageSize: 50,
      orderList: [],
      updateFormData: {}
    }
  },
  mounted() {
    this.getOrderList()
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  methods: {
    getOrderList() {
      this.$store.dispatch('order/getOrderList', {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(response => {
        console.log(response)
        this.orderList = response.data.records
      })
    },
    updateOrder(row) {
      this.updateFormData = row
      this.updateFormData.status = 3
      this.$store.dispatch('order/updateOrder', this.updateFormData).then(response => {
        this.$message.success(response.message)
        this.getOrderList()
        this.updateDialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container ">

    <div style="display: flex;align-items: center">
      <!--批量删除-->
      <el-button type="danger" round style="margin-left: 10px;"
                 :disabled="deleteArr.length === 0"
                 @click="deleteOrders">
        批量删除
      </el-button>

      <!--新增-->
      <el-button icon="el-icon-plus" type="primary" plain
                 @click="insertDialogVisible = true">
        新增
      </el-button>
    </div>

    <!--表格数据-->
    <el-table
      :data="orderList"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>
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
        label="订单状态"
        width="100">
        <template scope="scope">
          <div v-if="scope.row.status === 1">
            待付款
          </div>
          <div v-else-if="2">
            待派送
          </div>
          <div v-else-if="3">
            已派送
          </div>
          <div v-else-if="4">
            已完成
          </div>
          <div v-else-if="5">
            已取消
          </div>
        </template>
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
        prop="checkoutTime"
        label="结账时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="支付方式"
        width="100">
        <template scope="scope">
          <div v-if="scope.row.payMethod === 1">
            微信
          </div>
          <div v-else-if="scope.row.payMethod === 2">
            支付宝
          </div>
          <div v-else>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="实收金额"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="success" size="mini"
                     @click="updateOrder(scope.row)">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增Dialog对话框-->
    <el-dialog
      title="新增"
      :visible.sync="insertDialogVisible"
      width="50%">
      <el-form :model="insertFormData">
        <el-form-item label="菜单" label-width="80px">
          <el-select v-model="menuData" clearable placeholder="请选择">
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" label-width="80px">
          <el-input v-model="insertFormData.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelInsert">取 消</el-button>
        <el-button type="primary" @click="confirmInsert">确 定</el-button>
      </div>
    </el-dialog>

    <!--更新Dialog对话框-->
    <el-dialog
      title="更新"
      :visible.sync="updateDialogVisible"
      width="50%">
      <el-form :model="updateFormData">
        <el-form-item label="地址" label-width="80px">
          <el-input v-model="updateFormData.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdate">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import {getMenuList} from "@/api/menu";

export default {
  name: "Dish",
  data() {
    return {
      orderList: [],
      menuList: [],
      menuData: '',
      total: 0,
      pageNum: 1,
      pageSize: 50,
      dishName: '',
      deleteArr: [],
      insertDialogVisible: false,
      insertFormData: {},
      updateDialogVisible: false,
      updateFormData: {}
    }
  },
  mounted() {
    this.getOrderList()
    this.getMenuList()
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
    getMenuList() {
      getMenuList({
        pageNum: 1,
        pageSize: 10
      }).then(({ data: response }) => {
        this.menuList = response.data
      })
    },
    deleteOrders() {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        let deleteData = this.deleteArr.map(item => {
          return item.id
        })

        this.$store.dispatch('order/deleteOrders', deleteData).then((response) => {
          this.$message.success(response.message)
          this.getOrderList()
        }).catch(error => {
          this.$message.error(error.message)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleSelectionChange(val) {
      this.deleteArr = val
    },
    cancelInsert() {
      this.insertFormData = {}
      this.menuData = ''
      this.insertDialogVisible = false
    },
    confirmInsert() {
      this.insertFormData.userId = this.$store.state.user.id
      this.$store.dispatch('order/insertOrder', this.insertFormData).then(response => {
        this.$message.success(response.message)
        this.getOrderList()
        this.cancelInsert()
      }).catch(error => {
        this.$message.error(error)
      })
    },
    updateOrder(row) {
      this.updateFormData = row
      console.log(this.updateFormData)
      this.updateDialogVisible = true
    },
    confirmUpdate() {
      this.$store.dispatch('order/updateOrder', this.updateFormData).then(response => {
        this.$message.success(response.message)
        this.getOrderList()
        this.updateDialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelUpdate() {
      this.updateDialogVisible = false
      this.getOrderList()
    }
  }
}
</script>

<style scoped>

</style>

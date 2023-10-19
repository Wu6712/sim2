<template>
  <div class="app-container carBox">

    <el-card style="display: flex;">
      <span>用户名称</span>
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="uname"
        clearable
        @keyup.enter.native="getUserListByInput"
        style="border: 1px solid skyblue;border-radius: 5px;width: 300px;margin-left: 10px;">
      </el-input>
      <el-button type="danger" round style="margin-left: 10px;"
        :disabled="deleteArr.length === 0"
        @click="deleteUsers">
        批量删除
      </el-button>
    </el-card>

    <el-table
      :data="userList"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="online"
        label="在线状态">
        <template scope="scope">
          <el-button :type="scope.row.online === 1 ? 'success' : 'info'"
                     size="mini">{{scope.row.online === 1 ? '在线' : '离线'}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle
              @click="clickChange(scope.row)">
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--更新Dialog对话框-->
    <el-dialog
      title="更新"
      :visible.sync="updateDialogVisible"
      width="50%">
        <el-form :model="formData">
          <el-form-item label="id" label-width="80px">
            <el-input v-model="formData.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="用户名" label-width="80px">
            <el-input v-model="formData.username" readonly></el-input>
          </el-form-item>
          <el-form-item label="昵称" label-width="80px">
            <el-input v-model="formData.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别" label-width="80px">
            <el-select placeholder="请选择性别" v-model="formData.sex" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址" label-width="80px">
            <el-input v-model="formData.address"></el-input>
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

import { getUserList, getListByName } from "@/api/user";
import {Message} from "element-ui";

export default {
  name: "User",
    data() {
      return {
        userList: [],
        uname: '',
        pageNum: 1,
        pageSize: 10,
        total: '',
        deleteArr: [],
        updateDialogVisible: false,
        formData: {},
        options: [
          {
            value: 0,
            label: '女'
          },
          {
            value: 1,
            label: '男'
          }
        ]
      }
  },
  mounted() {
    this.getUserList()
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  methods: {
    getUserList() {
      getUserList().then(response => {
        this.userList = response.data.records
        this.total = response.data.total
      })
    },
    getUserListByInput() {
      if (this.uname === '') {
        return this.getUserList()
      }
      getListByName({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        username: this.uname
      }).then(({ data: response }) => {

        this.userList = response.data
        this.total = response.total
      }).catch(error => {
        console.log(error)
      })
    },
    clickChange(row) {
      this.formData = row
      this.updateDialogVisible = true
      console.log(row)
    },
    handleSelectionChange(val) {
      this.deleteArr = val
    },
    deleteUsers() {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        let deleteData = this.deleteArr.map(item => {
          return item.id
        })

        this.$store.dispatch('user/deleteUsers', deleteData).then((response) => {
          Message.success(response.message)
          this.getUserList()
        }).catch(error => {
          Message.error(error)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    cancelUpdate() {
      this.getUserList()
      this.updateDialogVisible = false
    },
    confirmUpdate() {
      // 修改请求
      this.$store.dispatch('user/updateUser', this.formData).then((response) => {
        this.$message.success(response.message)
        this.getUserList()
      }).catch(error => {
        this.$message.error(error)
      })
      this.getUserList()
      this.updateDialogVisible = false
    },
  }
}
</script>

<style scoped>
.carBox {
  height: 100%;
}
</style>

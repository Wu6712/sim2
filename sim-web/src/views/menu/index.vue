<template>
  <div class="app-container">
    <div>
      <!--批量删除-->
      <el-button type="danger" round style="margin-left: 10px;"
                 :disabled="deleteArr.length === 0"
                 @click="deleteMenus">
        批量删除
      </el-button>

      <!--新增-->
      <el-button icon="el-icon-plus" type="primary" plain
                 @click="insertDialogVisible = true">
        新增
      </el-button>

      <!--表格数据-->
      <el-table
        :data="menuList"
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
          prop="name"
          label="菜单名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="dishId"
          label="菜ID"
          width="200">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button type="success" size="mini"
            @click="updateMenu(scope.row)">
              修改
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
          <el-form-item label="菜单名" label-width="80px">
            <el-input v-model="insertFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="菜id" label-width="80px">
            <el-input v-model.number="insertFormData.dishId"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInsert">取 消</el-button>
          <el-button type="primary" @click="confirmInsert">确 定</el-button>
        </div>
      </el-dialog>

      <!--修改Dialog对话框-->
      <el-dialog
        title="修改"
        :visible.sync="updateDialogVisible"
        width="50%">

        <el-form :model="updateFormData">
          <el-form-item label="id" label-width="80px">
            <el-input v-model="updateFormData.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="菜单名" label-width="80px">
            <el-input v-model="updateFormData.name"></el-input>
          </el-form-item>
          <el-form-item label="菜id" label-width="80px">
            <el-input v-model.number="updateFormData.dishId"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="confirmUpdate">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {updateMenuById} from "@/api/menu";

export default {
  name: "Menu",
  data() {
    return {
      deleteArr: [],
      menuList: [],
      pageNum: 1,
      pageSize: 10,
      insertDialogVisible: false,
      insertFormData: {},
      updateDialogVisible: false,
      updateFormData: {},
    }
  },
  methods: {
    deleteMenus() {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        let deleteData = this.deleteArr.map(item => {
          return item.id
        })

        this.$store.dispatch('menu/deleteMenus', deleteData).then((response) => {
          this.$message.success(response.message)
          this.getMenuList()
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
    getMenuList() {
      this.$store.dispatch('menu/getMenuList',{
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then((response) => {
        this.menuList = response.data.data
      }).catch(error => {
        this.$message.error(error)
      })
    },
    cancelInsert() {
      this.insertFormData = {}
      this.insertDialogVisible = false
    },
    confirmInsert() {
      this.$store.dispatch('menu/insertMenu', this.insertFormData).then(response => {
        this.$message.success(response.message)
        this.getMenuList()
        this.insertDialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    updateMenu(row) {
      this.updateFormData = row
      this.updateDialogVisible = true
    },
    cancelUpdate() {
      this.getMenuList()
      this.updateDialogVisible = false
      this.updateFormData = {}
    },
    confirmUpdate() {
      updateMenuById(this.updateFormData).then(response => {
        if(response.code !== 200) return this.$message.error(response.message)
        this.$message.success(response.message)
        this.getMenuList()
        this.updateDialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    }
  },
  mounted() {
    this.getMenuList()
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container ">

    <div style="display: flex;align-items: center">
      <!--选择器-->
      <span>选择菜单</span>
      <el-select v-model="menuId" placeholder="请选择" style="margin-left: 10px" clearable>
        <el-option
          v-for="item in menuList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <!--批量删除-->
      <el-button type="danger" round style="margin-left: 10px;"
                 :disabled="deleteArr.length === 0"
                 @click="deleteDishes">
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
      :data="dishList"
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
        prop="image"
        label="照片"
        width="100">
        <template scope="scope">
          <el-image
            :src="scope.row.image"
            style="width: 45px;height: 45px;border-radius: 50%;">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="represent"
        label="描述"
        width="200">
      </el-table-column>
      <el-table-column
        prop="menuId"
        label="菜单Id"
        width="100">
      </el-table-column>
      <el-table-column
        label="价格"
        width="180">
        <template scope="scope">
          <span style="color: red">{{'￥' + scope.row.price + '.00'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="success" size="mini"
                     @click="updateDish(scope.row)">
            更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div style="display: flex;justify-content: center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        background
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="margin: 20px 200px 0 0">
      </el-pagination>
    </div>

    <!--新增Dialog对话框-->
    <el-dialog
      title="新增"
      :visible.sync="insertDialogVisible"
      width="50%">
      <el-form :model="insertFormData">
        <el-form-item label="菜图" label-width="80px">
          <el-upload
            action="''"
            class="upload-demo"
            ref="upload"
            :auto-upload="false"
            :limit="1"
            list-type="picture"
            :on-remove="handleRemove"
            :on-change="handleAvatarChangeIcon">
            <el-button v-if="imageUrl === ''" size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜名" label-width="80px">
          <el-input v-model="insertFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="菜类别" label-width="80px">
          <el-select v-model="insertFormData.menuId" placeholder="请选择">
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" label-width="80px">
          <el-input v-model="insertFormData.represent"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model.number="insertFormData.price"></el-input>
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
        <el-form-item label="菜图" label-width="80px">
          <el-image
            style="width: 100px; height: 100px"
            :src="updateFormData.image">
          </el-image>
        </el-form-item>
        <el-form-item label="菜名" label-width="80px">
          <el-input v-model="updateFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="菜类别" label-width="80px">
          <el-select v-model="updateFormData.menuId">
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" label-width="80px">
          <el-input v-model="updateFormData.represent"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="80px">
          <el-input v-model.number="updateFormData.price"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {getDishList, getDishListByMenuId} from "@/api/dish";
import { getMenuList } from "@/api/menu";

export default {
  name: "Dish",
  data() {
    return {
      dishList: [],
      total: 0,
      menuList: [],
      menuId: '',
      pageNum: 1,
      pageSize: 5,
      dishName: '',
      deleteArr: [],
      insertDialogVisible: false,
      insertFormData: {},
      imageUrl: '',
      imageFile: {},
      updateDialogVisible: false,
      updateFormData: {}
    }
  },
  mounted() {
    this.getDishList()
    this.getMenuList()
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  watch: {
    menuId(newVal) {
      if (newVal === '') return this.getDishList()
      this.getDishListByMenuId(newVal)
    }
  },
  methods: {
    getDishList() {
      getDishList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(({ data: response }) => {
        console.log(response)
        this.total = response.total
        this.dishList = response.records
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
    deleteDishes() {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        let deleteData = this.deleteArr.map(item => {
          return item.id
        })

        this.$store.dispatch('dish/deleteDishes', deleteData).then((response) => {
          this.$message.success(response.message)
          this.getDishList()
        }).catch(error => {
          this.$message.error(error.message)
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    getDishListByMenuId(menuId) {
      getDishListByMenuId(menuId).then(response => {
        this.dishList = response.data
      })
    },
    handleSelectionChange(val) {
      this.deleteArr = val
    },
    cancelInsert() {
      this.insertFormData = {}
      this.imageUrl = ''
      this.$refs.upload.clearFiles()
      this.insertDialogVisible = false
    },
    confirmInsert() {
      const fileData = new FormData()
      fileData.append('file', this.imageFile)
      fileData.append('name', this.insertFormData.name)
      fileData.append('represent', this.insertFormData.represent)
      fileData.append('menuId', this.insertFormData.menuId)
      fileData.append('price', this.insertFormData.price)
      this.$store.dispatch('dish/insertDish', fileData).then(response => {
        this.$message.success(response.message)
        this.getDishList()
        this.insertDialogVisible = false
      }).catch(error => {
        this.$message.error(error)
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getDishList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getDishList()
    },
    handleAvatarChangeIcon(file) {
      this.imageFile = file.raw
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleRemove() {
      this.imageUrl = ''
    },
    updateDish(row) {
      this.updateFormData = row
      console.log(this.updateFormData)
      this.updateDialogVisible = true
    },
    confirmUpdate() {
      console.log(this.updateFormData)
      this.$store.dispatch('dish/updateDish', this.updateFormData).then(response => {
        this.$message.success(response.message)
        this.getDishList()
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

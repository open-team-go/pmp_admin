<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="serchList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="用户名/手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.roleId" clearable placeholder="请选择角色">
              <el-option
                v-for="item in rolesList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId">
              </el-option>
            </el-select>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加管理员</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.userInfo.nickname}}</template>
        </el-table-column>
        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">{{scope.row.userInfo.userName}}</template>
        </el-table-column>
         <el-table-column label="角色名" align="center">
          <template slot-scope="scope">{{scope.row.roleInfo.roleName || ''}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.userInfo.email}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.userInfo.contactPhone}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,30]"
        :current-page.sync="listQuery.pageNum"
        :hide-on-single-page=true
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form :model="formData"
               ref="formData"
               label-width="150px" size="small">
        <el-form-item label="昵称：">
          <el-input v-model="formData.nickname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
         <el-input v-model="formData.userName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="角色名：">
          <el-select v-model="formData.roleId" placeholder="请选择" style="width: 250px">
          <el-option
            v-for="item in rolesList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="邮箱：">
         <el-input v-model="formData.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
         <el-input v-model="formData.contactPhone" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  const adminService = require('@/api/admin')
  import { fetchAllList as fetchAllRolesList } from '../../api/role'

  const defaultFormData = {
    adminId: null,
    nickname: null,
    userName: null,
    roleName: null,
    roleId: null,
    email: null,
    contactPhone:null
  };

  export default {
    name: 'userList',
    data() {
      return {
        listQuery: {
          keyword: "",
          pageNum: 1,
          pageSize: 10,
          roleId: null
        },
        list: null,
        total: null,
        listLoading: true,
        dialogVisible: false,
        formData: Object.assign({}, defaultFormData),
        isEdit: false,
        rolesList:[]        
      }
    },
    created() {
      this.getList();
      this.getRolesList()
    },
    computed:{
      dialogTitle:function(){
        return  this.isEdit ?  '修改管理员' : '添加管理员'
      }
    },
    methods: {
     getList() {
        this.listLoading = true;
        adminService.fetchList(this.listQuery).then(res => {
          console.log(res)
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          this.listQuery.pageNum = res.data.pageNum;
          this.listQuery.pageSize = res.data.pageSize;
        }).catch(err=>{
          this.listLoading = false;
          this.list = []
          this.total = 0
        });;
      },
      getRolesList(){
        this.listLoading = true;
        fetchAllRolesList().then(res => {
          console.log(res)
          this.listLoading = false;
          this.rolesList = res.data;
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        const userInfo = row.userInfo
        const roleInfo = row.roleInfo
        const data = {
          adminId: userInfo.adminId,
          nickname: userInfo.nickname,
          userName: userInfo.userName,
          roleName: roleInfo.roleName,
          roleId: userInfo.roleId,
          email: userInfo.email,
          contactPhone: userInfo.contactPhone
        }
        this.formData = Object.assign({},data);
      },
      handleAdd(index, row) {
        this.dialogVisible = true;
        this.isEdit = false;
        this.formData = Object.assign({},defaultFormData);
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除管理员', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminService.del({
           Id: row.userInfo.adminId
          }).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      serchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleDialogConfirm() {
        const data = this.formData
        if (this.isEdit) {
          adminService.update(data).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          adminService.add(data).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        }
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>
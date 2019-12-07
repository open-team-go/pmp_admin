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
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.useOn" clearable placeholder="用户名">
              <el-option
                v-for="item in useOnoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.useOn" clearable placeholder="课程名">
              <el-option
                v-for="item in useOnoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.useOn" clearable placeholder="教学点名称">
              <el-option
                v-for="item in useOnoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.useOn" clearable placeholder="是否使用">
              <el-option
                v-for="item in useOnoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">新增</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.courseName}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.courseDesc}}</template>
        </el-table-column>
        <el-table-column label="是否使用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.useOn"
              @change="handleStatusChange(scope.$index, scope.row)">
          </el-switch>
          </template>
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
        :total="total"
        :hide-on-single-page=true>
      </el-pagination>
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px">
      <el-form :model="formData"
               ref="formData"
               label-width="150px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="formData.courseName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
         <el-input v-model="formData.courseDesc"  type="textarea" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否使用">
         <el-switch  v-model="formData.useOn"></el-switch>
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
  const courseService = require('@/api/course')

  const defaultFormData = {
    courseId: null,
    courseName: null,
    courseDesc: null,
    useOn: null
  };

  const useOnoptions = [
    {label:'可使用',value:true},
    {label:'不可使用',value:false}
  ]

  export default {
    name: 'userList',
    data() {
      return {
        listQuery: {
          keyword: "",
          pageNum: 1,
          pageSize: 10,
          useOn: null
        },
        list: null,
        total: null,
        listLoading: true,
        dialogVisible: false,
        formData: Object.assign({}, defaultFormData),
        isEdit: false,
        useOnoptions
      }
    },
    created() {
      this.getList();
    },
    computed:{
      dialogTitle:function(){
        return  this.isEdit ?  '修改课程' : '添加课程'
      }
    },
    methods: {
      // TODO: 是否使用搜索
     getList() {
        this.listLoading = true;
        courseService.fetchList(this.listQuery).then(res => {
          
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
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.formData = Object.assign({},row);
      },
      handleAdd(index, row) {
        this.dialogVisible = true;
        this.isEdit = false;
        this.formData = Object.assign({},defaultFormData);
      },
      handleDelete(index, row) {
        this.$confirm('是否删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          courseService.del({
           Id: row.courseId
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
          courseService.update(data).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          courseService.add(data).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        }
      },
      handleStatusChange(index, row) {
        this.$confirm('是否要修改该状态?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          courseService.update(row).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
          this.getList();
        });
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>
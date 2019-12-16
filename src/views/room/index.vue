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
              <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="名称/编号 "></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.adminId" @focus="getEduAdminList" filterable clearable placeholder="教务名">
              <el-option
                v-for="item in eduAdminList"
                :key="item.adminId"
                :label="item.nickname"
                :value="item.adminId">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.courseId" @focus="getCourseList" filterable clearable placeholder="课程名">
              <el-option
                v-for="item in courseList"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId">
              </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="listQuery.placeId" @focus="getPlaceList" filterable clearable placeholder="教学点名称">
              <el-option
                v-for="item in placeList"
                :key="item.placeId"
                :label="item.placeName"
                :value="item.placeId">
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
          <template slot-scope="scope">{{scope.row.roomInfo.roomName}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.roomInfo.roomDesc}}</template>
        </el-table-column>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.roomInfo.roomCode}}</template>
        </el-table-column>
        <el-table-column label="教师" align="center">
          <template slot-scope="scope">{{scope.row.roomInfo.teacherName}}</template>
        </el-table-column>
        <el-table-column label="课程" align="center">
          <template  v-if="scope.row.courseInfo !=null" slot-scope="scope">{{scope.row.courseInfo.courseName}}</template>
        </el-table-column>
        <el-table-column label="教学点" align="center">
          <template v-if="scope.row.placeInfo !=null" slot-scope="scope">{{scope.row.placeInfo.placeName}}</template>
        </el-table-column>
        <el-table-column label="教务" align="center">
          <template  v-if="scope.row.adminInfo !=null" slot-scope="scope">{{scope.row.adminInfo.nickname}}</template>
        </el-table-column>
        <el-table-column label="教学方式" align="center">
          <template  v-if="scope.row.typeInfo !=null" slot-scope="scope">{{scope.row.typeInfo.typeName}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.roomInfo.sort}}</template>
        </el-table-column>
        <el-table-column label="是否使用" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.roomInfo.useOn"
              @change="handleStatusChange(scope.$index, scope.row.roomInfo)">
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
          <el-input v-model="formData.roomInfo.roomName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
         <el-input v-model="formData.roomInfo.roomDesc"  type="textarea" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
         <el-input v-model="formData.roomInfo.roomCode"  style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
         <el-input v-model="formData.roomInfo.sort" type="number" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否使用">
         <el-switch  v-model="formData.roomInfo.useOn"></el-switch>
        </el-form-item>
        <el-form-item label="教师：">
         <el-input v-model="formData.roomInfo.teacherName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="教师联系电话：">
         <el-input v-model="formData.roomInfo.teacherPhone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="所授课程：">
            <el-select v-model="formData.courseInfo.courseId" @focus="getCourseList" filterable clearable placeholder="所授课程：">
              <el-option
                v-for="item in courseList"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="教学点：">
            <el-select v-model="formData.placeInfo.placeId" @focus="getPlaceList" filterable clearable placeholder="教学点：">
              <el-option
                v-for="item in placeList"
                :key="item.placeId"
                :label="item.placeName"
                :value="item.placeId">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="详细地址：">
         <el-input v-model="formData.roomInfo.roomAddress" type="textarea" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="教务员：">
            <el-select v-model="formData.adminInfo.adminId" @focus="getEduAdminList" filterable clearable placeholder="教务员：">
              <el-option
                v-for="item in eduAdminList"
                :key="item.adminId"
                :label="item.nickname"
                :value="item.adminId">
              </el-option>
            </el-select>
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
  const roomService = require('@/api/room')
import {fetchAllList as fetchCourseList } from '@/api/course'
import {fetchAllList as fetchPlaceList } from '@/api/place'
import {search as fetchAdminList } from '@/api/admin'
import dayjs from "dayjs";

  const defaultFormData = {
    roomId: null,
    adminInfo: {},
    courseInfo : {},
    placeInfo : {},
    roomInfo :{},
    typeInfo:{}
  };

  const useOnoptions = [
    {label:'可使用',value:true},
    {label:'不可使用',value:false}
  ]

  export default {
    name: 'roomList',
    data() {
      return {
        listQuery: {
          keyword: "",
          adminId: null,
          courseId: null,
          placeId: null,
          typeId: null,
          startTime: null,
          endTime: null,
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
        useOnoptions,
        eduAdminList:null,
        courseList:null,
        placeList:null
      }
    },
    created() {
      this.getList();
      console.log("===")
      this.getEduAdminList();
      this.getCourseList();
      this.getPlaceList();
    },
    computed:{
      dialogTitle:function(){
        return  this.isEdit ?  '修改班级' : '添加班级'
      }
    },
    methods: {
          getEduAdminList(){
            if(!this.eduAdminList){
              fetchAdminList({roleId:4}).then(res=>{
                this.eduAdminList = res.data
              }).catch(err=>{
                console.log(err)
              })
            }
          },
          getCourseList(){
            if(!this.courseList){
              fetchCourseList().then(res=>{
                this.courseList = res.data
              }).catch(err=>{
                console.log(err)
              })
            }
          },
          changeDatePicker(val){
            if(val && val.length){
              this.listQuery.startTime = val[0]/1000
              this.listQuery.endTime = val[1]/1000
            }else{
              this.listQuery.startTime = ""
              this.listQuery.endTime = ""
            }
          },
          getPlaceList(){
            if(!this.placeList){
              fetchPlaceList().then(res=>{
                this.placeList = res.data
              }).catch(err=>{
                console.log(err)
              })
            }
          },
      // TODO: 是否使用搜索
     getList() {
        this.listLoading = true;
        roomService.fetchList(this.listQuery).then(res => {
          
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          this.listQuery.pageNum = res.data.pageNum;
          this.listQuery.pageSize = res.data.pageSize;
        }).catch(err=>{
          this.listLoading = false;
          this.list = []
          this.total = 0
        });
      },
      convertEditorData(target){
        var data = target.roomInfo;
        data.adminId=target.adminInfo.adminId;
        data.courseId=target.courseInfo.courseId;
        data.placeId=target.placeInfo.placeId;
        return data;
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
          roomService.del({
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
        const data = this.convertEditorData(this.formData);
        console.log(data)
        if (this.isEdit) {
          roomService.update(data).then(res => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible =false;
            this.getList();
          })
        } else {
          roomService.add(data).then(response => {
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
          roomService.update({
            "roomId":row.roomId,
            "useOn":row.useOn
          }).then(res => {
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
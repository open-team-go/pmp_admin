<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="serchList()" type="primary" size="small">查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.email" placeholder="邮箱"></el-input>
          </el-form-item>
           <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.identityNo" placeholder="身份证"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.qq" placeholder="QQ号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.wechatNo" placeholder="微信号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.courseId" @focus="getCourseList" filterable clearable  placeholder="课程名称">
              <el-option
                v-for="item in courseList"
                :key="item.courseId"
                :label="item.courseName"
                :value="item.courseId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.educationAdminId" @focus="GetEduersList" filterable clearable placeholder="教务员">
              <el-option
                v-for="item in eduerOptions"
                :key="item.adminId"
                :label="item.nickname"
                :value="item.adminId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.educationId" @focus="getEducationList" clearable placeholder="学历">
              <el-option
                v-for="item in educationList"
                :key="item.educationId"
                :label="item.educationName"
                :value="item.educationId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.gender" clearable placeholder="性别">
              <el-option
                v-for="item in gendeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-select v-model="listQuery.graduationStatus" clearable placeholder="结业状态">
              <el-option
                v-for="item in graduationStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.placeId" @focus="getPlaceList" filterable  clearable placeholder="教学点">
              <el-option
                v-for="item in placeOptions"
                :key="item.placeId"
                :label="item.placeName"
                :value="item.placeId"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-select v-model="listQuery.salesAdminId" @focus="GetSalesList" filterable clearable placeholder="顾问员">
              <el-option
                v-for="item in salesOptions"
                :key="item.adminId"
                :label="item.nickname"
                :value="item.adminId"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-select v-model="listQuery.typeId" @focus="getPayTypeList" clearable placeholder="支付类型">
              <el-option
                v-for="item in payTypeOptions"
                :key="item.payId"
                :label="item.payName"
                :value="item.payId"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
            <el-select v-model="listQuery.userType" clearable placeholder="学员类型">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item>
             <el-date-picker
                v-model="datePicker"
                @change="changeDatePicker"
                type="datetimerange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
      <el-table ref="brandTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="班级名称" align="center">
          <template slot-scope="scope">{{scope.row.roomInfo ? scope.row.roomInfo.roomName : '' }}</template>
        </el-table-column>
        <el-table-column label="顾问名称" align="center">
          <template slot-scope="scope">{{scope.row.adminInfo? scope.row.adminInfo.userName: ''}}</template>
        </el-table-column>
         <el-table-column label="学员类型" align="center" :formatter="FormatStudentType"></el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.gender==0 ? '女':'男'}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.phoneNo}}</template>
        </el-table-column>       
        <el-table-column label="创建时间" align="center" :formatter="FormatDate"></el-table-column>
        <el-table-column label="操作" width="230" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :hide-on-single-page="true"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
const studentService = require("@/api/student");
import {fetchAllList as fetchCourseList } from '@/api/course'
import {fetchAllList as fetchPlaceList } from '@/api/place'
import {search as searchAdminApi } from '@/api/admin'
import dayjs from "dayjs";

const defaultGende = [
  {label:'女',value:0},
  {label:'男',value:1},
]

// 毕业状态
const defalutGraduationStatus = [
  {label:'未知',value:0},
  {label:'通过',value:1},
  {label:'未通过',value:2},
  {label:'缓考',value:3},
  {label:'缓读',value:4},
]

// 学员类型
const defaultUserType = [
  {label:'内部学员',value:1},
  {label:'外部续证学员',value:2},
  {label:'联系中未报名',value:3},
]

export default {
  name: "userList",
  data() {
    return {
      listQuery: {
        keyword: "",
        pageNum: 1,
        pageSize: 10,
        courseId: "",
        educationAdminId: "",
        educationId: "",
        email: "",
        endTime: "",
        gender: "",
        graduationStatus: "",
        identityNo: "",
        placeId: "",
        qq: "",
        roomId: "",
        salesAdminId: "",
        startTime: "",
        typeId: "",
        userType: "",
        wechatNo: ""
      },
      list: null,
      total: null,
      listLoading: true,
      courseList:[],
      educationList:[],//学历
      gendeOptions:defaultGende,
      graduationStatusOptions:defalutGraduationStatus,
      userTypeOptions:defaultUserType,
      payTypeOptions:[],
      placeOptions:[],
      datePicker:[],
      salesOptions:[],
      eduerOptions:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    GetSalesList(){
      if(!this.salesOptions.length){
        searchAdminApi({roleId:3}).then(res=>{
          this.salesOptions = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    GetEduersList(){
      if(!this.eduerOptions.length){
        searchAdminApi({roleId:4}).then(res=>{
          this.eduerOptions = res.data
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
      if(!this.placeOptions.length){
        fetchPlaceList().then(res=>{
          this.placeOptions = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },    
    getCourseList(){
      if(!this.courseList.length){
        fetchCourseList().then(res=>{
          this.courseList = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
      
    },
    // 获取学历
    getEducationList(){
      if(!this.educationList.length){
        studentService.education().then(res=>{
          this.educationList = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    getPayTypeList(){
      if(!this.payTypeOptions.length){
        studentService.payType().then(res=>{
          this.payTypeOptions = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    getList() {
      this.listLoading = true;
      studentService
        .fetchList(this.listQuery)
        .then(res => {
          ;
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          this.listQuery.pageNum = res.data.pageNum;
          this.listQuery.pageSize = res.data.pageSize;
        })
        .catch(err => {
          this.listLoading = false;
          this.list = [];
          this.total = 0;
        });
    },
    handleViewDetail(index, row) {
      this.$router.push({path:'/student/detail',query:{id:row.userId}})
    },
    handleUpdate(index, row) {
      this.$router.push({path:'/student/edit',query:{id:row.userId}})
    },
    handleAdd(index, row) {
      this.$router.push({path:'/student/edit'})
    },
    handleDelete(index, row) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        studentService
          .del({
            id: row.studentId
          })
          .then(res => {
            this.$message({
              message: "删除成功",
              type: "success",
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
    FormatDate(row){
      return dayjs(row.createTime * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    FormatStudentType(row){
      const type = row.userType || 0
      switch (type){
        case 1:{ return '内部学员' }
        case 2:{ return '内部学员' }
        case 3:{ return '内部学员' }
        default: return '未知'
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
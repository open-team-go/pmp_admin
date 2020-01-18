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
            <el-input style="width: 203px" v-model="listQuery.keyWord" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.comName" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.comPosition" placeholder="公司职位名称"></el-input>
          </el-form-item>
           <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.certNo" placeholder="PMI ID号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.payTotal" type="number" placeholder="成交金额"></el-input>
          </el-form-item>
          <el-form-item>
              <el-select v-model="listQuery.invoiceOn" clearable placeholder="是否含票">
              <el-option
                v-for="item in useOnOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
            <el-select v-model="listQuery.roomId" @focus="getRoomList" filterable clearable  placeholder="班级名称">
              <el-option
                v-for="item in roomList"
                :key="item.roomId"
                :label="item.roomName"
                :value="item.roomId"
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
      <span>学员信息表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">新增</el-button>
      <el-upload  class="btn-add" :action="importURL" :show-file-list="false" :on-success="handleImportSuccess" :before-upload="beforeUpload">
        <el-button size="mini" type="primary">文件导入</el-button>
      </el-upload>

      <el-button class="btn-add" @click="handleDownload()" size="mini" type="primary" style="background-color: #409999">文件导出</el-button>

    </el-card>
    <div class="table-container">
      <el-table ref="brandTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="咨询日期" align="center"  :formatter="FormatConsultationTime">
        </el-table-column>
        <el-table-column label="咨询城市" align="center">
          <template slot-scope="scope">{{scope.row.consultationCity}}</template>
        </el-table-column>
        <el-table-column label="来源" align="center">
          <template slot-scope="scope">{{scope.row.resourceName}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.gender==0 ? '女':'男'}}</template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template slot-scope="scope">{{scope.row.phoneNo}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        
        <el-table-column label="公司名称" align="center">
          <template slot-scope="scope">{{scope.row.comName}}</template>
        </el-table-column>
        <el-table-column label="课程名称" align="center">
          <template slot-scope="scope">{{scope.row.courseName}}</template>
        </el-table-column>
        <el-table-column label="班级名称" align="center">
          <template slot-scope="scope">{{scope.row.roomName}}</template>
        </el-table-column>
        <el-table-column label="成交金额" align="center">
          <template slot-scope="scope">{{scope.row.payTotal}}</template>
        </el-table-column>
        <el-table-column label="学员类型" align="center" :formatter="FormatStudentType"></el-table-column>
        

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
import {fetchAllList as searchRoomApi } from '@/api/room'
import dayjs from "dayjs";
import { getToken } from '../../utils/auth';

const defaultGende = [
  {label:'女',value:0},
  {label:'男',value:1},
]


const useOnOptions= [
  {label:'是',value:true},
  {label:'否',value:false}
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

const BASE_API = process.env.BASE_API

export default {
  name: "userList",
  data() {
    return {
      importURL: BASE_API + '/import/'+getToken()+'/user',
      listQuery: {
        keyWord: "",
        pageNum: 1,
        pageSize: 10,
        courseId: "",
        educationAdminId: "",
        endTime: "",
        placeId: "",
        roomId: "",
        salesAdminId: "",
        startTime: "",
        userType: "",
        invoiceOn: "",
        certNo: "",
        comPosition: "",
        comName: "",
        payTotal: "",
        graduationStatus: "",
        startTime: "",
      },
      list: null,
      total: null,
      listLoading: true,
      courseList:[],
      educationList:[],//学历
      gendeOptions:defaultGende,
      useOnOptions,
      graduationStatusOptions:defalutGraduationStatus,
      userTypeOptions:defaultUserType,
      payTypeOptions:[],
      placeOptions:[],
      datePicker:[],
      salesOptions:[],
      eduerOptions:[],
      roomList:[]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleImportSuccess(res){
      if(res.header && res.header.code=='SUCCESS'){
        var data = res.body
        var err = "无导入失败记录";
        if(data.errorList && data.errorList.length>0){
          err = "";
          data.errorList.forEach(element => {
            err += element.userName + "," + element.phoneNo + ";"
          });
        }
        
        this.$notify({
          title: `导入成功，新增${data.addCount}条, 失败${data.errorList ? data.errorList.length : 0 }条, 共更新${data.updateCount}条记录`,
          message: `导入失败的姓名,手机号码：${err}`,
          duration: 0
        });
      }
    },
    beforeUpload(){

    },
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
    getRoomList(){
      if(!this.roomList.length){
        searchRoomApi({useOn:true}).then(res=>{
          this.roomList = res.data
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
      this.$router.push({path:'/student/add'})
    },

    formatKeyValue(json){
      let result = '?';
      for(let item in json){
        if(item){
          result+=item+'='+json[item]+'&';
        }
      }
      return result;
    },
    handleDownload(){
      let params = this.formatKeyValue(this.listQuery);
      console.log(params);
      window.open( BASE_API +"/export/"+getToken()+"/user"+params);
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
    FormatDate(cow){
      if(!cow.createTime){
        return null;
      }
      return dayjs(cow.createTime * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    FormatConsultationTime(cow){
      if(!cow.consultationTime){
        return null;
      }
      return dayjs(cow.consultationTime * 1000).format("YYYY-MM-DD HH:mm:ss");
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
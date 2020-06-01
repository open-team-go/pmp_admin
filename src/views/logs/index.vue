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
            <el-input style="width: 203px" v-model="listQuery.keyWord" placeholder="关键字"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input style="width: 203px" v-model="listQuery.ip" placeholder="IP"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="listQuery.adminId" @focus="getAdminList" filterable clearable placeholder="管理员">
              <el-option
                v-for="item in adminOptions"
                :key="item.adminId"
                :label="item.nickname"
                :value="item.adminId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="dateRange"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
          
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="管理员昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="执行Api" align="center">
          <template slot-scope="scope">{{scope.row.optApi}}</template>
        </el-table-column>
        <el-table-column label="执行动作" align="center">
          <template slot-scope="scope">{{scope.row.optType}}</template>
        </el-table-column>
        <el-table-column label="详情" align="center">
          <template slot-scope="scope">{{scope.row.optDesc}}</template>
        </el-table-column>
        <el-table-column label="IP" align="center">
          <template slot-scope="scope">{{scope.row.requestIp}}</template>
        </el-table-column>        
        <el-table-column label="时间" align="center" :formatter="formDate"></el-table-column>
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
const logsService = require("@/api/logs");
import dayjs from "dayjs";
import {search as searchAdminApi } from '@/api/admin'

const useOnoptions = [
  { label: "可使用", value: true },
  { label: "不可使用", value: false }
];

export default {
  name: "userList",
  data() {
    return {
      listQuery: {
        keyWord: "",
        adminId:'',
        pageNum: 1,
        pageSize: 10,
        ip:'',
        endTime:'',
        startTime:'',
        roomEndTime:'',
        roomStartTime:''
      },
      list: null,
      total: null,
      listLoading: true,
      adminOptions:[],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed:{
      dateRange(){
          return [this.listQuery.startTime,this.listQuery.endTime]
      }
  },
  watch:{
      dateRange(val){
          this.listQuery.startTime = val[0]
          this.listQuery.endTime = val[1]
      }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      logsService
        .FetchLogs(this.listQuery)
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
    formDate(row) {
      return dayjs(row.createTime * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
    getAdminList(){
      if(!this.adminOptions.length){
        searchAdminApi({}).then(res=>{
          this.adminOptions = res.data
        }).catch(err=>{
          console.log(err)
        })
      }
    },
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
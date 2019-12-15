<template> 
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前学员类型：{{userInfo.userType | filterUserType}}</span>
        <!-- <div class="operate-button-container">
          <el-button size="mini" >修改收货人信息</el-button>
        </div> -->
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="8" class="table-cell-title">姓名</el-col>
          <el-col :span="8" class="table-cell-title">性别</el-col>
          <el-col :span="8" class="table-cell-title">出生年月</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{userInfo.userName}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.gender?'男':'女'}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.birthday | filterBirthTime}}</el-col>        
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell-title">身份证</el-col>
          <el-col :span="8" class="table-cell-title">学历</el-col>
          <el-col :span="8" class="table-cell-title">生日</el-col>
        </el-row>
         <el-row>
          <el-col :span="8" class="table-cell">{{userInfo.identityNo}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.educationName}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.birthday | filterBirthday}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">学员记录</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="8" class="table-cell-title">报名课程</el-col>
          <el-col :span="8" class="table-cell-title">支付方式</el-col>
          <el-col :span="8" class="table-cell-title">创建时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{userInfo.courseName}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.payName}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.createTime | filterTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="table-cell-title">备注</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="table-cell">{{userInfo.remark}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">联系方式</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="8" class="table-cell-title">邮箱</el-col>
          <el-col :span="8" class="table-cell-title">微信号</el-col>
          <el-col :span="8" class="table-cell-title">QQ</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{userInfo.email}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.wechatNo}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.qq}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell-title">辅助邮箱</el-col>
          <el-col :span="8" class="table-cell-title">电话</el-col>
          <el-col :span="8" class="table-cell-title">邮编</el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="table-cell">{{userInfo.backupEmail}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.phoneNo}}</el-col>
          <el-col :span="8" class="table-cell">{{userInfo.zipCode}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="table-cell-title">地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="table-cell">{{userInfo.userAddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">学校信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">毕业学校</el-col>
          <el-col :span="6" class="table-cell-title">专业</el-col>
          <el-col :span="6" class="table-cell-title">毕业状态</el-col>
          <el-col :span="6" class="table-cell-title">毕业时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{userInfo.graduationSchool}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.schoolMajor}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.graduationStatus}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.graduationTime | filterTime}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">公司信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="24" class="table-cell-title">公司名称</el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="table-cell">{{userInfo.comName}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">行业</el-col>
          <el-col :span="6" class="table-cell-title">专业</el-col>
          <el-col :span="6" class="table-cell-title">部门</el-col>
          <el-col :span="6" class="table-cell-title">职位</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{userInfo.industry}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.educationName}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.comDepartment}}</el-col>
          <el-col :span="6" class="table-cell">{{userInfo.comPosition}}</el-col>
        </el-row>
      </div>
    </el-card>
      
  </div>
</template>
<script>
  import { detail as FetchDetailApi } from '../../api/student'
  import dayjs from "dayjs";

  export default {
    name: 'orderDetail',
    components: {},
    data() {
      return {
        id: null,
        userInfo:{}
      }
    },
    filters:{
      filterUserType(type){
        switch (type){
          case 1: return '内部学员'
          case 1: return '外部续证学员'
          case 1: return '联系中未报名'
          default: return '未知'
        }
      },
      filterTime(time){
       return dayjs(time * 1000).format("YYYY-MM-DD HH:mm:ss");
      },
      filterBirthday(time){
       return dayjs(time * 1000).format("MM月DD号");
      },
      filterBirthTime(time){
       return dayjs(time * 1000).format("YYYY年MM月DD号");
      }
    },
    created() {
      this.id = this.$route.query.id;
      FetchDetailApi(this.id).then(res => {
        this.userInfo = res.data
      });
    },
    methods: {
    }
  }
</script>
<style scoped>
  .detail-container {
    width: 100%;
    padding: 20px 20px 20px 20px;
    margin: 20px auto;
  }

  .operate-container {
    background: #F2F6FC;
    height: 80px;
    margin: -20px -20px 0;
    line-height: 80px;
  }

  .operate-button-container {
    float: right;
    margin-right: 20px
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>



<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="formData"
      label-width="150px"
      :rules="rules"
      ref="studentForm"
    >
      <el-form-item label="学员名称：" prop="userName">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>

      <el-form-item label="性别：">
        <el-radio-group v-model="formData.gender">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="身份证：" prop="identityNo">
        <el-input v-model="formData.identityNo"></el-input>
      </el-form-item>

      <el-form-item label="出生年月：" prop="birthday">
        <el-date-picker
          v-model="formData.birthday"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="学员地址：" prop="userAddress">
        <el-input v-model="formData.userAddress" :autosize="true"></el-input>
      </el-form-item>

      <el-form-item label="电话号码：" prop="phoneNo">
        <el-input v-model="formData.phoneNo"></el-input>
      </el-form-item>

      <el-form-item label="微信号：" prop="wechatNo">
        <el-input v-model="formData.wechatNo"></el-input>
      </el-form-item>

      <el-form-item label="QQ号：" prop="qq">
        <el-input v-model="formData.qq"></el-input>
      </el-form-item>

      <el-form-item label="国籍：" prop="nationality">
        <el-input v-model="formData.nationality"></el-input>
      </el-form-item>

      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>

      <el-form-item label="备用邮箱：" prop="backupEmail">
        <el-input v-model="formData.backupEmail"></el-input>
      </el-form-item>

      <el-form-item label="邮政编码：" prop="zipCode">
        <el-input v-model="formData.zipCode"></el-input>
      </el-form-item>

      <el-form-item label="学员类型：">
        <el-select v-model="formData.userType" placeholder="请选择学员类型">
          <el-option
            v-for="item in userTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程名称：" prop="courseId">
        <el-select
          v-model="formData.courseId"
          @focus="getCourseList"
          filterable
          clearable
          placeholder="课程名称"
        >
          <el-option
            v-for="item in courseList"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="课程顾问：" prop="adminId">
        <el-select
          v-model="formData.adminId"
          @focus="GetSalesList"
          filterable
          clearable
          placeholder="课程顾问"
        >
          <el-option
            v-for="item in salesOptions"
            :key="item.adminId"
            :label="item.nickname"
            :value="item.adminId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="班级：" prop="roomId">
        <el-select
          v-model="formData.roomId"
          @focus="getRoomList"
          filterable
          clearable
          placeholder="班级名称"
        >
          <el-option
            v-for="item in roomOptions"
            :key="item.roomId"
            :label="item.roomName"
            :value="item.roomId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="支付方式：" prop="payId">
        <el-select
          v-model="formData.payId"
          @focus="getPayTypeList"
          clearable
          placeholder="支付类型"
        >
          <el-option
            v-for="item in payTypeOptions"
            :key="item.payId"
            :label="item.payName"
            :value="item.payId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注：" prop="remark">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :autosize="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="发票名称：" prop="invoiceCode">
        <el-input v-model="formData.invoiceCode"></el-input>
      </el-form-item>

      <el-form-item label="发票抬头：" prop="invoiceHeader">
        <el-input v-model="formData.invoiceHeader"></el-input>
      </el-form-item>
      
      <el-form-item label="付款金额：" prop="payTotal">
        <el-input v-model="formData.payTotal"></el-input>
      </el-form-item>
         
      <el-form-item label="付款时间：" prop="payTime">
        <el-date-picker
          v-model="formData.payTime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
               
      <el-form-item label="考试时间：" prop="examinationTime">
        <el-date-picker
          v-model="formData.examinationTime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="PMI ID号：" prop="certNo">
        <el-input v-model="formData.certNo"></el-input>
      </el-form-item>

      <el-form-item label="英文网站用户名：" prop="certEnName">
        <el-input v-model="formData.certEnName"></el-input>
      </el-form-item>

      <el-form-item label="英文网站密码：" prop="certEnPasw">
        <el-input v-model="formData.certEnPasw"></el-input>
      </el-form-item>
      
      <el-form-item label="中文网站用户名：" prop="certCnName">
        <el-input v-model="formData.certCnName"></el-input>
      </el-form-item>

      <el-form-item label="英中文网站密码：" prop="certCnPasw">
        <el-input v-model="formData.certCnPasw"></el-input>
      </el-form-item>

      <el-form-item label="毕业学校：" prop="graduationSchool">
        <el-input v-model="formData.graduationSchool"></el-input>
      </el-form-item>

      <el-form-item label="学历：" prop="educationId">
        <el-select
          v-model="formData.educationId"
          @focus="getEducationList"
          clearable
          placeholder="学历"
        >
          <el-option
            v-for="item in educationList"
            :key="item.educationId"
            :label="item.educationName"
            :value="item.educationId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="专业：" prop="schoolMajor">
        <el-input v-model="formData.schoolMajor"></el-input>
      </el-form-item>

      <el-form-item label="结业状态：" prop="graduationStatus">
        <el-select
          v-model="formData.graduationStatus"
          clearable
          placeholder="结业状态"
        >
          <el-option
            v-for="item in graduationStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="毕业时间：" prop="graduationTime">
        <el-date-picker
          v-model="formData.graduationTime"
          type="date"
          value-format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="公司名：" prop="comName">
        <el-input v-model="formData.comName"></el-input>
      </el-form-item>

      <el-form-item label="行业：" prop="industry">
        <el-input v-model="formData.industry"></el-input>
      </el-form-item>

      <el-form-item label="部门：" prop="comDepartment">
        <el-input v-model="formData.comDepartment"></el-input>
      </el-form-item>

      <el-form-item label="职位名称：" prop="comPosition">
        <el-input v-model="formData.comPosition"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('studentForm')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('studentForm')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
const studentService = require("@/api/student");
import { fetchAllList as fetchCourseList } from "@/api/course";
import { fetchAllList as fetchRoomList } from "@/api/room";
import { search as searchAdminApi } from "@/api/admin";

// 毕业状态
const defalutGraduationStatus = [
  { label: "未知", value: 0 },
  { label: "通过", value: 1 },
  { label: "未通过", value: 2 },
  { label: "缓考", value: 3 },
  { label: "缓读", value: 4 }
];

// 学员类型
const defaultUserType = [
  { label: "内部学员", value: 1 },
  { label: "外部续证学员", value: 2 },
  { label: "联系中未报名", value: 3 }
];

const defaultFormData = {
  userId: "",
  userName: "",
  userType: "",
  birthday: "",
  userAddress: "",
  wechatNo: "",
  qq: "",
  zipCode: "",
  email: "",
  gender: "",
  identityNo: "",
  backupEmail: "",
  phoneNo: "",
  nationality: "", //国籍
  adminId: "",
  payId: "",
  certNo: "",
  certEnName: "",
  certEnPasw: "",
  certCnName: "",
  certCnPasw: "",
  comName: "",
  industry: "", //行业
  comDepartment: "",
  comPosition: "",
  courseId: "",
  educationId: "",
  graduationSchool: "",
  schoolMajor: "",
  graduationStatus: "",
  graduationTime: "",
  invoiceCode: "", // 发票code
  invoiceHeader: "", // 发票抬头
  payTotal: "", // 支付金额
  payTime: "", // 付款时间
  examinationTime: "", // 考试时间
  remark: "",
  roomId: ""
};

export default {
  name: "studentForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkIdentityNo = (rule, value, callback) => {
      var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (!reg.test(value)) {
          callback(new Error('身份证格式不正确'));
        } 
        callback();
    }
    return {
      formData: Object.assign({}, defaultFormData),
      salesOptions: [],
      payTypeOptions: [],
      roomOptions: [],
      courseList: [],
      educationList: [], //学历
      graduationStatusOptions: defalutGraduationStatus,
      userTypeOptions: defaultUserType,
      rules: {
        identityNo: [
          { validator: checkIdentityNo, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.query.id || ''
      studentService.detail(this.id).then(res => {
        const detailInfo = res.data
        const formData = this.formData
        for( var key in formData){
          if(detailInfo.hasOwnProperty(key)){
            if((key=='birthday' || key=="graduationTime" || key=="payTime" || key=="examinationTime") && detailInfo[key]){
              formData[key]=detailInfo[key]*1000
            }else{
              formData[key]=detailInfo[key]
            }
          }
        }
      });
    }
    this.getEducationList()
    this.GetSalesList()
    this.getCourseList()
    this.getRoomList()
    this.getPayTypeList()
  },
  methods: {
    // 获取学历
    getEducationList() {
      if (!this.educationList.length) {
        studentService
          .education()
          .then(res => {
            this.educationList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    GetSalesList() {
      if (!this.salesOptions.length) {
        searchAdminApi({ roleId: 3 })
          .then(res => {
            this.salesOptions = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getCourseList() {
      if (!this.courseList.length) {
        fetchCourseList()
          .then(res => {
            this.courseList = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
     getRoomList() {
      if (!this.roomOptions.length) {
        fetchRoomList()
          .then(res => {
            this.roomOptions = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },    
    getPayTypeList() {
      if (!this.payTypeOptions.length) {
        studentService
          .payType()
          .then(res => {
            this.payTypeOptions = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let formData = Object.assign({},this.formData)
            if(formData.birthday) formData.birthday = Math.floor(formData.birthday/1000)
            if(formData.graduationTime) formData.graduationTime = Math.floor(formData.graduationTime/1000)
            if(formData.payTime) formData.payTime = Math.floor(formData.payTime/1000)
            if(formData.examinationTime) formData.examinationTime = Math.floor(formData.examinationTime/1000)
            if (this.isEdit) {
              studentService.update(formData).then(res=>{
              this.$message({
                duration: 1000,
                message: "修改成功",
                type: "success",
              });
              this.$router.back();
              }).catch(err=>{
                this.$message({
                duration: 1000,
                message: err,
                type: "error",
              });
              })              
            } else {
              studentService.add(formData).then(res=>{
                this.$message({
                  duration: 1000,
                  message: "添加成功",
                  type: "success",
                });
                this.$router.back();
              }).catch(err=>{
                this.$message({
                  duration: 1000,
                  message: err,
                  type: "error",
                })
              })
            }
          });
        } else {
          this.$message({
            duration: 1000,
            message: "验证失败",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {}
};
</script>

<style scoped></style>

<template>
  <div class="detail-container">
    <el-card shadow="never">
      <el-form :model="formData" label-width="150px" :rules="rules" ref="studentForm">
        <div class="operate-container">
          <div class="operate-button-container">
            <el-button size="mini" @click="onSubmit('studentForm')">保存</el-button>
          </div>
        </div>

        <div>
          <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
          <span class="font-small">基本信息</span>
        </div>
        <div class="table-layout">
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">姓名</span>
                <span class="value">
                  <el-input v-model="formData.userName" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">性别</span>
                <span class="value">
                  <el-radio v-model="formData.gender" :label="true">男</el-radio>
                  <el-radio v-model="formData.gender" :label="false">女</el-radio>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">联系电话</span>
                <span class="value">
                  <el-input v-model="formData.phoneNo" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">邮箱</span>
                <span class="value">
                  <el-input v-model="formData.email" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">QQ</span>
                <span class="value">
                  <el-input v-model="formData.qq" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">微信</span>
                <el-input v-model="formData.wechatNo" class="value" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">身份证</span>
                <span class="value">
                  <el-input
                    v-model="formData.identityNo"
                    class="value"
                    placeholder="请输入内容"
                    @blur="validIdentityNo"
                    ref="identityNo"
                  ></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">辅助邮箱</span>
                <span class="value">
                  <el-input v-model="formData.backupEmail" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">学历</span>
                <span class="value">
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
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">毕业学校</span>
                <span class="value">
                  <el-input v-model="formData.graduationSchool" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">专业</span>
                <span class="value">
                  <el-input v-model="formData.schoolMajor" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">毕业时间</span>
                <span class="value">
                  <el-date-picker v-model="formData.graduationTime" type="date" placeholder="选择日期"></el-date-picker>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">公司名称</span>
                <span class="value">
                  <el-input v-model="formData.comName" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">行业</span>
                <span class="value">
                  <el-input v-model="formData.industry" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">部门</span>
                <span class="value">
                  <el-input v-model="formData.comDepartment" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">职位</span>
                <span class="value">
                  <el-input v-model="formData.comPosition" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">出生年月</span>
                <span class="value">
                  <el-date-picker
                    v-model="formData.birthday"
                    type="date"
                    value-format="timestamp"
                    placeholder="选择日期"
                  ></el-date-picker>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">民族</span>
                <span class="value">
                  <el-input v-model="formData.nationality" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="flex">
                <span class="title">结业状态</span>
                <span class="value">
                  <el-select v-model="formData.graduationStatus" clearable placeholder="结业状态">
                    <el-option
                      v-for="item in graduationStatusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="flex">
                <span class="title">通讯地址</span>
                <span class="value">
                  <el-input v-model="formData.userAddress" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div style="margin-top: 20px">
          <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
          <span class="font-small">学员记录</span>
        </div>
        <div class="table-layout">
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">学员类型</span>
                <span class="value">
                  <el-select v-model="formData.userType" placeholder="请选择学员类型">
                    <el-option
                      v-for="item in userTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">课程名称</span>
                <span class="value">
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
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">班级</span>
                <span class="value">
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
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">课程顾问</span>
                <span class="value">
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
                </span>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">来源</span>
                <span class="value">
                  <el-select
                    v-model="formData.resourceId"
                    @focus="getResourceTypeList"
                    clearable
                    placeholder="来源"
                  >
                    <el-option
                      v-for="item in resourceTypeOptions"
                      :key="item.resourceId"
                      :label="item.resourceName"
                      :value="item.resourceId"
                    ></el-option>
                  </el-select>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">推荐人</span>
                <el-input v-model="formData.recommendName" class="value" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">咨询城市</span>
                <el-input v-model="formData.consultationCity" class="value" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">咨询日期</span>
                <span class="value">
                  <el-date-picker v-model="formData.consultationTime" type="datetime" placeholder="选择日期"></el-date-picker>
                </span>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <!-- <el-col :span="6">
              <div class="flex">
                <span class="title">课程教务</span>
                <span class="value">
                  <el-input v-model="formData.educationAdminName" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col> -->
            <el-col :span="6">
              <div class="flex">
                <span class="title">支付方式</span>
                <span class="value">
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
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">支付金额</span>
                <span class="value">
                  <el-input v-model="formData.payTotal" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">支付日期</span>
                <span class="value">
                  <el-date-picker
                    v-model="formData.payTime"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期"
                  ></el-date-picker>>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">考试时间</span>
                <span class="value">
                  <el-date-picker
                    v-model="formData.examinationTime"
                    type="datetime"
                    value-format="timestamp"
                    placeholder="选择日期"
                  ></el-date-picker>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">是否含票</span>
                <span class="value">
                  <el-switch  v-model="formData.invoiceOn"></el-switch>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">发票抬头</span>
                <span class="value">
                  <el-input v-model="formData.invoiceHeader" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">发票税号</span>
                <span class="value">
                  <el-input v-model="formData.invoiceCode" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">PMI ID</span>
                <span class="value">
                  <el-input v-model="formData.certNo" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="flex">
                <span class="title">英文网站用户名</span>
                <span class="value">
                  <el-input v-model="formData.certEnName" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">英文网站密码</span>
                <span class="value">
                  <el-input
                    v-model="formData.certEnPasw"
                    class="value"
                    show-password
                    placeholder="请输入内容"
                  ></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">中文网站用户名</span>
                <span class="value">
                  <el-input v-model="formData.certCnName" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="flex">
                <span class="title">中文网站密码</span>
                <span class="value">
                  <el-input
                    v-model="formData.certCnPasw"
                    show-password
                    class="value"
                    placeholder="请输入内容"
                  ></el-input>
                </span>
              </div>
            </el-col>
          </el-row>

          <el-row>
            
            <el-col :span="6">
              <div class="flex">
                <span class="title">备注</span>
                <span class="value">
                  <el-input v-model="formData.remark" class="value" placeholder="请输入内容"></el-input>
                </span>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-form>
    </el-card>
  </div>
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
  roomId: "",
  adminId: "",
  // educationAdminName:"",
  resourceId:"",
  resourceName:"",
  recommendName:"",
  consultationTime:"",
  consultationCity:"",
  invoiceOn:"",
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
      var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(value)) {
        callback(new Error("身份证格式不正确"));
      }
      callback();
    };
    return {
      formData: Object.assign({}, defaultFormData),
      salesOptions: [],
      payTypeOptions: [],
      roomOptions: [],
      courseList: [],
      educationList: [], //学历
      graduationStatusOptions: defalutGraduationStatus,
      userTypeOptions: defaultUserType,
      resourceTypeOptions:[],
      rules: {
        identityNo: [{ validator: checkIdentityNo, trigger: "blur" }]
      }
    };
  },
  created() {
    if (this.isEdit) {
      this.id = this.$route.query.id || "";
      studentService.detail(this.id).then(res => {
        const detailInfo = res.data;
        const formData = this.formData;
        for (var key in formData) {
          if (detailInfo.hasOwnProperty(key)) {
            if (
              (key == "birthday" ||
                key == "graduationTime" ||
                key == "payTime" ||
                key == "examinationTime" ||
                key == "consultationTime") &&
              detailInfo[key]
            ) {
              formData[key] = detailInfo[key] * 1000;
            } else {
              formData[key] = detailInfo[key];
            }
          }
        }
      });
    }
    this.getEducationList();
    this.GetSalesList();
    this.getCourseList();
    this.getRoomList();
    this.getPayTypeList();
    this.getResourceTypeList();
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
    getResourceTypeList() {
      if (!this.resourceTypeOptions.length) {
        studentService
          .resourceType()
          .then(res => {
            this.resourceTypeOptions = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    validIdentityNo() {
      var value = this.formData.identityNo;
      var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (!reg.test(value)) {
        this.$message({
          message: "身份证格式不正确",
          type: "warning"
        });
        this.$refs.identityNo.focus();
        return false;
      }
      return true;
    },
    validForm() {
      var flag = this.validIdentityNo(this.formData.identityNo);
      return flag;
    },
    onSubmit(formName) {
      var valid = this.validForm();
      if (valid) {
        this.$confirm("是否提交数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let formData = Object.assign({}, this.formData);
          if (formData.birthday)
            formData.birthday = Math.floor(formData.birthday / 1000);
          if (formData.graduationTime)
            formData.graduationTime = Math.floor(
              formData.graduationTime / 1000
            );
          if (formData.payTime)
            formData.payTime = Math.floor(formData.payTime / 1000);
          if (formData.examinationTime)
            formData.examinationTime = Math.floor(
              formData.examinationTime / 1000
            );
          if (formData.consultationTime)
            formData.consultationTime = Math.floor(
              formData.consultationTime / 1000
            );
          if (this.isEdit) {
            studentService
              .update(formData)
              .then(res => {
                this.$message({
                  duration: 1000,
                  message: "修改成功",
                  type: "success"
                });
                this.$router.back();
              })
              .catch(err => {
                this.$message({
                  duration: 1000,
                  message: err,
                  type: "error"
                });
              });
          } else {
            studentService
              .add(formData)
              .then(res => {
                this.$message({
                  duration: 1000,
                  message: "添加成功",
                  type: "success"
                });
                this.$router.back();
              })
              .catch(err => {
                this.$message({
                  duration: 1000,
                  message: err,
                  type: "error"
                });
              });
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {}
};
</script>

<style scoped lang="scss">
.detail-container {
  width: 100%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 60px;
  margin: -20px -20px 0;
  line-height: 60px;
  margin-bottom: 20px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.flex {
  display: flex;
}
.title {
  display: inline-block;
  flex: 0 0 auto;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  height: 36px;
  width: 110px;
  line-height: 36px;
  background: #f2f6fc;
  text-align: left;
  font-size: 14px;
  text-indent: 5px;
  color: #303133;
}
.value {
  display: inline-block;
  flex-grow: 1;
  height: 36px;
  line-height: 36px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  font-size: 14px;
  color: #606266;
  text-align: left;
  overflow: hidden;
}
.value >>> .el-select {
  width: 100%;
}
.value >>> .el-date-editor {
  width: 100%;
}
.value >>> .el-date-editor input {
  text-indent: 30px;
}
.value >>> input {
  height: 36px;
  line-height: 36px;
  padding: 0;
  text-indent: 5px;
}
.value >>> input,
.value >>> textarea {
  border: 0;
  border-radius: 0;
}
.value >>> .el-radio {
  margin-left: 10px;
}
</style>

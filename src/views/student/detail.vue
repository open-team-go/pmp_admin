<template>
  <div class="detail-container">
    <el-card shadow="never">
      <div>
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">姓名</span>
              <span class="value">{{ userInfo.userName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">性别</span>
              <span class="value">{{ userInfo.gender==null? null: userInfo.gender? "男" : "女" }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">联系电话</span>
              <span class="value">{{ userInfo.phoneNo }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">邮箱</span>
              <span class="value">{{ userInfo.email }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">QQ</span>
              <span class="value">{{ userInfo.qq }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">微信</span>
              <span class="value">{{ userInfo.wechatNo }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">身份证</span>
              <span class="value">{{ userInfo.identityNo }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">辅助邮箱</span>
              <span class="value">{{ userInfo.backupEmail }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">学历</span>
              <span class="value">{{ userInfo.educationName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">毕业学校</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="userInfo.graduationSchool"
                placement="top-start"
              >
                <span class="value">{{ userInfo.graduationSchool }}</span>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">专业</span>
              <span class="value">{{ userInfo.schoolMajor }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">毕业时间</span>
              <span class="value">
                {{
                userInfo.graduationTime | filterBirthTime
                }}
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">公司名称</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="userInfo.comName"
                placement="top-start"
              >
                <span class="value">{{ userInfo.comName }}</span>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">行业</span>
              <span class="value">{{ userInfo.industry }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">部门</span>
              <span class="value">{{ userInfo.comDepartment }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">职位</span>
              <span class="value">{{ userInfo.comPosition }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">出生年月</span>
              <span class="value">
                {{
                userInfo.birthday | filterBirthTime
                }}
              </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">民族</span>
              <span class="value">{{ userInfo.nationality }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex">
              <span class="title">结业状态</span>
              <span class="value">
                {{
                userInfo.graduationStatus | filterEduStatus
                }}
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="flex">
              <span class="title">通讯地址</span>
              <span class="value">{{ userInfo.userAddress }}</span>
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
                {{
                userInfo.userType | filterUserType
                }}
              </span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">课程名称</span>
              <span class="value">{{ userInfo.courseName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">班级</span>
              <span class="value">{{ userInfo.roomName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">课程顾问</span>
              <span class="value">{{ userInfo.salesAdminName }}</span>
            </div>
          </el-col>
        </el-row>

        
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">来源</span>
              <span class="value">{{ userInfo.resourceName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">推荐人</span>
              <span class="value">{{ userInfo.recommendName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">咨询城市</span>
              <span class="value">{{ userInfo.consultationCity }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">咨询日期</span>
              <span class="value">
                {{
                userInfo.consultationTime | filterDateTime
                }}
              </span>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">课程教务</span>
              <span class="value">{{ userInfo.educationAdminName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">支付方式</span>
              <span class="value">{{ userInfo.payName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">支付金额</span>
              <span class="value">{{ userInfo.payTotal }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">支付日期</span>
              <span class="value">
                {{
                userInfo.payTime | filterDateTime
                }}
              </span>
            </div>
          </el-col>
          
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">发票抬头</span>
              <span class="value">{{ userInfo.invoiceOn?"含票":"未含票" }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">发票抬头</span>
              <span class="value">{{ userInfo.invoiceHeader }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">发票税号</span>
              <span class="value">{{ userInfo.invoiceCode }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">PMI ID</span>
              <span class="value">{{ userInfo.certNo }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">英文网站用户名</span>
              <span class="value">{{ userInfo.certEnName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">英文网站密码</span>
              <span class="value">{{ userInfo.certEnPasw }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">中文网站用户名</span>
              <span class="value">{{ userInfo.certCnName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">中文网站密码</span>
              <span class="value">{{ userInfo.certCnPasw }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="flex">
              <span class="title">考试时间</span>
              <span class="value">
                {{
                userInfo.examinationTime | filterDateTime
                }}
              </span>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="flex">
              <span class="title">支付备注</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="userInfo.payRemarks"
                placement="top-start"
              >
                <span class="value">{{ userInfo.payRemarks }}</span>
              </el-tooltip>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="flex">
              <span class="title">备注</span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="userInfo.remark"
                placement="top-start"
              >
                <span class="value">{{ userInfo.remark }}</span>
              </el-tooltip>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="flex">
              <span class="title">登录用户名</span>
              <span class="value">{{ userInfo.loginName }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { detail as FetchDetailApi } from "../../api/student";
import dayjs from "dayjs";

export default {
  name: "orderDetail",
  components: {},
  data() {
    return {
      id: null,
      userInfo: {}
    };
  },
  filters: {
    filterUserType(type) {
      switch (type) {
        case 1:
          return "内部学员";
        case 2:
          return "外部续证学员";
        case 3:
          return "联系中未报名";
        default:
          return "未知";
      }
    },
    filterTime(time) {
      if(!time){return null}
      return dayjs(time * 1000).format("YYYY-MM-DD");
    },
    filterBirthday(time) {
      if(!time){return null}
      return dayjs(time * 1000).format("MM月DD号");
    },
    filterBirthTime(time) {
      if(!time){return null}
      return dayjs(time * 1000).format("YYYY年MM月DD号");
    },
    filterDateTime(time) {
      if(!time){return null}
      return dayjs(time * 1000).format("YYYY年MM月DD号");
    },
    filterEduStatus(status) {
      switch (status) {
        case 0:
          return "未知";
        case 1:
          return "通过";
        case 2:
          return "未通过";
        case 3:
          return "缓考";
        case 4:
          return "缓读";
        default:
          return "未知";
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    FetchDetailApi(this.id).then(res => {
      this.userInfo = res.data;
    });
  },
  methods: {}
};
</script>
<style scoped lang="scss">
.detail-container {
  width: 100%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
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
  text-indent: 5px;
  overflow: hidden;
}
</style>

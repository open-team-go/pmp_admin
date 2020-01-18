<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form :model="formData" :rules="rules" ref="formData" label-width="150px" size="small">
        <el-form-item label="新密码：" prop="password">
          <el-input v-model="formData.password" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPassword">
          <el-input v-model="formData.confirmPassword" type="password" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="submitForm()">确认修改</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { updatePassword } from "@/api/admin";

export default {
  name: "",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        password: "",
        confirmPassword: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          const formData = this.formData;
          const data = {
            password: this.formData.password
          };
          updatePassword(data)
            .then(res => {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.$store.dispatch("LogOut").then(() => {
                location.reload();
              });
            })
            .catch(err => {
              this.$message({
                message: err,
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.formData.resetFields();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>

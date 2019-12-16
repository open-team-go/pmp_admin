<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :model="formData"
      :rules="rules"
      ref="studentForm"
      label-width="150px"
    >
      <el-form-item label="分类名称：" prop="name">
        <el-input v-model="formData.name"></el-input>
        <!-- :autosize="true" -->
      </el-form-item>
      <el-form-item label="上级分类：">
        <el-select v-model="formData.parentId" placeholder="请选择分类">
          <el-option
            v-for="item in formData.list"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="是否显示：">
        <el-radio-group v-model="formData.a">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
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

const defaultFormData = {
  
}

export default {
  name: "studentForm",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData:Object.assign({},defaultFormData),
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.isEdit) {
    } else {
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            if (this.isEdit) {
                    // this.$message({
                    //   message: "修改成功",
                    //   type: "success",
                    //   duration: 1000
                    // });
                    // this.$router.back();
            } else {
             
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000
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

<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="right-panle"> 
      <div class="userBox">
      <span class="userName">{{name}}</span><br/>
      <span class="roleName">{{roles[0].roleName}}</span>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar" />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/my">
          <el-dropdown-item divided>修改密码</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="clearConfigCache" style="display:block;">清除系统配置缓存</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
const toolService = require("@/api/tool");

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "avatar","name","roles"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    clearConfigCache() {
      toolService
        .clearCache()
        .then(() => {
          Message({
            message: "清除系统配置缓存成功",
            type: "success",
            duration: 3 * 1000
          });
        })
        .catch(err => {
          Message({
            message: err.msg,
            type: "error",
            duration: 3 * 1000
          });
        });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .right-panle{    
    position: absolute;
    right: 35px;
    top:0;
    height: 50px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    .avatar-wrapper {
      display: inline-block;
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
.userBox{
  display: inline-block;
  margin-right: 5px;
  line-height: 22px;
  font-size: 12px;
  .userName{
    font-size: 14px;
    color: #333;
  }
  .roleName{
    color: #ccc;
  }
}
</style>


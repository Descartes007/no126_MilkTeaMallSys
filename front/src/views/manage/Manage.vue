<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <!--      侧边栏-->
      <el-aside
        :width="sideWidth + 'px'"
        style="background-color: #fff0f6; height: 100%"
      >
        <Aside :is-collapse="isCollapse"></Aside>
      </el-aside>

      <el-container>
        <!--        导航栏-->
        <el-header
          style="border-bottom: 1px solid #ffadd2; background-color: #fff0f6;height: 80px;"
        >
          <Header
            :collapse-icon="collapseIcon"
            :collapse-title="collapseTitle"
            @collapse="handleCollapse"
            :user="user"
          ></Header>
        </el-header>

        <el-main style="background-color: #fff0f6;">
          <router-view @refresh="getUser" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #fff0f6;
  color: #333;
  line-height: 80px;
}

.el-aside {
  color: #333;
}

.bk {
  width: 100%;
  background: url("@/resource/img/back.jpg") center center no-repeat;
  background-size: 100% 100%;
}
</style>

<script>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

export default {
  data() {
    return {
      user: {},
      isCollapse: false,
      sideWidth: 250,
      collapseIcon: "el-icon-s-fold",
      collapseTitle: "收缩",
    };
  },

  components: {
    Aside,
    Header,
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        //点击收缩按钮
        this.sideWidth = 64;
        this.collapseIcon = "el-icon-s-unfold";
        this.collapseTitle = "展开";
      } else {
        //点击展开按钮
        this.sideWidth = 250;
        this.collapseIcon = "el-icon-s-fold";
        this.collapseTitle = "收缩";
      }
    },
    getUser() {
      let username = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).username
        : "";
      if (username) {
        // 从后台获取User数据
        this.request.get("/userinfo/" + username).then((res) => {
          // 重新赋值后台的最新User数据
          this.user = res.data;
          console.log(this.user.role);
        });
      }
    },
  },
  mounted() {
    
  },
  created() {
    this.getUser();
  },
};
</script>

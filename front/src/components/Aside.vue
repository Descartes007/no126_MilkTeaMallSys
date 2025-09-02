<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
  <el-menu 
    :default-openeds="['system', 'product', 'income']" 
    style="height: 100%;"
    background-color="#fff0f6"
    text-color="#666666"
    active-text-color="#ff69b4"
    :collapse-transition="false"
    :collapse="isCollapse"
    router
  >
    <!-- Logo区域 -->
    <div class="logo-container">
      <router-link to="/manage/home">
        <img src="../resource/logo.png" class="logo-img">
      </router-link>
      <span class="system-title" v-show="!isCollapse">奶茶后台管理系统</span>
    </div>

    <!-- 首页菜单项 -->
    <el-menu-item index="/manage/home" class="menu-item">
      <i class="iconfont icon-r-home menu-icon"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <!-- 前台菜单项 -->
    <el-menu-item index="/" class="menu-item">
      <i class="iconfont icon-r-mark1 menu-icon"></i>
      <span slot="title">前台</span>
    </el-menu-item>

    <!-- 系统管理菜单组 -->
    <el-submenu index="system" class="menu-group">
      <template slot="title">
        <i class="iconfont icon-r-setting menu-icon"></i>
        <span slot="title">系统管理</span>
      </template>
      
      <!-- 用户管理 -->
      <el-submenu index="user" v-if="menuFlags.userMenu">
        <template slot="title">
          <i class="iconfont icon-r-user2 menu-icon"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/manage/user">用户列表</el-menu-item>
      </el-submenu>

      <!-- 文件管理 -->
      <el-submenu index="file" v-if="menuFlags.fileMenu || menuFlags.avatarMenu">
        <template slot="title">
          <i class="iconfont icon-r-paper menu-icon"></i>
          <span>文件管理</span>
        </template>
        <el-menu-item index="/manage/file" v-if="menuFlags.fileMenu">文件管理</el-menu-item>
        <el-menu-item index="/manage/avatar" v-if="menuFlags.avatarMenu">头像管理</el-menu-item>
      </el-submenu>
    </el-submenu>

    <!-- 饮品管理菜单组 -->
    <el-submenu index="product" class="menu-group">
      <template slot="title">
        <i class="iconfont icon-r-find menu-icon"></i>
        <span slot="title">饮品管理</span>
      </template>
      
      <el-menu-item index="/manage/category" v-if="menuFlags.categoryMenu">
        <i class="iconfont icon-r-category menu-icon"></i>
        <span>分类管理</span>
      </el-menu-item>
      
      <el-menu-item index="/manage/carousel" v-if="menuFlags.carouselMenu">
        <i class="iconfont icon-r-image menu-icon"></i>
        <span>轮播图管理</span>
      </el-menu-item>
      
      <el-menu-item index="/manage/good" v-if="menuFlags.goodMenu">
        <i class="iconfont icon-r-goods menu-icon"></i>
        <span>饮品管理</span>
      </el-menu-item>
      
      <el-menu-item index="/manage/order" v-if="menuFlags.orderMenu">
        <i class="iconfont icon-r-order menu-icon"></i>
        <span>订单管理</span>
      </el-menu-item>
    </el-submenu>

    <!-- 营收管理菜单组 -->
    <el-submenu index="income" class="menu-group" v-if="menuFlags.incomeChartMenu || menuFlags.incomeRankMenu">
      <template slot="title">
        <i class="iconfont icon-r-shield menu-icon"></i>
        <span slot="title">营收管理</span>
      </template>
      
      <el-menu-item index="/manage/incomeChart" v-if="menuFlags.incomeChartMenu">
        <i class="iconfont icon-r-chart menu-icon"></i>
        <span>图表分析</span>
      </el-menu-item>
      
      <el-menu-item index="/manage/incomeRank" v-if="menuFlags.incomeRankMenu">
        <i class="iconfont icon-r-rank menu-icon"></i>
        <span>收入排行</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
  },
  data() {
    return {
      role: 'user',
      menuFlags: {
        userMenu: false,
        fileMenu: false,
        avatarMenu: false,
        goodMenu: false,
        carouselMenu: false,
        orderMenu: false,
        categoryMenu: false,
        incomeChartMenu: false,
        incomeRankMenu: false,
      }
    }
  },
  created() {
    request.post("http://localhost:9191/role").then(res => {
      if(res.code === '200') {
        this.role = res.data;
        if(this.role === 'admin') {
          // 管理员拥有所有权限
          Object.keys(this.menuFlags).forEach(key => {
            this.menuFlags[key] = true;
          });
        }
      }
    });
  }
}
</script>

<style scoped>
.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #ffd6e7;
  border-bottom: 1px solid #ffadd2;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.system-title {
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
}

.menu-item {
  font-size: 16px;
  transition: all 0.3s;
}

.menu-group {
  font-size: 16px;
}

.menu-icon {
  font-size: 20px;
  margin-right: 10px;
  color: #666666;
  transition: all 0.3s;
}

/* 菜单项悬停效果 */
.el-menu-item:hover {
  background-color: #ffd6e7 !important;
}

.el-menu-item:hover .menu-icon {
  color: #ff69b4;
}

/* 子菜单展开时的样式 */
.el-submenu__title:hover {
  background-color: #ffd6e7 !important;
}

.el-submenu__title:hover .menu-icon {
  color: #ff69b4;
}

/* 当前激活的菜单项样式 */
.el-menu-item.is-active {
  background-color: #ffd6e7 !important;
}

.el-menu-item.is-active .menu-icon {
  color: #ff69b4;
}

/* 子菜单样式 */
.el-submenu .el-menu-item {
  min-width: 200px;
}

/* 菜单折叠时的样式 */
.el-menu--collapse .el-menu-item,
.el-menu--collapse .el-submenu__title {
  padding: 0 20px;
}

.el-menu--collapse .menu-icon {
  margin-right: 0;
}
</style>
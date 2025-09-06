<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
  <div class="home-container">
    <div class="brand-banner">欢迎来到幸福奶茶后台管理系统</div>
    <!-- 数据统计卡片 -->
    <el-row :gutter="20" class="data-cards">
      <el-col :span="8" v-for="(item, index) in dataItems" :key="index">
        <el-card class="data-card" shadow="hover">
          <div class="card-content">
            <i :class="['card-icon', item.icon]"></i>
            <div class="card-info">
              <div class="card-title">{{ item.title }}</div>
              <div class="card-value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图片展示区域，一行3图 -->
    <el-row :gutter="20" class="image-gallery">
      <el-col :span="8" v-for="(image, index) in galleryImages" :key="'g1-' + index">
        <el-card class="image-card" shadow="hover">
          <img :src="image.url" :alt="image.title" class="gallery-image">
          <div class="image-title">{{ image.title }}</div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 新增第三栏图片展示区域，一行3图 -->
    <el-row :gutter="20" class="image-gallery" style="margin-top: 30px;">
      <el-col :span="8" v-for="(image, index) in galleryImages2" :key="'g2-' + index">
        <el-card class="image-card" shadow="hover">
          <img :src="image.url" :alt="image.title" class="gallery-image">
          <div class="image-title">{{ image.title }}</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 当没有数据时显示提示信息 -->
    <div v-if="!hasData" class="no-data">
      <i class="el-icon-warning-outline" style="font-size: 48px;"></i>
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userCount: 0,
      productCount: 0,
      orderCount: 0,
      images: [
        {
          url: require('@/resource/蜜柚奶茶.jpg'),
          title: '蜜柚奶茶'
        },
        {
          url: require('@/resource/桃花漫漫.jpg'),
          title: '桃花漫漫'
        },
        {
          url: require('@/resource/紫罗兰幻想.jpg'),
          title: '紫罗兰幻想'
        }
      ],
      images2: [
        {
          url: require('@/resource/latte.jpg'),
          title: '经典拿铁'
        },
        {
          url: require('@/resource/caomei.jpg'),
          title: '雪顶草莓'
        },
        {
          url: require('@/resource/yangzhi.jpg'),
          title: '杨枝甘露'
        }
      ]
    }
  },
  computed: {
    hasData() {
      return this.userCount > 0 || 
             this.productCount > 0 || 
             this.orderCount > 0;
    },
    dataItems() {
      return [
        {
          title: '用户总数',
          value: this.userCount,
          icon: 'icon-r-user2'
        },
        {
          title: '饮品总数',
          value: this.productCount,
          icon: 'icon-r-find'
        },
        {
          title: '订单总数',
          value: this.orderCount,
          icon: 'icon-r-mark1'
        }
      ];
    },
    galleryImages() {
      // 只展示3张图片
      return this.images;
    },
    galleryImages2() {
      // 只展示3张图片
      return this.images2;
    }
  },
  methods: {
    loadData() {
      // 获取用户总数
      this.request.get("/user/page", {
        params: {
          pageNum: 1,
          pageSize: 1
        }
      }).then(res => {
        if (res.code === '200') {
          this.userCount = res.data.total
        }
      })

      // 获取饮品总数
      this.request.get("/api/good/page", {
        params: {
          pageNum: 1,
          pageSize: 1
        }
      }).then(res => {
        if (res.code === '200') {
          this.productCount = res.data.total
        }
      })

      // 获取订单总数
      this.request.get("/api/order/page", {
        params: {
          pageNum: 1,
          pageSize: 1
        }
      }).then(res => {
        if (res.code === '200') {
          this.orderCount = res.data.total
        }
      })
    }
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-color: #fff0f6;
  min-height: 100vh;
}

.brand-banner {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 8px #fff, 0 2px 8px #ffb6d5;
}

.data-cards {
  margin-bottom: 30px;
}

.data-card {
  height: 120px;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 173, 210, 0.3);
}

.data-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 173, 210, 0.2);
}

.card-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.card-icon {
  font-size: 48px;
  margin-right: 20px;
  color: #ff69b4;
  transition: all 0.3s ease;
}

.data-card:hover .card-icon {
  transform: scale(1.1);
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.card-value {
  font-size: 28px;
  font-weight: bold;
  color: #ff69b4;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.image-gallery {
  margin-top: 30px;
}

.image-card {
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 173, 210, 0.3);
}

.image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(255, 173, 210, 0.2);
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.image-card:hover .gallery-image {
  transform: scale(1.05);
}

.image-title {
  padding: 15px;
  text-align: center;
  font-size: 16px;
  color: #666;
  background: rgba(255, 255, 255, 0.9);
}

.no-data {
  text-align: center;
  padding: 100px 0;
  color: #ff69b4;
}

.no-data p {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

:deep(.el-card__body) {
  padding: 0;
  height: 100%;
}
</style>
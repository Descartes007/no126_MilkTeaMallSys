<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template >
  <div class="income-rank-container">
    <div class="rank-title">饮品收入排行</div>
    <el-row :gutter="24" class="rank-list">
      <el-col :span="8" v-for="(good, index) in good" :key="index">
        <el-card class="rank-card" shadow="hover">
          <div class="rank-badge">NO.{{ index + 1 }}</div>
          <div class="rank-content">
            <img :src="baseApi + good.imgs" class="rank-img" />
            <div class="rank-info">
              <div class="rank-name">{{ good.name }}</div>
              <div class="rank-sale">销售额：<span>￥{{ good.saleMoney }}</span></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import incomeItem from "@/components/IncomeItem";
export default {
  name: "IncomeRank",
  data() {
    return {
      num: 10,
      good: [],
      categories: [],
      baseApi: this.$store.state.baseApi,
    };
  },
  components: {
    'income-item': incomeItem,
  },
  created() {
    //先查询分类id和名称
    this.request.get("/api/category").then(res => {
      if (res.code === '200') {
        this.categories = res.data;
      }
      //获取排行数据
      this.request.get("/api/good/rank/", { params: { num: this.num } }).then(res => {
        if (res.code === '200') {
          this.good = res.data;
        }
      })
    })
  },
}
</script>

<style scoped>
.income-rank-container {
  max-width: 1000px;
  margin: 40px auto 0 auto;
  padding: 20px 0 40px 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(255, 173, 210, 0.12);
}
.rank-title {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 8px #fff, 0 2px 8px #ffb6d5;
}
.rank-list {
  margin: 0 auto;
}
.rank-card {
  border-radius: 12px;
  margin-bottom: 32px;
  transition: box-shadow 0.3s, transform 0.3s;
  background: #fff0f6;
  border: 1px solid #ffb6d5;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.08);
  position: relative;
  padding-top: 32px;
}
.rank-card:hover {
  box-shadow: 0 8px 32px rgba(255, 173, 210, 0.18);
  transform: translateY(-6px) scale(1.03);
}
.rank-badge {
  position: absolute;
  top: 12px;
  left: 18px;
  background: #ff69b4;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 16px;
  padding: 4px 18px;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.18);
  z-index: 2;
}
.rank-content {
  display: flex;
  align-items: center;
  padding: 24px 12px 12px 12px;
}
.rank-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 24px;
  border: 2px solid #ffb6d5;
  background: #fff;
}
.rank-info {
  flex: 1;
}
.rank-name {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}
.rank-sale {
  font-size: 16px;
  color: #ff69b4;
  font-weight: bold;
}
.rank-sale span {
  font-size: 20px;
  color: #ff69b4;
  font-weight: bold;
}
</style>
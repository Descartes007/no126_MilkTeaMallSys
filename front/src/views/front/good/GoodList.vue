<template>
  <div>
    <search @search="handleSearch"></search>
    <div class="main-box">
      <div style="margin: 20px auto">
        <h2 class="cate" style="font-size: 24px;">
           选择饮品分类
        </h2>
        <!--      类别菜单-->
        <el-row :gutter="20" style="font-size: 18px;">
          <el-col v-for="(item, index) in icons" :key="index" :span="6">
            <i class="iconfont" v-html="item.value"></i> 
            <span v-for="(category, index2) in item.categories" :key="index2">
              <b>
                <a
                  href="#"
                  @click.prevent="load(category.id)"
                  :class="{
                    black: categoryId == category.id,
                    grey: categoryId != category.id,
                  }"
                >
                  <span> {{ category.name }}</span>
                </a>
              </b>
              <span v-if="index2 != item.categories.length - 1"> / </span>
            </span>
          </el-col>
        </el-row>
        <hr />
        <el-row :gutter="20">
          <el-col
            :span="6"
            v-for="good in good"
            :key="good.id"
            style="margin-bottom: 20px"
          >
            <!--            饮品格子-->
            <router-link :to="'goodview/' + good.id">
              <el-card :body-style="{ padding: '0px', background: '#e3f5f4' }">
                <img
                  :src="baseApi + good.imgs"
                  style="width: 100%; height: 300px"
                />
                <div style="padding: 5px 10px">
                  <span style="font-size: 18px;white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                                        ><b>{{ good.name.length > 15 ? good.name.slice(0, 13) + '...' : good.name }}</b></span
                                    ><br />
                  <span style="color: red; font-size: 15px"
                    >￥{{ good.price }}</span
                  >
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!--      分页-->
      <div class="block" style="text-align: center">
        <el-pagination
          background
          :hide-on-single-page="false"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import search from "../../../components/Search";

export default {
  name: "GoodList",
  data() {
    return {
      //分类icon，每个icon包含id、value、categories对象数组.category：id，name
      icons: [],
      total: 0,
      pageSize: 8,
      currentPage: 1,
      //选择的分类
      categoryId: Number,
      //搜索的内容
      searchText: "",
      good: [],
      baseApi: this.$store.state.baseApi,
    };
  },
  components: {
    search,
  },
  created() {
    //二者一般不同时存在
    this.searchText = this.$route.query.searchText;
    this.categoryId = this.$route.query.categoryId;

    this.loadCategories();
    this.load();
  },
  methods: {
    loadCategories() {
      this.request.get("/api/icon").then((res) => {
        if (res.code === "200") {
          this.icons = res.data;
        }
      });
    },
    handleCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSearch(text) {
      this.searchText = text;
      this.load();
    },
    load(categoryId) {
      if (categoryId != undefined) {
        this.categoryId = categoryId;

        this.$router.push({
          path: "/goodlist",
          query: { categoryId: this.categoryId },
        });
      }
      this.request
        .get("/api/good/page", {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            searchText: this.searchText,
            categoryId: this.categoryId,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            this.total = res.data.total;
            this.good = res.data.records;
            
          }
        });
    },
  },
};
</script>

<style scoped>
.main-box {
  background-color: white;
  border: white 2px solid;
  border-radius: 40px;
  padding: 20px 40px;
  margin: 5px auto;
}

.black {
  color: black;
}

.grey {
  color: grey;
}
</style>
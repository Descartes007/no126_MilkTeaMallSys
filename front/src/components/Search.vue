<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
  <!--      搜索栏-->
  <el-row>
    <el-col :span="24" style="text-align: center;">
      <div class="search" style="display: inline-block">
        <div style="height: 60px;margin-left: 30px">
          <input @keydown.enter="$emit('search',searchText)" type="text" placeholder="请输入饮品" v-model="searchText">
          <button @click="$emit('search',searchText)"></button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Search",
  data(){
    return{
      searchText:'',
    }
  },
  mounted() {
    
  }

}
</script>

<style scoped>

</style>
<!--
 * @Description: 
 * @Author: Rabbiter
 * @Date: 2023-03-26 15:27:05
-->
<template>
  <div>
    <div class="head-cart" style="font-size: 22px; padding: 8px;background-color: lightgrey;">
      <i class="iconfont icon-r-shield" style="font-size: 26px;"></i>
       销量第{{index}}
    </div>
    <div class="body">
      <div style="display: inline-block;margin-left: 40px">
        <router-link :to="'/goodview/'+good.id">
          <img :src="baseApi + good.imgs" style="width: 120px;height:120px">
        </router-link>
      </div>
      <div style="display: inline-block;line-height: 40px;padding: 20px" >
        <table>
          <tr>
            <th>饮品id</th>
            <th style="width: 300px">饮品名称</th>
            <th>销售额</th>
          </tr>
          <tr>
            <td>{{good.id}}</td>
            <router-link :to="'/goodview/'+good.id">
              <td style="width: 300px">{{good.name}}</td>
            </router-link>
            <td><b>￥{{good.saleMoney}}</b></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "IncomeItem",
  props:{
    good: Object,
    index: Number,
    categories: Array
  },
  data() {
    return {
      baseApi: this.$store.state.baseApi,
    }
  },
  mounted() {
    
  }
}
</script>

<style scoped>
.header{
  padding: 10px;
  color: black;
  font-size: 20px;
  font-weight: bolder;
  border: black 1px solid;
}
.body{
  background-color: #daf3ff;
  padding: 5px;
}
td{
  width: 120px;
  text-align: center;
  font-size: 20px;
  font-weight: lighter;
}
th{
  width: 120px;
  text-align: center;
  font-size: 18px;
  color: black;
  font-weight: normal;
}
a{
text-decoration: none;

}
</style>
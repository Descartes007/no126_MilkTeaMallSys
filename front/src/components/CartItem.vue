<template>
  <div>
    <div class="header" style="padding-left: 25px;">
      <span style="line-height: 40px"><b>订单时间：{{ cart.createTime }}</b></span>
    </div>
    <div class="body">
<!--      图片-->
      <div style="display: inline-block;margin-right: 20px">
        <router-link :to="'goodview/'+cart.goodId">
          <img :src="baseApi + cart.img" style="width: 100px;height:100px">
        </router-link>
      </div>
<!--      饮品信息-->
      <div style="display: inline-block;line-height: 40px" >
        <table>
          <tr>
            <th>饮品</th>
            <th>规格</th>
            <th>价格</th>
            <th>数量</th>
            <th>总价</th>
            <th>操作</th>
          </tr>
          <tr>
            <a :href="'goodview/'+cart.goodId">
              <td>{{ cart.goodName }}</td>
            </a>
            <td>{{cart.standard}}</td>
            <td>{{realPrice.toFixed(2)}}</td>
            <td>
              <el-button style="font-size: 15px;" @click="countChangeFlag=true" v-if="!countChangeFlag">
                {{cart.count}}
              </el-button>
              <el-input-number v-model="cart.count" :min="1" :max="cart.store" v-if="countChangeFlag" style="width: 120px" ></el-input-number>
              </td>
            <td>{{totalPrice}}</td>
            <td>
              <el-button type="success" @click="pay" style="font-size: 18px;">
                
                支付
              </el-button>
              <el-popconfirm
                  @confirm="del"
                  title="确定删除？"
              >
                <el-button type="danger" slot="reference" style="font-size: 18px;">
                  
                    移除
                </el-button>
              </el-popconfirm>
            </td>
          </tr>
        </table>
      </div>
    </div>



  </div>
</template>

<script>

export default {
  name: "CartItem",
  props:{
    cart: Object,
    countChangeFlag: false,
  },
  created() {
    
  },
  mounted() {
    
  },
  data(){
    return{

      baseApi: this.$store.state.baseApi,
    }
  },
  computed:{
    totalPrice:function () {
      return (this.realPrice * this.cart.count).toFixed(2)
    },
    realPrice: function (){
      return (this.cart.price * this.cart.discount)
    }
  },
  methods:{
    //从购物车移除
    del(id){
      this.request.delete("/api/cart/"+this.cart.id).then(res=>{
        if(res.code==='200'){
          this.$message.success("删除成功")
          this.$emit('delete',this.cart.id)
        }
      })
    },
    //跳转到支付页面
    pay(){
      let good = {id: this.cart.goodId,name: this.cart.goodName,imgs: this.cart.img,discount: this.cart.discount}
      this.$router.push({name: 'preOrder',query: {good: JSON.stringify(good), realPrice: this.realPrice, num: this.cart.count, standard: this.cart.standard, cartId: this.cart.id}})
    },
  }
}
</script>

<style scoped>
.header{
  background-color: #daf3ff;
  height: 40px;
  border-radius: 25px 25px 0 0;
}
.body{
  background-color: white;
  padding: 20px;
  border-radius: 0 0 25px 25px;
}
th,td{

  width: 120px;
  text-align: center;
}
th{
  font-size: 15px;
  color: #00b7ff;
  font-weight: normal;
}
</style>
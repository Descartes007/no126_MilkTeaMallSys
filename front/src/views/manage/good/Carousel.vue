<template>
  <div class="carousel-container">
    <div class="carousel-title">轮播图管理</div>
    <div class="carousel-desc">管理首页轮播展示的饮品图片，支持添加、编辑、删除操作</div>
    <el-table :data="tableData" border stripe class="carousel-table">
      <el-table-column label="饮品">
        <template slot-scope="scope">
          <a :href="'/goodView/' + scope.row.goodId" class="good-link">{{ scope.row.goodName }}</a>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="baseApi + scope.row.img" class="carousel-img" />
        </template>
      </el-table-column>
      <el-table-column prop="showOrder" label="轮播顺序"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" class="action-btn" @click="edit(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="del(scope.row.id)" title="确定删除？">
            <el-button type="danger" class="action-btn" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn-wrapper">
      <el-button @click="add" type="primary" class="add-btn">新增轮播图</el-button>
    </div>
    <el-dialog title="信息" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="entity" label-width="120px" class="carousel-form">
        <el-form-item label="饮品id">
          <el-input v-model="entity.goodId" autocomplete="off" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="轮播顺序">
          <el-select v-model="entity.showOrder">
            <el-option v-for="index in tableData.length" :key="index" :label="index" :value="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="dialog-btn">取消</el-button>
        <el-button type="primary" @click="save" class="dialog-btn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from '../../../utils/request'
const url = "/api/carousel/"


export default {
  name: "Carousel",
  data() {
    return {
      baseApi: this.$store.state.baseApi,
      options: [],
      searchText: '',
      user: {},
      tableData: [],
      pageNum: 1,
      pageSize: 5,
      entity: {},
      total: 0,
      dialogFormVisible: false
    };
  },
  created() {
    this.load()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.load()
    },
    load() {
      API.get(url).then(res => {
        this.tableData = res.data || []
        
      })
    },
    add() {
      this.entity = {}
      this.tableData.length++;
      this.dialogFormVisible = true
    },
    edit(row) {
      this.entity = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
    },
    save() {
      if(this.entity.goodId == undefined || this.entity.goodId === "") {
          this.$message.error("饮品id不能为空")
          return;
      }
      if(this.entity.showOrder == undefined) {
          this.$message.error("轮播顺序不能为空")
          return;
      }

      API.post(url, this.entity).then(res => {
        if (res.code === '200') {
          this.$message.success("保存成功")
          this.load()
          this.dialogFormVisible = false
        } else {
          this.$message.error(res.msg)
        }

      })
    },
    del(id) {
      API.delete(url + id).then(res => {
        if(res.code==='200'){
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.load();
        }else {
          this.$message.error(res.msg);
        }
      })
    }
  },
};
</script>

<style scoped>
.carousel-container {
  max-width: 1100px;
  margin: 40px auto 0 auto;
  padding: 24px 0 40px 0;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(255, 173, 210, 0.12);
}
.carousel-title {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 8px #fff, 0 2px 8px #ffb6d5;
}
.carousel-desc {
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-bottom: 32px;
}
.carousel-table {
  width: 90%;
  margin: 0 auto 24px auto;
  background: #fff0f6;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.08);
}
.carousel-img {
  width: 180px;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #ffb6d5;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.12);
  background: #fff;
}
.good-link {
  color: #ff69b4;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s;
}
.good-link:hover {
  color: #ff4081;
  text-decoration: underline;
}
.action-btn {
  border-radius: 8px;
  font-size: 16px;
  padding: 6px 18px;
  margin-right: 8px;
  transition: box-shadow 0.2s, background 0.2s;
}
.action-btn:hover {
  box-shadow: 0 4px 16px rgba(255, 173, 210, 0.18);
}
.add-btn-wrapper {
  text-align: center;
  margin: 32px 0 0 0;
}
.add-btn {
  width: 180px;
  font-size: 20px;
  border-radius: 24px;
  background: linear-gradient(90deg, #ffb6d5 0%, #ff69b4 100%);
  color: #fff;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.12);
  border: none;
  transition: background 0.2s, box-shadow 0.2s;
}
.add-btn:hover {
  background: linear-gradient(90deg, #ff69b4 0%, #ffb6d5 100%);
  box-shadow: 0 4px 16px rgba(255, 173, 210, 0.18);
}
.carousel-form {
  margin-top: 16px;
}
.dialog-btn {
  font-size: 18px;
  border-radius: 8px;
  padding: 6px 28px;
  margin: 0 8px;
}
</style>

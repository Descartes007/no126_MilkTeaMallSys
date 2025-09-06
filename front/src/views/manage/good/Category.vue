<template>
  <div class="category-container">
    <div class="category-title">分类管理</div>
    <div class="category-desc">管理饮品的分类信息，支持添加、编辑、删除操作</div>
    <div class="category-table-wrapper">
      <el-button type="success" icon="iconfont icon-r-add" class="add-btn" @click="addDialogFormVisible = true"> 新增上级分类</el-button>
      <el-table :data="icons" stripe class="category-table">
        <el-table-column type="expand" label="下级分类" width="100px">
          <template slot-scope="scope">
            <el-table :data="scope.row.categories" :header-cell-style="{ background: '#cbefea', color: 'black' }">
              <el-table-column label="分类id" prop="id"></el-table-column>
              <el-table-column label="分类名称" prop="name"></el-table-column>
              <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                  <el-button type="primary" class="action-btn" @click="handleEditCategory(scope.row)"> 修改</el-button>
                  <el-popconfirm @confirm="deleteCategory(scope.row)" title="确定删除？">
                    <el-button type="danger" class="action-btn" slot="reference"> 删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="id" width="60px"></el-table-column>
        <el-table-column label="icon">
          <template slot-scope="scope">
            <i class="iconfont icon-preview" v-html="scope.row.value"></i>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="340">
          <template slot-scope="scope">
            <el-button type="primary" icon="iconfont icon-r-edit" class="action-btn" @click="handleEditIcon(scope.row)">编辑</el-button>
            <el-button type="success" icon="iconfont icon-r-add" class="action-btn" @click="handleAddCategory(scope.row)">新增</el-button>
            <el-popconfirm @confirm="deleteIcon(scope.row.id)" title="确定删除？">
              <el-button type="danger" icon="iconfont icon-r-delete" class="action-btn" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--icon修改弹窗-->
    <el-dialog title="修改上级分类" :visible.sync="dialogFormVisible">
      <el-form :model="icon" class="category-form">
        <el-form-item label="图标" label-width="100px">
          <i class="iconfont icon-preview" v-html="icon.value" style="font-size: 32px;"></i>
        </el-form-item>
        <el-form-item label="更改图标" label-width="100px">
          <el-select placeholder="请选择图标" v-model="icon.value" class="icon-select">
            <el-option v-for="item in iconStore" :value="item" :key="item">
              <i class="iconfont icon-preview" v-html="item" style="font-size: 28px;"></i>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="dialog-btn"> 取消</el-button>
        <el-button type="primary" @click="editIcon" class="dialog-btn"><i class="iconfont icon-r-yes" style="font-size: 22px;"></i> 确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增上级分类" :visible.sync="addDialogFormVisible">
      <el-form :model="addIcon" class="category-form">
        <el-form-item label="图标" label-width="100px">
          <i class="iconfont icon-preview" v-html="addIcon.value" style="font-size: 32px;"></i>
        </el-form-item>
        <el-form-item label="更改图标" label-width="100px">
          <el-select placeholder="请选择图标" v-model="addIcon.value" class="icon-select">
            <el-option v-for="item in iconStore" :value="item" :key="item">
              <i class="iconfont icon-preview" v-html="item" style="font-size: 28px;"></i>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false" class="dialog-btn"> 取消</el-button>
        <el-button type="primary" @click="saveIcon" class="dialog-btn"><i class="iconfont icon-r-yes" style="font-size: 22px;"></i> 确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import API from "../../../utils/request";
import icons from "@/utils/icons";
export default {
  name: "Category",
  data() {
    return {
      options: [],
      searchText: "",
      user: {},
      //从icons.js中引入常量iconStore
      iconStore: icons.iconStore,
      icons: [],
      icon: {},
      addIcon: {},
      pageNum: 1,
      pageSize: 5,
      entity: {},
      total: 0,
      dialogFormVisible: false,
      addDialogFormVisible: false,
    };
  },
  created() {
    this.user = localStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : {};
    this.load();
    console.log(this.iconStore);
  },
  methods: {
    load() {
      this.request.get("/api/icon").then((res) => {
        this.icons = res.data;
      });
    },

    handleEditCategory(category) {
      this.$prompt("请输入修改后的名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {
        if (value == null || value == undefined || value.trim() == "") {
          this.$message.error("请输入名称");
          return
        }
        category.name = value;
        this.request.post("/api/category", category).then((res) => {
          if (res.code === "200") {
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        });
      }).catch(() => {

      });
    },
    handleAddCategory(icon) {
      this.$prompt("请输入新增的下级分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({ value }) => {

        if (value == null || value == undefined || value.trim() == "") {
          this.$message.error("请输入名称");
          return
        }
        this.request
          .post("/api/category/add", { name: value, iconId: icon.id })
          .then((res) => {
            if (res.code === "200") {
              this.$message.success("新增成功");
              this.load();
            } else {
              this.$message.error("新增失败");
            }
          });
      }).catch(() => {

      });
    },
    handleEditIcon(icon) {
      this.icon = JSON.parse(JSON.stringify(icon));
      this.dialogFormVisible = true;
    },
    editIcon() {
      //删除无用的属性
      delete this.icon.categories;
      this.request.post("/api/icon", this.icon).then((res) => {
        if (res.code === "200") {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    saveIcon() {
      // 新增上级分类
      if (this.addIcon.value == undefined) {
        this.$message.error("请选择上级分类图标");
        return;
      }
      this.request.post("/api/icon", this.addIcon).then((res) => {
        console.log(res);
        if (res.code === "200") {
          this.$message.success("新增成功");
          this.addDialogFormVisible = false;
          this.load();
        } else {
          this.$message.error("新增失败");
        }
      });
    },
    deleteIcon(iconId) {
      // 删除上级分类
      this.request.get("/api/icon/delete?id=" + iconId).then((res) => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    deleteCategory(category) {
      // 删除下级分类
      this.request.get("/api/category/delete?id=" + category.id).then((res) => {
        if (res.code == "200") {
          this.$message.success("删除成功");
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
.category-container {
  max-width: 1100px;
  margin: 40px auto 0 auto;
  padding: 24px 0 40px 0;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(255, 173, 210, 0.12);
}
.category-title {
  font-size: 28px;
  color: #ff69b4;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 2px;
  text-shadow: 1px 1px 8px #fff, 0 2px 8px #ffb6d5;
}
.category-desc {
  font-size: 16px;
  color: #888;
  text-align: center;
  margin-bottom: 32px;
}
.category-table-wrapper {
  width: 80%;
  margin: 0 auto;
}
.category-table {
  background: #fff0f6;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(255, 173, 210, 0.08);
}
.el-table .cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.action-btn {
  border-radius: 8px;
  font-size: 16px;
  padding: 6px 18px;
  margin-right: 10px;
  margin-bottom: 0;
  vertical-align: middle;
  white-space: nowrap;
}
.action-btn:last-child {
  margin-right: 0;
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
  margin: 32px auto 18px auto;
  display: block;
  transition: background 0.2s, box-shadow 0.2s;
}
.add-btn:hover {
  background: linear-gradient(90deg, #ff69b4 0%, #ffb6d5 100%);
  box-shadow: 0 4px 16px rgba(255, 173, 210, 0.18);
}
.category-form {
  margin-top: 16px;
}
.icon-select {
  width: 100%;
}
.dialog-btn {
  font-size: 18px;
  border-radius: 8px;
  padding: 6px 28px;
  margin: 0 16px;
}
.dialog-footer {
  text-align: center;
}
.icon-preview {
  vertical-align: middle;
}
</style>

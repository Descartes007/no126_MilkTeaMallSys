<template>
  <div>
    <div class="demo-input-size">
      <el-select
        v-model="searchMode"
        placeholder="请选择"
        style="width: 150px; margin-right: 10px"
      >
        <el-option value="id" label="用户id"></el-option>
        <el-option value="username" label="账号"></el-option>
        <el-option value="nickname" label="昵称"></el-option>
      </el-select>
      <el-input
        v-if="searchMode === 'id'"
        placeholder="请输入用户id"
        prefix-icon="el-icon-search"
        style="width: 250px; padding-right: 5px"
        v-model="searchParams.id"
      ></el-input>
      <el-input
        v-if="searchMode === 'username'"
        placeholder="请输入账号"
        prefix-icon="el-icon-search"
        style="width: 250px; padding-right: 5px"
        v-model="searchParams.username"
      ></el-input>
      <el-input
        v-if="searchMode === 'nickname'"
        placeholder="请输入昵称"
        prefix-icon="el-icon-search"
        style="width: 250px; padding-right: 5px"
        v-model="searchParams.nickname"
      ></el-input>
      <el-button type="primary" @click="search">
        
        搜索
      </el-button>
      <el-button type="warning" @click="reload">
         重置
      </el-button>
    </div>
    <!--          按钮栏-->
    <div style="padding-top: 10px">
      <el-button type="primary" @click="handleAdd" style="font-size: 18px;"
        > 新增</el-button
      >
      <el-button type="danger" @click="delBatch" style="font-size: 18px;"
        > 批量删除</el-button
      >
    </div>
    <!--          弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form label-width="50px" style="padding: 0 60px">
        <el-form-item label="账号" v-if="dialogTitle == '新增用户'">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="dialogTitle == '新增用户'">
          123456
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="user.role" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" style="font-size: 20px;"> 取消</el-button>
        <el-button type="primary" @click="save" style="font-size: 20px;"> 确定</el-button>
      </div>
    </el-dialog>

    <!--          表格-->
    <el-table
      :data="tableData"
      background-color="black"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="id" label="id" width="100"></el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="150"
      ></el-table-column>
      <el-table-column label="身份" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.role === 'user'">用户</span>
          <span v-if="scope.row.role === 'admin'">管理员</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="180"
      ></el-table-column>
      <el-table-column prop="phone" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="350"
      ></el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
          <el-button style="font-size: 18px;" type="success" @click="handleEdit(scope.row)"
            >
            
            编辑
            </el-button
          >
          <el-button
            style="font-size: 18px;"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >
            
            删除
            </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="flex: 0 0 auto">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";


export default {
  name: "User",
  created() {
    this.load();
  },
  data() {
    return {
      tableData: [],
      roleOptions: [
        {
          value: "admin",
          label: "管理员",
        },
        {
          value: "user",
          label: "用户",
        },
      ],
      roleValue: "",
      total: 0,
      pageSize: 5,
      currentPage: 1,
      searchMode: "id",
      searchParams: {
        id: "",
        username: "",
        nickname: "",
      },
      dialogFormVisible: false,
      dialogTitle: "",
      user: {
        username: "",
        nickname: "",
        newPassword: "",
        role: "",
        phone: "",
        email: "",
        address: "",
      },
      multipleSelection: [],
    };
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentPage(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    load() {
      this.request
        .get("/user/page", {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            id: this.searchParams.id,
            username: this.searchParams.username,
            nickname: this.searchParams.nickname,
          },
        })
        .then((res) => {
          if (res.code === "200") {
            this.tableData = res.data.records;
            this.total = res.data.total;
          }
          
        });
    },
    search() {
      this.currentPage = 1;
      this.load();
    },
    reload() {
      this.searchParams.id = "";
      this.searchParams.username = "";
      this.searchParams.nickname = "";
      this.load();
    },
    //插入或修改
    save() {
      if (this.dialogTitle == "新增用户") {
        if (this.user.username.trim() == "") {
          this.$message.error("账号不能为空");
          return;
        }
        this.user.newPassword = md5("123456");
      }
      if (this.user.nickname.trim() == "") {
        this.$message.error("昵称不能为空");
        return;
      }
      if (this.user.role.trim() == "") {
        this.$message.error("身份不能为空");
        return;
      }
      if (this.user.phone.trim() == "") {
        this.$message.error("电话不能为空");
        return;
      }
      if (this.user.email.trim() == "") {
        this.$message.error("邮箱不能为空");
        return;
      }
      this.dialogTitle = "新增用户";
      this.request.post("/user", this.user).then((res) => {
        if (res.code === "200") {
          this.$message.success("保存成功");
          this.dialogFormVisible = false;
          this.load();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleAdd() {
      this.dialogTitle = "新增用户";
      this.dialogFormVisible = true;
      this.user = {
        username: "",
        nickname: "",
        newPassword: "",
        role: "",
        phone: "",
        email: "",
        address: "",
      };
    },
    //编辑
    handleEdit(row) {
      this.user = JSON.parse(JSON.stringify(row));
      this.dialogTitle = "编辑用户";
      this.dialogFormVisible = true;
    },
    //删除
    handleDelete(id) {
      this.$confirm("确认删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.request.delete("/user/" + id).then((res) => {
          if (res.code === "200") {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.load();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
    //批量删除
    delBatch() {
      let ids = this.multipleSelection.map((v) => v.id);
      console.log(ids);
      this.$confirm("确认删除这些用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.request.post("/user/del/batch", ids).then((res) => {
          if (res.code === "200") {
            this.$message({
              type: "success",
              message: "删除成功",
              duration: 3000,
            });
            this.load();
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    },
  },
};
</script>

<style scoped>
</style>
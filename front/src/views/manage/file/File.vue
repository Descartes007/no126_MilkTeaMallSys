<template>
  <div>
    <div class="demo-input-size">
      <el-input placeholder="请输入文件名" prefix-icon="iconfont icon-r-find" style="width: 250px;padding-right: 5px" v-model="fileName"></el-input>
      <el-button type="primary" @click="search">
        
        搜索
      </el-button>
      <el-button type="warning" @click="reload">
        
        重置
      </el-button>

    </div>
    <!--          按钮栏-->
    <div style="padding-top: 10px">

      <el-upload action="http://localhost:9191/file/upload" :show-file-list="false" :on-success="handleFileUploadSuccess" style="display: inline-block">
        <el-button type="primary" style="font-size: 18px;"> 上传</el-button>
      </el-upload>
      <el-button type="danger" @click="delBatch" style="margin-left: 10px;font-size: 18px;"> 批量删除</el-button>
    </div>
    <!--          表格-->
    <el-table :data="tableData" background-color="black" @selection-change="handleSelectionChange" >
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="name" label="文件名" width="350" ></el-table-column>
      <el-table-column prop="type" label="文件类型" width="180" ></el-table-column>
      <el-table-column prop="size" label="文件大小" width="180" ></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template slot-scope="scope">

<!--          下载-->
          <a :href="baseApi + scope.row.url">
            <el-button
              type="success"
              style="font-size: 18px;"
              >
               下载
            </el-button>
          </a>
<!--          删除-->
          <el-button
              type="danger"
              style="margin-left: 10px;font-size: 18px;"
              @click="handleDelete(scope.row.id)">
              
              删除
            </el-button>
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

export default {
  name: "File",
  created() {
    this.load();
  },
  data(){
    return{
      baseApi: this.$store.state.baseApi,
      tableData: [],
      total: 0,
      pageSize: 5,
      currentPage: 1,
      fileName: '',

      multipleSelection: []
    }
  },
  methods:{
    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentPage(currentPage){
      this.currentPage = currentPage;
      this.load();
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleFileUploadSuccess() {
      this.$message.success("上传成功");
      this.load();
    },
    handleEnable(row){
      this.request.get("/file/enable",{params:{"id": row.id, "enable": row.enable}}).then(res=>{
        if(res.code==='200'){
          this.$message({
            type: "success",
            message: "修改成功",
            duration: 3000
          });
          this.load();
        }else {
          this.$message.error(res.msg);
        }
      })
    },
    load(){
      this.request.get("/file/page",{
        params:{
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          fileName: this.fileName,
        }
      }).then(res=>{
            if(res.code==='200'){
              this.tableData = res.data.records;
              for(let s of this.tableData){
                let size = s.size;
                if(size<1024){
                  s.size = size+' Kb';
                }else if(size >1024 && size < 1024*1024){
                  s.size = (size / 1024).toFixed(2) +' Mb'
                }else{
                  s.size = size /1024/1024 .toFixed(2)+' Gb'
                }
              }
              this.total = res.data.total;
              
            }
          }
      )
    },
    search(){
      this.currentPage = 1;
      this.load();
    },
    reload(){
      this.fileName='';
      this.load()
    },
    // //编辑
    // handleEdit(row){
    //   this.user = JSON.parse(JSON.stringify(row));
    //   this.dialogTitle='编辑用户';
    //   this.dialogFormVisible = true;
    // },

    //删除
    handleDelete(id){
      this.$confirm('确认删除该文件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete("/file/"+id).then(res=>{
          if(res.code==='200'){
            this.$message({
              type: "success",
              message: "删除成功",
              duration: 3000
            });
            this.load();
          }else {
            this.$message.error(res.msg);
          }
        })
      })
    },
    //批量删除
    delBatch(){
      let ids = this.multipleSelection.map(v => v.id);
      this.$confirm('确认删除这些用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.post("/file/del/batch",ids).then(res=>{
          if(res.code==='200'){
            this.$message({
              type: "success",
              message: "删除成功",
              duration: 3000
            });
            this.load();
          }else {
            this.$message.error(res.msg);
          }
        })

      })

    }
  },
}
</script>

<style scoped>

</style>
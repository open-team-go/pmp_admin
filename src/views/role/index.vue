<template> 
  <div class="app-container">
    
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="brandTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="编码" align="center">
          <template slot-scope="scope">{{scope.row.roleCode}}</template>
        </el-table-column>
        <el-table-column label="排序" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="showUpdate(scope.$index, scope.row)">权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,30]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
        :hide-on-single-page=true>
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" fullscreen="true">
      <el-form class="small-space" :model="tempRole" label-position="left" label-width="100px"
               style='width: 1000px; margin-left:50px;'>
        <el-form-item label="角色名称" required>
          <el-input type="text" v-model="tempRole.roleName" style="width: 250px;">
          </el-input>
        </el-form-item>
        <el-form-item label="菜单&权限" required>
          <div v-for=" (menu,_index) in allPermission" :key="menu.permNames">
            <span style="width: 100px;display: inline-block;">
              <el-button :type="isMenuNone(_index)?'':(isMenuAll(_index)?'success':'primary')" size="mini"
                         style="width:80px;"
                         @click="checkAll(_index)">{{menu.permName}}</el-button>
            </span>
            <div style="display: inline-block;margin-left:20px;">
              <el-checkbox-group v-model="tempRole.permIdList">
                <el-checkbox v-for="perm in menu.permissions" :label="perm.permId" @change="checkRequired(perm,_index)"
                             :key="perm.permId">
                  <span :class="{requiredPerm:perm.requiredPerm===1}">{{perm.permName}}</span>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <p style="color:#848484;">说明:红色权限为对应菜单内的必选权限</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  const roleService = require('@/api/role')
   const permissionService = require('@/api/permission')

  const defaultFormData = {
    courseId: null,
    courseName: null,
    courseDesc: null,
    useOn: null
  };
  export default {
    name: 'roleList',
    data() {
      return {
        listQuery: {
          pageNum: 1,
          pageSize: 10,
        },
        list: null,
        total: null,
        listLoading: true,
        dialogVisible: false,
        formData: Object.assign({}, defaultFormData),
        allPermission: [],
        dialogStatus: 'update',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '新建角色'
        },
        tempRole: {
          roleName: '',
          roleId: '',
          permIdList: [],
        }
      }
    },
    created() {
      this.getList();
      this.getAllPermission();
    },
    computed:{
      dialogTitle:function(){
        return   '修改权限'
      }
    },
    methods: {
      // TODO: 是否使用搜索
     getList() {
        this.listLoading = true;
        roleService.fetchList(this.listQuery).then(res => {
          
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          this.listQuery.pageNum = res.data.pageNum;
          this.listQuery.pageSize = res.data.pageSize;
        }).catch(err=>{
          this.listLoading = false;
          this.list = []
          this.total = 0
        });
      },
      getAllPermission(){
        permissionService.fetchAllList({}).then(res => {
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].permLevel==1){
              res.data[i].permissions=[];
              this.allPermission.push(res.data[i]);
            }
          }

          console.log(this.allPermission);

          for(let i=0;i<res.data.length;i++){
            if(res.data[i].permLevel>1){
              this.allPermission.forEach(item=>{
                if(item.permId == res.data[i].pid){
                  item.permissions.push(res.data[i]);
                }
              })
            }
          }
          console.log(this.allPermission);
        }).catch(err=>{
          this.listLoading = false;
        });
      },
      handleUpdate(index, row) {
        this.dialogVisible = true;
        this.formData = Object.assign({},row);
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleDialogConfirm() {
        const data = this.formData
          // roleService.update(data).then(res => {
          //   this.$message({
          //     message: '修改成功！',
          //     type: 'success'
          //   });
          //   this.dialogVisible =false;
          //   this.getList();
          // })

      },
      confirmArrHas(arr,obj){
        if(!arr || arr.length==0){
          return -1;
        }
        let flag = -1;
        arr.forEach((item,index)=>{
          if(item==obj){flag=index;return}
        });
        return flag;
      },
      getIndex($index) {
        //表格序号
        return $index + 1
      },  
      showUpdate($index,row) {
        let role = row;
        console.log(role);
        this.tempRole.roleName = role.roleName;
        this.tempRole.roleId = role.roleId;
        this.tempRole.permIdList = [];
        roleService.getPerms(role.roleId).then(res => {
          
          res.data.forEach(item=>{
            this.tempRole.permIdList.push(item.permId);
          });
        }).catch(err=>{
        });
        // for (let i = 0; i < role.menus.length; i++) {
        //   let perm = role.menus[i].permissions;
        //   for (let j = 0; j < perm.length; j++) {
        //     this.tempRole.permIdList.push(perm[j].permissionId);
        //   }
        // }
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      updateRole() {
        let that  = this;
        if (!this.checkPermissionNum()) {
          return;
        }
        // 添加父级ID
        this.tempRole.permIdList.forEach(item=>{
          console.log(item)
          that.allPermission.forEach(temp=>{
            temp.permissions.forEach(val=>{
                if(item == val.permId && val.pid != 0){
                that.addUnique(val.pid,that.tempRole.permIdList);
                return;
              }
            })
            
          })
        })
        console.log(this.tempRole)
        //修改角色
        roleService.updatePerms(this.tempRole).then(res => {
          
          this.getList();
          this.dialogFormVisible = false
        }).catch(err=>{
        });

      },
      checkPermissionNum() {
        //校验至少有一种权限
        if (this.tempRole.permIdList.length === 0) {
          this.$message.error("请至少选择一种权限");
          return false;
        }
        return true;
      },
      isMenuNone(_index) {
        //判断本级菜单内的权限是否一个都没选
        let menu = this.allPermission[_index].permissions;
        let result = true;
        for (let j = 0; j < menu.length; j++) {
          if (this.confirmArrHas(this.tempRole.permIdList,menu[j].permId)>-1) {
            result = false;
            break;
          }
        }
        return result;
      },
      isMenuAll(_index) {
        //判断本级菜单内的权限是否全选了
        let menu = this.allPermission[_index].permissions;
        let result = true;
        for (let j = 0; j < menu.length; j++) {
          if (this.confirmArrHas(this.tempRole.permIdList,menu[j].permId)<0) {
            result = false;
            break;
          }
        }
        return result;
      },
      checkAll(_index) {
        //点击菜单   相当于全选按钮
        let v = this;
        if (v.isMenuAll(_index)) {
          //如果已经全选了,则全部取消
          v.noPerm(_index);
        } else {
          //如果尚未全选,则全选
          v.allPerm(_index);
        }
      },
      allPerm(_index) {
        //全部选中
        let menu = this.allPermission[_index].permissions;
        for (let j = 0; j < menu.length; j++) {
          this.addUnique(menu[j].permId, this.tempRole.permIdList)
        }
      },
      noPerm(_index) {
        //全部取消选中
        let menu = this.allPermission[_index].permissions;
        for (let j = 0; j < menu.length; j++) {
            let idIndex = this.confirmArrHas(this.tempRole.permIdList,menu[j].permId);
            if(idIndex >-1){
              this.tempRole.permIdList.splice(idIndex, 1);
            }
        }
      },
      addUnique(val, arr) {
        //数组内防重复地添加元素
        let _index = arr.indexOf(val);
        if (_index < 0) {
          arr.push(val);
        }
      },
      checkRequired(_perm, _index) {
        //本方法会在勾选状态改变之后触发
        let permId = _perm.permId;
        if (this.tempRole.permIdList.indexOf(permId) > -1) {
          //选中事件
          //如果之前未勾选本权限,现在勾选完之后,tempRole里就会包含本id
          //那么就要将必选的权限勾上
          this.makeReuqiredPermissionChecked(_index);
        } else {
          //取消选中事件
          if (_perm.requiredPerm === 1) {
            //如果是必勾权限,就把本菜单的权限全部移出
            //(其实也可以提示用户本权限是菜单里的必选,请先取消勾选另外几个权限,交互太麻烦,此处就直接全部取消选中了)
            this.noPerm(_index);
          }
        }
      },
      makeReuqiredPermissionChecked(_index) {
        //将本菜单必选的权限勾上
        let menu = this.allPermission[_index].permissions;
        for (let j = 0; j < menu.length; j++) {
          let perm = menu[j];
          if (perm.requiredPerm === 1) {
            //找到本菜单的必选权限,将其勾上
            this.addUnique(perm.id, this.tempRole.permIdList)
            this.addUnique(perm.pid, this.tempRole.permIdList)
          }
        }
      }
      
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>


</style>
<template>
    <div class="divClass">
<!--        页头            -->
        <el-page-header  content="用户列表">
        </el-page-header>
<!--        添加用户按钮    -->
        <div class="addUser">
            <el-button size="mini" type="primary" class="MyButton" @click="handleAddUser"> <i class="el-icon-circle-plus-outline"></i> Add User </el-button>
        </div>
<!--                         添加用户的表单                                   -->
        <el-dialog title="添加用户" :visible.sync="AddUserDialogFormVisible">
            <el-form :model="form" >
                <el-form-item label="用户ID" :label-width="formLabelWidth" disable>
                    <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" datatype="">
                    <div class="MySelect">
                        <el-select  class="MySelect" v-model="form.gender" auto-complete="off" placeholder="选择性别">
                            <el-option label="男" :value=0 ></el-option>
                            <el-option label="女" :value=1 ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <div class="MySelect">
                        <el-select v-model="form.roleId" auto-complete="off" >
                            <el-option label="admin" :value=1></el-option>
                            <el-option label="销售管理" :value=2></el-option>
                            <el-option label="采购管理" :value=3></el-option>
                            <el-option label="库存管理" :value=4></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <div class="MySelect">
                        <el-select v-model="form.status" auto-complete="off">
                            <el-option label="正常" :value=1></el-option>
                            <el-option label="锁定" :value=0></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="用户描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddUserDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddUser2">确 定</el-button>
            </div>
        </el-dialog>
<!--        用户列表展示-->
        <el-table
                :data="users"
                height="100%"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    prop="userId"
                    label="用户ID"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="gender"
                    label="性别"
                    width="120">
                <template slot-scope="scope" >
                    {{gender[scope.row.gender]}}
                </template>
            </el-table-column>
            <el-table-column
                    label="职位"
                    width="120">
                <template slot-scope="scope" >
                    {{role[scope.row.roleId].role}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="电话号码"
                    width="120">
            </el-table-column>
            <el-table-column label="用户状态" width="120">
                    <template slot-scope="scope" >
                        <div>
                            <el-tag v-show="scope.row.status === 1"
                                    key="success"
                                    type="success"
                                    effect="dark">
                                {{status[scope.row.status]}}
                            </el-tag>
                            <el-tag v-show="scope.row.status === 0"
                                    key="failure"
                                    type="danger"
                                    effect="dark">
                                {{status[scope.row.status]}}
                            </el-tag>
                        </div>
                    </template>
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="描述"
                    width="120"
                    >
            </el-table-column>
            <el-table-column label="操作" min-width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="info"
                            @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        编辑用户表单-->
        <el-dialog title="编辑用户" :visible.sync="EditUserDialogFormVisible">
            <el-form :model="form">
                <el-form-item label="用户ID" :label-width="formLabelWidth" disable>
                    <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  label="性别" :label-width="formLabelWidth">
                    <div class="MySelect">
                        <el-select v-model.number="form.gender" auto-complete="off" placeholder="选择性别">
                            <el-option label="男" :value="0"></el-option>
                            <el-option label="女" :value="1"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <div class="MySelect">
                        <el-select v-model.number="form.roleId" auto-complete="off" >
                            <el-option label="admin" :value="1"></el-option>
                            <el-option label="销售管理" :value="2"></el-option>
                            <el-option label="采购管理" :value="3"></el-option>
                            <el-option label="库存管理" :value="4"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <div class="MySelect">
                        <el-select v-model.number="form.status" auto-complete="off" datatype="integer">
                            <el-option label="正常" :value= 1 datatype="integer"></el-option>
                            <el-option label="锁定" :value= 0 datatype="integer"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="用户描述" :label-width="formLabelWidth">
                    <el-input v-model="form.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddUserDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEdit2">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "UserManagement",
        data(){
            return {
                users : [{
                    userId: 1,
                    username: 'admin',
                    gender: 0,
                    phoneNumber: '19000000000',
                    roleId: 1,
                    status: 1,
                    description: 'test account'

                },{
                    userId: 1,
                    username: 'admin',
                    gender: 0,
                    phoneNumber: '19000000000',
                    roleId: 1,
                    status: 0,
                    description: 'test account'

                }],
                role: [{role: ""},{
                    role: "admin"
                },{
                    role: "销售管理"
                },{
                    role: "采购管理"
                },{
                    role: "库存管理"
                }],
                gender: ["男","女"],
                status: ["锁定","正常"],
                EditUserDialogFormVisible: false,
                AddUserDialogFormVisible: false,
                form: {
                    userId: 1,
                    username: 'admin',
                    gender: 0,
                    phoneNumber: '19000000000',
                    roleId: 1,
                    status: 1,
                    description: 'test account'
                },
                formLabelWidth: '120px',
                currentEdit: 0
            }
        },
        mounted: function() {
          this.getUsersList();
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.EditUserDialogFormVisible = true;
                this.currentEdit = index;
                this.form = JSON.parse(JSON.stringify(this.users[this.currentEdit]));
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            goBack() {
                console.log('go back');
            },
            handleAddUser(){
                this.AddUserDialogFormVisible = true;
            },
            handleAddUser2(){
                // this.users.push(this.form);
                this.AddUserDialogFormVisible = false;
                this.$api.user.addUser(this.form).then(res => {
                    if(res.status == 200){
                        this.getUsersList();
                    }
                })
            },
            handleEdit2(){
                this.users[this.currentEdit] = this.form;
                this.EditUserDialogFormVisible = false;
                this.$api.user.updateUser(this.form).then(res => {
                    if(res.status == 200){
                        this.getUsersList()
                    }
                })
            },
            getUsersList(){
                this.$api.user.getUsersList().then(res => {
                    this.users = res.data.data;
                    console.log("用户列表： " , res)
                })
            }
        }
    }
</script>

<style >

    .el-table__header-wrapper{
        line-height: 20px;
    }
    .addUser {
        /*margin-left: 0px;*/
        width: 100px;
        height: 40px;
    }
    .MyButton {
        position: relative;
        top: 0px;
    }

    .el-button {
        margin-left: 0px;
        top: -60px;
    }
    .el-dialog__header {
        height: 40px;
    }
    .el-dialog__header {
        position: relative;
        top: -20px;
    }
    .el-dialog__footer {
        height: 40px;
    }
    .dialog-footer {
        height: 40px;
        position: relative;
        top: -80px;
    }
    .divClass {
        height: 80%;
    }
    .MySelect {
        width: 200px;
    }
</style>
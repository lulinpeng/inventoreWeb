<template>
    <div class="all-container">
        <div class="all-container-padding bg" >
            <el-tabs v-model="activeName" @tab-click="handleClick" class="myTab">
<!--                <el-tab-pane label="基本信息" name="first" >-->
<!--                    <el-card  class="box-card" style="width: 400px">-->
<!--                        <div slot="header" class="myDiv">-->
<!--                            <el-avatar :size="50" :src="circleUrl" ></el-avatar>-->
<!--                            <span>{{userInfo.username}}</span>-->
<!--                        </div>-->
<!--                        <div>-->
<!--                            <div class="myDiv">电话号码：-->
<!--                                <el-tag>{{userInfo.phoneNumber}}</el-tag>-->
<!--                            </div >-->
<!--                            <div class="myDiv">用户描述：-->
<!--                                <el-tag>{{userInfo.description}}</el-tag>-->
<!--                            </div>-->
<!--                            <div >用户职务：-->
<!--                                <el-tag type="success" style="margin-right: 5px" >-->
<!--                                    {{role[userInfo.roleId].role}}-->
<!--                                </el-tag>-->
<!--                            </div>-->
<!--&lt;!&ndash;                            <div style="display: flex;justify-content: space-around;margin-top: 10px">&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-button type="primary" @click="showUpdateHrInfoView">修改信息</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-button type="danger" @click="showUpdatePasswdView">修改密码</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                        </div>-->
<!--                    </el-card>-->
<!--                </el-tab-pane>-->
                <el-tab-pane label="基本信息" name="second">
                    <el-form :model="userInfo" :rules="rules" ref="EditorUserForms">
                        <el-form-item label="头像" prop="avatar_url" :label-width="formLabelWidth">
                            <el-avatar :size="50" :src="circleUrl" class="myAvatar"></el-avatar>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
                            <el-col :span="8"> <el-input v-model="userInfo.username" disabled ></el-input></el-col>
                        </el-form-item>
                        <el-form-item label="电话" prop="phoneNumber" :label-width="formLabelWidth">
                            <el-col :span="8">  <el-input v-model="userInfo.phoneNumber" placeholder="请输入电话"></el-input></el-col>
                        </el-form-item>
                        <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-tag v-show="userInfo.status === 1"  type="success" effect="dark" style="{width: 150px}">正常</el-tag>
                                <el-tag v-show="userInfo.status === 0"  type="danger" effect="dark">锁定</el-tag>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="用户角色" prop="roleId" :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-tag type="primary" effect="dark">{{role[userInfo.roleId].role}}</el-tag>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="     "  :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-button type="danger" @click="EditorUser" >修改信息</el-button>
                            </el-col>
                        </el-form-item>

                    </el-form>

                </el-tab-pane>
                <el-tab-pane label="修改密码" name="third">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="原密码" prop="pass" :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.pass" placeholder="请输入原密码" type="password"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPass" :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.newPass" placeholder="请输入新密码" id="newkey" type="password"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="重复新密码" prop="checkNewPass" :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-input v-model="ruleForm.checkNewPass" placeholder="请再次输入新密码" id='newkey1' type="password"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="       "  :label-width="formLabelWidth">
                            <el-col :span="8">
                                <el-button type="primary" @click="editPassword">修改</el-button>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import store from "@/store"

    export default {
        name: "UserHome",
        data() {
            /*****检验两次密码是否一致***/
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    if (this.ruleForm.checkNewPass !== "") {
                        this.$refs.ruleForm.validateField("checkNewPass");
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.ruleForm.newPass) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {},//修改密码的表单
                activeName: "first",
                loading: true,
                baseUrl: process.env.BASE_API,
                userInfo: {},//用户信息表单
                formLabelWidth: "150px",
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                size: "large",
                store,
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
                /***校验***/
                rules: {
                    phone: [
                        {
                            required: true,
                            message: "请输入电话号码"
                        },
                        {
                            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                            message: "手机格式不对"
                        }
                    ],
                    pass: [
                        {
                            required: true,
                            trigger: "blur",
                            message: "请输入密码"
                        }
                    ],
                    newPass: [
                        {
                            validator: validatePass,
                            trigger: "blur"
                        }
                    ],
                    checkNewPass: [
                        {
                            validator: validatePass2,
                            trigger: "blur"
                        }
                    ]
                }
            };
        },
        mounted:function(){
            this.getUser()
        },
        methods: {
            //获取个人用户的信息
            getUser() {
                if(store.state.user == null){
                    if(localStorage.getItem("username")){
                        store.commit("getUserInfo", localStorage.getItem("username"))
                    }else{
                        this.$router.push("/login")
                    }
                }
                console.log("store.state.user", store.state.user)
                this.userInfo = store.state.user
            },
            handleClick(){

            },
            //修改密码
            editPassword() {
                console.log(this.userInfo)
                console.log("ruleForm:" ,this.ruleForm)
                if(this.ruleForm.pass === this.userInfo.password){
                    this.userInfo.password = this.ruleForm.newPass
                    console.log(this.userInfo)
                    this.$api.user.updateUser(this.userInfo).then(res => {
                        console.log("res: ",res)
                        if(res.status == 200){
                            this.$store.commit("loginSuccess",this.userInfo)
                        }
                    })
                }else{
                    this.$message({
                        message: '原密码错误',
                        type: 'warning'
                    });
                }
            },
            // 编辑提交的方法
            EditorUser() {
                this.$api.user.updateUser(this.userInfo).then(res => {
                    if(res.status == 200){
                        this.$store.commit("loginSuccess",this.userInfo)
                    }
                })
            }
        }
    };
</script>

<style>
    .myAvatar{
        position: fixed;
        left: 500px;
    }
    .myTab {
        height: 70px;
    }
    el-tabs__nav-wrap {
        height: 60px;
    }
    .el-tabs__nav {
        height: 60px;
    }
    .el-tabs__item.is-top:nth-child(2) {
        position: fixed;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child{
        position: fixed;
        left: 75px;
    }

</style>
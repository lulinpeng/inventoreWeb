<template>
    <div class="login-container">
<!--        <bubbles-effect :options="options"></bubbles-effect>-->
        <el-form ref="form" :model="form" label-width="80px" class="login-form" :rules="rules">
            <h2 class="login-title" style="{position:center}" >进销存管理系统</h2>
            <el-form-item label="账号" class="box">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="box">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
<!--                <el-button type="primary" @click="handleLogout">注销</el-button>-->
<!--                <el-button type="primary" @click="getUserInfo">get</el-button>-->
            </el-form-item>
        </el-form>
    </div>
<!--     <vue-canvas-nest/>-->
</template>


<script>
    // import vueCanvasNest from "vue-canvas-nest";
    // import bubblesEffect from 'vue-canvas-effect'
    import store from "@/store"
    export default {
        name: "Login",
        store,
        data() {
            return {
                form: {
                    username: "admin",
                    password: "123456"
                },
                options: {
                    color: "rgba(225,225,225,0.5)", //Bubble color
                    radius: 15, //Bubble radius
                    density: 0.3, // The larger the bubble density, the greater the density (suggest no more than 1).
                    clearOffset: 0.2 // The larger the bubble disappears [0-1], the longer it disappears.
                },
                rules: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
            };
        },
        components: {
            // vueCanvasNest
            // Bubbles
        },
        methods: {
            handleLogin() {
                console.log("username: " + this.form.username + " password: " +  this.form.password);
                this.$api.user.Login({
                    username: this.form.username,
                    password: this.form.password
                }).then(res => {
                    console.log(res)
                    localStorage.setItem("username",this.form.username)
                    console.log("localStorageUsername: ", localStorage.getItem("username"))
                    // console.log("localStorageTest", localStorage.getItem("password"))
                    // this.$store.commit("getUserInfo",localStorage.getItem("username"))
                    this.$store.dispatch("getUserInfo",this.form.username).then(res => {
                        console.log(res)
                        this.$router.push('/home')
                    })
                    // this.$router.push('/home')
                })
            },
            handleLogout(){
                this.$api.user.logout().then(res => {
                    console.log((res))
                })
            },
            getUserInfo(){
                this.$api.user.getUserInfoByName(this.form.username).then(res => {
                    console.log(res.data.data)
                    store.commit("loginSuccess",res.data.data);
                })
            }
        }
    };
</script>


<style>
    .login-form {
        color: lightskyblue;
        width: 350px;
        /* 居中 */
        margin: 10% auto;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 28px;
        border-radius: 20px;
        /* border: solid 1px black; */
        box-shadow: 0 0 30px 3px rgba(119,118,118,0.33);
    }

    .login-container {
        position: absolute;
        background-color: lightskyblue;
        width: 100%;
        height: 100%;
    }

    .login-title {
        color: #303133;
        text-align: center;
    }

    .cancel {
        margin-left: 80px;
    }

    .box {
        margin-left: 0px;
    }
</style>
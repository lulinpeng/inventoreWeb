<template>
    <div>
        <el-row >
            <el-col :span="24">
                <el-menu
                        router
                        unique-opened
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">

                    <el-submenu v-for="item in menu" :index="item.id" :key="item.id" class="FirstMenu">
                        <template slot="title" >
                            <i :class="item.icon"> </i>
                            <span v-text="item.name" ></span>
                        </template>
                        <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.componentName">
                            <el-menu-item :index="sub.componentName" v-text="sub.name">
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import store from "@/store"
    // import menu from "@/config/menu-config"
    export default {
        name: "NavMenu",
        data(){
            return {
                menu: null
            }
        },
        mounted: function () {
            this.menu = JSON.parse(localStorage.getItem("routerTable"))
            console.log(this.menu)
        },
        methods: {
            handleOpen (key, keyPath) {
                console.log(key, keyPath)
            },
            handleClose (key, keyPath) {
                console.log(key, keyPath)
            }
        }
    }
</script>

<style scoped>

    .el-menu {
        width: 199px;
        height: 100%;
    }
    .body {
        height: 100%;
    }
    .el-row {
        height: 100%;
    }
    .el-col {
        height: 100%;
    }
    .FirstMenu {
        text-align: left;
        margin-left: 0px;
    }
    .over-hide {
        width: auto;
        font-size: 18px;
    }
    .el-submenu .el-menu-item {
        height: 50px;
        line-height: 50px;
        padding: 0 45px;
        min-width: 199px;
    }
    .MyTitle {
        line-height: normal;
        font-size: 12px;
        color: #909399;
        margin-left: 30px;
    }
    .el-menu-item {
        text-align: center;
    }
</style>
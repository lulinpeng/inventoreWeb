<template>
    <div class="default">
        <el-container>
            <el-header style="{height: 75px}"><vheader /></el-header>
            <el-container>
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <navmenu class="default"/>
                </el-aside>
<!--                <el-page-header @back="goBack" content="详情页面">-->
<!--                </el-page-header>-->
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import VHeader from "@/components/Header"
    import NavMenu  from "@/components/NavMenu";
    export default {
        name: "home",
        components: {
            "vheader" : VHeader,
            "navmenu" : NavMenu
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // goBack() {
            //     console.log("go back");
            // }
        }
    }

</script>

<style scoped>
    .el-header{
        background-color: deepskyblue;
        color: #333;
        text-align: left;
        line-height: 60px;
        height: 75px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 100%;
        height: 100%;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
        width: 100%;
        height: 100%;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container {
        height: 100%;
        width: 100%;
    }

    .default {
        width: 100%;
        height: 100%;
    }

    .router-vue {
        height: 100%;
    }

    /*.el-container:nth-child(5) .el-aside,*/
    /*.el-container:nth-child(6) .el-aside {*/
    /*    line-height: 260px;*/
    /*}*/

    /*.el-container:nth-child(7) .el-aside {*/
    /*    line-height: 320px;*/
    /*}*/
</style>
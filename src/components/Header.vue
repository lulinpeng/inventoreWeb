<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="head-wrap" >
                    <i class="el-icon-orange myIcon" /><span class="Name">进销存管理系统</span>
                </div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return {
                circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                size: "large"
            }
        }
    }
</script>

<style scoped>
    .head-wrap {
        font-size: 30px;
        display: inline-block;
        height: 60px;
    }
    i {
        margin-right: 20px;
        size: 30px;
    }
    .Name {
        font-size: 30px;
        vertical-align: center;
        margin-bottom: auto;
        margin-top: auto;
        position: relative;
        top: -9px;
    }
    .myAvatar{
        position: relative;
        align-content: flex-end;
    }
    .el-row {
        height: 60px;
    }
    .el-col {
        height: 60px;
    }
    span {
        margin-bottom: auto;
        margin-top: auto;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: black;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .myIcon{
        position: relative;
        left: 10px;
        bottom: 0px;
        font-size: 50px;
    }
    .myUser{
        display: inline-block;
    }
</style>
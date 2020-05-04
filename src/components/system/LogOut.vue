<template>
    <div>
        <div class="addUser">
            <el-button size="medium" type="danger" class="MyButton" @click="LogOut">  注销   </el-button>
        </div>
    </div>
</template>

<script>
    import store from "@/store"
    export default {
        name: "LogOut",
        methods: {
            LogOut() {
                this.$api.user.logout().then(res => {
                    console.log((res))
                    if(res.status === 200){
                        store.commit("setUser", null)
                        localStorage.removeItem("username")
                        localStorage.removeItem("routerTable")
                        this.$router.push("/login")
                    }
                })
            }
        }
    }
</script>

<style>

</style>
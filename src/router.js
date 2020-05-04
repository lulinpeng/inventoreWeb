import Vue from "vue";
import Router from "vue-router";
// 导入登录组件’
import Login from './views/Login/index.vue'
import NotFoundView from '@/views/NotFound/index.vue'
import Home from '@/views/Home/home'
// import menu from "@/config/menu-config"
import store from '@/store'
Vue.use(Router);

let routes = [
    {
        path: '/',
        name: 'empty',
        redirect: '/login'
    },
    // {
    //     path: '/home',
    //     name: 'home',  //路由名称
    //     redirect: '/UserHome',
    //     component: Home,  //组件对象
    //     children: []
    // },
    {
        path: '/login',
        name: 'login',  //路由名称
        component: Login,  //组件对象
    },
    // {
    //     path: '/login',
    //     name: 'login',  //路由名称
    //     component: Login  //组件对象
    // },
]
let home = [
    {
        path: '/home',
        name: 'home',  //路由名称
        redirect: '/UserHome',
        component: Home,  //组件对象
        children: []
    },
    {
        path: '*',
        name: "default",
        component: NotFoundView
    }
]

let getRoutes = (theMenu) => {
    theMenu.forEach((item) => {
        let url = item.id
        item.sub.forEach((sub) => {
            home[0].children.push({
                path: `/${sub.componentName}`,
                name: sub.componentName,
                component: () => import(`@/components/${url}/${sub.componentName}`)
            })
        })
    });
}

 // getRoutes(menu.admin)

const router = new Router({
    routes:routes
});
 // router.addRoutes(home)
// let flag = false
router.beforeEach((to, from, next) => {
    if(to.name == 'login' || to.name == 'empty'){
        next()
    }
    if(!localStorage.getItem("username") ){
        next('/login')
    }else{
        if(store.state.user === null){
            // store.commit("getUserInfo",localStorage.getItem("username"))
            store.dispatch("getUserInfo",localStorage.getItem("username")).then(res => {
                console.log(res)
                console.log("重新加载路由")
                getRoutes(JSON.parse(localStorage.getItem("routerTable")))
                router.addRoutes(home)
                next()
            })
            // while(!localStorage.getItem("routerTable"))
            //     console.log(store.state.menu)

        }
        next()
    }
})
export default  router
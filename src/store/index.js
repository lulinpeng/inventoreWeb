import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import menu from '@/config/menu-config'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        sessionId: null,
        token: null,
        api: api,
        menu: null,
    },
    mutations: {
        loginSuccess(state, user){
            state.user = user;
            console.log("user: ",user)
        },
        setUser(state, user){
            state.user = user
        },
        setSessionId(id){
            this.sessionId = id;
        },
        getUserInfo(state,username){
             state.api.user.getUserInfoByName(username).then(res => {
                console.log(res.data.data)
                // this.user = res.data.data;
                this.commit("loginSuccess",res.data.data);
                 this.commit("setMenu1");
            })
        },
        setMenu1(state){
            if(state.user){
               if(state.user.roleId === 1){
                   state.menu = menu.admin
               } else if(state.user.roleId === 2){
                   state.menu = menu.sale
               }else if(state.user.roleId === 3){
                   state.menu = menu.purchase
               }else if(state.user.roleId === 4){
                   state.menu = menu.stock
               }else{
                   state.menu = null
               }
            }
            localStorage.setItem("routerTable", JSON.stringify(state.menu))
        }
    },
    actions: {
        setMenu(state){
            if(state.user){
                if(state.user.roleId == 1){
                    state.menu = menu.admin
                } else if(state.user.roleId == 2){
                    state.menu = menu.sale
                }else if(state.user.roleId == 3){
                    state.menu = menu.purchase
                }else{
                    state.menu = menu.stock
                }
            }

            localStorage.setItem("routerTable", JSON.stringify(state.menu))
        },
        getUserInfo(state,username){
            return new Promise(function (resolve,reject) {
                console.log("username:", username)
                console.log(state)
                 state.state.api.user.getUserInfoByName(username).then(res => {
                    console.log(res.data.data)
                    // this.user = res.data.data;
                    if(res){
                        state.commit("loginSuccess",res.data.data);
                        state.commit("setMenu1");
                        // this.$router.push('/home')
                        resolve("success");
                    }else{
                        reject();
                    }
                })
            })
        }
    }
})
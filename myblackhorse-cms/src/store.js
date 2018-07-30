//1.引入vue
import Vue from "vue"
import Vuex from "vuex"
//2.安装插件
Vue.use(Vuex)

const CART_KEY = "cartinfo"

function writeToLocalStorage(cartList){
    localStorage.setItem(CART_KEY,JSON.stringify(cartList));
}

function readFromLocalStorage(){
    let str = localStorage.getItem(CART_KEY) || "[]"
    return JSON.parse(str)
}

//创建store实例
export default new Vuex.Store({
    //state
    state:{
        cartList:readFromLocalStorage()
    },
    mutations:{
        addToCart(state,cart){
            let temp = state.cartList.find(function(v){
                return v.id == cart.id;
            })

            if(temp){
                temp.count += cart.count;
            }else{
                state.cartList.push(cart)
            }
            writeToLocalStorage(state.cartList)
        },
        updateCart(state,goodsList){
            goodsList.forEach(v=>{
                let temp = state.cartList.find(value => value.id == v.id);
                temp.count = v.count
            })
        writeToLocalStorage(state.cartList);
            
        }
    },
    getters:{
        totalCount(state){
            let sum = 0;
            state.cartList.forEach(function(v){
                sum += v.count
            })
            return sum;
        },
        getIds(state){
            //获取所有购物车中的商品的id字符串，用,隔开的
            return state.cartList.map(v => v.id).join(",")
        },
        getCountById(state){
            return function(id){
                var temp = state.cartList.find(v=>v.id == id);
                if(temp) {
                    return temp.count
                }else {
                    return 0
                }
            }
        }
    }
})


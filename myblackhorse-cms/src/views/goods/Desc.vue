<template>
    <div class="page">

        <Info :info="goodsDesc"></Info>

    </div> 
</template>

<script>
import axios from "axios"
import Info from "@/components/Info.vue"
export default {
    components:{
        Info
    },
    data(){
        return {
            goodsDesc:{}
        }
    },
    created(){
        axios({
            url:"http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.query.id
        }).then(res => {
            this.goodsDesc = res.data.message[0]
        })
    }

}
</script>

<style>
    img{
        width: 50%;
        height: 100%;
    }
</style>


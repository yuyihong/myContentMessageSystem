<template>
    <div class="page news">
        <ul class="mui-table-view mui-table-view-chevron">
            <li v-for="(item,index) in newsList" :key="index" class="mui-table-view-cell mui-media">
                <router-link :to="'/news/detail?id=' + item.id" class="mui-navigate-right">
                <!-- 不能加个点 -->
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body mui-ellipsis">
                        {{item.title}}
                        <p class="mui-ellipsis">{{item.zhaiyao}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        axios({
            url:"http://www.liulongbin.top:3005/api/getnewslist"           
        }).then(res => {
            // console.log(res.data.message);
            this.newsList = res.data.message;
        })
    }
}
</script>

<style>
    .news {
        padding: 5px;
    }
</style>


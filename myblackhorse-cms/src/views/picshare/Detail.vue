<template>
  <div class="page news">
    <Info :info="picInfo">
        <!-- <img :src="item.src" alt="" class="thumb" v-for="(item,index) in imgList" :key="index"> -->
        <vue-preview :slides="imgList"></vue-preview>
    </Info>
    <div class="comment">
      <Comment :artid="$route.params.id"></Comment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from '@/components/comment.vue'
import Info from "@/components/Info"

export default {
  data() {
    return {
      picInfo: {},
      imgList:[]
    };
  },
  created() {
    axios({
      //1.获取传入的id
      //2.通过ajax获取新闻数据
      url: "http://www.liulongbin.top:3005/api/getnew/" + this.$route.params.id
    }).then(res => {
      console.log(res.data.message);
      this.picInfo = res.data.message[0];

    });

    axios({
        url:"http://www.liulongbin.top:3005/api/getthumimages/" + this.$route.params.id
    }).then(res => {
     // 先对数据进行加工（添加一些必要的属性）之后，再赋值给imgList
    //  res.data.message.forEach(v => {});
     res.data.message.forEach(v => {
    //    res.data.message.forEach(function(v){
           v.msrc = v.src,
           v.w = 640,
           v.h = 480
       })
        this.imgList = res.data.message
    })
  },
  components:{
      Info,
    Comment
  }
};
</script>

<style>
  .my-gallery figure{
    display: inline;
    margin:0;
  }
  .my-gallery figure a img{
    width: 18%;
    box-shadow: 0 0 3px 0;
  }
</style>
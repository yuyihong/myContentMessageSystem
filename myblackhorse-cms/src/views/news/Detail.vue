<template>
  <div class="page news">
    <Info :info="newsInfo"></Info>
    <div class="comment">
      <Comment :artid="$route.query.id"></Comment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Comment from '@/components/comment.vue'
import Info from "@/components/Info.vue"
export default {
  data() {
    return {
      newsInfo: {}
    };
  },
  created() {
    axios({
      //1.获取传入的id
      //2.通过ajax获取新闻数据
      url: "http://www.liulongbin.top:3005/api/getnew/" + this.$route.query.id
    }).then(res => {
      console.log(res.data.message);
      this.newsInfo = res.data.message[0];
    });
  },
  components:{
    Info,
    Comment
  }
};
</script>

<style>
.news {
  padding: 5px;
}
</style>

<template>
    <div class="page news">
        <div class="news-detail">
            <div class="news-title">
                <h4>{{newsInfo.title}}</h4>
                <p class="news-info">
                    <span>发表时间:{{newsInfo.add_time}}</span>
                    <span class="mui-pull-right">点击： {{newsInfo.click}}次</span>
                </p> <hr></div>
            <div class="news-content" v-html="newsInfo.content">

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newsInfo: {}
    };
  },
  created() {
    axios({
      //获取传入的id
      //
      url: "http://www.liulongbin.top:3005/api/getnew/" + this.$route.query.id
    }).then(res => {
      console.log(res.data.message);
      this.newsInfo = res.data.message[0];
    });
  }
};
</script>

<style>
.news {
  padding: 5px;
}
</style>

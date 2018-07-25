<template>
	<div>
		<h4>发表评论</h4>
		<hr>
		<textarea v-model="content" cols="30" rows="3"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<ul class="mui-table-view">
			<li v-for="(item,index) in commentList" :key="index" class="mui-table-view-cell mui-media">
				<a href="javascript:;">
					<p class="comment-title">
						<span>第{{index + 1}}楼</span>
						<span>发表时间：{{item.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}</span>
						<span class="mui-pull-right">
							{{item.user_name}}
						</span>
					</p>
					<img class="mui-media-object mui-pull-right avatar" src="../assets/images/ym.jpg">
					<div class="mui-media-body">
						<p class="mui-ellipsis comment-content">
							{{item.content}}
						</p>
					</div>
				</a>
			</li>
		</ul>
		<mt-button type="danger" size="large" plain @click="more" :disabled="isNoMoreData">加载更多</mt-button>
	</div>
</template>

<script>
import axios from "axios";
import { Toast } from "mint-ui";
import dateformat from "@/filters/dateformat.js"


export default {
	filters:{
		dateformat	
	},
  data() {
    return {
      commentList: [],
      pageIndex: 1,
      isNoMoreData: false,
      content: ""
    };
  },
  props: ["artid"],
  created() {
    this.getData();
  },
  methods: {
    //封装请求数据的代码
    getData() {
      axios({
        url:
          "http://www.liulongbin.top:3005/api/getcomments/" +
          this.artid +
          "?pageindex=" +
          this.pageIndex
      }).then(res => {
        //将请求回来的 新数据,拼接到旧的数据后面
        console.log(res.data.message);
        this.commentList = this.commentList.concat(res.data.message);

        //判断是否是最后一页
        if (res.data.message.length == 0) {
          this.isNoMoreData = true;
          Toast("没有更多数据了,别点了!");
        }
      });
    },
    more() {
      //让当前页面+1
      this.pageIndex++;
      //重新请求数据
      this.getData();
    },
    postComment() {
    //   alert(this.content);
      axios({
        url: "http://www.liulongbin.top:3005/api/postcomment/" + this.artid,
        method: "post",
        data: { content: this.content }
      }).then(res => {
        if (res.data.status == 0) {
          //   alert("添加成功");
          //当添加成功之后,我们需要将用户添加的内容,给数组最前面查入!
          this.commentList.unshift({
			  user_name:"匿名用户",
			  add_time:new Date(),
			  content:this.content
		  });
		  this.content = ""
        }
      });
    }
  }
};
</script>

<style>
	.avatar {
		border-radius:50%;
	}
</style>

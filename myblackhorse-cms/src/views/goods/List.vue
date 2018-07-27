<template>
    <div class="page goods-list">

        <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
            <!-- <router-link> -->
                <img :src="item.img_url">
                <h4>{{item.title}}</h4>
                <div class="info">
                    <p class="price">
                        <span class="nowPrice">￥{{item.sell_price}}</span>
                        <span>
                            <del>￥{{item.market_price}}</del>
                        </span>
                    </p>
                    <p class="sale">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            <!-- </router-link> -->
        </div>

        <mt-button type="danger"  size="large" plain>加载更多</mt-button>

    </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      goodsList: [],
      pageIndex: 1
    };
  },
  created() {
    axios({
      url:"http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageIndex
    }).then(res => {
      console.log(res.data.message);
      this.goodsList = res.data.message;
    });
  }
};
</script>


<style>
.goods-list {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 3px;
}

.goods-list .goods-item {
  width: 48%;
  border: 1px solid #ccc;
  margin: 1%;
  box-shadow: 0 0 7px #aaa;
  padding: 2px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-color: #eee;
}

.goods-list .goods-item img {
  width: 100%;
}

.goods-list .goods-item h4 {
  font-size: 14px;
}

.goods-list .goods-item .info {
  background-color: #eee;
}

.goods-list .goods-item .info p {
  margin: 0;
  margin-top: 10px;
  font-size: 13px;
}

.goods-list .goods-item .info p:first-child .nowPrice {
  color: red;
  font-size: 15px;
  margin-right: 8px;
}

.goods-list .goods-item .info p:nth-child(2) {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
</style>


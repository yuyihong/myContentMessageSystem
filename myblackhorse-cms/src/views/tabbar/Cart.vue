<template>
  <div class="page">
    <!-- <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in goodsList" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.isChecked"></mt-switch>
            <img :src="item.thumb_path" class="thumb_img">
            <div class="info">
              <h4>{{item.title}}</h4>
              <div class="box">
                <span class="price">￥{{item.sell_price}}</span>
                <numberbox v-model="item.count"></numberbox>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="amount">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">0</span> 件 总价：
              <span class="red">￥0</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div> -->
     <div class="goods-list">
      <div class="mui-card" v-for="(item, index) in goodsList" :key="index">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="item.isChecked"></mt-switch>
            <img :src="item.thumb_path" class="thumb_img">
            <div class="info">
              <h4>{{item.title}}</h4>
              <div class="box">
                <span class="price">￥{{item.sell_price}}</span>
                <numberbox v-model='item.count'></numberbox>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="amount">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{totalCount}}</span> 件 总价：
              <span class="red">￥{{totalPrice}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

// <script>
// import numberbox from "@/components/NumberBox.vue";
// import axios from "axios";

// export default {
//   components: {
//     numberbox
//   },
//   data() {
//     return {
//       goodsList: []
//     };
//   },
//   computed: {
//     totalCount() {
//       let checkedGoods = this.goodsList.filter(v => v.isChecked);
//       var sum = 0;
//       checkedGoods.forEach(v => (sum += v.count));
//       return sum;
//     },
//     totalPrice() {
//       let checkedGoods = this.goodsList.filter(v => v.isChecked);
//       var sum = 0;
//       checkedGoods.forEach(v => {
//         sum += v.sell_price * v.count;
//       });
//       return sum;
//     }
//   },
//   created() {
//     if (this.$store.getters.getIds) {
//       axios({
//         url:
//           "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
//           this.$store.getters.getIds
//       }).then(res => {
//         // console.log(res.data.message)
//         res.data.message.forEach(v => {
//           v.count = this.$store.getters.getCountById(v.id);
//           v.isChecked = false;
//         });
//         this.goodsList = res.data.message;
//       });
//     }
//   },
//   watch: {
//     goodsList: {
//       handler(value) {
//         this.$stote.commit("updateCount", this.goodsList);
//       },
//       deep: true
//     }
//   }
// };
// </script>
<script>
import numberbox from "@/components/NumberBox.vue";
import axios from "axios";
export default {
  components: {
    numberbox
  },
  data() {
    return {
      goodsList: []
    };
  },
  computed: {
    // 获取被选中的商品的总数
    totalCount() {
      let checkedGoods = this.goodsList.filter(v => v.isChecked);
      var sum = 0;
      checkedGoods.forEach(v => (sum += v.count));
      return sum;
    },
    // 获取被选中的商品的总价
    totalPrice() {
      let checkedGoods = this.goodsList.filter(v => v.isChecked);
      var sum = 0;
      checkedGoods.forEach(v => {
        sum += v.sell_price * v.count;
      });
      return sum;
    }
  },
  created() {
    // console.log(this.$store.getters.getIds)
    // 1. 通过vuex提供的getter 获取到了所有的id
    // 2. 通过ajax请求向后台获取购物车页面的商品数据
    if (this.$store.getters.getIds) {
      axios({
        url:
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
          this.$store.getters.getIds
      }).then(res => {
        // 在获取到数据之后，由于数据中没有商品相应的数量
        // 我们需要自己给这个数据中添加数量 count
        // console.log(res.data.message);
        res.data.message.forEach(v => {
          v.count = this.$store.getters.getCountById(v.id);
          // 加上一个是否选中的属性
          v.isChecked = false;
        });

        this.goodsList = res.data.message;
      });
    }
  },
  watch: {
    goodsList: {
      handler(value) {
        // console.log("商品数量发生变化了");
        // 只要数量一发生变化，我们就需要更新vuex中的购物车数据
        // 更新购物车数据，只需要 触发 mutation updateCount
        this.$store.commit("updateCart", this.goodsList);
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.goods-list .mui-card-content-inner {
  display: -ms-flexbox;
  display: flex;
}

.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}

.goods-list .mui-card-content-inner .info {
  -ms-flex: 1;
  flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}

.mui-card-content-inner {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
}
.goods-list .mui-card-content-inner .info .box .price {
  font-size: 14px;
  color: red;
}

.mui-card-content-inner .amount {
  -ms-flex: 1;
  flex: 1;
}

p {
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #8f8f94;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: 700;
}
</style>



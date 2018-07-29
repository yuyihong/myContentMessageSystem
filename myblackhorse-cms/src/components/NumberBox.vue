<template>
  <div class="mui-numbox-cms">
    <button type="button" class="mui-btn mui-btn-numbox-minus-cms" @click="minues">-</button>
    <input type="number" class="mui-input-numbox-cms" v-model="num">
    <button type="button" class="mui-btn mui-btn-numbox-plus-cms" @click="add">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0
    };
  },
  created(){
    this.num = this.value;
  },
  methods:{
    add(){
      this.num += this.step || 1
    },
    minues(){
      this.num -= this.step || 1
    }
  },
  watch: {
    value(value){
      this.num = value
    },
    num(value) {
      if (this.max && this.num > this.max) {
        this.num = this.max;
      }
      if (this.min != undefined && this.num < this.min) {
        this.num = this.min;
      }
      this.$emit("input", this.num);
    }
  },

  props: ["min", "max", "value","step"]
};
</script>

<style>
.mui-numbox-cms {
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 120px;
  height: 35px;
  padding: 0 40px;
  vertical-align: top;
  vertical-align: middle;
  border: 1px solid #bbb;
  border-radius: 3px;
  background-color: #efeff4;
}

.mui-numbox-cms .mui-btn-numbox-minus-cms,
.mui-numbox-cms .mui-numbox-cms-btn-minus {
  left: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.mui-numbox-cms [class*="btn-numbox"],
.mui-numbox-cms [class*="numbox-btn"] {
  font-size: 18px;
  font-weight: 400;
  line-height: 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
  width: 40px;
  height: 100%;
  padding: 0;
  color: #555;
  border: none;
  border-radius: 0;
  background-color: #f9f9f9;
}

.mui-numbox-cms .mui-input-numbox-cms,
.mui-numbox-cms .mui-numbox-cms-input {
  display: inline-block;
  overflow: hidden;
  width: 100% !important;
  height: 100%;
  margin: 0;
  padding: 0 3px !important;
  text-align: center;
  text-overflow: ellipsis;
  word-break: normal;
  border: none !important;
  border-right: 1px solid #ccc !important;
  border-left: 1px solid #ccc !important;
  border-radius: 0 !important;
}
</style>


<template>
  <div>
    <van-row style="margin: 5px;">
      <van-col span="18">
        <van-image src="../../static/logo.png" width="200"></van-image>
      </van-col>
      <van-col span="6">
        <div align="right" margin="10px">
          <van-button icon="wap-nav" type="info" @click="showPopup" />
        </div>
      </van-col>
    </van-row>
    <van-image src="../../static/backgroundpic.png"></van-image>
    <van-popup v-model="show" position="right" :style="{ width: '100%',height:'50%'}">
      <div style="align: center;">
        <van-field-select-picker label="工程分类" placeholder="请选择" v-model="value1" :columns="columns1" />
        <van-field-select-picker label="标准等级" placeholder="请选择" v-model="value2" :columns="columns2" />
        <van-field-select-picker label="省份/城市" placeholder="请选择" v-model="value3" :columns="columns3" />
      </div>
      <div style="text-align: right; margin: 10px; margin-right: 20px;">
        <van-button type="info" size="small" @click="selectItems">确定</van-button>
        <van-button type="info" size="small" @click="clearItems">重置</van-button>
      </div>

    </van-popup>

    <div style="margin: 5px;">
      <van-icon name="location-o">当前位置</van-icon>

    </div>
    <div v-for="item in items">
      <van-cell>
        <template slot="title">
          <span class="custom-title">{{item.business}}-{{item.name}}</span><br />
          <span style="color: darkgray;">创建时间：{{item.date}}</span>

        </template>
        <div style="text-align: right;margin-right: 10px;">
          <van-tag type="primary" plain>{{item.class}}</van-tag><br />
          <van-button round type="info" size="mini" @click="selectAsCompare(item)">选择为对比项</van-button>
        </div>
      </van-cell>
    </div>
  </div>

</template>

<script>
  export default {
    name: "StandardList",
    data() {
      return {
        standardList:[],
        items: [],
        compareItems:[],
        show_border: true,
        show: false,
        value1: '',
        value2: '',
        value3: '',
        columns1: [],
        columns2: [],
        columns3: []
      }
    },
    methods: {
      showPopup() {
        this.show = true;
      },
      getList() {
        this.axios.get('http://localhost:8080/static/list.json').then((response) => {
          this.standardList = this.items = response.data;
        })
        this.axios.get('http://localhost:8080/static/businessData.json').then((response) => {
          this.columns1 = response.data;
        })
        this.axios.get('http://localhost:8080/static/classData.json').then((response) => {
          this.columns2 = response.data;
        })
        this.axios.get('http://localhost:8080/static/province.json').then((response) => {
          this.columns3 = response.data;
        })
      },
      selectItems() {
         this.show = false
         var newItems = []
         for (var item of this.standardList) {
           if(this.value1 == item.business && this.value2 == item.class
           || this.value1 == '' && this.value2 == item.class
           || this.value1 == item.business && this.value2 == '')
           newItems.push(item)

         }
         this.items = newItems
      },
      clearItems(){
        this.value1 = this.value2 = this.value3 = ''
        this.items = this.standardList
      },
      selectAsCompare(item){
        this.compareItems.push(item)
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>

</style>

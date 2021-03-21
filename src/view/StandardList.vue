<template>
  <div>
    <van-row style="margin: 5px;">
      <van-col span="18">
        <van-image src="../../static/logo.png" width="200"></van-image>
      </van-col>
      <van-col span="6">
        <div align="right" margin="10px">
          <van-button icon="wap-nav" type="info" @click="showPopup"/>
        </div>
      </van-col>
    </van-row>
    <van-image src="../../static/backgroundpic.png"></van-image>
    <!-- 筛选弹窗 -->
    <van-popup v-model="show" position="right" :style="{ width: '100%',height:'50%'}">
      <div style="align: center;">
        <van-field-select-picker label="工程分类" placeholder="请选择" v-model="value1" :columns="columns1"/>
        <van-field-select-picker label="标准等级" placeholder="请选择" v-model="value2" :columns="columns2"/>
        <van-field-select-picker label="省份/城市" placeholder="请选择" v-model="value3" :columns="columns3"/>
      </div>
      <div style="text-align: right; margin: 10px; margin-right: 20px;">
        <van-button type="info" size="small" @click="selectItems">确定</van-button>
        <van-button type="info" size="small" @click="clearItems">重置</van-button>
      </div>

    </van-popup>
<!-- 已选合并文档弹窗 -->
    <van-popup v-model="showMerge" position="right" :style="{ width: '100%',height:'50%'}">
      <div 
        v-for="item in selectedList"
        style="
          margin-top:50px;
          margin-buttom:10px;
          margin-left:20px;">
        {{item.name}}
        <van-button style="margin-left:30px;"type="info" size="small" @click="cancelCompare(item)">删除</van-button>
      </div>
      <van-button 
        v-if="showMerge && selectedList.length > 1"
        type="info"
        style="
            position:fixed; 
            bottom:0px; 
            width:100%;"
        @click="toMerge"
        color="#02A7F0">
        查看对比报告
      </van-button>
    </van-popup>

    <div style="margin: 5px;">
      <van-icon name="location-o">当前位置</van-icon>

    </div>
    <div v-for="item in items">
      <van-cell>
        <template slot="title">
          <span class="custom-title" @click="toDetail(item)">{{ item.business }}-{{ item.name }}</span><br/>
          <span style="color: darkgray;">创建时间：{{ item.date }}</span>

        </template>
        <div style="text-align: right;margin-right: 10px;">
          <van-tag type="primary" plain>{{ item.class }}</van-tag>
          <br/>
          <van-button v-if="item.isSelected == false" round type="info" size="mini" @click="selectAsCompare(item)" :disabled="item.isSelected">选择为对比项</van-button>
          <van-button v-if="item.isSelected == true" round type="info" size="mini" @click="cancelCompare(item)" :disabled="!item.isSelected">取消对比</van-button>
        </div>
      </van-cell>
    </div>
    <div style="height:50px;"></div>
    <van-button 
        v-if="selectedList.length > 0 && !showMerge"
        type="info"
        style="
            position:fixed; 
            bottom:0px; 
            width:100%;"
        @click="showMergeList"
        color="#02A7F0">
        已选
    </van-button>
  </div>

</template>

<script>
export default {
  name: "StandardList",
  data() {
    return {
      standardList: [],
      items: [],
      compareItems: [],
      show_border: true,
      show: false,
      showPicker: false,
      showMerge:false,
      value1: '',
      value2: '',
      value3: '',
      columns1: [],
      columns2: [],
      columns3: [],
      classList:"",
      businessList:"",
      provinceList:"",
      cityList:""
    }
  },
  computed:{
    selectedList : function(){
      var resultList = []
      for(var i = 0 ; i < this.standardList.length ; i ++){
        if(this.standardList[i].isSelected){
          var tempjson = {
            "id":this.standardList[i].id,
            "name":this.standardList[i].name
          }
          resultList.push(tempjson)
        }
      }
      return resultList
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // onConfirm(value) {
    //   this.showPicker = false;
    // },
    showPopup() {
      this.show = true;
    },
    getList() {
      var that = this
      //获取所有行业类型信息
      this.axios.get('http://localhost:8086/api/business/getBusiness').then((response) => {
        if(response.data.code != 200){
          that.businessList = response.data.BusinessData;
          for (var i = 0 ; i < that.businessList.length ; i ++){
            that.columns1.push(that.businessList[i].name)
          }
        }else{
          alert("获取行业类型信息失败")
          console.log("获取行业类型信息失败")
        }

      })
      //获取所有工程分类信息
      this.axios.get('http://localhost:8086/api/class/getAllClasses').then((response) => {
        if(response.data.code != 200){
          this.classList = response.data.result;
          for(var i = 0 ; i < this.classList.length ; i ++){
            this.columns2.push(this.classList[i].name)
          }
        }else{
          alert("获取标准分类信息失败")
          console.log("获取标准分类信息失败")
        }
      })
      //获取所有 省份 和 城市 信息
      this.axios.get('http://localhost:8086/api/location/getLoc').then((response) => {
        if(response.data.code != 200){
          this.provinceList = response.data.provs;
          this.cityList = response.data.allCities;
          for(var i = 0 ; i < this.provinceList.length ; i ++){
            var temp = []
            for(var j = 0 ; j <this.cityList.length ; j ++){
              if(this.cityList[j].prov == this.provinceList[i].value){
                var tempjson = {
                  "text":this.cityList[j].label
                }
                temp.push(tempjson)
              }
            }
            var locjson = {
              "text":this.provinceList[i].value,
              "children": temp
            }
            this.columns3.push(locjson)
          }
        }else{
          alert("获取地区列表失败")
          console.log("获取地区列表失败")
        }
      })
      //获取所有的场景标准信息
      this.axios.get('http://localhost:8086/api/standard/getAll').then((response) => {
        if(response.data.code != 200){
          // this.standardList = this.items = response.data.result;
          var tempList = response.data.result
          for(var i = 0 ; i < tempList.length ; i ++){
            for(var j = 0 ; j < this.classList.length ; j ++){
              if(this.classList[j].id == tempList[i].class_id){
                tempList[i].class = this.classList[j].name
              }
            }
            for(var j = 0 ; j < this.businessList.length ; j ++){
              if(this.businessList[j].id == tempList[i].business_id){
                tempList[i].business = this.businessList[j].name
              }
            }
            for(var j = 0 ; j < this.provinceList.length ; j ++){
              if(this.provinceList[j].id == tempList[i].province_id){
                tempList[i].province = this.provinceList[j].label
              }
            }
            for(var j = 0 ; j < this.cityList.length ; j ++){
              if(this.cityList[j].id == tempList[i].city_id){
                tempList[i].city = this.cityList[j].label
              }
            }
            tempList[i].isSelected = false
          }
          this.standardList = this.items = tempList
        }else{
          alert("拉取场景标准列表失败")
          console.log("拉取场景标准列表失败")
        }
      })
    },
    selectItems() {
      this.show = false
      var newItems1 = []
      for (var item of this.standardList) {
        if (this.value1 == item.business && this.value2 == item.class
          || this.value1 == '' && this.value2 == item.class
          || this.value1 == item.business && this.value2 == ''
          || this.value1 == '' && this.value2 == '')
          newItems1.push(item)
      }
      var newItems2 = []
      if(this.value3 != ''){
        var arr = this.value3.split(',')
        var province = arr[0]
        var city = arr[1]
        for (var item of newItems1) {
          if (province == item.province && city == item.city)
            newItems2.push(item)
        }
        this.items = newItems2
      }else{
        this.items = newItems1
      }

    },
    clearItems() {
      this.value1 = this.value2 = ''
      this.value3 = ''
      this.items = this.standardList
    },
    selectAsCompare(item) {
      for(var i = 0 ; i < this.items.length; i ++){
        if(this.items[i].id == item.id){
          this.items[i].isSelected = true;
        }
      }
      for(var i = 0 ; i < this.standardList.length; i ++){
        if(this.standardList[i].id == item.id){
          this.standardList[i].isSelected = true;
        }
      }
    },
    cancelCompare(item){
      for(var i = 0 ; i < this.items.length; i ++){
        if(this.items[i].id == item.id){
          this.items[i].isSelected = false;
        }
      }
      for(var i = 0 ; i < this.standardList.length; i ++){
        if(this.standardList[i].id == item.id){
          this.standardList[i].isSelected = false;
        }
      }
    },
    toDetail(item){
      this.$router.push({
        name: 'DetailPage',
        params:{
          id:item.id,
          date:item.date,
          class:item.class
          }})
    },
    showMergeList(){
      this.showMerge = true
    },
    toMerge(){
      var idlist = []
      for(var i = 0 ; i < this.selectedList.length; i ++){
        idlist.push(this.selectedList[i].id)
      }
      this.$router.push({
        name: 'MergePage',
        params:{idlist:idlist}})
    }
  },
}
</script>

<style scoped>

</style>

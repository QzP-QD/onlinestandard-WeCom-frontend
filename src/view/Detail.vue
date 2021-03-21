<template>
  <div>
    <div style="
                  height:70px;
                  line-height:13px;
                  margin-left:10px;
                  font-size:15px;">
      <p style="width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size:18px;line-height:19px;">{{standardDetial.name}}</p>
      <p style="color:#07C160;">{{this.class}}</p><!-- {{standardDetial.type}} -->
      <p style="color:#C8C9CC;">创建时间：{{date}}</p><!-- {{standardDetial.time}} -->
    </div>

    <div v-for="(itemclass, index) in classes" :key="index" style="margin-top:15px; margin-left: 15px; margin-right: 15px;">
      <div style="
                      line-height:40px;
                      height:40px;
                      text-align:left;
                      font-weight:700;">
        【{{itemclass}}】
      </div>
      <div v-for="(item, index1) in itemsInClass(itemclass)" style="
                      display:flex;
                      border-style:solid;
                      border-width:1px;
                      border-color:#797979;
                      height:auto;
                      line-height:30px;
                      text-align:left;
                      padding-left:10px;"
        :key="index1">
        <div style="width: 85%;">
          {{index1 + 1}}. {{item.detial}}
        </div>
        <div style="margin-left: 10px; text-align:center;height:60px;width:60px;line-height:3px;" v-if="item.requested === false">
          <p style="color: #07C160;font-size: 15px; margin-top: 10px;"  v-if="item.requested === false">可选</p>
          <van-button round type="info" size="mini"  v-if="item.property_related === true"
          @click="equipInfo(item.equip_name,item.property_name, item.property_type,item.value_1,item.value_2)">设备详情</van-button>
        </div>
      </div>
    </div>

    <van-dialog v-model="show" title="设备详情">
      <div style="margin-top: 30px;margin-bottom: 30px;margin-left: 10%;">
          设备名称：{{tequip_name}}<br/><br/>
          属性名称：{{tproperty_name}}<br/><br/>
          <div v-if="tproperty_type === 1">
            属性值：{{tvalue_1}}<br/>
          </div>
          <div v-if="tproperty_type === 2">
            属性值：{{tvalue_1}} ~ {{tvalue_2}}<br/>
          </div>
      </div>

    </van-dialog>

  </div>
</template>

<script>
  export default {
    name: "Detail",
    data() {
      return {
        colors: ["#D7D7D7", "#FFFFFF"],
        standardDetial: {},
        Prepared: [],
        activeBusiness: '',
        chosen: '',
        classes: [],

        //用于展示设备详情
        show: false,
        tequip_name: '',
        tproperty_name: '',
        tproperty_type: '',
        tvalue_1: '',
        tvalue_2:'',

        //用于接收标准的类型与创建时间
        date:'',
        class:''
      }
    },
    mounted() {
      var id = this.$route.params.id
      this.date = this.$route.params.date
      this.class = this.$route.params.class
      var that = this
      that.getStandard(id) //101替换为标准的id
    },
    methods: {
      getStandard(mydata) {
        var that = this
        this.axios({
          method: 'get',
          params: {
            standardID: mydata // 传到后台待查询数据
          },
          url: 'http://localhost:8086/api/standard/getDetail'
        }).then(function(response) {
          if (response.data.code == 200) {
            alert("获取场景标准信息失败")
          } else {
            that.standardDetial = response.data.standardDetial
            that.standardDetial.chosen = mydata.chosen
            that.chosen = that.standardDetial.chosen
            that.Prepared = mydata.standardPrepared

            that.classes = []
            for (var item of that.standardDetial.items) {
              if (that.classes.indexOf(item.first_level) === -1) {
                that.classes.push(item.first_level)
              }
            }
            that.classes = that.classes.sort()
          }
        })
      },
      itemsInClass(itemclass) {
        var temp = []
        for (var item of this.standardDetial.items) {
          if (item.first_level === itemclass)
            temp.push(item)
        }
        return temp
      },
      equipInfo(equip_name,property_name,property_type,value_1,value_2){
        this.tequip_name = equip_name;
        this.tproperty_name = property_name;
        this.tproperty_type = property_type;
        this.tvalue_1 = value_1;
        this.tvalue_2 = value_2;
        this.show = true;
      }
    }
  }
</script>

<style scoped>

</style>

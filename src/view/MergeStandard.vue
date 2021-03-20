<template>
<div>
    <van-image
        style="
            width:547;
            height:80px;"
        src="../../static/logo.png"
    />    
    <div id="exportPdf" ref="exportPdf">
    
        <h3 
            style="margin-left:20px;">
            合并标准文档
        </h3>

        <div
            v-for="(firstl, index1) in firstLevels"
            :key=index1>
            <h4 style="margin-left:20px;">【{{firstl}}】</h4>
            <div 
                v-for="(secondl, index2) in secondLevels[index1]"
                style="
                    font-size:13px;
                    margin-left:20px;
                    margin-right:20px"
                :key=index2>
                {{secondl}}：
                <div style="height:10px;"></div>
                <div
                    v-for="(item,index3) of items"
                    :key=index3>
                    <div
                        style="
                            display:flex;
                            border-style:solid;
                            font-size:10px;
                            border-width:1px;
                            border-color:#797979;
                            height:auto;
                            line-height:19px;
                            text-align:left;
                            padding-left:10px;"
                        :style="{background:colors[1]}"
                        v-if="item.first_level === firstl && item.second_level === secondl">
                        [{{item.standard_name}}]：{{item.detial}}
                    </div>
                </div>
            </div>
        </div>
        <div style="height:70px;">
        </div>
    </div>

    <van-button 
        type="info"
        style="
            position:fixed; 
            bottom:0px; 
            width:100%;"
        color="#02A7F0">
        下载文件
    </van-button>
</div>
</template>

<script>
export default {
    name:"MergeStandard",
    data(){
        return{
            colors:["#D7D7D7","#FFFFFF"],
            names:[],
            mylist:[],
            items:[],
            firstLevels:[],
            secondLevels:[]
        }
    },
    mounted(){
        // this.$router.push({name:'MergePage',params:{mylist:idlist}}); 从其他页面跳转过来 并 获取id列表
        this.mylist = this.$route.params.mylist

        this.getStandards()
    },
    methods:{
        getStandards(){
            const qs = require('qs');   //list序列化
            var that = this
            this.axios({
                method:'get',
                // method: 'post',
                // data: this.mylist,
                // paramsSerializer: function(params) {
                //     return qs.stringify(params, { arrayFormat: 'repeat' })
                // },
                // url: 'http://localhost:8080/api/standard/MergePage'
                url:'http://localhost:8080/static/mergestandard.json'
            }).then(function (response) {
                if(response.data.code == 200){
                    alert("获取合并标准信息失败")
                }else{
                    that.items = response.data.items;
                    that.names = response.data.names;
                    for(var i = 0 ; i < that.items.length ; i ++){
                        var temp = that.items[i].first_level
                        if( that.firstLevels.indexOf(temp) == -1){
                            that.firstLevels.push(temp)
                        }
                    }

                    for(var i = 0 ; i < that.items.length ; i ++){
                        var tempFirst = that.items[i].first_level
                        var tempSecond = that.items[i].second_level
                        for(var j = 0 ; j < that.firstLevels.length ; j ++){
                            if(tempFirst == that.firstLevels[j]){
                                if(that.secondLevels.length < j+1){
                                    var templist = []
                                    that.secondLevels.push(templist)
                                }

                                if(that.secondLevels[j].indexOf(tempSecond) == -1){
                                    that.secondLevels[j].push(tempSecond)
                                }
                            }
                        }
                    }
                }
        })

        },
        downloadFile(){
            var filename =''
            filename += "合并文档"
            for(var i = 0 ; i < this.names.length ; i ++){
                filename += "《"
                filename += this.names[i]
                filename += "》"
            }
            this.$PDFSave(this.$refs.exportPdf, filename);

        },
        jumpToMainPage(){
            this.$router.push({name:'MainPage',params:{}});
        }
    }
}
</script>

<style scoped>

</style>
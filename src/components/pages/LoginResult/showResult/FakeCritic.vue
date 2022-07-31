<template>
    <div>
      <!--{{this.criticData}}-->
      <br>
      <div style="float: left;">
        <Table border :columns="columns1" :data="data1" style="width: 600px"></Table>
      </div>
      <div style="float: right;text-align: center">
        <div id="myChart5" style="width: 500px;height:500px;margin: auto" ></div>
      </div>

    </div>
</template>

<script>
  import 'echarts-wordcloud'
    export default {
    props:['resultData'],
        name: "FakeCritic",
      data(){
        return {
          msg:'000',
          result:[],
          critic:[],
          dateCount:[],
          criticData:[],

          columns1: [
            {
              title: 'ID',
              key: 'CriticID',
              width: '120px',
            },
            {
              title: '昵称',
              key: 'CriticName',
              width: '100px',
            },
            {
              title: '性别',
              key: 'CriticSex',
              width: '80px',
            },
            {
              title: '总评次数',
              key: 'CommentCount',
            },
            {
              title: '原因',
              key: 'reason',
            },
            {
              title: '评论频率',
              key: 'commentRate',
              render:(h,params)=>{
                return h('Button',{
                  props:{
                    value:params.row.status,
                  },
                  on:{
                    click:()=>{
                      this.show(params.row.CriticID);
                    }
                  }
                },'查看')

            }
            },
          ],
          data1:[],
          data :[],
          dateList:[],
          valueList:[],
      }
      },
      mounted(){
      setTimeout(()=>{
        this.result=this.resultData[0].FakeCritic;
      // for(let item in this.result){
      //   this.critic.push(this.result[item].CriticID);
      //   this.dateCount.push(this.result[item].DateCount);
      // }
      console.log(this.result);
      for(let item in this.result){
        this.$http.get('api/criticSearch',{
          params:{CriticID:this.result[item].CriticID}
        }).then((res)=>{
          // console.log('reason',this.critic[item].reason);
          // res.data[0].DateCount=JSON.parse(res.data[0].DateCount);
          // res.data[0].reason=this.reason[item];
          this.criticData.push(res.data[0]);
          console.log('criticData',this.criticData);
        })
      }
      },2000);
      this.data1=this.criticData;
      },
      methods:{
        show(t){
          this.dateList=[];
          this.valueList=[];
          // console.log('data',this.data);
          console.log('t',t);
          for(let item in this.result){
            if(this.result[item].CriticID===t){
              console.log('id',this.result[item].CriticID);
              for(let m in this.result[item].DateCount){
                this.dateList.push(this.result[item].DateCount[m].time);
                this.valueList.push(this.result[item].DateCount[m].count);
              }
            }
          }
          console.log('datelist',this.dateList);
          console.log('valuelist',this.valueList);
          // let dateList = this.data.map(function (item) {
          //   return item[0];
          // });
          // let valueList = this.data.map(function (item) {
          //   return item[1]+parseInt(t);
          // });
          const  myChart5 = this.$echarts.init(document.getElementById('myChart5'));
          myChart5.setOption({
            visualMap: [{
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max: 400
            }],
            title: [{
              left: 'center',
              text: '评论频率',

            }],
            tooltip: {
              trigger: 'axis'
            },
            toolbox: {
              show: true,
              feature: {
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: [{
              data: this.dateList,
            }],
            yAxis: [{
              splitLine: {show: false}
            }],
            // grid: [{
            //   bottom: '10%'
            // }],
            series: [{
              type: 'line',
              showSymbol: false,
              data: this.valueList,
              markPoint: {
                data: [
                  {type: 'max', name: 'MAX'},
                ]
              },
            }],
            dataZoom: [{
              type: 'inside',
              start:0,
              end: 50
            }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
          })
        }
      }
    }
</script>

<style scoped>

</style>

<template>
<div>
  <div id="myChart4" style="width:700px;height:500px;margin: auto" ></div>
</div>
</template>

<script>
  import 'echarts-wordcloud'
    export default {
    props:['resultData'],
        name: "SentimentTrend",
      data(){
      return {
        data1:[],
        time:[],
        positive:[],
        negative:[],
      }
      },
      mounted(){
      setTimeout(()=>{
      this.data1=this.resultData[0].Mood;

      for(let item in this.data1){
        // console.log(item);
        this.time.push(this.data1[item].time);
        this.positive.push(this.data1[item].positive);
        this.negative.push(this.data1[item].negative);
      }
      console.log(this.time,this.positive,this.negative);
        let myChart4 = this.$echarts.init(document.getElementById('myChart4'));
        myChart4.setOption({
          title: {
            text: '情感走势曲线',
            // subtext: '纯属虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['Positive','Negative']
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
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: this.time
          },
          yAxis: {
            type: 'value',
            name: '篇数',
            axisLabel: {
              formatter: '{value} '
            }
          },
          series: [
            {
              name:'Positive',
              type:'line',
              data:this.positive,
              markPoint: {
                data: [
                  {type: 'max', name: 'MAX'},
                  {type: 'min', name: 'MIN'}
                ]
              },
            },
            {
              name:'Negative',
              type:'line',
              data:this.negative,
              markPoint: {
                data: [
                  {type: 'max', name: 'MAX'},
                  {type: 'min', name: 'MIN'}
                ]
              },
            }
          ],
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
        });
      },2000);
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>

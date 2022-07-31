<template>
<div>
  <!--<Button type="primary" @click="start">开始生成</Button>-->
  <div id="myChart2" style="width: 600px;height:500px;margin: auto"></div>
  <!--<div id="myChart2" style="width: 600px;height:500px;margin: auto" v-show="show2"></div>-->
</div>
</template>

<script>
  import 'echarts-wordcloud'
    export default {
        name: "WordCloud",
      props:['resultData'],
      data(){
      return{
        // positive:[],
        // negative:[],
        data1:[],
        }
      },
      mounted(){
        setTimeout(()=>{
        this.data1 = this.resultData[0].Keyword.positive;
        console.log('data1',this.data1);
        let option2 = {
          title: {
            text: '正向关键词词云',//标题

          },
          // backgroundColor: 'white',
          tooltip: {
            show: true
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {readOnly: false},
              saveAsImage: {}
            }
          },
          series: [{
            name: '热点分析',//数据提示窗标题
            type: 'wordCloud',
            sizeRange: [20, 60],//画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [-45, 90],//数据翻转范围
            //shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              // minFontSize:15,
              // maxFontSize:20
            },
            textStyle: {
              normal: {
                color: function () {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')';
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.data1
          }]
        };
        const myCharts = this.$echarts.init(document.getElementById('myChart2'));
        myCharts.setOption(option2);
        },2000);
      },
      methods: {
      },
    }
</script>

<style scoped>

</style>

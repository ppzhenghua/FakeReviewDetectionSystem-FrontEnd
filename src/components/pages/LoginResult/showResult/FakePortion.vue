<template>
<div>
  <div id="myChart3" style="width: 500px;height:500px;margin: auto" ></div>
</div>
</template>

<script>
  import 'echarts-wordcloud'
    export default {
        name: "FakePortion",
      props:['resultData'],
      data(){
        return{
          allNum:0,
          fakeNum:0,
          realNum:0
        }
      },
      mounted(){
        setTimeout(()=>{
        this.allNum=this.resultData[0].CommentNum;
        this.fakeNum=this.resultData[0].FakePro;
        this.realNum=this.allNum-this.fakeNum;
        console.log(this.allNum,this.fakeNum,this.realNum);
        const myCharts3 = this.$echarts.init(document.getElementById('myChart3'));


        let option = {
          title: [{
            left: 'left',
            text: '虚假评论、真实评论数量'
          }],
          tooltip : {
            formatter:'{c}%',
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            // orient:'vertical',
            y: 'bottom',
            x: 'center',
            data:['全部评论','真实评论','虚假评论']
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          xAxis : [
            {
              type : 'category',
            }
          ],
          yAxis : [
            {
              type : 'value',
              name : '篇数'
            }
          ],
          series : [
            {
              name:'全部评论',
              type:'bar',
              data:[this.allNum],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  formatter:"{a}:{c}篇",
                }
              },
            },
            {
              name:'真实评论',
              type:'bar',
              stack: '广告',
              data:[this.realNum],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  formatter:"{a}:{c}篇",
                }
              },
            },
            {
              name:'虚假评论',
              type:'bar',
              stack: '广告',
              data:[this.fakeNum],
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  formatter:"{a}:{c}篇",
                }
              },
            },
          ]
        };
        myCharts3.setOption(option);
          },2000);
      },
      methods:{

      }
    }
</script>

<style scoped>

</style>

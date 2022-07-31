<template>
  <div>
    <div id="myChart3_2" style="width:800px;height:500px;margin: auto" ></div>
    <!--<div id="myChart2_2" style="width:600px;height:500px;margin: auto" ></div>-->
  </div>
</template>

<script>
  export default {
    name: "FakePortion2",
    props:['resultData'],
    data(){
      return{
        allNum:0,
        fakeNum:0,
        realNum:0
      }
    },
    mounted() {
      setTimeout(()=> {
        this.allNum = this.resultData[0].CommentNum;
        this.fakeNum = this.resultData[0].FakePro;
        this.realNum = this.allNum - this.fakeNum;
        console.log(this.allNum, this.fakeNum, this.realNum);
        const myCharts3_2 = this.$echarts.init(document.getElementById('myChart3_2'));
        let option = {
          title: {
            text: '虚假评论占比',
            // subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['真实评论', '虚假评论'],
            textStyle:{
              fontWeight: 300,
              fontSize: 16,
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          series: [
            // {
            //   name: '半径模式',
            //   type: 'pie',
            //   radius: [20, 110],
            //   center: ['25%', '50%'],
            //   roseType: 'radius',
            //   label: {
            //     show: false
            //   },
            //   emphasis: {
            //     label: {
            //       show: true
            //     }
            //   },
            //   data: [
            //     {value: this.realNum, name: '真实评论'},
            //     {value: this.fakeNum, name: '虚假评论'},
            //   ]
            // },
            {
              name: '虚假评论占比',
              type: 'pie',
              radius: [30, 110],
              center: ['50%', '50%'],
              roseType: 'area',
              label: {
                formatter:'{b} : {d}%',
                textStyle:{
                  fontSize:18
                }
              },
              data: [
                {value: this.realNum, name: '真实评论'},
                {value: this.fakeNum, name: '虚假评论'},
              ]
            }
          ]
        };

        myCharts3_2.setOption(option);
      },2000);
    },
  }
</script>

<style scoped>

</style>

<template>
<div>
  <div id="myChart2_1" style="width:600px;height:500px;margin: auto" ></div>
  <!--<div id="myChart2_2" style="width:600px;height:500px;margin: auto" ></div>-->
</div>
</template>

<script>
    export default {
        name: "StarPortion",
      props:['resultData'],
      data(){
        return{
          data1:[],
        }
      },
      mounted() {
      //     setTimeout(()=>{
      //
      //   let myChart2_2 = this.$echarts.init(document.getElementById('myChart2_2'));
      //   myChart2_2.setOption({
      //     series: [{
      //       name: '访问来源',
      //       roseType: 'angle',
      //       type: 'pie',
      //       radius: '55%',
      //       hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
      //       fontSize: 20,
      //       data: [{value: 235, name: '一星'},
      //         {value: 274, name: '二星'},
      //         {value: 310, name: '三星'},
      //         {value: 335, name: '三星半'},
      //         {value: 450, name: '四星'},
      //         {value: 200, name: '四星半'},
      //         {value: 300, name: '五星'},
      //       ]
      //     }],
      //     tooltip: {
      //       formatter: '{b} : {c}——{d}%',// 默认值null，内容格式器
      //     },
      //     legend: {
      //       y: 'bottom',
      //       x: 'center',
      //       data: ['一星', '二星', '三星', '三星半', '四星', '四星半', '五星']
      //     },
      //     itemStyle: {
      //       emphasis: {
      //         shadowBlur: 200,
      //         shadowColor: 'rgba(0, 0, 0, 5)'
      //       }
      //     },
      //   });
      //
      // },2000);
        },
      methods:{
          start(e){
            if(e==='fake')
              this.data1=this.resultData[0].StarPro.fake;
            if(e==='real')
              this.data1=this.resultData[0].StarPro.real;
            console.log('fake',this.data1);
            let myChart2_1 = this.$echarts.init(document.getElementById('myChart2_1'));
            myChart2_1.setOption({
              title: {
                text: '全部评论星级占比',
              },
              series: [{
                name: 'Starportion',
                // roseType: 'angle',
                type: 'pie',
                radius: '65%',
                // minAngle:5,
                hoverAnimation: true, // 是否开启 hover 在扇区上的放大动画效果
                label: {
                  "normal": {
                    "show": true,
                    "textStyle": {
                      "fontSize": 20
                    }
                  }
                },
                  data: this.data1,
              }],
              toolbox: {
                show: true,
                feature: {
                  dataView: {readOnly: false},
                  saveAsImage: {}
                }
              },
              tooltip: {
                formatter: '{b} : {c}——{d}%',// 默认值null，内容格式器
              },
              legend: {
                y: 'bottom',
                x: 'center',
                data: ['0.5', '1.0','1.5','2.0','2.5', '3.0', '3.5', '4.0', '4.5', '5.0'],
                textStyle:{
                  fontWeight: 300,
                  fontSize: 16,
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 5)'
                }
              },
            });
          }
      }
    }
</script>

<style scoped>

</style>

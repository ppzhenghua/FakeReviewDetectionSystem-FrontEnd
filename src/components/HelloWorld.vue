<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ info }}</h2>
    <input type="button" @click="get()" value="点我异步获取数据(Get)">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      info:'00',
    }
  },
  // mounted () {
  //   this.axios
  //     .get('https://www.runoob.com/try/ajax/json_demo.json')
  //     .then(response => (this.info = response))
  //     .catch(function (error) { // 请求失败处理
  //       console.log(error);
  //     });
  // },
  methods:{
    get:function(){
      //发送get请求
      this.axios.get('https://www.runoob.com/try/ajax/json_demo.json').then(function(res){
        this.info = res;
        this.info='11';
      },function(){
        console.log('请求失败处理');
        this.info='22';
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

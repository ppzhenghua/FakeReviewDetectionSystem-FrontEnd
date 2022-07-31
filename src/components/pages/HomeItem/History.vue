<template>
  <div>
    <List item-layout="vertical" style="margin:0 20px 0">
      <ListItem v-for="item in nowData" :key="item.ResultNum" style="text-align: left;padding-left: 10%;background-color:aliceblue;margin-bottom: 10px">
        <!--<ListItemMeta :title="item.ResultNum" :description="item.StoreInfo.StoreName" style="text-align: left; margin-left: 10%" />-->
        <li style="font-size: 17px;">
          <h3>#{{item.ResultNum}}</h3>
        </li>
        <li style="font-size: 17px">
            <h4><Icon type="md-at" size="20"/>店铺：{{item.StoreInfo.StoreName}}
              <Rate show-text allow-half v-model="item.StoreInfo.Star" style="margin-left: 20%">
                <span style="color: #f5a623;">{{ item.StoreInfo.Star }}</span></Rate></h4>
            ID：{{item.StoreInfo.StoreID}}
          </li>
          <li>
            <Icon type="md-arrow-dropright" size="20"/>总评论数：{{item.StoreInfo.Num}}
            <Icon type="md-arrow-dropright" size="20"/>抓取评论数：{{item.CommentNum}}
            <Icon type="md-arrow-dropright" size="20"/>虚假评论占比：{{item.Pro}}%
          </li>
          <li>

            <Icon type="md-arrow-dropright" size="20"/>评分：{{item.StoreInfo.Score}}
            <Icon type="md-arrow-dropright" size="20"/>人均消费：{{item.StoreInfo.AveCost}}
          </li>
          <li>
            <Icon type="md-arrow-dropright" size="20"/>地址：{{item.StoreInfo.Address}}
            <br>
          </li>
        <br>
        <!--<h3>{{item.StoreInfo.StoreID}}</h3>-->
        <!--<template slot="action">-->
          <!--<li>-->
            <!--<Icon type="ios-star-outline" /> 123-->
          <!--</li>-->
          <!--<li>-->
            <!--<Icon type="ios-thumbs-up-outline" /> 234-->
          <!--</li>-->
          <!--<li>-->
            <!--<Icon type="ios-chatbubbles-outline" /> 345-->
          <!--</li>-->
        <!--</template>-->
        <template slot="extra">
          <!--<router-link :to="'/result2/'+item.ResultNum">More>>></router-link>-->
          <Button size="large" type="text" style="margin-right: 80px;margin-top: 60px" @click="gotoResult(item.ResultNum)">More>>></Button>
        </template>
      </ListItem>
    </List>
    <!--{{resultList.length}}-->
    <br>
    <Page :total="totalNum" :current="currentPage" :page-size="showNum" @on-change="pageChange" show-total></Page>
  </div>
</template>

<script>
  import {getCookie} from "../../../assets/js/cookie";
  export default {
    name: "History",
    data(){
      return{
        showNum: 2, // number of item per page
        currentPage: 1,
        totalNum:0,
        resultList: [],
        nowData:[],
        data1:
          {
            Account: '',
            ID:'',
            Right:'',
            Description:'',
            RegisterTime:'2019-12-08',
            Phone:'',
            Password:'',
            ResultNum:[],
          },
        account:'',
      }
    },
    mounted(){
      let Account=getCookie('Account');
      this.account=Account;
      console.log("account",Account);
      if(Account === ""){
        this.$Modal.error({
          title:'error',
          content:'请先登陆!',
        });
        this.$router.push('/login')
      }else{
        this.data1.Account=Account;
        this.$http.get('api/userSearch',{
          params:{
            Account:this.account,
          }
        }).then((res)=>{
          console.log(res.data);
          this.data1.ResultNum=JSON.parse(res.data[0].ResultNum);
          console.log("num",this.data1.ResultNum);
          for(let item of this.data1.ResultNum){
            this.$http.get('api/resultSearch',{
              params:{
                ResultNum:item
              }
            }).then((res)=>{
              setTimeout(()=>{
                console.log(res.data[0]);
                res.data[0].FakeComment=JSON.parse(res.data[0].FakeComment);
                res.data[0].FakeCritic=JSON.parse(res.data[0].FakeCritic);
                res.data[0].Keyword=JSON.parse(res.data[0].Keyword);
                res.data[0].Mood=JSON.parse(res.data[0].Mood);
                res.data[0].StarPro=JSON.parse(res.data[0].StarPro);
                res.data[0].StoreInfo=JSON.parse(res.data[0].StoreInfo);
                res.data[0].Pro=((res.data[0].FakePro/res.data[0].CommentNum)*100).toFixed(2);
                res.data[0].StoreInfo.Star=res.data[0].StoreInfo.Star/10;
                this.resultList.push(res.data[0]);
                this.totalNum=this.totalNum+1;
                console.log('resultList',this.resultList);
                },1000);
            })
          }
        });
        setTimeout(()=>{
          for (let i = 0; i < this.showNum; i++) {
            this.nowData.push(this.resultList[i]);
            console.log('nowData',this.nowData);
          }
        },2000);
      }
    },
    methods:{
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum;
        let endPage = startPage + this.showNum;
        this.nowData = this.resultList.slice(startPage, endPage);
      },
      pageChange: function (page) {
        this.currentPage = page;
        this.updateDataShow();
      },
      gotoResult(ResultNum){
        this.$http.get('api/userSearch',{
          params:{
            Account:this.account,
          }
        }).then((res)=>{
          // console.log(res.data);
          if(res.data[0].UserRight==='2'){
            this.$router.push({name:'Result_2',params:{id:ResultNum}});
          }
          if(res.data[0].UserRight==='3'){
            this.$router.push({name:'Result_3',params:{id:ResultNum}});
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>

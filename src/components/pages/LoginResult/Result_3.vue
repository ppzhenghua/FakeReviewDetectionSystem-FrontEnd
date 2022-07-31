<template>
  <div class="layout">
    <Layout>
      <Header  :style="{width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><img src="../../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <!--<MenuItem name="1">-->
            <!--<Icon type="ios-navigate"></Icon>-->
            <!--Item 1-->
            <!--</MenuItem>-->
            <MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoReturn">
              <Icon type="ios-arrow-dropleft" size="35"/>
              RETURN
            </MenuItem>
            <!--<MenuItem name="3">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--Item 3-->
            <!--</MenuItem>-->
            <!--<MenuItem name="4">-->
            <!--<Icon type="ios-paper"></Icon>-->
            <!--Item 4-->
            <!--</MenuItem>-->
          </div>
        </Menu>
      </Header>
      <Layout :style="{ minHeight: '700px'}">
        <Sider hide-trigger :style="{background: '#f5f7f9',textAlign:'left'}">
          <Menu  theme="dark" width="auto" accordion style="font-size: large;margin-top: 60%; border-bottom-right-radius: 25px;border-top-right-radius: 25px">
            <Submenu name="1">
              <template slot="title">
                <Icon type="md-key" size="20"/>
                Keyword
              </template>
              <MenuItem name="1-1" style="font-size: medium" @click.native="show_WordPositive">Positive</MenuItem>
              <MenuItem name="1-2" style="font-size: medium" @click.native="show_WordNegative">Negative</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-star" size="20" />
                Star
              </template>
              <MenuItem name="2-1" style="font-size: medium" @click.native="show_StarPro1">Origin</MenuItem>
              <MenuItem name="2-2" style="font-size: medium"  @click.native="show_StarPro2">Filter</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="md-podium" size="20"/>
                Portion
              </template>
              <MenuItem name="3-1" style="font-size: medium" @click.native="show_FakePortion">Distribution</MenuItem>
              <MenuItem name="3-2" style="font-size: medium" @click.native="show_FakePortion2">Portion</MenuItem>
              <!--<MenuItem name="3-2">Option 2</MenuItem>-->
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="md-happy" size="20"/>
                Sentiment
              </template>
              <MenuItem name="4-1"  style="font-size: medium" @click.native="show_SentimentTrend">Trend</MenuItem>
              <!--<MenuItem name="4-2">Option 2</MenuItem>-->
            </Submenu>
            <!--<Submenu name="5">-->
              <!--<template slot="title">-->
                <!--<Icon type="md-contacts" size="20"/>-->
                <!--FakeCritic-->
              <!--</template>-->
              <!--<MenuItem name="5-1"  style="font-size: medium" @click.native="show_FakeCritic">Trend</MenuItem>-->
              <!--<MenuItem name="5-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 0 24px '}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',marginTop:'25px',borderRadius:'25px'}">
            {{this.resultData.ResultNum}}
            <!--<div id="PositiveWord" style="width: 600px;height:400px;margin: auto" v-show="showWordCloudPositive"></div>-->

            <WordCloud  v-show="showWordCloudPositive" :resultData="resultData" > </WordCloud>
            <WordCloud2  v-show="showWordCloudNegative" :resultData="resultData" > </WordCloud2>
            <StarPortion ref="star" v-show="showStarPro" :resultData="resultData"> </StarPortion>
            <FakePortion v-show="showFakePortion" :resultData="resultData"></FakePortion>
            <FakePortion2 v-show="showFakePortion2" :resultData="resultData"></FakePortion2>
            <SentimentTrend v-show="showSentimentTrend" :resultData="resultData"></SentimentTrend>
            <FakeCritic v-show="showFakeCritic" v-bind:resultData="resultData"></FakeCritic>
          </Content>
        </Layout>
      </Layout>
      <Footer class="layout-footer-center">PXJ-SpamReviewDetection</Footer>
    </Layout>
  </div>
</template>

<script>
  import 'echarts-wordcloud'
  import WordCloud from "./showResult/WordCloud";
  import StarPortion from "./showResult/StarPortion";
  import FakePortion from "./showResult/FakePortion";
  import SentimentTrend from "./showResult/SentimentTrend";
  import FakeCritic from "./showResult/FakeCritic";
  import WordCloud2 from "./showResult/WordCloud2";
  import FakePortion2 from"./showResult/FakePortion2"
  import {getCookie,delCookie} from "../../../assets/js/cookie";

  export default {
    name: "Result_2",
    components: {FakeCritic, SentimentTrend, FakePortion, StarPortion,WordCloud,WordCloud2,'aa':StarPortion,FakePortion2},
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        showWordCloudPositive:false,
        showWordCloudNegative:false,
        showStarPro:false,
        showFakePortion:false,
        showFakePortion2:false,
        showSentimentTrend:false,
        showFakeCritic:false,
        account:'',
        resultNum:'',
        resultData:[],
        positive:'positive',
        negative:'negative',
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
        this.resultNum=this.$route.params.id;
        this.$http.get('api/resultSearch',{
          params:{
            ResultNum:this.resultNum
          }
        }).then((res)=>{
          console.log(res.data[0]);
          res.data[0].FakeComment=JSON.parse(res.data[0].FakeComment);
          res.data[0].FakeCritic=JSON.parse(res.data[0].FakeCritic);
          res.data[0].Keyword=JSON.parse(res.data[0].Keyword);
          res.data[0].Mood=JSON.parse(res.data[0].Mood);
          res.data[0].StarPro=JSON.parse(res.data[0].StarPro);
          res.data[0].StoreInfo=JSON.parse(res.data[0].StoreInfo);
          res.data[0].Pro=((res.data[0].FakePro/res.data[0].CommentNum)*100).toFixed(2);
          res.data[0].StoreInfo.Star=res.data[0].StoreInfo.Star/10;
          this.resultData.push(res.data[0]);
          console.log('resultData',this.resultData);
        })
      }

    },
    methods: {
      show_WordPositive(){
        this.showWordCloudPositive=true;
        this.showWordCloudNegative=false;
        this.showStarPro=false;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
      },
      show_WordNegative(){
        this.showWordCloudNegative=true;
        this.showWordCloudPositive=false;
        this.showStarPro=false;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
      },
      show_StarPro1(){
        this.showStarPro=true;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
        this.$refs.star.start('fake');
      },
      show_StarPro2(){
        this.showStarPro=true;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
        this.$refs.star.start('real');
      },
      show_FakePortion(){
        this.showFakePortion=true;
        this.showFakePortion2=false;
        this.showStarPro=false;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
      },
      show_FakePortion2(){
        this.showFakePortion=false;
        this.showFakePortion2=true;
        this.showStarPro=false;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
        this.showSentimentTrend=false;
        this.showFakeCritic=false;
      },
      show_SentimentTrend(){
        this.showSentimentTrend=true;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showStarPro=false;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
        this.showFakeCritic=false;
      },
      show_FakeCritic(){
        this.showFakeCritic=true;
        this.showSentimentTrend=false;
        this.showFakePortion=false;
        this.showFakePortion2=false;
        this.showStarPro=false;
        this.showWordCloudPositive=false;
        this.showWordCloudNegative=false;
      },
      gotoReturn(){
        this.$router.push({path: '/home'})
      }
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 250px;
    height: 60px;
    /*background: #5b6270;*/
    border-radius: 3px;
    float: left;
    position: relative;
    top: 3px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
    margin-left: 1070px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>

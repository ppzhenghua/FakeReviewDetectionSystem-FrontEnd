<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px'}">
        <Menu mode="horizontal" theme="dark" >
          <div class="layout-logo"><img src="../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <MenuItem v-show="showLogin" name="1" style="font-size: large; margin-top: 5px" @click.native="gotoLogin">
              <Icon type="ios-contact-outline" size="35"/>
              LOGIN
            </MenuItem>
            <MenuItem v-show="showLogout" name="2" style="font-size: large; margin-top: 5px" @click.native="gotoLogout">
              <Icon type="md-close-circle" size="35"/>
              LOGOUT
            </MenuItem>
            <MenuItem v-show="showHome" name="3" style="font-size: large; margin-top: 5px" @click.native="gotoHome">
              <Icon type="ios-home" size="35"/>
              HOME
            </MenuItem>
            <MenuItem v-show="showRegister" name="4" style="font-size: large; margin-top: 5px" @click.native="gotoRegister">
              <Icon type="md-bonfire" size="35"/>
              REGISTER
            </MenuItem>
            <!--<MenuItem name="2">-->
              <!--<Icon type="ios-keypad"></Icon>-->
              <!--Item 2-->
            <!--</MenuItem>-->
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
      <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '690px',borderRadius:'25px'}">
        <Input v-model="URL" style="width:700px; margin:0 auto; margin-top: 250px" placeholder="  Enter the URL..."  >
          <span slot="prepend" style="font-size: large">Website</span>
          <!--<span slot="append" style="font-size: large">.com</span>-->
        </Input>
        <Button type="primary" shape="circle" icon="ios-search" style="margin-top: 30px" size="large" @click.native=Search>Search</Button>
        <Modal
          v-model="modal"
          title="Confirm Aim"
          @on-ok="ok"
          @on-cancel="cancel"
          ok-text="YES"
          cancel-text="Cancel"
          :styles="{top:'30%'}">

          <p>Please Confirm：</p>
          <h2 style="text-align: center;background-color:#d7dde4">{{this.html}}</h2>
          <br>
        </Modal>
        <Modal v-model="SpiderLoad"
               :styles="{top:'30%',textAlign:'center'}"
               :closable="false"
               :mask-closable="false">
          <Icon type="ios-loading" size="60"/><br><br>
          <div v-show="SpiderText">
            <h2>Spider ING...</h2>
            <h3>Please Waiting...</h3>
          </div>
          <div v-show="AnalyzeText">
            <h2>Analyze ING...</h2>
            <h3>Please Waiting...</h3>
          </div>
          <div slot="footer">
            <Button v-show="nextButton" type="success" size="large" long @click="gotoAnalyze">Go Analyze</Button>
            <Button v-show="nextButton2" type="success" size="large" long @click="gotoResult">See Results</Button>
            <Button v-show="showCancel" type="primary" size="large" long :loading="modal_loading" @click="cancelSpider">Cancel</Button>

          </div>
        </Modal>
        <br>
      </Content>
      <Footer class="layout-footer-center">PXJ-SpamReviewDetection</Footer>
    </Layout>
  </div>
</template>

<script>
  import {getCookie,delCookie} from "../../assets/js/cookie";
  export default {
        name: "Search",
      data () {
        return {
          URL: '',
          modal:false,
          SpiderLoad:false,
          modal_loading: false,
          nextButton:false,
          nextButton2:false,
          showCancel:true,
          SpiderText:true,
          AnalyzeText:false,
          timeout:0,
          html:'',
          account:'',
          right:'',
          showLogin:false,
          showLogout:false,
          showHome:false,
          showRegister:false,
          resultNum:0,
        }
      },
      methods:{
        gotoLogin(){
          this.$router.push({path:'/login'})
        },
        ok () {
          this.$Message.info('Clicked ok');
          this.$http.get('api/fetch',{
            params:{url:this.URL}
          }).then((res)=>{
              console.log('res',res);
            this.modal=false;
            this.SpiderLoad=true;
            this.timeout=setTimeout(()=>{
              this.showCancel=false;
              this.nextButton=true;
            },20*1000);//!!!!!!!!!!!!!!!!!!!!!!!!!!
            this.nextButton=false;
            this.nextButton2=false;
            this.AnalyzeText=false;
            this.SpiderText=true;
          });
          // this.modal=false;
          // this.SpiderLoad=true;
          // this.timeout=setTimeout(()=>{
          //   this.showCancel=false;
          //   this.nextButton=true;
          // },30*1000);//!!!!!!!!!!!!!!!!!!!!!!!!!!
          // this.nextButton=false;
          // this.nextButton2=false;
          // this.AnalyzeText=false;
          // this.SpiderText=true;

        },
        cancel () {
          this.$Message.info('Clicked cancel');
          this.modal=false;
        },
        Search() {

          this.html='新荣记(新源南路店)';
          this.modal=true;

          // this.$http.get('api/confirmShop',{
          //   params:{URL:this.URL}
          // }).then((res)=>{
          //   console.log('111',res.body);
          //   let cheerio = require('cheerio');
          //   let $ = cheerio.load(res.body.text);
          //   let t = $('span', '.breadcrumb').text();
          //   console.log('t',t);
          //   this.html=t;
          //   this.modal=true;
          //
          // });

          // window.open(this.URL);

        },
        cancelSpider () {
          this.modal_loading = true;
          clearTimeout(this.timeout);
          setTimeout(() => {
            this.modal_loading = false;
            this.SpiderLoad = false;
            this.$Message.success('Successfully delete');
          }, 2000);

        },
        gotoAnalyze(){
          this.SpiderText=false;
          this.AnalyzeText=true;
          this.showCancel=true;
          this.nextButton=false;
          this.timeout=setTimeout(()=>{
            this.showCancel=false;
            this.nextButton2=true;
          },5000);
          if(this.account!==''){
            this.$http.get('api/getResultCount',{
            }).then((res)=>{
              // console.log('num',res.data);
              this.resultNum=Object.values(res.data[0])[0]+1;
              console.log('resultnum',this.resultNum);
              this.$http.post('api/addResult',{
                resultNum:this.resultNum,
              }).then((res)=>{
                console.log(res);
                this.$http.post('api/userResultUpdate',{
                  resultNum:this.resultNum,account:this.account
                }).then((res)=>{
                  console.log(res);
                })
              })
            })
          }
        },
        gotoResult(){
          if(this.account==='')
            this.$router.push({name:'Result_4',params:{shop:112714470}});
          else{
            if(this.right==='3')

              this.$router.push({name:'Result_3',params:{id:this.resultNum}});
            else if(this.right==='2')
              console.log('here!');
              this.$router.push({name:'Result_2',params:{id:this.resultNum}});
          }
        },
        gotoHome(){
          this.$router.push('/home');
        },
        gotoLogout(){
          delCookie('Account','Right');
          this.showLogin=true;
          this.account='';
          this.right='';
          this.showLogout=false;
          this.showHome=false;
        },
        gotoRegister(){
          this.$router.push('/register');
        }
      },
      mounted () {
        // delCookie('Right');
        this.account=getCookie('Account');
        this.right=getCookie('Right');
        console.log('acc',this.account);
        console.log('ri',this.right);
        if(this.account!==''){
          this.showLogin=false;
          this.showLogout=true;
          this.showHome=true;
          this.showRegister=false;
        }
        else{
          this.showLogin=true;
          this.showLogout=false;
          this.showHome=false;
          this.showRegister=true;
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
    /*margin-left: 900px;*/
  }
  .layout-footer-center{
    text-align: center;
  }


</style>



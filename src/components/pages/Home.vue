<template>
  <div class="layout">
    <Layout>
      <Header  :style="{position: 'fixed', width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px',zIndex:'1000'}">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"><img src="../../assets/logo2.png" style="height: 60px"></div>
          <div class="layout-nav">
            <MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoSearch">
              <Icon type="ios-arrow-dropleft" size="35"/>
              SEARCH
            </MenuItem>
          </div>
        </Menu>
      </Header>
        <!--<Sider hide-trigger :style="{background: '#f5f7f9',textAlign:'left'}">-->
          <!--<Menu  theme="dark" width="auto" accordion style="font-size: large;margin-top: 60%; border-bottom-right-radius: 25px;border-top-right-radius: 25px">-->
              <!--<MenuItem name="1-1" style="font-size: large;text-align: center" @click.native="show_Profile">-->
                <!--<Icon type="md-person" />-->
                <!--Profile-->
              <!--</MenuItem>-->
              <!--<MenuItem name="1-2" style="font-size: large;text-align: center" @click.native="show_History">-->
                <!--<Icon type="ios-bookmarks" />-->
                <!--History-->
              <!--</MenuItem>-->
          <!--</Menu>-->
        <!--</Sider>-->

          <Content :style="{margin: '88px 20px 0', background:'#fff', minHeight: '700px', textAlign:'center',borderRadius:'25px'}">
            <Profile v-show="showProfile" v-on:rightValue="rightValue"></Profile>
            <History v-show="showProfile"></History>
          </Content>
      <Footer class="layout-footer-center">PXJ-FakeCommentsTest</Footer>
    </Layout>
  </div>
</template>

<script>
    import Profile from "./HomeItem/Profile";
    import History from "./HomeItem/History";
    import {delCookie,getCookie,setCookie} from "../../assets/js/cookie";

    export default {
        name: "Home",
      components: {History, Profile},
      data(){
          return{
            showProfile:true,
            showHistory:true,
            msg:'000',
            account:'',
            right:'',
          }
      },
      mounted(){
        let Account=getCookie('Account');
        this.account=Account;
        console.log("account",Account);
        console.log("right",this.right);
        if(Account === ""){
          this.$Modal.error({
            title:'error',
            content:'请先登陆!',
          });
          this.$router.push('/login')
        }
      },
      methods:{
        // show_Profile(){
        //   this.msg=1212112;
        //   this.showProfile=true;
        //   this.showHistory=false;
        // },
        // show_History(){
        //   this.showProfile=false;
        //   this.showHistory=true;
        // },
        gotoSearch() {
          // delCookie('Account');

          this.$router.push({path:'/'})
        },
        rightValue(rightValue){
          this.right=rightValue;
          setCookie('Right',this.right,1000*60);
        },
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

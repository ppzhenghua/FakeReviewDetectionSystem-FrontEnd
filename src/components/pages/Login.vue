<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px'}">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"><img src="../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <MenuItem name="1" style="font-size: large; margin-top: 5px" @click.native="gotoReturn">
              <Icon type="ios-arrow-dropleft" size="35"/>
              RETURN
            </MenuItem>
           <MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoRegister">
             <Icon type="md-bonfire" size="35"/>
              REGISTER
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '730px'}">
        <Input v-model="account" style="width:500px;margin-top: 250px" placeholder="  Enter account..." size="large" clearable>
        <!--<span slot="prepend" style="font-size: large">ACCOUNT</span>-->
        <Icon type="ios-contact" slot="prefix" size="30"/>
        </Input>
        <br>
        <Input v-model="password" style="width:500px;margin-top: 20px" placeholder="  Enter password..." type="password" size="large" clearalbe>
        <!--<span slot="prepend" style="font-size: large">PASSWORD</span>-->
        <Icon type="ios-key" slot="prefix" size="30"/>
        </Input>
        <br>
        <Button type="primary" shape="circle" icon="md-checkmark" style="margin-top: 30px" size="large" @click="login">Login</Button>
      </Content>
      <Footer class="layout-footer-center">PXJ-SpamReviewDetection</Footer>
    </Layout>
  </div>
</template>

<script>
  import {setCookie,getCookie} from "../../assets/js/cookie";
  export default {
    name: "Login",
    data() {
      return {
        account: '',
        password: '',
      }
    },
    mounted() {
      if (getCookie('username')) {
        this.$router.push('/home')
      }
    },
    methods: {
      gotoReturn() {
        this.$router.push({path: '/'})
      },
      login() {
        if (this.account === "" || this.password === "") {
          this.$Message.error("Please input account and password");
        }else {
          // let data = {'account': this.account, 'password': this.password};
          this.$http.get('api/loginAccount',{
            params:{Account:this.account}
          }).then((res)=>{
            console.log(res.data[0]);
            if (res.data[0].isTrue){
              this.$http.get('api/loginPassword',{
                params:{Account:this.account,Password:this.password}
              }).then((res) => {
                // alert(res.isTrue);
                console.log('res', res);
                if(res.data){
                  this.$Message.success('Login Success!');
                  console.log(111);
                  setCookie('Account',this.account,1000*60);
                  setTimeout(function(){
                    if(this.account.substring(0,5)==='admin'){
                      this.$router.push('/user')
                    }else{
                    this.$router.push('/home')}
                  }.bind(this),1000);
                }
                else{
                  this.$Message.error('Password wrong,please enter again!');
                }
              })
            }
            else{
              console.log('eeeeeee');
              this.$Message.error('Account does not exist,please enter again!');
            }
          })
        }
      },
      gotoRegister(){
        this.$router.push('/register');
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
    margin-left: 1000px;
  }
  .layout-footer-center{
    text-align: center;
  }


</style>

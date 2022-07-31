<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%', borderBottomLeftRadius:'25px',borderBottomRightRadius:'25px',zIndex:'1000'}">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-logo"><img src="../../assets/logo4.png" style="height: 60px"></div>
          <div class="layout-nav">
            <MenuItem name="1" style="font-size: large; margin-top: 5px" @click.native="gotoReturn">
              <Icon type="ios-arrow-dropleft" size="35"/>
              RETURN
            </MenuItem>
            <MenuItem name="2" style="font-size: large; margin-top: 5px" @click.native="gotoLogin">
              <Icon type="ios-contact-outline" size="35"/>
              LOGIN
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '730px'}">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="margin-top: 200px">
          <FormItem label="Account" prop="account" style="width:500px;margin:auto" >
            <Input v-model="formValidate.account" placeholder="Enter your account" size="large" clearable >
              <Icon type="ios-contact" slot="prefix" size="30"/>
            </Input>
          </FormItem>
          <br>
          <FormItem label="Password" prop="password" style="width:500px;margin:auto" >
            <Input v-model="formValidate.password" placeholder="Enter your password" size="large" clearable type="password">
              <Icon type="ios-key" slot="prefix" size="30"/>
            </Input>
          </FormItem>
          <br>
          <FormItem label="Phone" prop="phone" style="width:500px;margin:auto" >
            <Input v-model="formValidate.phone" placeholder="Enter your phone number" size="large" clearable>
            <Icon type="ios-call" slot="prefix" size="30"/>
            </Input>
          </FormItem>
          <br>
          <FormItem label="Identity" prop="identity" style="width:500px;margin:auto" >
            <Select v-model="formValidate.right" filterable  placeholder="Enter your identity" size="large" @on-change="func(formValidate.right)">
              <Icon type="ios-body" slot="prefix" size="30"/>
              <Option v-for="item in rightList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Input>
          </FormItem>
          <br>
          <!--<FormItem label="Email" prop="email" style="width:500px;margin:auto" v-show="showEmail">-->
            <!--<Input v-model="formValidate.email" placeholder="Enter your email" size="large" clearable>-->
            <!--<Icon type="ios-mail" slot="prefix" size="30"/>-->
            <!--</Input>-->
          <!--</FormItem>-->
          <!--<br>-->
          <!--<FormItem style="margin: auto"><Button  v-show="showEmail" type="primary">Send Email</Button></FormItem>-->
          <!--<br>-->
          <FormItem label="Command" prop="key" style="width:500px;margin:auto" v-show="showKey">
            <Input v-model="formValidate.key" placeholder="Enter your Command" size="large" clearable>
            <Icon type="ios-hammer" slot="prefix" size="30"/>
            </Input>
          </FormItem>
          <Button type="primary" shape="circle" icon="md-checkmark" style="margin-top: 30px" size="large" @click="register('formValidate')">Register</Button>
        </Form>
      </Content>
      <Footer class="layout-footer-center">PXJ-SpamReviewDetection</Footer>
    </Layout>
  </div>
</template>

<script>
    export default {
        name: "Register",
      data(){
          return{
            showEmail:false,
            showKey:false,
            gettime:'',
            rightList: [
              // {
              //   value: '1235467812346765',
              //   label: '请选择'
              // },
              // {
              //   value: '1',
              //   label: '1-系统管理员'
              // },
              {
                value: '2',
                label: '2-平台监管人员'
              },
              {
                value: '3',
                label: '3-商家'
              },
            ],
            formValidate: {
              account: '',
              password: '',
              phone:'',
              time:'',
              right:'',
              key:'',
            },
            ruleValidate: {
              account: [
                { required: true, message: 'The account cannot be empty', trigger: 'blur' },
                { type: 'string', min: 5, message: 'Introduce no less than 5 words', trigger: 'blur' }
              ],
              password: [
                { required: true, message: 'password cannot be empty', trigger: 'blur' },
                { type: 'string', min: 6, message: 'Introduce no less than 6 words', trigger: 'blur' }
              ],
              phone: [
                { required: true, message: 'phone number cannot be empty', trigger: 'blur' },
                { type: 'string', min: 11, message: 'Introduce no less than 11 words', trigger: 'blur' },
                { type: 'string', max: 11, message: 'Introduce no more than 11 words', trigger: 'blur' }
              ],
              identity1: [
                { required: true, type:'string',message: 'Please select the identity',trigger:'blur' }
              ]
            }
          }
      },
      methods:{
        gotoReturn() {
          this.$router.push({path: '/'})
        },
        gotoLogin() {
          this.$router.push('/login');

        },
        func(status){
          //获取被选中的option标签
          console.log('status',status);
          if(status==='2'){
            this.showKey=true;
            this.showEmail=false;
          }else{
            this.showEmail=true;
            this.showKey=false;
          }
        },
        register(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              if(this.formValidate.right===''){
                this.$Message.error('please select the identity!');
              }else {
                this.$http.get('api/accountSearch',{
                  params:{account:this.formValidate.account}
                }).then((res)=> {
                  console.log('account', res.data[0]);
                  if (res.data === undefined || res.data.length <= 0) {
                    let yy = new Date().getFullYear();
                    let mm = new Date().getMonth() + 1;
                    let dd = new Date().getDate();
                    let hh = new Date().getHours();
                    let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
                    let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
                    this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
                    console.log('time',this.gettime);
                    if(this.formValidate.right==='2'){
                      this.$http.get('api/getCommand',{
                        params:{time:this.gettime}
                      }).then((res)=>{
                        console.log(res.data[0].command);
                        let realCommand=res.data[0].command;
                        if(this.formValidate.key!==realCommand){
                          console.log('error');
                          this.$Message.error('Command wrong!Please Check!');
                        }else{
                          console.log('success');
                          console.log(this.formValidate);
                          this.$http.post('api/userAdd',{
                            account:this.formValidate.account,password:this.formValidate.password,
                            phone:this.formValidate.phone,right:this.formValidate.right,
                            time:this.gettime,
                          }).then((res)=>{
                            console.log(res);
                            this.$Message.success('Success! Please Login!');
                            this.$router.push('/login');
                          });
                        }
                      })
                    }
                    else{
                      this.$http.post('api/userAdd',{
                        account:this.formValidate.account,password:this.formValidate.password,
                        phone:this.formValidate.phone,right:this.formValidate.right,
                        time:this.gettime,
                      }).then((res)=>{
                        console.log(res);
                        this.$Message.success('Success! Please Login!');
                        this.$router.push('/login');
                      });
                    }
                  }
                  else{
                    this.$Message.error('This account already exist! Please Change!')
                  }
                })
                }
              }
             else {
              this.$Message.error('Please Check Again!');
            }
          })
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
    margin-left: 1000px;
  }
  .layout-footer-center {
    text-align: center;
  }
</style>

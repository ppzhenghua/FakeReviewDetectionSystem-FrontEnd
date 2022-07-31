<template>
<div>
  <List item-layout="vertical" style="text-align: left;margin-left: 10%">
    <ListItem v-model="data1" :key="data1.ID">
      <!--<ListItemMeta :title="item.title" :description="item.description" />-->
      <!--{{ origin }}{{revise}}-->
      <li>
        <h1>{{data1.Account}}</h1>
      </li>
      <li>
        <br>
        <Icon type="md-arrow-dropright" size="20"/> {{data1.Description}}（{{data1.Right}}级权限）
      </li>
      <li>
        <Icon type="md-arrow-dropright" size="20"/>
        ID：{{data1.ID}}
        <Icon type="md-arrow-dropright" size="20"/>
        注册时间：{{data1.RegisterTime}}
      </li>
      <template slot="action">
        <li @click="revise_Pass">
          <Icon type="md-alert" size="20"/> Revise Password
        </li>
        <li @click="gotoReturn">
          <Icon type="ios-leaf" size="20"/> Logout
        </li>
      </template>
    </ListItem>
  </List>
  <Modal
    v-model="modal"
    title="Revise Password"
    ok-text="Confirm"
    cancel-text="cancel"
    @on-ok="revisePw"
    @on-cancel="cancel"
    draggable>
    Please Enter Old Password:<br>
    <Input v-model="origin" type="password" password placeholder="Enter something..." style="width: 400px" size="large"/>
    <br>
    New Password:<br>
    <Input v-model="revise" type="password" password placeholder="Enter something..." style="width: 400px" size="large"/>
    <div slot="footer">
      <Button type="default" size="large" @click="reviseCancel">Cancel</Button>
      <Button type="primary" size="large" @click="revisePw">Yes</Button>
    </div>
  </Modal>
  <Divider/>
</div>
</template>

<script>
  import {getCookie,delCookie} from "../../../assets/js/cookie";

  export default {
        name: "Profile",
      data(){
          return{
            data1:
              {
                Account: '',
                ID:'',
                Right:'',
                Description:'',
                RegisterTime:'2019-12-08',
                Phone:'',
                Password:''
              },
            modal:false,
            origin:'',
            revise:'',
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
            // console.log(res.data);
            this.data1.ID=res.data[0].UserID;
            this.data1.Right=res.data[0].UserRight;
            this.data1.Description=res.data[0].Description;
            this.data1.Password=res.data[0].Password;
            let d=res.data[0].UserRegister;
            d=new Date(d);
            d=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            this.data1.RegisterTime=d;
            this.$emit('rightValue', this.data1.Right);
            console.log('this.data1.right', this.data1.Right)
          })
        }
      },
      methods:{
          revise_Pass(){
            this.modal=true;
          },
        ok () {
          this.$Message.info('Clicked ok');
        },
        cancel () {
          this.$Message.info('Clicked cancel');
        },
        gotoReturn(){
          delCookie('Account','Right');
          this.$router.push({path:'/'})
        },
        revisePw(){
          if(this.revise==='') {
            this.$Message.error('Please enter new password')
          }else {
            if (this.origin === this.data1.Password) {
              this.$http.post('api/pwRevise', {
                Password: this.revise, Account: this.account
              }).then((res) => {
                console.log('re', res);
                this.modal=false;
                this.$Modal.success({
                  title: 'success',
                  content: 'Revise Success！'
                });

                this.origin='';
                this.revise='';
              })
            } else {
              this.$Message.error('Wrong old password');
            }
          }
        },
        reviseCancel(){
          this.origin='';
          this.revise='';
          this.modal=false;
        }
      }
    }
</script>

<style scoped>

</style>

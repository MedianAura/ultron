<template>
    <form class="form-login" v-on:submit="doLogin">
      <div class="alert alert-danger alert-dismissible" role="alert" v-if="error !== null">
        {{ error }}
      </div>
      <h1 class="h3 mb-3 font-weight-normal">Veuillez vous connecter</h1>
      <div class="form-group">
        <input id="inputUsername" type="text" class="form-control" placeholder="Nom d'utilisateur" name="username"
               v-model="username" required autofocus>
      </div>
      <div class="form-group">
        <input id="inputPassword" type="password" class="form-control" placeholder="Mot de passe" name="password"
               v-model="password" required>
      </div>
      <button type="submit" class="btn btn-lg btn-primary btn-block">Connexion</button>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { User } from '../models/user.model'
import { LoginState } from '../types'

const namespace: string = 'login'

@Component
export default class LoginPage extends Vue {
    @State('login') stateLogin!: LoginState;
    @Action('login', { namespace }) login: any;

    private username: string = '';
    private password: string = '';
    private error: string | null = null;

    private client: any;
    private ldap: any;
    private options: any = {
      url: 'ldaps://192.168.1.236:636',
      search: {
        username: 'Console FDM',
        password: 'qazplm5050',
        dn: 'OU=Utilisateurs,OU=Vigilance santé,DC=Vigilance,DC=local',
        options: {
          filter: '',
          scope: 'sub',
          attributes: ['name', 'description', 'memberOf', 'sAMAccountName']
        }
      }
    };

    mounted () {
      this.ldap = window.require('ldapjs')
    }

    doLogin (e: Event): void {
      e.preventDefault()

      if (this.username === '' || this.password === '') {
        this.authFail()
        return
      }

      let tlsOptions = { 'rejectUnauthorized': false }
      this.client = this.ldap.createClient({ url: this.options.url, tlsOptions: tlsOptions })

      if (this.client.isConnected) {
        this.client.unbind()
      }

      this.client.bind(this.username + '@VIGILANCE', this.password, (err: any) => {
        if (err) {
          console.log('error(bind search): ' +err)
          this.client.unbind()
          this.authFail()
          return
        }

        this.fetchUserInfo(this.username)
      })
    }

    private fetchUserInfo (username: string): void {
      if (this.client.isConnected) {
        this.client.unbind()
      }

      this.client.bind(this.options.search.username, this.options.search.password, (err: any) => {
        if (err) {
          console.log('error(bind user): ' +err)
          this.client.unbind()
          this.authFail()
        }
      })

      this.options.search.options.filter = '(sAMAccountName=' + username + ')'

      this.client.search(this.options.search.dn, this.options.search.options, (err: any, res: any) => {
        if (err) {
          console.log(err)
          this.client.unbind()
          this.authFail()
          return
        }

        res.on('searchEntry', (entry: any) => {
          let user = new User(entry.object)
          this.login(user)
          this.client.unbind()
          this.error = ''
          this.$router.push({ path: '/' })
        })

        res.on('error', (err: any) => {
          console.log('error(search): ' + err.message)
          this.client.unbind()
          this.authFail()
        })
      })
    }

    private authFail (): void {
      this.error = "Nom d'utilisateur ou mot de passe invalide"
    }
}
</script>

<style scoped lang="less">
  .form-login {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 150px auto;
    background-color: #f5f5f5 !important;
  }
  .form-login .checkbox {
    font-weight: 400;
  }
  .form-login .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-login .form-control:focus {
    z-index: 2;
  }
  .form-login input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-login input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>

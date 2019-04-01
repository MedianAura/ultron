<template>
  <nav class="navbar sticky-top navbar-expand">
    <div class="container">
      <span class="navbar-brand">
        <img src="@/assets/ultron-logo-horizontal.png" class="logo-image" />
      </span>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link tag="li" to="/" class="nav-item">
            <a class="nav-link">Application</a>
          </router-link>
          <li class="nav-item" v-if="isLogged">
            <span class="nav-link">
              <span>{{ loggedUser }}</span>
            </span>
          </li>
          <li class="nav-item" v-if="isLogged">
            <span class="nav-link clickable" v-on:click="doDisconnectUser">Logout</span>
          </li>
          <router-link tag="li" to="/login" class="nav-item" v-if="!isLogged">
            <a class="nav-link">Login</a>
          </router-link>
        </ul>
      </div>

      <span id="nav-link-version-dialog" class="navbar-text mr-auto">v.{{ version }}</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { ILoginState, IRootState } from '@/types';

@Component
export default class NavigationComponent extends Vue {
  @State('login') stateLogin!: ILoginState;
  @State('version') rootState!: IRootState;
  @Action('LoginStore/logout') logout!: any;

  doDisconnectUser() {
    this.logout();
    this.$router.push({ name: 'login' });
  }

  get version() {
    return this.rootState;
  }

  get isLogged() {
    return this.stateLogin.isLogged;
  }

  get loggedUser() {
    return this.stateLogin.user!.name;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.clickable {
  cursor: pointer;
}

.logo-image {
  height: 40px;
}

.navbar-nav .active > .nav-link,
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.show,
.navbar-nav .show > .nav-link {
  color: #000;
}

.navbar-nav .nav-link {
  color: rgba(0, 0, 0, 0.5);
}

.navbar-text {
  color: rgba(0, 0, 0, 0.5);
}

.navbar {
  background-color: #bbb;
  border-bottom: 1px #000 groove;

  .active {
    .nav-link {
      font-weight: bold;
    }
  }

  #nav-link-version-dialog {
    cursor: pointer;
  }
}
</style>

<style lang="less">
.modal-body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 1rem;
  font-weight: 400;
  color: #2e2e2e;
  word-wrap: break-word;

  h1 {
    font-size: 1.75em;
    font-weight: 600;
    margin: 24px 0 16px;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaeaea;
    color: #2e2e2e;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 600;
    margin: 24px 0 16px;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaeaea;
    color: #2e2e2e;
  }

  h4 {
    margin: 24px 0 16px;
    font-size: 1.2em;
  }

  *:first-child {
    margin-top: 0;
  }

  li p {
    margin: 0;
  }

  ul ul,
  ol ul {
    list-style-type: circle;
  }

  ul,
  ol {
    padding: 0;
    margin: 0 0 16px;
  }

  li {
    line-height: 1.6em;
    margin-left: 25px;
    padding-left: 3px;
  }
}
</style>

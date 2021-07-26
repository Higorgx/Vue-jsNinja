<template>
  <div class="container">
    <h1>Vue.js + Github</h1>
    <p class="lead">
      Página que lista issues de um repositório do Github, usando Vue.js.
    </p>

     <div v-if="response.status === 'error'" class="alert alert-danger">
            {{ response.message }}
      </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="github username"
          />
        </div>
      </div>

      <div class="col">
        <div class="form-group">
          <input
            v-model="repository"
            type="text"
            class="form-control"
            placeholder="github repositório"
          />
        </div>
      </div>

      <div class="col-3">
        <div class="form-group">
          <button @click.prevent.stop="getissues()" class="btn btn-success">GO</button>
          <button @click.prevent.stop="reset()" class="btn btn-danger">LIMPAR</button>
        </div>
      </div>
    </div>

    <br />
    <hr />
    <br />

    <table class="table table-sm table-bordered">
      <thead>
        <tr>
          <th width="100">Número</th>
          <th>Título</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="loader.getissues || loader.getIssue">
          <td class="text-center" colspan="2">
            <img style="max-height: 40px;" src="/static/loading.svg" alt="" />
          </td>
        </tr>
        <template v-if="!loader.getIssue">
          <tr v-if="showIssues" v-for="issue in issues" :key="issue.number">
            <td>
              <router-link :to="{ name: 'GitHubIssue',
                                        params: {
                                            name: username,
                                            repo: repository,
                                            issue: issue.number
                                        }}">
                        {{ issue.number }}
                    </router-link>
            </td>
            <td>{{ issue.title }}</td>
          </tr>
        </template>
        <tr v-if="noIssues">
          <td class="text-center" colspan="2">Nenhuma issue encontrada!</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GitHubIssues',
  created() {
    this.getLocalData();
  },
  data() {
    return {
      username: '',
      repository: '',
      issues: [],
      response: {
        status: '',
        message: '',
      },
      loader: {
        getissues: false,
      },
    };
  },
  computed: {
    showIssues() {
      return !!this.issues.length && !this.loader.getIssues;
    },
    noIssues() {
      return !this.issues.length && !this.loader.getIssues;
    },
  },
  methods: {
    getLocalData() {
      const localData = JSON.parse(localStorage.getItem('Gitissues'));
      if (localData && localData.username && localData.repository) {
        this.username = localData.username;
        this.repository = localData.repository;
        this.getissues();
      }
    },
    reset() {
      this.username = '';
      this.repository = '';
      localStorage.removeItem('Gitissues');
      this.issues = [];
    },
    resetResponse() {
      this.response.status = '';
      this.response.message = '';
    },
    getissues() {
      this.resetResponse();
      this.issues = [];
      if (this.username && this.repository) {
        localStorage.setItem('Gitissues', JSON.stringify({ username: this.username, repository: this.repository }));
        this.loader.getissues = true;
        const url = `https://api.github.com/repos/${this.username}/${this.repository}/issues`;
        // eslint-disable-next-line
        axios
          .get(url)
          .then((response) => {
            // eslint-disable-next-line
            this.issues = response.data;
          })
          .finally(() => {
            this.loader.getissues = false;
          })
          .catch(() => {
            this.response.status = 'error';
            this.response.message = 'respositorio nao existe';
          });
      } else {
        // eslint-disable-next-line
        window.alert('Insira o Username e o Repositório!');
      }
    },
  },
};
</script>

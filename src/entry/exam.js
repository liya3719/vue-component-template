import '@babel/polyfill';
import Vue from 'vue';
import App from '../../example/exam.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
import Vue from 'vue';

Vue.filter('dateFromTimestamp', function(value: number) {
  if (typeof value !== 'number') {
    return '';
  }
  let date = new Date(value);
  let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
});

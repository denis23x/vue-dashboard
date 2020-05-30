'use strict'

const ls = {
  setItem: (name, payload) => window.localStorage.setItem(name, JSON.stringify(payload)),
  getItem: name => JSON.parse(window.localStorage.getItem(name)),
  removeItem: name => window.localStorage.removeItem(name)
};

module.exports = {
  ls
};

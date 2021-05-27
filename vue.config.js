/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "O que assistir?";
      return args;
    });
  },
  transpileDependencies: ["vuetify"],
};

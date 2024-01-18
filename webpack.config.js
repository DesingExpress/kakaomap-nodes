module.exports = (config, env) => {
  delete config.externals[0]["zustand"];
  return config;
};

const PROXY_CONFIG = [
    {
      context: ['/api'],
      target: 'https://ws.sandbox.pagseguro.uol.com.br/v2/',
      secure: true,
      logLevel: 'debug',
      pathRewrite: { '^/api': '' }
    }
  ];
  
  module.exports = PROXY_CONFIG;
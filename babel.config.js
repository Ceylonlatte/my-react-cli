const isEnvDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  presets: [
    ['@babel/preset-env'],
    // 解析typescript语法
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    isEnvDevelopment && require.resolve('react-refresh/babel'),
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ].filter(Boolean),
}

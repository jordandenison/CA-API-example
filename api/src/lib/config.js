module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'secret',
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  unprotectedRoutes: ['/', '/robots.txt', '/user/login']
}

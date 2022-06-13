/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['placekitten.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  }
}

module.exports = nextConfig

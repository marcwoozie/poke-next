/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/monsters',
        permanent: false,
      },
    ]
  }
}

module.exports = nextConfig

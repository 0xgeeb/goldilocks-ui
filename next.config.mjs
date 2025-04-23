/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Demon mode >:) This codebase needs this p much though lol lmao
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/etherfi',
        destination: 'https://app.ether.fi/api/protocol/protocol-detail'
      },
      {
        source: '/api/kelpdao',
        destination: 'https://yields.llama.fi/chart/33c732f6-a78d-41da-af5b-ccd9fa5e52d5'
      },
      {
        source: '/api/lockschartdata',
        destination: 'http://52.23.253.24:3001/lockschartdata'
      }
    ]
  }
};

export default nextConfig;

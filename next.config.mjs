const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['airdops.barkprotocol.net', 'ucarecdn.com'],
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
    // Other configuration options...
  };
  
  export default nextConfig;
  
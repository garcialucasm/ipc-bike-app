/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/web/project",
        destination: "/web/about",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

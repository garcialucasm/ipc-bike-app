/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/web/project",
        destination: "/web/about",
        permanent: true,
      },
      {
        source: "/project",
        destination: "/web/about",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/web/about",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/web/contact",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

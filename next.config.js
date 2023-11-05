/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.gifer.com',
      'www.google.com',
      'lh3.googleusercontent.com',
      'icons.veryicon.com',
      'firebasestorage.googleapis.com',
      'storage.googleapis.com'
    ],
    unoptimized: true
  }
}

module.exports = nextConfig

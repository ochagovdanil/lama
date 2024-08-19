/** @type {import('next').NextConfig} */
const nextConfig = {
	// Enable External Images
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
};

export default nextConfig;

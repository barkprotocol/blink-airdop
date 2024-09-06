# BARK | Airdrops Campaigns Application

## Overview

The BARK Airdrops Campaigns Application is a robust web platform designed for managing and claiming exclusive BARK and Solana SPL tokens through a variety of airdrop campaigns. Leveraging the power of Solana's blockchain, the application offers a seamless experience for token management and user engagement. Built with Next.js, it is optimized for performance, ensuring fast load times and a smooth user experience. The application provides a streamlined interface for participating in airdrops, tracking rewards, and managing assets, all while maintaining high security and efficiency.

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/barkprotocol/bark-blink-airdrops.git
cd bark-blink-airdrops
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### 4. Configure Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_url` and `your_supabase_anon_key` with your actual Supabase credentials.

## Deployment

This project is set up for deployment on Vercel. To deploy:

1. **Push your changes to GitHub**: Make sure your code is committed and pushed to a GitHub repository.
2. **Connect to Vercel**: Go to [Vercel](https://vercel.com) and create a new project, linking it to your GitHub repository.
3. **Deploy**: Vercel will automatically build and deploy your application. You can configure build settings and environment variables in the Vercel dashboard.

### Vercel Configuration

Your `vercel.json` configuration file should look like this:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "out"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon_key"
    }
  }
}
```

Make sure to set the environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel dashboard under Project Settings -> Environment Variables.

## Contributing

Feel free to contribute to the project by submitting pull requests or opening issues. For detailed contribution guidelines, please refer to our [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# BARK Airdrops

Welcome to the BARK Airdrops project! This project allows you to manage and claim exclusive Solana SPL tokens. 

## Getting Started

To get started with the development server, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/barkprotocol/bark-blink-airdrops.git
   cd bark-blink-airdrops
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The page auto-updates as you edit the file.

## Project Structure

- **`app/page.tsx`**: Main page component that you can start editing to modify the page.
- **`components/`**: Contains reusable UI components such as `Button`, `Card`, etc.
- **`lib/`**: Contains utility functions and API clients like `createClient` for Supabase.
- **`public/`**: Static assets such as images and favicon.

## Deployment

This project is set up for deployment on [Vercel](https://vercel.com). To deploy:

1. **Push Your Code to GitHub**

   Make sure your project is pushed to a GitHub repository.

2. **Import Your Project into Vercel**

   - Go to the [Vercel dashboard](https://vercel.com/dashboard).
   - Click on "New Project" and import your GitHub repository.

3. **Configure Environment Variables**

   Set up any required environment variables in the Vercel dashboard. This may include variables for connecting to Supabase or other services.

4. **Deploy**

   Vercel will automatically deploy your project on each push to the main branch.

For more information on how to configure your project for Vercel, refer to the [Vercel documentation](https://vercel.com/docs).

## Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font. You can configure and load additional fonts as needed.

## Contributing

Feel free to contribute to this project by opening issues or pull requests. For more information, see the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

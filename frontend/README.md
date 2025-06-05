# KrishiSetu

KrishiSetu is a modern web application built with Next.js that connects farmers and buyers, facilitating agricultural trade and commerce. The platform provides a seamless registration process for both farmers and buyers to connect and grow their businesses.

## 🚀 Features

- Modern, responsive UI built with Next.js and Tailwind CSS
- Role-based registration system (Farmers & Buyers)
- Google Sheets integration for data management
- Beautiful animations using Framer Motion
- Dark mode support
- Type-safe development with TypeScript
- Modern UI components using shadcn/ui

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Data Storage:** Google Sheets API
- **Fonts:** Inter (Sans-serif), Hedvig Letters Serif (Serif)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn
- Google Cloud Platform account (for Google Sheets API)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Sheets API Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
GOOGLE_SHEET_ID=your-google-sheet-id

# Application Configuration
ALLOWED_ORIGIN=http://localhost:3000 # Change this in production
```

### Setting up Google Sheets API:
1. Go to Google Cloud Console
2. Create a new project
3. Enable Google Sheets API
4. Create a service account
5. Download the service account credentials
6. Share your Google Sheet with the service account email

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beckn-next.git
cd beckn-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
- Copy `.env.example` to `.env.local`
- Fill in the required environment variables

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 Project Structure

```
beckn-next/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── [role]/         # Dynamic route for role-based pages
│   │   └── ...
│   ├── components/         # React components
│   └── lib/               # Utility functions
├── public/                # Static assets
├── .env.local            # Environment variables (create this)
└── ...
```

## 🔒 Security

- CORS protection implemented for API routes
- Environment variables for sensitive data
- Type-safe API endpoints
- Input validation and sanitization

## 🎯 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Google Sheets API](https://developers.google.com/sheets/api)

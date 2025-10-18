<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI Photo Sketcher

Transform your photos into beautiful hand-drawn pencil sketches instantly using the power of Google's Gemini AI.

[![AI Studio](https://img.shields.io/badge/AI%20Studio-View%20App-blue)](https://ai.studio/apps/drive/1Yrd-b3Sn-dgpwX3NQW0liH8jw-glesC0)

## Features

- **AI-Powered Transformation**: Leverages Gemini 2.5 Flash Image model to convert photos into artistic sketches
- **Dual View Modes**: Toggle between sketch-only view and side-by-side comparison
- **Drag & Drop Support**: Easy file upload with drag-and-drop functionality
- **File Validation**: Automatic validation of file type and size (max 10MB)
- **Responsive Design**: Beautiful gradient UI with smooth animations and transitions
- **Download Capability**: Save your generated sketches with original filename preservation
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation support

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **AI Model**: Google Gemini 2.5 Flash Image
- **API Client**: @google/genai

## Prerequisites

- Node.js (v16 or higher recommended)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AppleLamps/banana-draw.git
   cd banana-draw
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Usage

1. Click the upload area or drag and drop an image (PNG, JPG, or WEBP)
2. Wait for the AI to generate your sketch (typically 5-15 seconds)
3. Toggle between "Sketch" and "Compare" views
4. Download your sketch using the Download button
5. Click "New" to upload another photo

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
banana-draw/
├── components/
│   ├── ErrorBoundary.tsx    # Error boundary wrapper
│   ├── Header.tsx            # App header component
│   ├── ImageDisplay.tsx      # Image display with view modes
│   ├── ImageUploader.tsx     # File upload component
│   └── LoadingSpinner.tsx    # Loading indicator
├── services/
│   └── geminiService.ts      # Gemini API integration
├── utils/
│   └── fileUtils.ts          # File handling utilities
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
├── .prettierrc.json          # Prettier configuration
└── package.json              # Project dependencies
```

## Configuration

### Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (required)

### File Constraints

- **Supported formats**: PNG, JPEG, WEBP
- **Maximum file size**: 10MB
- **Recommended**: High-resolution images for best results

## Security Considerations

⚠️ **Important**: This application currently exposes the API key in the client-side bundle. For production use, it is strongly recommended to:

1. Implement a backend proxy to protect your API key
2. Add rate limiting to prevent abuse
3. Implement user authentication if needed
4. Use environment-specific API keys

## Troubleshooting

### API Key Issues

If you see "API_KEY environment variable not set":
- Ensure `.env.local` exists in the root directory
- Verify the variable is named `GEMINI_API_KEY`
- Restart the development server after creating/modifying `.env.local`

### Build Errors

If you encounter build errors:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Image Upload Fails

- Check that your image is under 10MB
- Ensure the file format is PNG, JPEG, or WEBP
- Verify your API key is valid and has quota remaining

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Passes all linting checks (`npm run lint`)
- Is properly formatted (`npm run format`)
- Includes TypeScript types
- Follows existing code style

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Google Gemini AI](https://ai.google.dev/)
- Powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Created with [AI Studio](https://ai.studio/)

## Contact

For questions or feedback, please open an issue on GitHub.

---

**View the live app**: [AI Studio App](https://ai.studio/apps/drive/1Yrd-b3Sn-dgpwX3NQW0liH8jw-glesC0)


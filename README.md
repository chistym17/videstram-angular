# Videstram Angular - Course Dashboard

A modern, feature-rich video streaming platform built with Angular, designed for course content delivery with advanced video player capabilities and user-friendly interface.

## 🌟 Features

### Video Player

- **Advanced Video Controls**

  - Custom playback controls with modern UI
  - Volume control with smooth slider
  - Playback speed control (0.5x to 2x)
  - Fullscreen support
  - Time display with current/duration
  - Progress bar with seek functionality

- **Security Features**

  - Right-click protection
  - Keyboard shortcut prevention
  - Download prevention
  - Picture-in-Picture disabled
  - Remote playback control disabled

- **Responsive Design**
  - Adapts to different screen sizes
  - Mobile-optimized controls
  - Touch-friendly interface
  - Fluid layout

### User Interface

- Clean, modern design
- Loading states with spinner
- Error handling and user feedback
- Responsive video container
- Video information display
- NoScript fallback support

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v20.0.1)
- Docker (optional, for containerized deployment)

### Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/chistym17/videstram-angular.git
cd videstram-angular
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
ng serve
```

The application will be available at `http://localhost:4200`

### Building for Production

```bash
# Build the application
ng build

# The build artifacts will be stored in the `dist/` directory
```

## 🐳 Docker Deployment

### Using Docker

1. **Build the Docker image**

```bash
docker build -t videstram-angular .
```

2. **Run the container**

```bash
docker run -d -p 80:80 videstram-angular
```

The application will be available at `http://localhost`

### Docker Compose (Alternative)

1. **Create a docker-compose.yml file**

```yaml
version: "3.8"
services:
  videstram:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
```

2. **Start the services**

```bash
docker-compose up -d
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run unit tests
npm test

# Run linting
npm run lint

# Format code
npm run format
```

### Project Structure

```
videstram-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── video-player/    # Video player component
│   │   ├── services/            # Application services
│   │   └── ...
│   ├── assets/                  # Static assets
│   └── ...
├── public/                      # Public assets
├── Dockerfile                   # Docker configuration
├── nginx.conf                   # Nginx configuration
└── ...
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
API_URL=your_api_url_here
```

### Nginx Configuration

The project includes a custom `nginx.conf` for production deployment. Key features:

- Gzip compression
- Security headers
- Cache control
- SSL/TLS support

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by [chistym17](https://github.com/chistym17)

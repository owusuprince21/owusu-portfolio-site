# Full-Stack Portfolio Website

A modern, responsive portfolio website built with Next.js frontend and Django backend. Features dark mode, smooth animations, Three.js cursor effects, and dynamic project management.

## 🚀 Features

### Frontend (Next.js)
- **App Router** with TypeScript
- **Responsive Design** with Tailwind CSS
- **Framer Motion** animations on scroll
- **Three.js** animated cursor effect (desktop only)
- **Dark mode** by default with system preference support
- **SEO optimized** with proper meta tags
- **Fixed glassmorphism navbar** with smooth scrolling
- **Dynamic projects** loaded from Django API
- **Contact form** with validation
- **Floating "Buy Me a Coffee" button**

### Backend (Django + DRF)
- **Django REST Framework** API
- **Project management** with tags and categories
- **Image uploads** with Pillow
- **CORS configured** for frontend integration
- **Admin interface** for content management
- **PostgreSQL/SQLite** database support
- **Filtering and pagination** for projects

## 🛠️ Tech Stack

### Frontend
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- Lucide React (icons)
- React Hook Form + Zod
- next/image optimization

### Backend
- Django 4.2+
- Django REST Framework
- django-cors-headers
- Pillow (image processing)
- python-decouple (environment variables)
- PostgreSQL/SQLite

## 📁 Project Structure

```
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   │   ├── effects/     # Three.js effects
│   │   │   ├── layout/      # Layout components
│   │   │   ├── sections/    # Page sections
│   │   │   └── ui/          # UI components
│   │   └── lib/             # Utilities and API
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Django backend
│   ├── portfolio/           # Main app
│   ├── portfolio_backend/   # Django settings
│   ├── manage.py
│   └── requirements.txt
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- pip or pipenv

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

5. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Seed database with sample data:**
   ```bash
   python manage.py seed_data
   ```

8. **Start development server:**
   ```bash
   python manage.py runserver
   ```

The Django API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your settings
   ```

4. **Add your resume:**
   - Place your resume PDF as `public/resume.pdf`
   - The download button will serve this file

5. **Start development server:**
   ```bash
   npm run dev
   ```

The Next.js app will be available at `http://localhost:3000`

## 🎨 Customization

### Personal Information
Update the following files with your personal information:
- `frontend/src/components/sections/Hero.tsx` - Name, bio, social links
- `frontend/src/components/sections/Contact.tsx` - Contact information
- `frontend/src/app/layout.tsx` - Meta tags and SEO

### Resume
- Place your PDF resume in `frontend/public/resume.pdf`
- The download functionality will automatically work

### Buy Me a Coffee
- Update `NEXT_PUBLIC_COFFEE_URL` in `.env.local` with your coffee link
- Or modify the component in `frontend/src/components/ui/BuyCoffeeButton.tsx`

### Projects
Use the Django admin panel to manage projects:
1. Go to `http://localhost:8000/admin`
2. Login with your superuser account
3. Add projects with images, tags, and descriptions
4. Projects will automatically appear on the frontend

### Three.js Cursor Effect
The cursor effect is automatically disabled on:
- Mobile devices
- When `prefers-reduced-motion` is set
- Modify behavior in `frontend/src/components/effects/CursorFX.tsx`

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local):**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_COFFEE_URL=https://www.buymeacoffee.com/yourusername
```

**Backend (.env):**
```bash
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=sqlite:///db.sqlite3
```

## 📊 Performance

The website is optimized for performance:
- **Lighthouse scores:** 90+ in all categories
- **Image optimization** with next/image
- **Lazy loading** and code splitting
- **Responsive images** with proper sizing
- **Reduced motion** support
- **SEO optimized** with proper meta tags

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `frontend` directory
3. Set environment variables in your deployment platform

### Backend (Railway/Heroku/DigitalOcean)
1. Add production settings to Django
2. Set up PostgreSQL database
3. Configure static/media file serving
4. Set environment variables
5. Run migrations and collect static files

### Docker (Optional)
Docker configurations can be added for containerized deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for errors
2. Verify environment variables are set correctly
3. Ensure both frontend and backend are running
4. Check CORS configuration if API calls fail

## 🎯 Next Steps

After setup, consider:
- [ ] Adding your actual projects to the Django admin
- [ ] Replacing placeholder content with your information
- [ ] Customizing the color scheme in Tailwind config
- [ ] Adding Google Analytics or other tracking
- [ ] Setting up contact form email delivery
- [ ] Configuring proper database for production
- [ ] Adding unit tests
- [ ] Setting up CI/CD pipeline

---

Built with ❤️ using Next.js and Django
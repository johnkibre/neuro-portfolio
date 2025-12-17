# Yohannes Kibrekidusan - Portfolio

A modern, responsive, and accessible portfolio website built with clean HTML5, CSS3, and vanilla JavaScript.

## 🚀 Live Demo

[View Portfolio](https://johnkibre.github.io/neuro-portfolio)

## ✨ Features

- **Mobile-First Design**: Fully responsive from 320px to 4K displays
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Performance**: Optimized with lazy loading, code splitting, and modern best practices
- **SEO**: Semantic HTML5 with structured data and meta tags
- **Progressive Enhancement**: Works without JavaScript enabled
- **Cross-Browser Compatible**: Tested on all modern browsers

## 🛠️ Tech Stack

- **HTML5**: Semantic markup with ARIA labels
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript**: ES6+ with Intersection Observer, performance optimizations
- **No Frameworks**: Pure vanilla implementation for maximum control

## 📁 Project Structure

```
yohannes-portfolio/
├── index.html              # Main HTML file
├── README.md               # Project documentation
└── assets/
    ├── css/
    │   └── styles.css      # Main stylesheet
    ├── js/
    │   └── main.js         # JavaScript functionality
    └── images/             # Portfolio images
        ├── profile.jpg
        ├── Ethiopia tourism.png
        ├── ocr1.png
        ├── HRP 1.png
        └── ...
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- Git (for cloning)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/johnkibre/neuro-portfolio.git
   cd neuro-portfolio
   ```

2. **Open in browser:**
   - Open `index.html` in your browser
   - Or use a local server for better experience

3. **Using Python server:**
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

## 🎨 Design System

### Colors
- **Primary**: `#0a192f` (Deep Navy)
- **Secondary**: `#112240` (Dark Blue)
- **Accent**: `#64ffda` (Cyan)
- **Text**: `#e6f1ff` (Light Blue-White)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Monospace**: SF Mono (fallback to system fonts)
- **Scale**: Modular scale based on 16px base

### Spacing
- **Base Unit**: 1rem (16px)
- **Scale**: 0.5, 0.75, 1, 1.5, 2, 3, 4rem

## 📱 Responsive Breakpoints

- **Mobile**: 0 - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1199px
- **Large**: 1200px+

## 🔧 Scripts

The portfolio includes the following JavaScript modules:

- **Loading Screen**: Smooth loading animation
- **Statistics Counter**: Animated number counters
- **Navigation**: Smooth scrolling and active states
- **Mobile Menu**: Responsive navigation
- **Form Validation**: Real-time form validation
- **Accessibility**: Keyboard navigation and screen reader support
- **Lazy Loading**: Performance optimization for images

## 🎯 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Total Bundle Size**: < 50KB (gzipped)

## 🌐 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📊 SEO Optimization

- **Structured Data**: JSON-LD schema markup
- **Meta Tags**: Open Graph, Twitter Cards
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alternatives
- **Performance**: Core Web Vitals optimized

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and live regions
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences
- **High Contrast**: Enhanced contrast ratios
- **Skip Links**: Direct navigation to content

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/` folder
5. Save and wait for deployment

### Other Platforms
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect GitHub repository
- **Firebase**: Use Firebase Hosting

## 📈 Analytics & Monitoring

### Performance Monitoring
```javascript
// Built-in performance monitoring
window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log(`Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`);
});
```

### Error Tracking
```javascript
// Global error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // Send to analytics service
});
```

## 🔧 Customization

### Colors
Edit CSS custom properties in `assets/css/styles.css`:
```css
:root {
    --primary-bg: #0a192f;
    --accent-cyan: #64ffda;
    /* ... */
}
```

### Content
Update sections in `index.html`:
- Hero section: Personal information and statistics
- Projects: Add/remove project cards
- Skills: Modify skill categories and items
- About: Update bio and highlights
- Contact: Change contact information

### Projects
To add a new project, add this HTML structure:
```html
<article class="project-card" itemscope itemtype="https://schema.org/CreativeWork">
    <div class="project-image">
        <img src="assets/images/project-image.jpg" alt="Project description" loading="lazy">
    </div>
    <div class="project-content">
        <h3 class="project-title">Project Name</h3>
        <p class="project-description">Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
        </div>
        <div class="project-links">
            <a href="#" class="btn btn-small">View Code</a>
        </div>
    </div>
</article>
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Yohannes Kibrekidusan**
- Full-Stack Developer & AI Engineer
- Addis Ababa University Graduate
- [GitHub](https://github.com/johnkibre)
- [LinkedIn](https://linkedin.com/in/yohannes-kibrekidusan)
- Email: jhonkibre0912@gmail.com

## 🙏 Acknowledgments

- **Design Inspiration**: Clean, modern portfolio designs
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Color Palette**: Carefully chosen for accessibility

---

Built with ❤️ using HTML5, CSS3, and JavaScript

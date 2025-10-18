# Insurance Advisor Website

A professional, mobile-first website for an Insurance Advisor in India, built with modern web technologies and optimized for lead generation.

## Features

### Design & User Experience
- **Mobile-First Design**: Fully responsive layout optimized for all devices
- **Professional Color Scheme**: Yellow and black theme for trust and professionalism
- **Fast Loading**: Optimized images and efficient CSS/JavaScript
- **Accessibility**: Semantic HTML and keyboard navigation support

### Core Sections
1. **Hero Section**: Professional advisor photo with key statistics and call-to-action
2. **Insurance Services**: Visual grid of all 11 insurance types offered
3. **Lead Generation Form**: Comprehensive enquiry form with validation
4. **Client Testimonials**: Interactive slider with real client feedback
5. **Professional Footer**: Contact information and quick links

### Insurance Types Covered
- Health Insurance
- Personal Accident
- Life Cover
- International Travel
- Home Insurance
- Office Insurance
- Warehouse Insurance
- Directors & Officers Liability
- Public Liability
- Cyber Security Insurance
- Motor Insurance (2W & 4W)

### Technical Features
- **Form Validation**: Client-side validation with error messaging
- **Interactive Elements**: Smooth scrolling, animated counters, testimonial slider
- **SEO Optimized**: Proper meta tags, semantic structure, and performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## File Structure
```
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet with mobile-first approach
├── js/
│   └── script.js       # Interactive functionality and form handling
└── images/
    ├── advisor-photo.svg    # Placeholder for advisor photo
    ├── favicon.svg         # Website favicon
    ├── generate-placeholder.html  # Tool for creating image placeholders
    └── README.md          # Image guidelines and specifications
```

## Setup Instructions

### Local Development
1. Clone or download the website files
2. Open terminal in the project directory
3. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open browser to `http://localhost:8000`

### Customization
1. **Replace Advisor Photo**: Add your professional photo as `images/advisor-photo.jpg`
2. **Update Contact Information**: Modify phone, email, and address in `index.html`
3. **Customize Colors**: Edit CSS variables in `:root` section of `style.css`
4. **Modify Content**: Update testimonials, company name, and service descriptions

### Form Integration
The contact form is ready for integration with:
- **Email Services**: Formspree, Netlify Forms, EmailJS
- **CRM Systems**: Salesforce, HubSpot, Zoho
- **Backend APIs**: Node.js, PHP, Python

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## Performance Optimizations
- Minified CSS and JavaScript (production ready)
- Optimized images and SVG icons
- Lazy loading for images
- Efficient CSS Grid and Flexbox layouts
- Web fonts loaded asynchronously

## License
This website template is created for professional insurance advisors. Modify and use according to your business needs.
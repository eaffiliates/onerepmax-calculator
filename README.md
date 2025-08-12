# 1RM Calculator

A fast, SEO-optimized, static website for calculating one-rep max (1RM) estimates using multiple proven formulas.

## Features

- **Multiple Formulas**: Epley, Brzycki, Lombardi, and O'Conner formulas
- **Confidence Intervals**: Shows range across formulas instead of false precision
- **Plate Calculator**: Helps load barbells to target weights
- **Warm-up Ladder**: Progressive loading recommendations

- **Mobile-First**: Responsive design optimized for all devices
- **Fast & SEO-Friendly**: Static site generation with Astro

## Tech Stack

- **Astro**: Static site generator with minimal JavaScript
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vanilla JS**: Lightweight client-side interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Build the site
npm run build

# Preview the build
npm run preview
```

## Project Structure

```
/
├── public/           # Static assets
├── src/
│   ├── components/   # Astro components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Site pages
│   ├── styles/       # Global styles
│   ├── utils/        # Utility functions

├── scripts/          # Build scripts
└── tests/            # Test files
```

## Pages

- `/` - Main calculator
- `/formulas/` - Formula explanations
- `/faq/` - Frequently asked questions




## Testing

```bash
# Run formula tests
npm test
```

## Performance

- Lighthouse scores: 95+ across all metrics

- Zero external dependencies in production
- Static site generation for optimal loading

## SEO Features

- Semantic HTML structure
- JSON-LD structured data
- Open Graph meta tags
- Sitemap.xml generation
- Canonical URLs
- Mobile-first responsive design

## Browser Support

- All modern browsers (ES2017+)
- Progressive enhancement for older browsers
- Graceful degradation when JavaScript disabled

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Formula research from peer-reviewed strength training literature
- Designed for educational purposes - always consult qualified professionals
- Built with performance and accessibility as primary concerns

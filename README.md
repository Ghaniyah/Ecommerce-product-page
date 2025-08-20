# Frontend Mentor - E-commerce product page solution

This is a solution to the [E-commerce product page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Getting Started](#getting-started)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Open a lightbox gallery by clicking on the large product image
- Switch the large product image by clicking on the small thumbnail images
- Add items to the cart
- View the cart and remove items from it

### Screenshot

![Desktop Design](./design/desktop-design.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/ecommerce-product-page)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Vite](https://vitejs.dev/) - Build tool
- CSS Modules - For component-scoped styling

### What I learned

This project helped me practice several key concepts:

1. **React State Management**: Implemented custom hooks for cart and lightbox functionality
2. **TypeScript Integration**: Used proper typing for components, props, and state
3. **Responsive Design**: Created a mobile-first design that works across all screen sizes
4. **Component Architecture**: Built reusable components with clear separation of concerns
5. **Accessibility**: Added proper ARIA labels, keyboard navigation, and semantic HTML

```tsx
// Custom hook for cart management
const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    isOpen: false
  });
  
  const addItem = useCallback((product: Product, quantity: number) => {
    // Cart logic implementation
  }, []);
  
  return { items: cart.items, addItem, /* other methods */ };
};
```

### Continued development

Areas I want to continue focusing on:

- Advanced React patterns (Context API, useReducer)
- Animation and micro-interactions
- Performance optimization techniques
- Testing with Jest and React Testing Library

### Useful resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Excellent resource for React + TypeScript patterns
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Comprehensive guide to CSS Grid
- [Vite Documentation](https://vitejs.dev/guide/) - Fast build tool documentation

## Author

- Website - [Your Name](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce-product-page.git
```

2. Navigate to the project directory:
```bash
cd ecommerce-product-page
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Project Structure

```
src/
├── components/          # React components
│   ├── Header/
│   ├── ProductGallery/
│   ├── ProductInfo/
│   ├── Cart/
│   ├── Lightbox/
│   └── ...
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── styles/             # Global styles
└── main.tsx           # Application entry point
```

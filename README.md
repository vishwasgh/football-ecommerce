# GoalGear – Football E-Commerce Store

**GoalGear** is a modern football gear e-commerce web application built with Next.js, React, and Tailwind CSS. The platform features a responsive design, interactive product experience, and a clean UI optimized for performance.

---

## Features

* Browse and purchase football gear (cleats, jerseys, balls, gloves, and more)
* Featured products with ratings and recommendations
* Shopping cart and checkout-ready UI
* Gamified product experience with interactive product-based mini-games
* Informational sections: Our Story, Contact Us
* Fully responsive layout for mobile, tablet, and desktop
* Built with a production-ready architecture

---

## Tech Stack

* [Next.js](https://nextjs.org/) (App Router)
* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/) (for animations)
* [Lucide Icons](https://lucide.dev/)
* TypeScript

---

## Project Structure

```
/app                 - Application routes and pages  
/components          - Reusable UI components  
/lib                 - Store logic, product data, and utilities  
/public              - Static assets (product images, icons)  
tailwind.config.ts   - Tailwind theme configuration  
next.config.js       - Next.js configuration  
```

---

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/vishwasgh/football-ecommerce.git
cd football-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```
npm run dev
```

Visit `http://localhost:3000` in your browser to see the app.

---

## Customization

* To add or edit products, update:
  `lib/products.ts`

* To change images, place your files in the `/public/` directory and update image paths accordingly.

* To enable product-based games, set `hasGame: true` in the product object.

---

## Production Build

To create an optimized build and start the production server:

```
npm run build
npm start
```

---

## License

This project is open source under the [MIT License](LICENSE).

---



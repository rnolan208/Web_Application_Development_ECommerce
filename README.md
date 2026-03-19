# E-Commerce Website - Robert's Football Shop

This is a full-stack eCommerce web application built with Node.js, Express, EJS, and MySQL..
The platform allows users to browse products, manage a shopping cart, and simulate an online shopping experience.

This project was developed as part of a university module and demonstrates full-stack development skills including backend architecture, database integration, and dynamic rendering.

The website is hosted on Railway and is available at: 
*(auto-deployed via GitHub + Railway)*

A Project Walkthrough demonstation is available at: https://www.youtube.com/watch?v=lDh-ARllg1M&feature=youtu.be


## ** File structure **

- custom_node_modules/
  - auth.js               # Authentication logic
  - payment.js            # Payment handling logic

- database/
  - Database.csv
  - db.js                 # Database connection setup
  - g00474404.sql         # SQL schema & data

- public/
  - css/
    - style.css           # Main styleshee
  - images/               # Product & UI images
  - video/                # Demo/media assets
  - script.js             # Client-side JavaScript

- views/
  - templates/
    - navbar.ejs          # Reusable navbar component
    - footer.ejs          # Reusable footer component
  - home.ejs              # Homepage (hero slideshow)
  - shopEntire.ejs        # All products page
  - jerseyShop.ejs        # Jersey category page
  - miscShop.ejs          # Misc items category page
  - shopItems.ejs         # Individual product page
  - checkout.ejs          # Checkout page
  - paymentSuccess.ejs    # Receipt / confirmation page
  - login.ejs             # User login page
  - about.ejs             # About page
  - contactUs.ejs         # Contact page

- document/               # Project documentation

- node_modules/           # Dependencies

- app.js                  # Main server entry point
- package.json            # Project metadata & scripts
- package-lock.json
- codeswing.json          # VS Code layout config
- .gitignore
- README.md

---


## ** Tech Stack **
- **FrontEnd**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)

- **BackEnd**
  - Node.js
  - Express.js
  - EJS (templating engine)

- **Database**
  - MySQL

- **Other Tools & Platforms**
  - Railway (hosting)
  - GitHub (version control)

---


## ** Features **
- **Interactive Home Experience**
  - Hero section with slideshow showcasing featured content
  - Visually engaging landing experience
  - Smooth transitions between slides
  - Links to key product sections

- **Product Brosing System**
  - Dedicated products page displaying all available items
  - Categorised views (e.g. jerseys, miscellaneous items)
  - Dynamic routing to individual product pages

- **Individual Product Page**
  - Product-specific detail view
  - Selectable options:
    - Size Selection
    - Quantity Selection
  - Product imagery including:
    - Main product image
    - Brand/logo image
  - Add-to-cart functionality

- **User Authentication**
  - Secure login system
  - Session-based user state
  - Dynamic navbar updates:
    - Login icon changes when user is authenticated
    - Search Bar for individual products

- **Shopping Cart Functionality**
  - Add/remove items from cart
  - Cart data persisted using local storage
  - DReal-time cart updates
  - Automatic Discounts Applied

- **Checkout and Payment Flow**
  - Review cart items before purchase
  - Remove items directly from checkout page
  - Automatic Cart-Total Update
  - User input for payment details (simulated)
  - Payment confirmation system

- **Order Confirmation**
  - Payment success page
  - Generated receipt after purchase
  - Generated Order Number
  - Option to print receipt

- **Responsive Design**
  - Optimised for desktop, tablet, and mobile devices
  - Flexible layouts across screen sizes

- **UI & UX Enhancements**
  - Clean and intuitive navigation
  - Consistent design across pages
  - User-focused interaction flow from browsing → checkout

---


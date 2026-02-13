
# Brotherhood Clothing 👕
### Palanpur's Premier Fashion Marketplace

Brotherhood Clothing is a modern, premium web application designed to connect local fashion retailers in Palanpur with style-conscious customers. This platform provides a seamless bridge between physical shops and a digital storefront, offering a refined shopping experience.

---

## ✨ Key Features

### 🛍️ For Customers
- **Discover Local Gems:** Browse curated collections from Palanpur's best fashion retailers.
- **Premium Shop Profiles:** Detailed profiles with shop history, location, and featured collections.
- **Seamless Navigation:** Category-based filters and intuitive search.
- **Responsive Design:** A beautiful, "wow" factor UI optimized for all devices.

### 🏪 For Shop Owners
- **Digital Storefront:** Showcase your shop's unique brand and products to a wider audience.
- **Shop Management:** intuitive dashboard to manage profile details and featured collections.
- **Registration Flow:** Streamlined shop registration with admin verification.

### 🛡️ For Administrators
- **Verification System:** Approve or block shop registrations to maintain platform quality.
- **User Management:** Oversee the community and platform health.
- **Dashboard Analytics:** High-level overview of platform activity.

---

## 🚀 Tech Stack

- **Frontend:** React 19 (Vite), TypeScript, Tailwind CSS 4.0
- **Icons & UI:** Lucide React, React Icons
- **Backend/Auth:** Supabase (PostgreSQL)
- **Deployment:** Vercel

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gauswamiashih/Brotherhood-Clothing.git
    cd Brotherhood-Clothing
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Setup:**
    Create a `.env.local` file in the root directory and add your Supabase and Gemini credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  **Run Locally:**
    ```bash
    npm run dev
    ```

---

## 📂 Project Structure

- `src/components`: Reusable UI components.
- `src/pages`: Main application views (Home, Shops, Admin, etc.).
- `src/lib`: Configuration and third-party library initializations (Supabase).
- `src/types`: TypeScript definitions and interfaces.
- `src/context`: React Context providers for state management.

---

## 📄 License
© 2026 Brotherhood Clothing. All rights reserved.


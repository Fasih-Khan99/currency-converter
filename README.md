# 🌍 Rate Pilot - Full Stack Currency Converter
A modern, responsive, and real-time Currency Converter built with Angular 19, NestJS, and FreeCurrencyAPI. This project supports real-time conversions and historical data lookups with a persistent transaction history.

## Setup Instructions
1. **Clone the repository:** 
    git clone <your-repo-url> 
    cd <your-repo-url>

2. **Install dependencies:** 
    npm install

3. **Run the development server:** 
    npm run dev

4. Open http://localhost:3000 in your browser.

## 🛠️ Tech Stack
## Frontend
• Framework: Angular 19 (Standalone Components)

• Styling: Angular Material, SCSS (Glassmorphism UI)

• State Management: LocalStorage for Transaction History

• Utilities: RxJS, Reactive Forms

## Backend
• Framework: NestJS (Node.js)

• HTTP Client: Axios (@nestjs/axios)

• Validation: Class-validator

• Security: CORS enabled for specific origins

## 📝 Key Features
• Real-Time Conversion: Fetches the latest market rates instantly.

• Historical Lookup: Toggle the datepicker to see what 1 USD was worth in 2016.

• Smart History: Saves your last 10 conversions locally so they persist after a page refresh.

• Glassmorphism UI: A sleek, colorful, and mobile-responsive interface.

• Error Handling: Graceful handling of API limits and network failures.

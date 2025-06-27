# Periodic Table Application

A modern Angular application for managing and displaying the periodic table of elements. Built with Angular 20, Angular Material, and Tailwind CSS.

## 🚀 Features

- **Display Periodic Table** - View all elements in a responsive table
- **Add New Elements** - Create and add new elements to the table
- **Edit Elements** - Modify existing element properties
- **Real-time Filtering** - Search elements by number, name, weight, or symbol
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Accessibility** - Full WCAG 2.1 compliance with screen reader support
- **Modern UI** - Beautiful Material Design interface

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 20 (Standalone Components)
- **State Management**: Angular Signals (SignalStore)
- **UI Library**: Angular Material 20
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Angular CLI 20


## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                 # Core application components
│   │   └── components/
│   │       ├── header/       # Application header
│   │       └── footer/       # Application footer
│   ├── features/             # Feature modules
│   │   └── periodic-table/   # Main periodic table feature
│   │       ├── periodic-table.component.ts
│   │       ├── element-form-dialog/
│   │       └── ...
│   └── shared/               # Shared resources
│       ├── models/           # TypeScript interfaces
│       ├── stores/           # SignalStore for state management
│       ├── validators/       # Custom form validators
│       └── data/             # Mock data
└── styles/                   # Global styles and SCSS architecture
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KadziolkaLuda/periodic-table.git
   cd periodic-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`


## 📦 Building

### Development Build
```bash
npm run build
```

### Production Build
```bash
npm run build --configuration production
```

## 🎯 Key Features

### SignalStore State Management
The application uses Angular Signals for reactive state management:

### Custom Validators
Reusable form validators for data validation


## 👨‍💻 Author

**Liudmyla Kadziolka**
- LinkedIn: [Liudmyla Kadziolka](http://linkedin.com/in/liudmyla-kadziolka/)
- GitHub: [@KadziolkaLuda](https://github.com/KadziolkaLuda)


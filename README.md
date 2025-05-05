# SHARE AND RATE!

A community-driven platform for makeup enthusiasts to discover, share, and vote on beauty products and deals.

![SHARE AND RATE Interface](screenshot.png)

## About

SHARE AND RATE! is a web application where makeup lovers can connect, share their favorite beauty products, and discover deals and discounts. Our platform makes it easy to find honest reviews and recommendations from fellow beauty enthusiasts.

## Features

- **User Authentication** - Create an account and securely log in
- **WordCloud Navigation** - Discover trending topics and categories through an interactive word cloud
- **Post Creation** - Share your favorite makeup products, reviews, and discount information
- **Content Discovery** - Browse posts from other users to find new products and deals
- **Voting System** - Vote for helpful reviews and product recommendations
- **Responsive Design** - Enjoy a seamless experience on both desktop and mobile devices

## Getting Started

These instructions will help you set up and run a local copy of SHARE AND RATE! for development and testing purposes.

### Prerequisites

To run this project, you'll need:

- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/share-and-rate.git
cd share-and-rate
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
   - Create a `.env` file in the root directory
   - Add the following variables (replace with your own values):
   ```
   API_KEY=your_api_key
   AUTH_DOMAIN=your_auth_domain
   DATABASE_URL=your_database_url
   ```

4. Start the development server
```bash
npm run start
```

## Usage

After installation, navigate to `http://localhost:3000` in your browser to see the application.

### Basic Commands

```bash
# Start development server
npm run start

# Build for production
npm run build

# Run tests
npm run test
```


## Technologies Used

- **Frontend**: JavaScript, HTML, CSS
- **Package Management**: npm
- **Authentication**: Firebase Auth (or custom authentication)
- **State Management**: Context API / Redux
- **Styling**: CSS / SCSS / Styled Components

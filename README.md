# Fetch Dogs App

Fetch Dogs App is a cutting-edge, interactive front-end application crafted with love for dog enthusiasts! This project brings together the best of modern web technologies to offer a seamless and delightful experience for anyone looking to find their next furry friend.

## Key Features

1. **User Authentication**  
   - Secure login using just your name and email, with session management via HttpOnly cookies.  
   - A sleek, glassmorphic login page featuring a full-screen background, animated gradient overlay, and no scrolling.

2. **Clickable NavBar Branding**  
   - The NavBar includes a “Woof Finder” title that, when clicked, redirects users back to the login page.

3. **Dynamic Dog Search**  
   - Browse a comprehensive database of shelter dogs.  
   - Filter by breed, sort results alphabetically (ascending or descending), and navigate through paginated results effortlessly.

4. **Detailed Dog Profiles**  
   - View all the essential details for each dog—name, age, breed, ZIP code, and a charming image—to help you make an informed choice.

5. **Favorites & Matching**  
   - Select your favorite dogs and generate a perfect match with a single click, powered by our intuitive matching API.

6. **Unified Theming & Styling**  
   - Both the login and dog search pages feature consistent backgrounds, animated gradient overlays, and a bouncy footer referencing “Fetch Rewards.”  
   - Cards and filter sections have subtle hover effects and shadows for a modern UI.

7. **Modern Tech Stack**  
   - Built with [React](https://reactjs.org/), [Axios](https://axios-http.com/), [React Router](https://reactrouter.com/), and [Material-UI](https://mui.com/).  
   - Demonstrates best practices in front-end engineering, responsive design, and advanced styling (using Emotion for animations).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/fetch-dogs-app.git
   cd fetch-dogs-app
2. **Install Dependencies:**
   ```bash
   npm install
3. **Running the Application Locally**
   ```bash
   npm start
4. **Build for Production**
   ```bash
   npm run build
### Troubleshooting
**Module Not Found Error:**
If you encounter an error related to module versions (like ajv-keywords expecting a specific version of ajv), try installing a compatible version:
```bash
npm install ajv@6.12.6
```
**CORS/Network Errors**
  - Ensure ```withCredentials: true ``` is set in your Axios configuration so cookies are sent.
  - Make sure you allow cross-site cookies in your browser
### Contact
For any questions or suggestions, please open an issue or contact me at aakashshoraan7@gmail.com

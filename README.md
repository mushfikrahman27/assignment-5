# GitHub Issues Tracker

A modern, responsive web application for tracking and managing GitHub issues built with vanilla HTML, CSS, and JavaScript.

## Project Description

This GitHub Issues Tracker is a fully functional web application that allows users to browse, search, and filter GitHub issues. The application features a secure login system, intuitive dashboard interface, and comprehensive issue management capabilities.

## Features

- **Secure Authentication**: Login system with demo credentials
- **Issue Dashboard**: Clean, modern interface for viewing issues
- **Advanced Filtering**: Filter issues by status (All/Open/Closed)
- **Real-time Search**: Search issues using API integration
- **Issue Details Modal**: Click any issue to view full details
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Smooth loading spinners for better UX
- **Status-based Styling**: Visual indicators for issue status

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and transitions
- **Vanilla JavaScript**: No frameworks or libraries required
- **REST API**: Integration with GitHub Issues API
- **LocalStorage**: Client-side authentication state management

## Live Site

[Live Demo Link Placeholder]

## GitHub Repository

[GitHub Repository Link Placeholder]

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd assignment-5
   ```

3. Open `index.html` in your web browser to start the application

## Usage

### Login Credentials
- **Username**: admin
- **Password**: admin123

### Main Features
1. **Login**: Use demo credentials to access the dashboard
2. **Browse Issues**: View all issues in a card-based layout
3. **Filter Issues**: Use tabs to filter by status
4. **Search Issues**: Use the search bar to find specific issues
5. **View Details**: Click any issue card to see full information
6. **Responsive**: Works seamlessly on all device sizes

## Project Structure

```
assignment-5/
│
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── style.css               # All styles
├── README.md               # This file
│
├── js/
│   ├── login.js            # Login functionality
│   ├── dashboard.js        # Dashboard logic
│   └── api.js              # API service functions
│
└── assets/
    └── images/             # Image assets
```

## API Endpoints

- **All Issues**: `https://phi-lab-server.vercel.app/api/v1/lab/issues`
- **Single Issue**: `https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}`
- **Search Issues**: `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={query}`

## JavaScript Concepts Explained

### What is the difference between var, let, and const?

**var** is the old way of declaring variables in JavaScript. It has function scope and can be redeclared. It's also hoisted to the top of its scope, which can sometimes lead to confusing behavior.

**let** was introduced in ES6 and has block scope, meaning it only exists within the curly braces where it's defined. It can be reassigned but not redeclared in the same scope.

**const** is also block-scoped like let, but it cannot be reassigned after declaration. However, for objects and arrays, the contents can still be modified - only the reference itself is constant.

### What is the spread operator (...)?

The spread operator allows us to expand or spread elements from an array or object. It's really useful for creating copies, combining arrays, or passing multiple arguments to functions.

For arrays, you can use it like `const newArray = [...oldArray, newItem]` to create a new array with all elements from the old array plus a new item. For objects, you can use `const newObject = {...oldObject, newProperty: value}` to copy all properties and add new ones.

### What is the difference between map(), filter(), and forEach()?

**map()** creates a new array by applying a function to each element of the original array. It always returns a new array of the same length. For example, you can use it to transform an array of numbers into an array of strings.

**filter()** creates a new array containing only elements that pass a test. It returns a shorter array (or empty array) containing only the elements that meet the condition. Great for removing items you don't want.

**forEach()** executes a function for each array element but doesn't return anything. It's used when you want to perform an action on each element without creating a new array, like logging to console or updating the DOM.

### What is an arrow function?

Arrow functions are a shorter way to write functions in JavaScript, introduced in ES6. Instead of writing `function(param) { return param * 2; }`, you can write `(param) => param * 2`. They have a more concise syntax and don't have their own `this` binding - they inherit `this` from the surrounding context. This makes them really useful for callbacks and when you want to preserve the context.

### What are template literals?

Template literals are string literals that allow embedded expressions, marked by backticks (`) instead of regular quotes. You can include variables and expressions directly in the string using `${expression}` syntax. For example, instead of `"Hello, " + name + "!"`, you can write `` `Hello, ${name}!` ``. They also support multi-line strings without needing special characters, which makes writing HTML templates much cleaner.

## Development Notes

This project was built with clean, maintainable code following best practices:
- Semantic HTML5 markup
- Modular JavaScript with clear separation of concerns
- Responsive CSS with mobile-first approach
- Proper error handling and loading states
- Accessible and user-friendly interface

## Future Enhancements

- User authentication with real backend
- Issue creation and editing capabilities
- Real-time updates with WebSocket
- Advanced filtering and sorting options
- Export functionality for issues
- Dark mode support

## License

This project is open source and available under the [MIT License](LICENSE).

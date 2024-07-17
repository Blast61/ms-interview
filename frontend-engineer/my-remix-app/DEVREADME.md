# How to run the application
    -Ensure you are in the correct directory ```frontend-engineer/my-remix-app```
    -Open your terminal and run the following script ```npm run dev```csharp-interactive
    -This will start the application and begin hosting it at ```http://localhost:5173/```    
    -Cmd + click on the link in your terminal and this will open the webpage containing the Map and Chart data visualizers

# Technical Walkthrough

1. I chose to develop this solution using Remix.js, a framework I hadn't previously used, to enhance application performance and maintain scalability and readability. I learned about Remix.js from a front-end team lead who praised its server-side rendering (SSR) capabilities.

Remix.js stands out because it abstracts away the need to write or configure backend APIs to handle data requests from front-end React components. Typically, the front end sends fetch requests to a backend API, which responds with the requested data. However, Remix.js simplifies this process by integrating data fetching directly within each route.

In Remix.js, every route builds upon the root route, with subsequent routes as child routes. When the parent route renders, so do the child routes. Each route consists of a file containing the source code for the respective component. Routes can export a loader function to fetch and return data (e.g., json({ fetchedData })) and an export default function containing the React logic for the component.

Remix.js uses an Express-based framework with Vite and Node.js, which further enhances its performance and developer experience. Although I only scratched the surface of Remix.js's capabilities, I found it to be a powerful and efficient framework for this project.
    

# File Walkthrough

# app/routes/_index.tsx

# app/routes/map.tsx

# app/routes/chart.tsx
# Full-Stack Assignment

## **The Task** :clipboard:

To complete the following full-stack assignment. Treat this as a **production-quality endeavor**, building clean, maintainable, and well-structured code using **TypeScript** throughout both the front-end and back-end.

---

## **SQL Scheme**

![image](https://github.com/user-attachments/assets/3cc79ca7-c61b-4c3e-a048-a7c679846feb)

## **Requirements** :wrench:

### **User Onboarding**

- Implement secure **registration** and **login** flows.
- Ensure proper **session handling** and **user authentication**.

### **Product Listing**

- Create a fully functional **product listing page**.
- Implement back-end endpoints to **persist** and **retrieve product data** from a suitable data store (e.g., a database).
- Display the results on the front-end with sorting or filtering functionality as needed.

---

## **Stack & Practices** :gear:

### **Front-End**

- Use **React** with **TypeScript**.
- Organize components, ensure logical **state management**, and handle **data fetching** with clarity and consistency.

### **Back-End**

- Use **Node.js** or **Nest.js** with **TypeScript**.
- Implement a structured **API** with clear endpoints for authentication and product operations.
- Utilize a **database** or another persistence layer to store user and product data (**no mocks needed**).

### **Code Quality**

- Write **production-level code** with:
  - Strong **error handling**.
  - Modular architecture.
  - Unified coding style.

---

## **Additional Instructions** :memo:

- Include a **brief documentation** of your system’s architecture and data flow.
- Once complete, publish your code to a public **GitHub repository** and share the link.

---

## **How to Run the App** :electric_plug:

### **Environment Variables**

- Create a `.env` file for your environment variables:
  ```sh
  DATABASE_URL= # Database connection string
  SECRET_KEY=   # Secret key for authentication
  ```


### **Steps to Set Up and Run the Server**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the database:**
   - General build:
     ```bash
     npm run buildDB
     ```
   - For **development**:
     ```bash
     npm run buildDB-dev
     ```
   - For **testing**:
     ```bash
     npm run buildDB-test
     ```
   - For **production**:
     ```bash
     npm run buildDB-production
     ```

3. **Run the server:**
   - For **development**:
     ```bash
     npm run dev
     ```
   - For **production**:
     ```bash
     npm run start
     ```

3. Verify the server is running on `http://localhost:8080`.

### **Steps to Run the Front-End**

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the front-end server:
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

---

## **Technologies Used** :computer:

- **Front-End**: React.js with TypeScript
- **Back-End**: Node.js / Express.js with TypeScript
- **Database**: PostgreSQL
- **State Management**: React Hooks
- **Libraries**: Axios, Express.js
- **Authentication**: JWT / Sessions

---

# Paisa-Vasooli

Paisa Vasooli is a website built with the MERN stack to help you manage and track your expenses. 
This project was made during the Codesangam 2023 Event conducted by CC Club MNNIT Allahabad, the topic being "Thoth's Steller Ledger"

## Team Members
1. Khanak Patwari : Frontend and Backend
2. Sahil Gupta : Frontend and Backend
3. Shikhar Pandya : Frontend

## Features

### Basic features

- **User Authentication:** Authentication through Login Signup page
- **Add Transactions:** Easily add income or expense transactions, and edit or delete them if need be
- **Customizable Categories:** Add personalised categories to transactions
- **Stats and transaction history:** View total income,expense, balance statistics and past transaction history on dashboard
- **Dark theme:** Feature to switch to dark mode theme
- **Recurring Bills:** Notifications sent for recurring bills
- **Dues Reminder:** Reminders sent for due transactions
- **Savings Tracker:** Create budgets or financial goals and track the progress.
- **Add Friends:**  Sent friend requests to people and easily add them in any groups from the friends' list
- **Make Groups:** Create groups for splitting bills and simplifying debts among friends.
- **Split Expenses:** Split bills equally between friends in groups
- **Debt Simplification:** Simplify debts between friends in groups with minimum cash flow
- **Approval from receiver:** Approval asked from receiver before settling up bill split or debts in groups
- **Data Analysis and Visualisation:** Various Charts and graphs to visualise spending and earning on a weekly,monthly,category-wise basis

### Advanced features

- **OAuth**: User can login with google account
- **Multiple currencies support**: Transactions can be added in multiple currencies with real-time exchange rates conversion
- **Track stocks or crypto**: User can add which stocks/crypto he wants to track, and compare multiple stocks in real time
- **Export Transactions:** Download transaction data in CSV format for record-keeping.
- **Vault**: Vault to upload and store expense receipts

### Unique Features
  
- **Filter and Search:** Filter transactions based on categories, date ranges, or both, and search for specific transactions
- **Responsive Design:** Ensures a seamless experience on various devices
- **Inbox**: Receive friend request invitations and acceptance messages 
- **Email reminders**: Reminders for dues and bills are sent on user's mail
- **Group codes**: Apart from friends,users can share group code with other people not added as friends to join the group
- **Comments**: Add comments to a group
- **Profile page with custom picture:** Users can choose and upload profile pictures as per their choice
- **Stock Heatmap**: Check out current trends in trendy stocks though a heatmap
- **Rewards:** In-App achievement badges for achieving certain financial targets

## Images
Few Images from the site

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/2542f74c-1f35-4f5c-99f5-3dfa05eb1577">

<img width="955" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/72d6c2ca-8af6-4d6f-94f8-8753f2bdd006">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/49f33955-682f-43f4-a141-8887e12d88fc">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/a1b0b8ab-9752-4dd9-b89c-7bcbd2f594bd">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/127b26af-3af9-4fd1-888b-b2ce2dae8d81">

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB,Firebase

## External Libraries/APIs
- **Google Login:** Google OAuth
- **Styling:** Bootstrap, Tailwind CSS
- **Data Visualization:** Chart.js
- **Sending mails**: Nodemailer
- **API for currency conversion**: JSDelivr
- **Debt simplification**: splitwise-js-map
- **To Export**: react-csv

## Installation

1. Clone the repository:
   `git clone https://github.com/Khanak21/Paisa-Vasooli.git`

2. Install dependencies for both frontend and backend:

```
   cd frontend
   npm install

   cd backend
   npm install
```

3. Configure MongoDB connection: Update the MongoDB connection string in
   `backend/db/db.js`

4. Run the application:
```
//Run frontend (in the frontend directory)
npm start

//Run backend (in the backend directory)
npm run serve
```

6. Access the application at `http://localhost:3000/`

## Future Additions
- **Payment Gateways:** Connection to payement apps to enable seamless on-site transactions in groups
- **Integration with payment apps**: Getting transaction data from UPI apps and displaying it on website
- **Authentication:** Enhancing user security,privacy and authentication
- **Stock prediction:** Integrating ML to display stock predictions of user-selected stocks
- **Contacts as friends:** Automatically adding all contacts related to a gmail account in friends' list
- **Drag and Drop:** Drag and Drop feature for file upload in vault

## Deployed Link
Access the deployed site here: https://paisavasooli.netlify.app/

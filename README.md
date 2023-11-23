# Paisa-Vasooli

Paisa Vasooli is a website built with the MERN stack to help you manage and track your expenses. 
This project was made during the Codesangam 2023 Event conducted by CC Club MNNIT Allahabad, the topic being "Thoth's Steller Ledger"

## Features

### Basic features

- **User Authentication:** Login Signup page with Secure user authentication system to protect user data.
- **Add Transactions:** Easily add income or expense transactions, and edit or delete them if need be.
- **Customizable Categories:** Add personalised categories to transactions.
- **Stats and transaction history:** View total income,expense, balance statistics and past transaction history on dashboard
- **Dark theme:** Feature to switch to dark mode theme.
- **Recurring Bills:** Notifications sent for recurring bills
- **Dues Reminder:** Reminders sent for due transactions.
- **Savings Tracker:** Create budgets or financial goals and track the progress.
- **Add Friends:**  Sent friend requests to people and easily add them in any groups from the friends' list.
- **Make Groups:** Create groups for splitting bills and simplifying debts among friends.
- **Split Expenses:** Split bills equally between friends in groups
- **Debt Simplification:** Simplify debts between friends in groups with minimum cash flow
- **Approval from receiver:** Approval asked from receiver before settling up bill split or debts in groups
- **Data Analysis and Visualisation:** Various Charts and graphs to visualise spending and earning on a weekly,monthly,category-wise basis.

### Advanced features

- **OAuth**: User can login with google account
- **Multiple currencies support**: Transactions can be added in any currency with real-time exchange rates conversion
- **Track stocks or crypto**: User can add which stocks/crypto he wants to track, and compare multiple stocks in real time
- **Export Transactions:** Download transaction data in CSV format for record-keeping.
- **Vault**: Vault to uplod and store expense receipts

### Unique Features
  
- **Filter and Search:** Filter transactions based on categories, date ranges, or both, and search for specific transactions.
- **Responsive Design:** Ensures a seamless experience on various devices.
- **Inbox**: Receive friend request invitations and acceptance messages 
- **Email reminders**: Reminders for dues and bills are sent on user's mail
- **Group codes**: Apart from friends,users can share group code with other people not added as friends to join the group
- **Comments**: Add comments to a group
- **Profile page with custom picture:** Users can choose and upload profile pictures as per their choice
- **Stock Heatmap**: Check out current trends in trendy stocks though a heatmap

## Images
Few Images from the site

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/983d5bf5-ae1f-4990-996f-599d3474e10f">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/39524285-e052-4949-aefa-f26e20468963">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/ebfacd6c-ab28-43a9-a4a9-666daa2b0c91">

<img width="960" alt="image" src="https://github.com/Khanak21/Paisa-Vasooli/assets/127039986/689fa5ca-28ab-4168-95c5-b204b43b8adb">

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

6. Access the application at `http://localhost:3000`

## Future Additions
- **Payment Gateways:** Connection to payement apps to enable seamless on-site transactions in groups
- **Integration with payment apps**: Getting transaction data from UPI apps and displaying it on website
- **Authentication:** Enhancing user security,privacy and authentication
- **Stock prediction:** Integrating ML to display stock predictions of user-selected stocks

## Team Members
1. Khanak Patwari : Frontend and Backend
2. Sahil Gupta : Frontend and Backend
3. Shikhar Pandya : Frontend

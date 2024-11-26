import './App.css';
import Homepage from './components/Homepage/Homepage';
import {Route,Routes} from 'react-router-dom';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ProtectedRoute from './utils/helper/protectedRoutes';
import AddBank from './components/AddBank/AddBank';
import DefaultDashboardContent from './components/DefaultDashboardContent/DefaultDashboardContent';
import DeleteBank from './components/DeleteBank/DeleteBank';
import CreateUser from './components/CreateUser/CreateUser';
import DeleteUser from './components/DeleteUser/DeleteUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import UpdateBank from './components/UpdateBank/UpdateBank';
import GetAllUsers from './components/GetAllUsers/GetAllUsers';
import GetLedger from './components/GetLedger/GetLedger';
import GetAllBanks from './components/GetAllBanks/GetAllBanks';
import DefaultUserDashboard from './components/DefaultUserDashboard/DefaultUserDashboard';
import CreateAccount from './components/CreateAccount/CreateAccount';
import GetAllAccounts from './components/GetAllAccounts/GetAllAccounts';
import DeleteAccounts from './components/DeleteAccounts/DeleteAccounts';
import ViewPassbook from './components/ViewPassbook/ViewPassbook';
import KYC from './components/KYC/KYC';
import TransferMoney from './components/TransferMoney/TransferMoney';
import KycRequests from './components/KycRequests/KycRequests';
import GetAllBankAccounts from './components/GetAllBankAccounts/GetAllBankAccounts';
import GetAllUserAccounts from './components/GetAllUserAccounts/GetAllUserAccounts';


function App() {
  
    return ( 
      
      <Routes>
      {/* Homepage Route */}
      <Route path="/" element={<Homepage />} />

      {/* Admin Dashboard Nested Routing */}
      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute role="admin" component={AdminDashboard} />}
      >
        <Route index element={<DefaultDashboardContent />} />
        <Route
          path="add-bank"
          element={<ProtectedRoute role="admin" component={AddBank} />}
        />
        <Route
          path="delete-bank"
          element={<ProtectedRoute role="admin" component={DeleteBank} />}
        />
        <Route
          path="create-user"
          element={<ProtectedRoute role="admin" component={CreateUser} />}
        />
        <Route
          path="delete-user"
          element={<ProtectedRoute role="admin" component={DeleteUser} />}
        />
        <Route
          path="update-user"
          element={<ProtectedRoute role="admin" component={UpdateUser} />}
        />
        <Route
          path="update-bank"
          element={<ProtectedRoute role="admin" component={UpdateBank} />}
        />
        <Route
          path="get-users"
          element={<ProtectedRoute role="admin" component={GetAllUsers} />}
        />
        <Route
          path="get-ledger"
          element={<ProtectedRoute role="admin" component={GetLedger} />}
        />
        <Route
          path="get-banks"
          element={<ProtectedRoute role="admin" component={GetAllBanks} />}
        />

        <Route
          path="get-bank-accounts"
          element={<ProtectedRoute role="admin" component={GetAllBankAccounts} />}
        />

<Route
          path="get-user-accounts"
          element={<ProtectedRoute role="admin" component={GetAllUserAccounts} />}
        />

        <Route
          path="kyc-requests"
          element={<ProtectedRoute role="admin" component={KycRequests} />}
        />
        
      </Route>
      
      

      {/* User Dashboard Route */}
      {/* <Route
        path="/user-dashboard"
        element={<ProtectedRoute role="user" component={UserDashboard} />}
      /> */}

      <Route
        path="/user-dashboard"
        element={<ProtectedRoute role="user" component={UserDashboard} />}
      >
        {/* Default user dashboard content */}
        <Route index element={<DefaultUserDashboard />} />
        <Route path='create-account' element={<ProtectedRoute role="user" component={CreateAccount}/>}/>
        <Route path='view-accounts' element={<ProtectedRoute role="user" component={GetAllAccounts}/>}/>
        <Route path='delete-account' element={<ProtectedRoute role="user" component={DeleteAccounts}/>}/>
        <Route path='view-passbook' element={<ProtectedRoute role="user" component={ViewPassbook}/>}/>
        <Route path='kyc' element={<ProtectedRoute role="user" component={KYC}/>}/>
        <Route path="transfer-money" element={<ProtectedRoute role="user" component={TransferMoney} />}
        />
      </Route>
      
      
    </Routes>
  )
}

export default App;

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
      </Route>
      
      

      {/* User Dashboard Route */}
      <Route
        path="/user-dashboard"
        element={<ProtectedRoute role="user" component={UserDashboard} />}
      />
    </Routes>
  )
}

export default App;

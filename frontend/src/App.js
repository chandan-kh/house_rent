import React from 'react';
import {BrowserRouter , Route , Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginOwner from './pages/LoginOwner';
import LoginTenant from './pages/LoginTenant';
import RegisterOwner from './pages/RegisterOwner';
import RegisterTenant from './pages/RegisterTenant';
import TenantLanding from './pages/TenantLanding';
import OwnerLanding from './pages/OwnerLanding';
import OwnerProfile from './pages/OwnerProfile';
import TenantProfile from './pages/TenantProfile';
import EditHouse from "./pages/EditHouse";
import Payments from "./pages/Payments";
import OwnerPayments from './pages/OwnerPayments';
import TenantRemainders from './pages/TenantRemainder';
import OwnerInsights from './pages/OwnerInsights';
import BuildingPage from './pages/BuildingPage';
import RegisterBuilding from './pages/RegisterBuilding';
import Bills from './pages/Bills';
import OwnerNotifications from './pages/OwnerNotification';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route exact path="/loginowner" element={<LoginOwner/>} />
      <Route exact path="/logintenant" element={<LoginTenant/>} />
      <Route exact path="/registerowner" element={<RegisterOwner/>} />
      <Route exact path="/registertenant" element={<RegisterTenant/>} />
      <Route exact path="/tenantlanding" element={<TenantLanding/>} />
      <Route exact path="/ownerlanding" element={<OwnerLanding/>} />
      <Route exact path="/ownerprofile" element={<OwnerProfile/>} />
      <Route exact path="/tenantprofile" element={<TenantProfile/>} />
      <Route exact path="/edithouse/:house_id" element={<EditHouse/>} />
      <Route exact path="/payments/:houseId/:ownerId/:rentAmount" element={<Payments/>} />
      <Route exact path="/ownerpayments" element={<OwnerPayments/>} />
      <Route exact path="/tenantreminders" element={<TenantRemainders/>} />
      <Route exact path="/ownerinsights" element={<OwnerInsights/>} />
      <Route exact path="/buildingpage" element={<BuildingPage/>} />
      <Route exact path="/registerbuilding/:numberofhouses" element={<RegisterBuilding/>} />
      <Route exact path="/bills" element={<Bills/>} />
      <Route exact path="/ownernotifications" element={<OwnerNotifications/>} />
    </Routes>    
    </BrowserRouter>
  );
}

export default App;

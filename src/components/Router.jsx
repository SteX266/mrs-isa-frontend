import React from "react";
import "bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BusinessUserViewServicesPage from "./business/BusinesUserViewPage";
import BusinessUserEditPage from "./business/BusinessUserEditPage";
import BusinessUserReservationPage from "./business/BusinessUserReservationPage";
import BusinessUserCreatePage from "./business/BusinessUserCreatePage";
import ChangePasswordPage from "./business/ChangePasswordPage";
import BusinessUserNavbar from "./business/BusinessUserNavbar";
import Header from "./client_components/Header";
import Footer from "./client_components/Footer";
import NavigationBar from "./client_components/NavigationBar";
import EntityList from "./client_components/EntityList";
import LoginForm from "./client_components/LoginForm";
import RegisterForm from "./client_components/RegisterForm";
import ClientProfile from "./client_components/ClientProfile";
import AdminNavbar from "./admin/AdminNavbar";
import RegistrationRequest from "./admin/RegistrationRequest";
import AdminProfile from "./admin/AdminProfile";
import AdminRegistration from "./admin/AdminRegistration";
import NavigationBarClient from "./client_components/NavigationBarClient";
import ClientReservationsTable from "./client_components/ClientReservationTable";
import ListingProfilePage from "./client_components/ListingProfilePage";
import Map from "./client_components/Map";
import ClientCalendar from "./ClientCalendar";
import ClientPastReservations from "./client_components/ClientPastReservations";
import ClientSubscriptions from "./client_components/ClientSubscriptions";
import { Toaster } from "react-hot-toast";
import LoyaltyProgram from "./admin/LoyaltyProgram";
import ReportsPage from "./reports/ReportsPage";
import AccountCancelationRequest from "./admin/AccountCancellationRequest";
import ReservationReport from "./admin/ReservationReport";
import AdminReport from "./reports/AdminReport";
import BussinessPromoPage from "./business/PromoPage";
import BussinessUserReservation from "./reservation/BussinessUserReservation";
import HomePageAdmin from "./admin/HomePageAdmin";
import ReviwRequest from "./admin/ReviewRequest";
import ClientComplaint from "./admin/ClienetComplains";

export default function Router() {

  function Nested(type) {
    return (
      <>
        <Route
          path="home"
          element={<BusinessUserViewServicesPage type={type} />}
        />
        <Route
          path="services"
          element={<BusinessUserViewServicesPage type={type} />}
        />
        <Route
          path="services/create"
          element={<BusinessUserCreatePage type={type} />}
        />
        <Route path="edit/:id" element={<BusinessUserEditPage type={type} />} />
        <Route path="reports" element={<ReportsPage type={type} />} />
        <Route path="promos/:id" element={<BussinessPromoPage />} />
        <Route
          path="reservations"
          element={<BusinessUserReservationPage type={type} />}
        />

        <Route path="profile" element={<ClientProfile />} />
        <Route path="calendar/:id" element={<BussinessUserReservation />} />

        <Route path="change-password" element={<ChangePasswordPage />} />
        <Route path="edit" element={<h1>Account</h1>} />
        <Route
          path="profile/:id"
          element={<ListingProfilePage type={type} />}
        />
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/captain/*"
            element={<BusinessUserNavbar type="captain" />}
          >
            {Nested("captain")}
          </Route>

          <Route path="/host/*" element={<BusinessUserNavbar type="host" />}>
            {Nested("host")}
          </Route>
          <Route
            path="/instructor/*"
            element={<BusinessUserNavbar type="instructor" />}
          >
            {Nested("instructor")}
          </Route>

          <Route path="/admin/*" element={<AdminNavbar></AdminNavbar>}>
            <Route path="home" element={<HomePageAdmin />} />
            <Route
              path="registration-request"
              element={<RegistrationRequest />}
            />
            <Route path="report" element={<AdminReport />} />
            <Route
              path="cancellation-request"
              element={<AccountCancelationRequest />}
            />
            <Route
              path="reservation-report-client"
              element={<ReviwRequest />}
            />
            <Route path="reservation-complain" element={<ClientComplaint />} />

            <Route
              path="profile/:id"
              element={<ListingProfilePage type="admin" />}
            />
            <Route path="reservation-report" element={<ReservationReport />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="registerAdmin" element={<AdminRegistration />} />
            <Route
              path="viewEntities"
              element={<EntityList type="ALL_ENTITIES" userType="admin" />}
            />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="loyalty" element={<LoyaltyProgram />} />
          </Route>
        </Routes>
        <Routes>
          <Route
            path="/client"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <EntityList type="ALL_ENTITIES" userType="client" />
              </>
            }
          />
          <Route
            path="/client/clientProfile"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ClientProfile />
              </>
            }
          />
          <Route
            path="/client/vacations"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <EntityList type="VACATION" userType="client" />
              </>
            }
          />
          <Route
            path="/client/vessels"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <EntityList type="VESSEL" userType="client" />
              </>
            }
          />
          <Route
            path="/client/adventures"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <EntityList type="ADVENTURE" userType="client" />
              </>
            }
          />

          <Route
            path="/client/reservations"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ClientReservationsTable
                  clientEmail={localStorage.getItem("username")}
                />
              </>
            }
          />

          <Route
            path="/client/reservationsHistory"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ClientPastReservations
                  clientEmail={localStorage.getItem("username")}
                />
              </>
            }
          />

          <Route
            path="/client/changePassword"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ChangePasswordPage />
              </>
            }
          />

          <Route
            path="/client/subscriptions"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ClientSubscriptions />
              </>
            }
          />

          <Route
            path="/client/profile/:id"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ListingProfilePage type="client"></ListingProfilePage>
              </>
            }
          />

          <Route
            path="/client/calendar/:id"
            element={
              <>
                <Header></Header>
                <NavigationBarClient />
                <ClientCalendar></ClientCalendar>
              </>
            }
          />
        </Routes>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <EntityList type="ALL_ENTITIES" userType="unregistered" />
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <RegisterForm />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <LoginForm />
              </>
            }
          />
          <Route
            path="/vacations"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <EntityList type="VACATION" userType="unregistered" />
              </>
            }
          />
          <Route
            path="/vessels"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <EntityList type="VESSEL" userType="unregistered" />
              </>
            }
          />

          <Route
            path="/map"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <Map></Map>
              </>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <ListingProfilePage type="unregistered" />{" "}
              </>
            }
          />
          <Route
            path="/adventures"
            element={
              <>
                <Header></Header>
                <NavigationBar />
                <EntityList type="ADVENTURE" userType="unregistered" />
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

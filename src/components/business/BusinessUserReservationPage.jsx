import React from "react";
import ReservationsTable from "./ReservationsTable";
export default function BusinessUserReservationPage() {
  return (
    <>
    <ReservationsTable ownerEmail={localStorage.getItem("username")}></ReservationsTable>
    </>
  );
}

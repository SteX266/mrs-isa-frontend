import { useState } from "react";
import { Nav } from "react-bootstrap";
import AttendanceReport from "./AttendanceReport";
import RatingsReport from "./RatingsReport";
import RevenueReport from "./RevenueReport";

const types = {
  host: "listing",
  captain: "vessel",
  instructor: "adventure",
};

function ReportsPage({ type }) {
  const serviceType = types[type];
  const [report, setReport] = useState(
    <RatingsReport type={serviceType} userType={type} />
  );
  function changeReport(reportType) {
    switch (reportType) {
      case "score":
        setReport(<RatingsReport type={serviceType} />);
        break;
      case "attendance":
        setReport(<AttendanceReport />);
        break;
      case "revenue":
        setReport(<RevenueReport />);
        break;
      default:
        break;
    }
  }
  return (
    <>
      <Nav variant="tabs" fill>
        <Nav.Item>
          <Nav.Link onClick={() => changeReport("score")}>
            Rating Report
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeReport("revenue")}>
            Revenue Report
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => changeReport("attendance")}>
            Attendance Report
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <>{report}</>
    </>
  );
}

export default ReportsPage;

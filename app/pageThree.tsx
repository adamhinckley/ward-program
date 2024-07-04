"use client";
import { settings } from "./settings";

const { buildingCleaningSchedule, familyHistoryCorner, wardFocusTempleCorner } =
  settings;

const PageThree = () => {
  return (
    <div style={{ margin: "0 12px" }}>
      <h2 style={{ textAlign: "center" }}>Building Cleaning Schedule</h2>
      {buildingCleaningSchedule.map((announcement, index) => (
        <p style={{ marginTop: "12px" }} key={index}>
          {announcement}
        </p>
      ))}
      <h2 style={{ textAlign: "center", marginTop: "12px" }}>
        Family History Corner
      </h2>
      {familyHistoryCorner.map((announcement, index) => (
        <p style={{ marginTop: "12px" }} key={index}>
          {announcement}
        </p>
      ))}
      <h2 style={{ textAlign: "center", marginTop: "12px" }}>
        WARD FOCUS TEMPLE CORNER
      </h2>
      {wardFocusTempleCorner.map((announcement, index) => (
        <p style={{ marginTop: "12px" }} key={index}>
          {announcement}
        </p>
      ))}
    </div>
  );
};

export default PageThree;

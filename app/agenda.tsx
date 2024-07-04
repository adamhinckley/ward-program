"use client";
import ClosingHymnAndPrayer from "./closingHymnAndPrayer";
import PreSacramentAgenda from "./preSacramentAgenda";
import { settings } from "./settings";
import StandardSecondHalf from "./standardSecondHalf";

const Agenda = () => {
  return (
    <div style={{ margin: "0 12px" }}>
      <PreSacramentAgenda />
      <StandardSecondHalf />
      <ClosingHymnAndPrayer />
    </div>
  );
};

export default Agenda;

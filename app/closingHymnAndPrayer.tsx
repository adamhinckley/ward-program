"use client";
import { settings } from "./settings";

const { closingHymn, closingHymnTitle, closingPrayer } = settings;

const ClosingHymnAndPrayer = () => {
  return (
    <div className="agenda-block">
      <div className="title-container no-margin">
        <p className="agenda-title">Closing Hymn</p>
        <p className="agenda-content">{closingHymn}</p>
      </div>
      <div className="title-container hymn">
        <p className="agenda-content">{closingHymnTitle}</p>
      </div>
      <div className="title-container">
        <p className="agenda-title">Closing Prayer</p>
        <p className="agenda-content">{closingPrayer}</p>
      </div>
    </div>
  );
};

export default ClosingHymnAndPrayer;

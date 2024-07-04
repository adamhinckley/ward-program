"use client";
import { settings } from "./settings";

const {
  presiding,
  conducting,
  musicLeader,
  accompanist,
  openingHymn,
  openingHymnTitle,
  openingPrayer,
  sacramentHymn,
  sacramentHymnTitle,
} = settings;

const currentOrNextSundayDate = (() => {
  const date = new Date();
  // Get the current day of the week, 0 (Sunday) - 6 (Saturday)
  const currentDay = date.getDay();
  // If today is Sunday, don't add any days. Otherwise, calculate how many days to add to get to the next Sunday
  const daysUntilNextSunday = currentDay === 0 ? 0 : 7 - currentDay;
  // Add the necessary days to get to the next Sunday or stay on the current date if it's already Sunday
  date.setDate(date.getDate() + daysUntilNextSunday);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
})();

const PreSacramentAgenda = () => {
  return (
    <>
      <h1 className="heading">Florence Ward Sacrament Meeting</h1>
      <p className="date">{currentOrNextSundayDate}</p>
      <div className="leader-container">
        <div>
          <h2>Presiding</h2>
          <h2>Conducting</h2>
          <h2>Chorister</h2>
          <h2>Organist</h2>
        </div>
        <div className="names">
          <h2>{presiding}</h2>
          <h2>{conducting}</h2>
          <h2>{musicLeader}</h2>
          <h2>{accompanist}</h2>
        </div>
      </div>
      <p className="block">Ward Announcements</p>
      <div className="agenda-block">
        <div className="title-container no-margin">
          <p className="agenda-title">Opening Hymn</p>
          <p className="agenda-content">{openingHymn}</p>
        </div>
        <div className="title-container  hymn">
          <p className="agenda-content title">{openingHymnTitle}</p>
        </div>
        <div className="title-container">
          <p className="agenda-title">Opening Prayer</p>
          <p className="agenda-content">{openingPrayer}</p>
        </div>
      </div>
      <p className="block">Stake and Ward Business</p>
      <div className="agenda-block">
        <div className="title-container">
          <p className="agenda-title no-margin">Sacrament Hymn</p>
          <p className="agenda-content ">{sacramentHymn}</p>
        </div>
        <div className="title-container hymn">
          <p className="agenda-content">{sacramentHymnTitle}</p>
        </div>
      </div>
      <p className="block">Sacrament Administered by the Aaronic Priesthood</p>
    </>
  );
};

export default PreSacramentAgenda;

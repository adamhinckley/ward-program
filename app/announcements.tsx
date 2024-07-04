"use client";
import { settings } from "./settings";

const {
  wardAnnouncements,
  reliefSocietyLessons,
  priesthoodLessons,
  sundaySchoolLessons,
  primaryAnnouncements,
} = settings;

const Announcements = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Ward Announcements</h2>
      <ul>
        {wardAnnouncements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
      <h2 style={{ textAlign: "center" }}>
        Relief Society Lessons (2nd & 4th) & Announcements
      </h2>
      <ul>
        {reliefSocietyLessons.map((lesson, index) =>
          lesson.link ? (
            <a href={lesson.link} key={index}>
              <li key={index}>{lesson.text}</li>
            </a>
          ) : (
            <li key={index}>{lesson.text}</li>
          ),
        )}
      </ul>
      <h2 style={{ textAlign: "center" }}>
        Priesthood Lessons (2nd & 4th) & Announcements
      </h2>
      <ul>
        {priesthoodLessons.map((lesson, index) =>
          lesson.link ? (
            <a href={lesson.link} key={index}>
              <li key={index}>{lesson.text}</li>
            </a>
          ) : (
            <li key={index}>{lesson.text}</li>
          ),
        )}
      </ul>
      <h2 style={{ textAlign: "center" }}>Sunday School Lessons (1st & 3rd)</h2>
      <ul>
        {sundaySchoolLessons.map((lesson, index) =>
          lesson.link ? (
            <a href={lesson.link} key={index}>
              <li key={index}>{lesson.text}</li>
            </a>
          ) : (
            <li key={index}>{lesson.text}</li>
          ),
        )}
      </ul>
      <h2 style={{ textAlign: "center" }}>Primary Announcements</h2>
      <ul>
        {primaryAnnouncements.map((announcement, index) => (
          <li key={index}>{announcement}</li>
        ))}
      </ul>
    </>
  );
};

export default Announcements;

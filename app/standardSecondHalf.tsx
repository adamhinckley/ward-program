"use client";
import { settings } from "./settings";
import "./globals.css";

const { blockOne, blockTwo, intermediateMusic, isTestimonyMeeting } = settings;

const hasMultiplePerformers = intermediateMusic.performers.length > 1;

const StandardSecondHalf = () => {
  return (
    <>
      {isTestimonyMeeting ? (
        <p className="block">Bearing of Testimonies</p>
      ) : (
        <>
          {blockOne.map((block, index) => {
            return block.content ? (
              <div className="agenda-block" key={index}>
                <div className="title-container">
                  <p className="agenda-title">{block.title}</p>
                  <p className="agenda-content">{block.content}</p>
                </div>
              </div>
            ) : null;
          })}
          <div className="agenda-block">
            {hasMultiplePerformers ? (
              <>
                <div className="title-container no-margin">
                  <p className="agenda-title">{intermediateMusic.title}</p>
                  <p className="agenda-content">
                    {intermediateMusic.songTitle}
                  </p>
                </div>
                {intermediateMusic.performers.map((performer, index) => (
                  <div className="multiple-performers" key={index}>
                    <p className="agenda-content">{performer}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="title-container">
                  <p className="agenda-title">{intermediateMusic.title}</p>
                  <p className="agenda-content">
                    {intermediateMusic.hymnNumber}
                  </p>
                </div>
                <p className="agenda-content hymn">
                  {intermediateMusic.songTitle}
                </p>
              </>
            )}
            {blockTwo.map((block, index) => {
              return block.content ? (
                <div className="agenda-block" key={index}>
                  <div className="title-container">
                    <p className="agenda-title">{block.title}</p>
                    <p className="agenda-content">{block.content}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default StandardSecondHalf;

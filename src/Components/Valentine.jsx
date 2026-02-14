import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import GalaxyCanvas from "./GalaxyCanvas";
import loveMusic from "../assets/love.mp3";
import "./Valentine.css";

export default function Valentine() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const correctPassword = "192511"; // 🔒 CHANGE THIS TO YOUR SECRET CODE

  const [stage, setStage] = useState("ask");
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noRotation, setNoRotation] = useState(0);
  const [noIndex, setNoIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentImage, setCurrentImage] = useState(1);

  const audioRef = useRef(null);

  const girlName = "SANDHYA";
  const yourName = "SAI ARVIND";
  const totalImages = 12;

  const poem =
    "Seven years ago,\n" +
    "fate quietly connected us.\n\n" +
    "Three years ago,\n" +
    "we chose each other.\n\n" +
    "And every day since,\n" +
    "I’ve chosen you again and again.\n\n" +
    "SANDHYA ❤️ SAI ARVIND\n\n" +
    "My girl,\n" +
    "dream big.\n" +
    "Work hard.\n" +
    "Shine brighter than the moon above us.\n\n" +
    "I will always be here,\n" +
    "waiting for your success,\n" +
    "standing beside you forever.\n\n" +
    "Not temporary.\n" +
    "Not by chance.\n" +
    "But forever. ✨";

  const noTexts = [
    "No 🌙",
    "Are you sure?",
    "Think again ✨",
    "Please? 🥺",
    "Destiny says YES 💫",
  ];

  const escapeNo = () => {
    const maxX = 600;
    const maxY = 160;

    const newX = (Math.random() - 0.5) * maxX;
    const newY = Math.random() * maxY;

    setNoPosition({ x: newX, y: newY });
    setNoRotation(Math.random() * 30 - 15);
    setNoIndex((prev) => (prev + 1) % noTexts.length);
  };

  const startTypewriter = () => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(poem.substring(0, i));
      i++;
      if (i > poem.length) clearInterval(interval);
    }, 75);
  };

  const startSlideshow = () => {
    setInterval(() => {
      setCurrentImage((prev) => (prev % totalImages) + 1);
    }, 3000);
  };

  const handleYesClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.15;
      audioRef.current.play().catch(() => {});
    }

    confetti({
      particleCount: 400,
      spread: 170,
      origin: { y: 0.6 },
      colors: ["#FFD700", "#FFF8DC"],
    });

    setStage("final");
    startTypewriter();
    startSlideshow();
  };

  const handleUnlock = () => {
    if (passwordInput === correctPassword) {
      setIsUnlocked(true);
    } else {
      setError("Wrong code 💔 Try again.");
    }
  };

  if (!isUnlocked) {
    return (
      <div className="container">
        <GalaxyCanvas />
        <div className="card fade-in">
          <h2>🔐 Enter Our Secret Code</h2>

          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter code"
            className="password-input"
          />

          <button className="yes-btn" onClick={handleUnlock}>
            Unlock 💖
          </button>

          {error && <p style={{ marginTop: "10px", color: "pink" }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <GalaxyCanvas />
      <div className="moon"></div>
      <div className="water"></div>

      {stage === "ask" && (
        <div className="card fade-in">
          <p className="flirty-line">
            Seven years ago destiny connected us...
            Today I choose you again. 💞
          </p>

          <h1 className="romantic">{girlName}</h1>
          <h2>Will you keep choosing me forever?</h2>

          <div className="buttons">
            <button className="yes-btn" onClick={handleYesClick}>
              Yes 💖
            </button>

            <button
              className="no-btn"
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px) rotate(${noRotation}deg)`
              }}
              onMouseEnter={escapeNo}
              onClick={escapeNo}
            >
              {noTexts[noIndex]}
            </button>
          </div>
        </div>
      )}

      {stage === "final" && (
        <div className="card final-layout">
          <div className="left-panel">
            <div className="slideshow">
              <img
                src={`/images/${currentImage}.png`}
                alt="Our Memory"
                className="memory-image"
              />
            </div>
          </div>

          <div className="right-panel">
            <pre className="typewriter shimmer">{typedText}</pre>
            <p className="signature">— Forever Yours, {yourName} 🌙</p>
          </div>
        </div>
      )}

      <audio ref={audioRef} src={loveMusic} loop preload="auto" />
    </div>
  );
}

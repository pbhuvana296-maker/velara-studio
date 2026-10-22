import { useEffect, useRef, useState } from "react";
import "./App.css";

const watches = [
  {
    name: "Aero One",
    type: "MINIMAL COLLECTION",
    price: "₹4,999",
    color: "#dce8f5",
    accent: "#4778ed",
    image: `${import.meta.env.BASE_URL}images/aero-one.png`,
    description: "Minimal design. Maximum character.",
  },
  {
    name: "Terra Classic",
    type: "HERITAGE COLLECTION",
    price: "₹6,499",
    color: "#f1ddc8",
    accent: "#e98c48",
    image: `${import.meta.env.BASE_URL}images/terra-classic.png`,
    description: "A timeless classic for every day.",
  },
  {
    name: "Nova Sport",
    type: "ACTIVE COLLECTION",
    price: "₹5,799",
    color: "#d9eee5",
    accent: "#279b83",
    image: `${import.meta.env.BASE_URL}images/nova-sport.png`,
    description: "Built for movement. Made for you.",
  },
];

const features = [
  {
    number: "01",
    icon: "◉",
    title: "Precision movement",
    description:
      "Carefully engineered for dependable everyday timekeeping.",
    color: "#dce8ff",
  },
  {
    number: "02",
    icon: "✳",
    title: "Thoughtful materials",
    description:
      "A considered blend of comfort, finish and contemporary design.",
    color: "#f9e0ce",
  },
  {
    number: "03",
    icon: "↗",
    title: "Made to stand out",
    description:
      "Clean proportions and a confident look that works everywhere.",
    color: "#d9eee5",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function WatchImage({ src, alt, className = "" }) {
  return (
    <div className={`watch-image-box ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => {
          console.error(
            `Unable to load ${src}. Check the image filename and Vite base path.`
          );
        }}
      />
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWatch, setActiveWatch] = useState(0);
  const [selectedWatch, setSelectedWatch] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const heroRef = useRef(null);
  const modelRef = useRef(null);

  const watch = watches[activeWatch];

  // Full-width layout, colourful navbar and animations
  const customStyles = `
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      width: 100%;
      margin: 0;
      scroll-behavior: smooth;
      scroll-padding-top: 80px;
    }

    body {
      width: 100%;
      min-width: 320px;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

    #root {
      width: 100%;
      max-width: none !important;
      min-height: 100vh;
      margin: 0 !important;
      padding: 0 !important;
      text-align: left !important;
    }

    .website {
      position: relative;
      width: 100% !important;
      max-width: none !important;
      min-height: 100vh;
      margin: 0 !important;
      padding: 0;
      overflow: clip;
    }

    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      width: 100%;
      min-height: 76px;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 14px clamp(20px, 6vw, 90px);
      background: linear-gradient(
        105deg,
        #f0d8ff 0%,
        #e0e5ff 35%,
        #dcefff 68%,
        #ffe0cc 100%
      ) !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.85);
      box-shadow: 0 8px 28px rgba(91, 73, 130, 0.08);
      backdrop-filter: blur(18px);
    }

    .brand {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      gap: 9px;
      text-decoration: none;
    }

    .brand-mark {
      display: grid;
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 15px;
      color: white !important;
      font-size: 20px;
      font-weight: 800;
      background: linear-gradient(
        135deg,
        #7657f5,
        #d760c5 60%,
        #ff9b68
      ) !important;
      box-shadow: 0 8px 20px rgba(147, 91, 227, 0.28);
    }

    .brand-name {
      color: #242039;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 2.4px;
    }

    .brand-dot {
      align-self: flex-start;
      margin-left: -7px;
      color: #8c6bec;
      font-size: 10px;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: clamp(18px, 3vw, 40px);
    }

    .nav-menu a {
      position: relative;
      padding: 8px 0;
      color: #5b5871;
      font-size: 13px;
      text-decoration: none;
      transition: color 0.25s ease;
    }

    .nav-menu a::after {
      position: absolute;
      right: 0;
      bottom: 2px;
      left: 0;
      height: 2px;
      content: "";
      background: linear-gradient(90deg, #7958f6, #fa916e);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }

    .nav-menu a:hover {
      color: #7958f6;
    }

    .nav-menu a:hover::after {
      transform: scaleX(1);
    }

    .nav-cta {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      gap: 14px;
      min-height: 44px;
      padding: 0 20px;
      border: 0;
      border-radius: 8px;
      color: #fff !important;
      font-size: 12px;
      font-weight: 700;
      background: linear-gradient(
        115deg,
        #7757f6,
        #b85be9 58%,
        #ff9867
      ) !important;
      box-shadow: 0 10px 24px rgba(153, 92, 224, 0.25);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .nav-cta:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 28px rgba(153, 92, 224, 0.32);
    }

    .menu-toggle {
      display: none;
      width: 42px;
      height: 42px;
      border: 1px solid rgba(119, 87, 246, 0.18);
      border-radius: 10px;
      color: #5d4c9e;
      font-size: 20px;
      background: rgba(255, 255, 255, 0.65);
      cursor: pointer;
    }

    .hero {
      display: grid;
      width: 100%;
      min-height: calc(100vh - 76px);
      grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
      margin: 0;
    }

    .hero-copy {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      min-width: 0;
      padding: clamp(35px, 5vw, 76px);
      animation: velaraCopyEnter 0.8s ease both;
    }

    .hero-title {
      max-width: 700px;
      font-size: clamp(48px, 6.2vw, 88px);
      line-height: 1.06;
      letter-spacing: -0.07em;
    }

    .gradient-text {
      color: #8d61ef;
      background: linear-gradient(
        100deg,
        #4778ed,
        #8a5ff2 45%,
        #d26fc0 75%,
        #f18c70
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-description {
      max-width: 450px;
      line-height: 1.9;
    }

    .hero-visual {
      position: relative;
      display: flex;
      min-width: 0;
      min-height: calc(100vh - 76px);
      flex-direction: column;
      justify-content: space-between;
      padding: 26px clamp(20px, 4vw, 54px) 28px;
      overflow: hidden;
      isolation: isolate;
      background:
        radial-gradient(
          ellipse at 52% 48%,
          rgba(182, 208, 251, 0.72) 0%,
          rgba(225, 226, 255, 0.48) 40%,
          transparent 72%
        ),
        linear-gradient(145deg, #f0eaff, #f4efff 52%, #e4efff);
      animation: velaraVisualEnter 1s ease both;
    }

    .hero-visual::before {
      position: absolute;
      z-index: -1;
      inset: 0;
      content: "";
      pointer-events: none;
      background-image: radial-gradient(
        rgba(130, 110, 180, 0.22) 0.7px,
        transparent 0.7px
      );
      background-size: 19px 19px;
      opacity: 0.28;
      mask-image: linear-gradient(
        to bottom,
        transparent,
        black 30%,
        black 70%,
        transparent
      );
    }

    .visual-top {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      color: #777287;
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1px;
    }

    .visual-orbit {
      position: absolute;
      top: 48%;
      left: 50%;
      z-index: -1;
      aspect-ratio: 1;
      border: 1px solid rgba(113, 142, 205, 0.2);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
    }

    .orbit-one {
      width: min(69%, 480px);
      animation: orbitPulse 6s ease-in-out infinite;
    }

    .orbit-two {
      width: min(84%, 590px);
      border-style: dashed;
      border-color: rgba(170, 135, 235, 0.22);
      animation: orbitRotate 42s linear infinite;
    }

    .visual-star {
      position: absolute;
      z-index: 2;
      color: #9872f5;
      font-size: 23px;
      animation: starTwinkle 3s ease-in-out infinite;
    }

    .star-one {
      top: 26%;
      left: 18%;
    }

    .star-two {
      top: 44%;
      right: 12%;
      color: #ff9b69;
      animation-delay: 1s;
    }

    .visual-number {
      position: absolute;
      right: 7%;
      bottom: -5%;
      color: rgba(255, 255, 255, 0.52);
      font-size: clamp(120px, 20vw, 230px);
      font-weight: 900;
      line-height: 1;
      letter-spacing: -0.1em;
      pointer-events: none;
    }

    .watch-model {
      position: absolute;
      top: 47%;
      left: 50%;
      display: grid;
      width: min(75%, 480px);
      height: 57%;
      place-items: center;
      transform: translate(
          calc(-50% + var(--move-x, 0px)),
          calc(-50% + var(--move-y, 0px))
        )
        perspective(1000px) rotateX(var(--rotate-x, 0deg))
        rotateY(var(--rotate-y, 0deg));
      transform-style: preserve-3d;
      transition: transform 0.2s ease-out;
    }

    .watch-model-glow {
      position: absolute;
      width: 74%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--watch-accent, #7893ff);
      filter: blur(75px);
      opacity: 0.2;
      animation: glowBreath 5s ease-in-out infinite;
      pointer-events: none;
    }

    .watch-image-box {
      position: relative;
      display: grid;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      place-items: center;
    }

    .watch-image-box img {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 100%;
      object-fit: contain;
      object-position: center;
    }

    .hero-watch-image {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 25px 28px rgba(46, 53, 89, 0.2));
      animation: watchFloat 5s ease-in-out infinite;
    }

    .hero-watch-image img {
      visibility: visible !important;
      opacity: 1 !important;
    }

    .visual-product-info {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      margin-top: auto;
      padding-top: 18px;
    }

    .mini-label {
      color: #8c839f;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1.5px;
    }

    .visual-product-info h2 {
      margin: 6px 0;
      color: #27233b;
      font-size: clamp(19px, 2vw, 26px);
    }

    .visual-product-info p {
      margin: 0;
      color: #7e788e;
      font-size: 12px;
      line-height: 1.6;
    }

    .visual-product-info > strong {
      color: #342a56;
      font-size: 16px;
      white-space: nowrap;
    }

    .visual-controls {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-top: 24px;
    }

    .watch-dots {
      display: flex;
      align-items: center;
      gap: 9px;
    }

    .watch-dots button {
      width: 11px;
      height: 11px;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 50%;
      background: var(--dot-color);
      cursor: pointer;
      transition: transform 0.25s ease, outline 0.25s ease;
    }

    .watch-dots button.dot-active {
      outline: 2px solid var(--dot-color);
      outline-offset: 3px;
      transform: scale(1.08);
    }

    .visual-arrows {
      display: flex;
      gap: 8px;
    }

    .visual-arrows button {
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border: 1px solid rgba(124, 111, 164, 0.22);
      border-radius: 50%;
      color: #5b4c89;
      font-size: 16px;
      background: rgba(255, 255, 255, 0.55);
      cursor: pointer;
      transition: color 0.25s ease, background 0.25s ease;
    }

    .visual-arrows button:hover {
      color: white;
      background: #8061ed;
    }

    .visual-bottom-note {
      position: absolute;
      top: 53%;
      right: 3%;
      color: #9690ac;
      font-family: monospace;
      font-size: 8px;
      letter-spacing: 1px;
      writing-mode: vertical-rl;
    }

    .colour-strip {
      width: 100%;
      overflow: hidden;
      padding: 18px 0;
      color: #fff;
      background: linear-gradient(
        105deg,
        #7657f5,
        #a65fe6 35%,
        #d36bb8 68%,
        #f39470
      );
    }

    .strip-track {
      display: flex;
      width: max-content;
      animation: stripScroll 35s linear infinite;
    }

    .strip-track:hover {
      animation-play-state: paused;
    }

    .strip-group {
      display: flex;
      align-items: center;
      gap: 26px;
      padding-right: 26px;
      white-space: nowrap;
    }

    .strip-group span {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1.7px;
    }

    .strip-group b {
      font-size: 16px;
    }

    .section-padding {
      padding: clamp(60px, 9vw, 120px) clamp(20px, 7vw, 100px);
    }

    .section-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding-bottom: 22px;
      border-bottom: 1px solid rgba(111, 100, 143, 0.16);
    }

    .section-label {
      color: #857998;
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1.4px;
    }

    .section-aside {
      color: #a19aad;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1px;
      text-align: right;
    }

    .story {
      background: #fbfaf7;
    }

    .story-layout {
      display: grid;
      grid-template-columns: 1fr 0.75fr;
      align-items: center;
      gap: clamp(25px, 7vw, 100px);
      padding: 65px 0 50px;
    }

    .story-title h2,
    .feature-intro h2,
    .specs-copy h2,
    .collection-heading h2,
    .newsletter-copy h2 {
      margin: 0;
      color: #17141e;
      font-size: clamp(38px, 5.5vw, 68px);
      line-height: 1.1;
      letter-spacing: -0.065em;
    }

    .story-content p,
    .feature-intro > p,
    .specs-copy > p,
    .collection-heading > p,
    .newsletter-copy > p {
      color: #797583;
      font-size: 14px;
      line-height: 1.9;
    }

    .text-link {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      border: 0;
      color: #6c55c4;
      font-size: 12px;
      font-weight: 700;
      background: transparent;
      cursor: pointer;
      transition: gap 0.25s ease;
    }

    .text-link:hover {
      gap: 18px;
    }

    .story-art {
      position: relative;
      display: grid;
      min-height: 410px;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      overflow: hidden;
      border-radius: 8px;
      background: linear-gradient(120deg, #e9e2ff, #dae7ff 55%, #fae3d6);
      isolation: isolate;
    }

    .story-art-bg {
      position: absolute;
      z-index: -1;
      top: -45%;
      left: 28%;
      width: 65%;
      aspect-ratio: 1;
      border: 1px solid rgba(126, 100, 202, 0.25);
      border-radius: 50%;
      box-shadow:
        0 0 0 34px rgba(255, 255, 255, 0.12),
        0 0 0 70px rgba(255, 255, 255, 0.1);
    }

    .story-art-text {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 30px;
    }

    .story-art-text span,
    .story-art-index {
      color: #77708d;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1.2px;
    }

    .story-art-text strong {
      max-width: 220px;
      color: #29233d;
      font-size: clamp(25px, 3vw, 38px);
      line-height: 1.2;
    }

    .story-watch {
      height: 300px;
      padding: 20px;
      animation: watchFloat 5s ease-in-out infinite;
    }

    .story-art-index {
      position: absolute;
      right: 22px;
      bottom: 22px;
    }

    .features {
      background: #fff;
    }

    .feature-intro {
      display: grid;
      grid-template-columns: 1fr 0.55fr;
      align-items: end;
      gap: 30px;
      padding: 55px 0 42px;
    }

    .feature-intro > p {
      max-width: 340px;
      margin-bottom: 4px;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .feature-card {
      position: relative;
      display: flex;
      min-height: 275px;
      flex-direction: column;
      padding: 24px;
      border: 1px solid rgba(80, 65, 110, 0.04);
      border-radius: 8px;
      background: var(--feature-bg);
      transition:
        transform 0.35s ease,
        box-shadow 0.35s ease;
      transition-delay: var(--delay, 0ms);
    }

    .feature-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 16px 35px rgba(48, 42, 75, 0.1);
    }

    .feature-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #827c90;
      font-family: monospace;
      font-size: 10px;
    }

    .feature-icon {
      font-size: 22px;
    }

    .feature-symbol {
      margin-top: 30px;
      color: #6c5ac4;
      font-size: 29px;
    }

    .feature-card h3 {
      margin: 16px 0 8px;
      color: #29243b;
      font-size: 18px;
    }

    .feature-card p {
      max-width: 290px;
      margin: 0;
      color: #777284;
      font-size: 12px;
      line-height: 1.8;
    }

    .feature-arrow {
      align-self: flex-end;
      margin-top: auto;
      color: #6e59c5;
      font-size: 20px;
    }

    .specifications {
      display: grid;
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      align-items: center;
      gap: clamp(35px, 8vw, 110px);
      background: #f8f6fc;
    }

    .specs-copy > p {
      max-width: 410px;
      margin-top: 24px;
    }

    .specs-list {
      margin: 32px 0;
      border-top: 1px solid rgba(105, 92, 137, 0.16);
    }

    .specs-list > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding: 15px 0;
      border-bottom: 1px solid rgba(105, 92, 137, 0.16);
    }

    .specs-list span {
      color: #968ca7;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1px;
    }

    .specs-list strong {
      color: #484155;
      font-size: 12px;
      text-align: right;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      min-height: 46px;
      padding: 0 21px;
      border: 0;
      border-radius: 7px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
    }

    .button:hover {
      transform: translateY(-3px);
    }

    .button-primary {
      color: white;
      background: linear-gradient(115deg, #7757f6, #bc63df 58%, #f39870);
      box-shadow: 0 10px 25px rgba(129, 91, 226, 0.2);
    }

    .button-primary:hover {
      box-shadow: 0 14px 30px rgba(129, 91, 226, 0.3);
    }

    .button-dark {
      color: white;
      background: #242033;
    }

    .button-light {
      color: #47366d;
      background: #fff;
    }

    .specs-visual {
      position: relative;
      display: grid;
      min-height: 480px;
      place-items: center;
      overflow: hidden;
      border-radius: 8px;
      background: radial-gradient(circle, #e6e0ff, #e4edff 62%, #f5e6e7);
      isolation: isolate;
    }

    .spec-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64%;
      aspect-ratio: 1;
      border: 1px solid rgba(115, 101, 194, 0.24);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .ring-b {
      width: 83%;
      border-style: dashed;
      opacity: 0.65;
    }

    .spec-watch {
      position: relative;
      z-index: 1;
      width: 70%;
      height: 75%;
      animation: watchFloat 5s ease-in-out infinite;
    }

    .spec-tag {
      position: absolute;
      z-index: 2;
      padding: 8px 10px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 20px;
      color: #65598a;
      font-family: monospace;
      font-size: 9px;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(8px);
    }

    .tag-a {
      top: 18%;
      left: 8%;
    }

    .tag-b {
      top: 40%;
      right: 6%;
    }

    .tag-c {
      bottom: 17%;
      left: 11%;
    }

    .spec-watermark {
      position: absolute;
      right: 4%;
      bottom: -8%;
      color: rgba(255, 255, 255, 0.5);
      font-size: 150px;
      font-weight: 900;
    }

    .collection {
      background: #fff;
    }

    .collection-heading {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 24px;
      padding: 52px 0 38px;
    }

    .collection-heading > p {
      max-width: 300px;
      margin-bottom: 5px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }

    .product-card {
      min-width: 0;
      padding-bottom: 18px;
      border: 1px solid #eeeaf5;
      border-radius: 9px;
      overflow: hidden;
      background: #fff;
      transition:
        transform 0.35s ease,
        box-shadow 0.35s ease;
      transition-delay: var(--delay, 0ms);
    }

    .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 45px rgba(48, 42, 75, 0.12);
    }

    .product-image {
      position: relative;
      display: grid;
      width: 100%;
      height: clamp(240px, 30vw, 360px);
      place-items: center;
      padding: 22px;
      border: 0;
      overflow: hidden;
      background: var(--product-bg, #f2edff);
      cursor: pointer;
    }

    .product-image::after {
      position: absolute;
      inset: 10%;
      border: 1px solid rgba(255, 255, 255, 0.55);
      border-radius: 50%;
      content: "";
      pointer-events: none;
      transition: transform 0.5s ease;
    }

    .product-card:hover .product-image::after {
      transform: scale(1.08);
    }

    .product-image .watch-image-box {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      transition: transform 0.45s ease;
    }

    .product-card:hover .product-image .watch-image-box {
      transform: scale(1.05) rotate(-2deg);
    }

    .product-index {
      position: absolute;
      top: 15px;
      left: 16px;
      z-index: 3;
      color: #777087;
      font-family: monospace;
      font-size: 10px;
    }

    .product-view {
      position: absolute;
      right: 12px;
      bottom: 12px;
      z-index: 3;
      padding: 9px 12px;
      border-radius: 5px;
      color: #544179;
      font-size: 10px;
      background: rgba(255, 255, 255, 0.75);
      opacity: 0;
      transform: translateY(5px);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    .product-card:hover .product-view {
      opacity: 1;
      transform: translateY(0);
    }

    .product-info {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      padding: 22px 18px 12px;
    }

    .product-info h3 {
      margin: 8px 0;
      color: #2b263a;
      font-size: 20px;
    }

    .product-info p {
      margin: 0;
      color: #888293;
      font-size: 11px;
      line-height: 1.6;
    }

    .product-info > strong {
      padding-top: 20px;
      color: #42355f;
      font-size: 13px;
      white-space: nowrap;
    }

    .product-link {
      display: flex;
      width: calc(100% - 36px);
      align-items: center;
      justify-content: space-between;
      margin: 8px 18px 0;
      padding: 13px 0 0;
      border: 0;
      border-top: 1px solid #efebf5;
      color: #7358cb;
      font-size: 11px;
      font-weight: 700;
      background: transparent;
      cursor: pointer;
    }

    .collection-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      margin-top: 36px;
      padding-top: 18px;
      border-top: 1px solid #eeeaf5;
    }

    .collection-bottom > span {
      color: #8d849e;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 1px;
    }

    .philosophy {
      position: relative;
      display: grid;
      min-height: 500px;
      place-items: center;
      padding: 80px 24px;
      overflow: hidden;
      color: #fff;
      background: linear-gradient(120deg, #32284d, #59437f 55%, #84528b);
      isolation: isolate;
    }

    .philosophy-inner {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 700px;
      text-align: center;
    }

    .philosophy .section-label {
      color: #d9c8f8;
    }

    .philosophy-quote {
      display: block;
      margin: 20px 0 -22px;
      color: #e6a9ff;
      font-family: Georgia, serif;
      font-size: 100px;
      line-height: 1;
    }

    .philosophy h2 {
      margin: 0;
      font-size: clamp(40px, 6vw, 72px);
      line-height: 1.13;
      letter-spacing: -0.06em;
    }

    .philosophy h2 span {
      color: #ffd0b6;
    }

    .philosophy p {
      max-width: 440px;
      margin: 22px auto 28px;
      color: #ded6ed;
      font-size: 13px;
      line-height: 1.9;
    }

    .philosophy-shape {
      position: absolute;
      z-index: -1;
      width: 380px;
      aspect-ratio: 1;
      border: 1px solid rgba(255, 255, 255, 0.13);
      border-radius: 50%;
      box-shadow:
        0 0 0 40px rgba(255, 255, 255, 0.025),
        0 0 0 85px rgba(255, 255, 255, 0.02);
      animation: orbitPulse 7s ease-in-out infinite;
    }

    .shape-left {
      top: -180px;
      left: -140px;
    }

    .shape-right {
      right: -130px;
      bottom: -230px;
      animation-delay: 2s;
    }

    .newsletter {
      display: grid;
      grid-template-columns: 1fr 0.7fr;
      align-items: center;
      gap: 40px;
      background: #fbfaf7;
    }

    .newsletter-copy > p {
      max-width: 430px;
    }

    .newsletter-form {
      width: 100%;
    }

    .newsletter-form label {
      display: block;
      margin-bottom: 13px;
      color: #8b829c;
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1px;
    }

    .email-input {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      padding: 6px;
      border: 1px solid #e6dfef;
      border-radius: 8px;
      background: #fff;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .email-input:focus-within {
      border-color: #9273e8;
      box-shadow: 0 0 0 4px rgba(146, 115, 232, 0.1);
    }

    .email-input input {
      width: 100%;
      min-width: 0;
      padding: 12px;
      border: 0;
      outline: none;
      color: #393249;
      font-size: 13px;
      background: transparent;
    }

    .email-input button {
      display: grid;
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      place-items: center;
      border: 0;
      border-radius: 6px;
      color: #fff;
      font-size: 20px;
      background: linear-gradient(115deg, #7757f6, #ec8a9e);
      cursor: pointer;
      transition: transform 0.25s ease;
    }

    .email-input button:hover {
      transform: scale(1.04);
    }

    .form-note,
    .form-success {
      margin: 12px 0 0;
      color: #9991a5;
      font-size: 10px;
      line-height: 1.7;
    }

    .form-success {
      color: #168467;
    }

    .footer {
      width: 100%;
      padding: 38px clamp(20px, 7vw, 100px) 20px;
      color: #eae5f3;
      background: #272136;
    }

    .footer .brand-name {
      color: white;
    }

    .footer-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }

    .footer-main > p {
      margin: 0;
      color: #c5bdd3;
      font-size: 12px;
    }

    .back-top {
      padding: 10px 0;
      border: 0;
      color: #e8dafa;
      font-family: monospace;
      font-size: 10px;
      letter-spacing: 1px;
      background: transparent;
      cursor: pointer;
      transition: color 0.25s ease;
    }

    .back-top:hover {
      color: #ffa98e;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-top: 20px;
      color: #a9a0b9;
      font-family: monospace;
      font-size: 9px;
      letter-spacing: 0.7px;
    }

    .footer-bottom > div {
      display: flex;
      flex-wrap: wrap;
      gap: 18px;
    }

    .footer-bottom a {
      color: #cfc6de;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-bottom a:hover {
      color: #ffa98e;
    }

    .modal-backdrop {
      position: fixed;
      z-index: 2000;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 20px;
      overflow-y: auto;
      background: rgba(27, 21, 44, 0.66);
      backdrop-filter: blur(9px);
      animation: modalFade 0.25s ease both;
    }

    .watch-modal {
      position: relative;
      display: grid;
      width: min(780px, 100%);
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 28px;
      padding: 30px;
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
      animation: modalEnter 0.3s ease both;
    }

    .modal-close {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
      display: grid;
      width: 34px;
      height: 34px;
      place-items: center;
      border: 0;
      border-radius: 50%;
      color: #625773;
      font-size: 17px;
      background: #f1edf8;
      cursor: pointer;
    }

    .modal-watch-image {
      height: 310px;
      padding: 12px;
      border-radius: 8px;
      background: #f0ecfc;
    }

    .modal-details h2 {
      margin: 14px 0;
      color: #2d263c;
      font-size: 32px;
      letter-spacing: -1px;
    }

    .modal-details p {
      color: #7e768d;
      font-size: 13px;
      line-height: 1.8;
    }

    .modal-details > strong {
      display: block;
      margin: 20px 0;
      color: #48346c;
      font-size: 20px;
    }

    .modal-details small {
      display: block;
      margin-top: 14px;
      color: #938aa2;
      font-size: 10px;
      line-height: 1.6;
    }

    .reveal {
      opacity: 0;
      transform: translateY(22px);
      transition:
        opacity 0.7s ease,
        transform 0.7s ease;
      transition-delay: var(--delay, 0ms);
    }

    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    @keyframes velaraCopyEnter {
      from {
        opacity: 0;
        transform: translateY(22px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes velaraVisualEnter {
      from {
        opacity: 0;
        transform: translateX(24px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes watchFloat {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-11px);
      }
    }

    @keyframes glowBreath {
      0%,
      100% {
        opacity: 0.14;
        transform: scale(0.92);
      }
      50% {
        opacity: 0.28;
        transform: scale(1.08);
      }
    }

    @keyframes orbitPulse {
      0%,
      100% {
        opacity: 0.55;
        transform: translate(-50%, -50%) scale(0.98);
      }
      50% {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.03);
      }
    }

    @keyframes orbitRotate {
      from {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      to {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    @keyframes starTwinkle {
      0%,
      100% {
        opacity: 0.65;
        transform: scale(0.9) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1.15) rotate(16deg);
      }
    }

    @keyframes stripScroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }

    @keyframes modalFade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes modalEnter {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (min-width: 1600px) {
      .hero-copy {
        padding-right: 8vw;
        padding-left: 9vw;
      }

      .hero-visual {
        padding-right: 6vw;
        padding-left: 6vw;
      }
    }

    @media (max-width: 1050px) {
      .navbar {
        gap: 15px;
        padding-right: 24px;
        padding-left: 24px;
      }

      .nav-menu {
        gap: 18px;
      }

      .hero {
        grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      }

      .hero-copy {
        padding: 36px;
      }

      .story-layout {
        gap: 35px;
      }

      .specifications {
        gap: 35px;
      }

      .product-info {
        flex-direction: column;
      }

      .product-info > strong {
        padding-top: 0;
      }
    }

    @media (max-width: 760px) {
      .navbar {
        min-height: 68px;
        gap: 10px;
        padding: 12px 18px;
      }

      .brand-mark {
        width: 38px;
        height: 38px;
      }

      .brand-name {
        font-size: 11px;
      }

      .nav-cta {
        min-height: 39px;
        gap: 8px;
        padding: 0 12px;
        font-size: 10px;
      }

      .menu-toggle {
        display: grid;
        flex-shrink: 0;
        place-items: center;
      }

      .nav-menu {
        position: absolute;
        top: calc(100% + 8px);
        right: 12px;
        left: 12px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        padding: 12px 18px;
        border: 1px solid rgba(126, 100, 202, 0.13);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.97);
        box-shadow: 0 18px 40px rgba(54, 43, 85, 0.13);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px);
        transition:
          opacity 0.25s ease,
          transform 0.25s ease;
      }

      .nav-menu.nav-menu-open {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }

      .nav-menu a {
        padding: 14px 4px;
        border-bottom: 1px solid #f0edf6;
      }

      .nav-menu a:last-child {
        border-bottom: 0;
      }

      .hero {
        grid-template-columns: minmax(0, 1fr);
      }

      .hero-copy {
        padding: 64px 24px 46px;
      }

      .hero-title {
        font-size: clamp(48px, 11vw, 76px);
      }

      .hero-visual {
        min-height: 620px;
        padding: 24px 24px;
      }

      .watch-model {
        width: min(78%, 420px);
        height: 56%;
      }

      .visual-number {
        font-size: 150px;
      }

      .story-layout,
      .feature-intro,
      .specifications,
      .collection-heading,
      .newsletter {
        grid-template-columns: minmax(0, 1fr);
      }

      .story-layout {
        gap: 20px;
        padding-top: 42px;
      }

      .story-art {
        min-height: 340px;
      }

      .feature-intro {
        gap: 15px;
        padding-top: 42px;
      }

      .feature-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .feature-card {
        min-height: 245px;
      }

      .specifications {
        gap: 38px;
      }

      .specs-visual {
        min-height: 380px;
      }

      .collection-heading {
        align-items: flex-start;
        gap: 12px;
        padding-top: 42px;
      }

      .product-grid {
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
      }

      .product-image {
        height: 360px;
      }

      .product-info {
        flex-direction: row;
      }

      .product-info > strong {
        padding-top: 20px;
      }

      .newsletter {
        gap: 28px;
      }

      .footer-main {
        flex-wrap: wrap;
      }

      .footer-main > p {
        flex-basis: 100%;
        order: 3;
      }

      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    @media (max-width: 420px) {
      .brand {
        gap: 6px;
      }

      .brand-mark {
        width: 34px;
        height: 34px;
        border-radius: 11px;
      }

      .brand-name {
        letter-spacing: 1.5px;
      }

      .nav-cta {
        padding: 0 9px;
        font-size: 9px;
      }

      .menu-toggle {
        width: 36px;
        height: 36px;
      }

      .hero-copy {
        padding-right: 20px;
        padding-left: 20px;
      }

      .hero-visual {
        min-height: 550px;
        padding-right: 18px;
        padding-left: 18px;
      }

      .visual-product-info {
        gap: 8px;
      }

      .visual-product-info p {
        max-width: 205px;
      }

      .story-art {
        min-height: 300px;
        grid-template-columns: 1fr 1fr;
      }

      .story-art-text {
        padding: 16px;
      }

      .story-watch {
        height: 230px;
        padding: 8px;
      }

      .section-heading {
        align-items: flex-start;
      }

      .section-aside {
        max-width: 120px;
        line-height: 1.6;
      }

      .product-image {
        height: 290px;
      }

      .product-info {
        flex-direction: column;
      }

      .product-info > strong {
        padding-top: 0;
      }

      .specs-list > div {
        align-items: flex-start;
      }

      .watch-modal {
        grid-template-columns: minmax(0, 1fr);
        gap: 18px;
        padding: 22px;
      }

      .modal-watch-image {
        height: 230px;
      }

      .modal-details h2 {
        font-size: 27px;
      }

      .collection-bottom {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }

      .reveal {
        opacity: 1;
        transform: none;
      }
    }
  `;

  // Reveal sections when they enter the viewport
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  // Mouse movement effect for the hero watch
  useEffect(() => {
    const hero = heroRef.current;
    const model = modelRef.current;

    if (!hero || !model) return;

    const handleMove = (event) => {
      const rect = hero.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      model.style.setProperty("--rotate-y", `${x * 16}deg`);
      model.style.setProperty("--rotate-x", `${y * -12}deg`);
      model.style.setProperty("--move-x", `${x * 12}px`);
      model.style.setProperty("--move-y", `${y * 12}px`);
    };

    const resetMove = () => {
      model.style.setProperty("--rotate-y", "0deg");
      model.style.setProperty("--rotate-x", "0deg");
      model.style.setProperty("--move-x", "0px");
      model.style.setProperty("--move-y", "0px");
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", resetMove);

    return () => {
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", resetMove);
    };
  }, []);

  // Smooth scrolling
  const scrollTo = (id) => {
    setMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Demo newsletter form
  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="website" id="top">
      <style>{customStyles}</style>

      {/* NAVIGATION */}
      <header className="navbar">
        <a className="brand" href="#top" aria-label="Velara home">
          <span className="brand-mark">V.</span>
          <span className="brand-name">VELARA</span>
          <span className="brand-dot">®</span>
        </a>

        <nav className={`nav-menu ${menuOpen ? "nav-menu-open" : ""}`}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>
            Collection
          </a>

          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>

          <a href="#story" onClick={() => setMenuOpen(false)}>
            Our story
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <button
          className="nav-cta"
          onClick={() => scrollTo("collection")}
        >
          Explore watches <ArrowIcon />
        </button>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* HERO */}
      <section className="hero" id="home" ref={heroRef}>
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            DESIGN YOUR OWN MOMENT
          </div>

          <h1 className="hero-title">
            Time moves.
            <br />
            <span className="gradient-text">You define it.</span>
          </h1>

          <p className="hero-description">
            More than a watch. A little detail that says a lot about you.
            Discover everyday design, reimagined.
          </p>

          <div className="hero-actions">
            <button
              className="button button-primary"
              onClick={() => scrollTo("collection")}
            >
              Discover the collection <ArrowIcon />
            </button>

            <button
              className="text-link"
              onClick={() => scrollTo("story")}
            >
              Meet Velara <span>↓</span>
            </button>
          </div>

          <div className="hero-proof">
            <div className="proof-symbols">
              <span>V</span>
              <span>✳</span>
              <span>◉</span>
            </div>

            <div>
              <strong>Designed for everyday life</strong>
              <p>Simple. Distinctive. Personal.</p>
            </div>
          </div>
        </div>

        {/* WATCH DISPLAY */}
        <div className="hero-visual" ref={modelRef}>
          <div className="visual-top">
            <span>VELARA / 00{activeWatch + 1}</span>
            <span>DESIGN OBJECT</span>
          </div>

          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <span className="visual-star star-one">✳</span>
          <span className="visual-star star-two">✦</span>

          <span className="visual-number">
            0{activeWatch + 1}
          </span>

          <div
            className="watch-model"
            style={{ "--watch-accent": watch.accent }}
          >
            <div className="watch-model-glow" />

            <WatchImage
              key={watch.image}
              src={watch.image}
              alt={watch.name}
              className="hero-watch-image"
            />
          </div>

          <div className="visual-product-info">
            <div>
              <span className="mini-label">{watch.type}</span>
              <h2>{watch.name}</h2>
              <p>{watch.description}</p>
            </div>

            <strong>{watch.price}</strong>
          </div>

          <div className="visual-controls">
            <div className="watch-dots" aria-label="Choose a watch">
              {watches.map((item, index) => (
                <button
                  key={item.name}
                  className={index === activeWatch ? "dot-active" : ""}
                  style={{ "--dot-color": item.accent }}
                  aria-label={`Show ${item.name}`}
                  aria-pressed={index === activeWatch}
                  onClick={() => setActiveWatch(index)}
                />
              ))}
            </div>

            <div className="visual-arrows">
              <button
                aria-label="Previous watch"
                onClick={() =>
                  setActiveWatch(
                    (activeWatch - 1 + watches.length) % watches.length
                  )
                }
              >
                ←
              </button>

              <button
                aria-label="Next watch"
                onClick={() =>
                  setActiveWatch((activeWatch + 1) % watches.length)
                }
              >
                →
              </button>
            </div>
          </div>

          <span className="visual-bottom-note">
            MOVE YOUR CURSOR TO EXPLORE
          </span>
        </div>
      </section>

      {/* ANIMATED COLOUR STRIP */}
      <div className="colour-strip" aria-label="Velara design values">
        <div className="strip-track">
          {[0, 1, 2, 3].map((copy) => (
            <div className="strip-group" key={copy}>
              <span>DESIGNED WITH INTENTION</span>
              <b>✳</b>
              <span>MADE FOR EVERY DAY</span>
              <b>✦</b>
              <span>YOUR TIME. YOUR STYLE.</span>
              <b>◉</b>
              <span>DETAILS THAT MATTER</span>
              <b>✳</b>
            </div>
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <section className="story section-padding" id="story">
        <div className="section-heading reveal">
          <span className="section-label">01 — THE VELARA IDEA</span>
          <span className="section-aside">A DIFFERENT POINT OF VIEW</span>
        </div>

        <div className="story-layout">
          <div className="story-title reveal">
            <h2>
              Less ordinary.
              <br />
              <span className="gradient-text">More you.</span>
            </h2>
          </div>

          <div className="story-content reveal">
            <p>
              We believe the best design doesn't need to shout. It lives in
              the details, the proportions and the feeling of wearing
              something that fits you.
            </p>

            <button
              className="text-link"
              onClick={() => scrollTo("features")}
            >
              Discover our design approach <ArrowIcon />
            </button>
          </div>
        </div>

        <div className="story-art reveal">
          <div className="story-art-bg" />

          <div className="story-art-text">
            <span>FORM FOLLOWS FEELING</span>
            <strong>Every second has a style.</strong>
          </div>

          <WatchImage
            src={watches[1].image}
            alt="Velara Terra Classic watch"
            className="story-watch"
          />

          <span className="story-art-index">V / 2026</span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features section-padding" id="features">
        <div className="section-heading reveal">
          <span className="section-label">02 — THE DETAILS</span>
          <span className="section-aside">THOUGHTFULLY CONSIDERED</span>
        </div>

        <div className="feature-intro reveal">
          <h2>
            Small details.
            <br />
            <span className="gradient-text">Big difference.</span>
          </h2>

          <p>
            Everyday essentials should feel anything but ordinary. Here is
            what goes into the Velara design philosophy.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <article
              className="feature-card reveal"
              key={feature.number}
              style={{
                "--feature-bg": feature.color,
                "--delay": `${index * 130}ms`,
              }}
            >
              <div className="feature-card-top">
                <span>{feature.number} / 03</span>
                <span className="feature-icon">{feature.icon}</span>
              </div>

              <div className="feature-symbol">{feature.icon}</div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <span className="feature-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="specifications section-padding" id="details">
        <div className="specs-copy reveal">
          <span className="section-label">03 — MADE WITH PURPOSE</span>

          <h2>
            Beauty in
            <br />
            every <span className="gradient-text">detail.</span>
          </h2>

          <p>
            A considered design language, clean proportions and a comfortable
            everyday feel. Every element has a purpose.
          </p>

          <div className="specs-list">
            <div>
              <span>DESIGN</span>
              <strong>Contemporary minimal</strong>
            </div>

            <div>
              <span>STYLE</span>
              <strong>Everyday / Occasion</strong>
            </div>

            <div>
              <span>COLLECTION</span>
              <strong>Three signature designs</strong>
            </div>

            <div>
              <span>PHILOSOPHY</span>
              <strong>Less, but better</strong>
            </div>
          </div>

          <button
            className="button button-dark"
            onClick={() => scrollTo("collection")}
          >
            Find your watch <ArrowIcon />
          </button>
        </div>

        <div className="specs-visual reveal">
          <div className="spec-ring ring-a" />
          <div className="spec-ring ring-b" />

          <WatchImage
            src={watches[0].image}
            alt="Velara Aero One watch detail"
            className="spec-watch"
          />

          <span className="spec-tag tag-a">01 / FORM</span>
          <span className="spec-tag tag-b">02 / FINISH</span>
          <span className="spec-tag tag-c">03 / FEEL</span>
          <span className="spec-watermark">V.</span>
        </div>
      </section>

      {/* COLLECTION */}
      <section className="collection section-padding" id="collection">
        <div className="section-heading reveal">
          <span className="section-label">04 — THE COLLECTION</span>
          <span className="section-aside">FIND YOUR EVERYDAY ICON</span>
        </div>

        <div className="collection-heading reveal">
          <div>
            <h2>
              Your style.
              <br />
              <span className="gradient-text">Your time.</span>
            </h2>
          </div>

          <p>
            Three distinct expressions. Choose the one that feels like you.
          </p>
        </div>

        <div className="product-grid">
          {watches.map((item, index) => (
            <article
              className="product-card reveal"
              key={item.name}
              style={{
                "--product-bg": item.color,
                "--product-accent": item.accent,
                "--delay": `${index * 140}ms`,
              }}
            >
              <button
                className="product-image"
                onClick={() => setSelectedWatch(item)}
                aria-label={`View ${item.name} details`}
              >
                <span className="product-index">0{index + 1}</span>

                <WatchImage src={item.image} alt={item.name} />

                <span className="product-view">Quick view ↗</span>
              </button>

              <div className="product-info">
                <div>
                  <span className="mini-label">{item.type}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>

                <strong>{item.price}</strong>
              </div>

              <button
                className="product-link"
                onClick={() => setSelectedWatch(item)}
              >
                Explore design <ArrowIcon />
              </button>
            </article>
          ))}
        </div>

        <div className="collection-bottom reveal">
          <span>THREE DESIGNS. ONE DESIGN PHILOSOPHY.</span>

          <button className="text-link" onClick={() => scrollTo("contact")}>
            Get in touch <ArrowIcon />
          </button>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="philosophy">
        <div className="philosophy-shape shape-left" />
        <div className="philosophy-shape shape-right" />

        <div className="philosophy-inner reveal">
          <span className="section-label">05 — OUR PHILOSOPHY</span>

          <span className="philosophy-quote">“</span>

          <h2>
            Your time is
            <br />
            <span>your signature.</span>
          </h2>

          <p>
            Choose pieces that feel like you. Wear them your way.
            Make every moment your own.
          </p>

          <button
            className="button button-light"
            onClick={() => scrollTo("collection")}
          >
            Find your signature <ArrowIcon />
          </button>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter section-padding" id="contact">
        <div className="newsletter-copy reveal">
          <span className="section-label">06 — STAY IN THE LOOP</span>

          <h2>
            Good things
            <br />
            take <span className="gradient-text">time.</span>
          </h2>

          <p>
            Get design notes, collection updates and a little inspiration
            delivered occasionally.
          </p>
        </div>

        <form className="newsletter-form reveal" onSubmit={handleSubscribe}>
          <label htmlFor="newsletter-email">YOUR EMAIL ADDRESS</label>

          <div className="email-input">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubscribed(false);
              }}
              placeholder="you@example.com"
              required
            />

            <button type="submit" aria-label="Subscribe">
              ↗
            </button>
          </div>

          {subscribed ? (
            <p className="form-success">✓ Thanks for your interest!</p>
          ) : (
            <p className="form-note">
              By subscribing, you agree to receive Velara updates.
            </p>
          )}
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main">
          <a className="brand" href="#top" aria-label="Velara home">
            <span className="brand-mark">V.</span>
            <span className="brand-name">VELARA</span>
            <span className="brand-dot">®</span>
          </a>

          <p>Thoughtful design for your everyday moments.</p>

          <button className="back-top" onClick={() => scrollTo("top")}>
            BACK TO TOP ↑
          </button>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VELARA STUDIO</span>
          <span>DESIGNED WITH INTENTION.</span>

          <div>
            <a href="#collection">Collection</a>
            <a href="#story">Our story</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {/* QUICK VIEW MODAL */}
      {selectedWatch && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedWatch(null);
            }
          }}
        >
          <section
            className="watch-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedWatch.name} details`}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedWatch(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <WatchImage
              src={selectedWatch.image}
              alt={selectedWatch.name}
              className="modal-watch-image"
            />

            <div className="modal-details">
              <span className="section-label">{selectedWatch.type}</span>

              <h2>{selectedWatch.name}</h2>
              <p>{selectedWatch.description}</p>
              <strong>{selectedWatch.price}</strong>

              <button
                className="button button-primary"
                onClick={() => {
                  setSelectedWatch(null);
                  scrollTo("contact");
                }}
              >
                Enquire about this design <ArrowIcon />
              </button>

              <small>
                Product enquiry demo — no payment or order is placed.
              </small>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
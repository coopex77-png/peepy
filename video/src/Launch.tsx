import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadSans } from "@remotion/google-fonts/InterTight";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";

const { fontFamily: sans } = loadSans("normal", { weights: ["500", "600"], subsets: ["latin"] });
const { fontFamily: mono } = loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] });

export type LaunchProps = {
  marketCap: number;
  ticker: string;
  url: string;
};

/* ---------- the joke, in numbers (same formulas as the site) ---------- */
const cmFor = (mc: number) => Math.max(2, 19 * Math.sqrt(Math.max(mc, 0) / 10000));
const fmtMC = (n: number) =>
  n < 1 ? "—" : n >= 1e9 ? "$" + (n / 1e9).toFixed(2) + "B" : n >= 1e6 ? "$" + (n / 1e6).toFixed(2) + "M" : n >= 1e3 ? "$" + (n / 1e3).toFixed(1) + "K" : "$" + n.toFixed(0);
const fmtCm = (cm: number) => (cm >= 100 ? (cm / 100).toFixed(2) + " m" : cm.toFixed(1) + " cm");
const fmtIn = (cm: number) => (cm / 2.54).toFixed(1) + " in";

// The member in the still: starts at the frog's hip, ends at the pink tip.
const MEMBER_X0 = 545;
const MEMBER_X1 = 1778;
const MEMBER_Y = 722;
const RULE_Y = 800;

export const Launch: React.FC<LaunchProps> = ({ marketCap, ticker, url }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Counter: 0 → marketCap while the rule draws (frames 10–80), ease-out like a live feed settling.
  const t = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const mc = marketCap * t;
  const cm = t === 0 ? 0 : cmFor(mc);
  const done = frame >= 80;
  const pulse = 0.65 + 0.35 * Math.sin((frame / fps) * 2.4);

  return (
    <AbsoluteFill name="Studio" style={{ backgroundColor: "#000", color: "#f4f3f1", fontFamily: sans, overflow: "hidden" }}>
      <Img
        name="Frog"
        src={staticFile("peepee.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          scale: interpolate(frame, [0, 270], [1, 1.035], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
            output: "perceptual-scale",
          }),
        }}
      />

      {/* vignette, like the site */}
      <AbsoluteFill
        name="Vignette"
        style={{ background: "radial-gradient(120% 80% at 50% 42%, transparent 40%, rgba(0,0,0,.55) 100%)" }}
      />

      {/* ---------- measurement rule, drawn like a technical drawing ---------- */}
      <Interactive.Div
        name="Rule"
        style={{
          position: "absolute",
          inset: 0,
          opacity: interpolate(frame, [8, 20, 170, 190], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
          {/* left drop from the hip down to the rule */}
          <line x1={MEMBER_X0} y1={MEMBER_Y} x2={MEMBER_X0} y2={RULE_Y + 12} stroke="#ffffff33" strokeWidth={2} strokeDasharray="3 6" />
          {/* right drop follows the growing end */}
          <line
            x1={MEMBER_X0 + (MEMBER_X1 - MEMBER_X0) * t}
            y1={MEMBER_Y}
            x2={MEMBER_X0 + (MEMBER_X1 - MEMBER_X0) * t}
            y2={RULE_Y + 12}
            stroke="#ffffff33"
            strokeWidth={2}
            strokeDasharray="3 6"
          />
          {/* the rule itself */}
          <line x1={MEMBER_X0} y1={RULE_Y} x2={MEMBER_X0 + (MEMBER_X1 - MEMBER_X0) * t} y2={RULE_Y} stroke="#ffffff55" strokeWidth={2} />
          <line x1={MEMBER_X0} y1={RULE_Y - 10} x2={MEMBER_X0} y2={RULE_Y + 10} stroke="#ffffff88" strokeWidth={2} />
          <line
            x1={MEMBER_X0 + (MEMBER_X1 - MEMBER_X0) * t}
            y1={RULE_Y - 10}
            x2={MEMBER_X0 + (MEMBER_X1 - MEMBER_X0) * t}
            y2={RULE_Y + 10}
            stroke="#ffffff88"
            strokeWidth={2}
          />
          {/* cm ticks every 10 cm, so the scale reads as a ruler */}
          {Array.from({ length: 19 }, (_, i) => (i + 1) * 10).map((mark) =>
            mark < cm ? (
              <line
                key={mark}
                x1={MEMBER_X0 + ((MEMBER_X1 - MEMBER_X0) * mark) / cmFor(marketCap)}
                y1={RULE_Y}
                x2={MEMBER_X0 + ((MEMBER_X1 - MEMBER_X0) * mark) / cmFor(marketCap)}
                y2={RULE_Y + (mark % 50 === 0 ? 8 : 4)}
                stroke="#ffffff55"
                strokeWidth={2}
              />
            ) : null,
          )}
        </svg>
      </Interactive.Div>

      {/* ---------- header ---------- */}
      <Interactive.Div
        name="Brand"
        style={{
          position: "absolute",
          top: 52,
          left: 60,
          display: "flex",
          alignItems: "center",
          gap: 22,
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Interactive.Div name="Name" style={{ fontSize: 34, fontWeight: 600, letterSpacing: "0.34em", textTransform: "uppercase" }}>
          peepee
        </Interactive.Div>
        <div style={{ width: 12, height: 12, borderRadius: 999, backgroundColor: "#7ee0a6", boxShadow: "0 0 18px #7ee0a6", opacity: pulse }} />
        <Interactive.Div name="Source" style={{ fontFamily: mono, fontSize: 20, letterSpacing: "0.18em", color: "#8b8b93", textTransform: "uppercase" }}>
          live
        </Interactive.Div>
      </Interactive.Div>

      <Interactive.Div
        name="Market cap"
        style={{
          position: "absolute",
          top: 46,
          right: 60,
          display: "grid",
          gap: 8,
          justifyItems: "end",
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Interactive.Div name="Label" style={{ fontFamily: mono, fontSize: 20, letterSpacing: "0.18em", color: "#55555e", textTransform: "uppercase" }}>
          Market cap
        </Interactive.Div>
        <div style={{ fontFamily: mono, fontSize: 40, color: "#f4f3f1", fontVariantNumeric: "tabular-nums" }}>{fmtMC(mc)}</div>
      </Interactive.Div>

      {/* ---------- the number ---------- */}
      <Interactive.Div
        name="Readout"
        style={{
          position: "absolute",
          left: 60,
          bottom: 180,
          display: "grid",
          gap: 10,
          opacity: interpolate(frame, [6, 20, 170, 190], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Interactive.Div name="Label" style={{ fontFamily: mono, fontSize: 20, letterSpacing: "0.18em", color: "#55555e", textTransform: "uppercase" }}>
          Length
        </Interactive.Div>
        <div style={{ fontFamily: mono, fontSize: 150, lineHeight: 0.92, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
          {fmtCm(cm)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: mono, fontSize: 24, color: "#8b8b93", marginTop: 6 }}>
          <span>{fmtIn(cm)}</span>
          <span>{done ? "live" : "measuring"}</span>
          <span
            style={{
              padding: "6px 16px",
              border: "1px solid #ffffff1f",
              borderRadius: 999,
              fontSize: 22,
              color: "#7ee0a6",
              opacity: interpolate(frame, [82, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}
          >
            +{fmtCm(cmFor(marketCap))}
          </span>
        </div>
      </Interactive.Div>

      {/* ---------- bottom bar ---------- */}
      <Interactive.Div
        name="Bar"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 150,
          borderTop: "1px solid #ffffff1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 60px",
          opacity: interpolate(frame, [20, 40, 170, 190], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <Interactive.Div name="Label" style={{ fontFamily: mono, fontSize: 20, letterSpacing: "0.18em", color: "#55555e", textTransform: "uppercase" }}>
            Contract
          </Interactive.Div>
          <Interactive.Div name="Contract" style={{ fontFamily: mono, fontSize: 26, color: "#8b8b93" }}>
            launching now
          </Interactive.Div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 26, color: "#8b8b93" }}>{url}</div>
        <div style={{ border: "2px solid #ffffff33", borderRadius: 999, padding: "18px 40px", fontSize: 26, fontWeight: 500 }}>Buy ${ticker}</div>
      </Interactive.Div>

      {/* ---------- end card ---------- */}
      <AbsoluteFill
        name="Dim"
        style={{
          backgroundColor: "#050608",
          opacity: interpolate(frame, [172, 200], [0, 0.78], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      />
      <AbsoluteFill name="End card" style={{ justifyContent: "center", alignItems: "center", textAlign: "center", gap: 28 }}>
        <Interactive.Div
          name="Tagline"
          style={{
            fontSize: 84,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            opacity: interpolate(frame, [185, 210], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
            translate: interpolate(frame, [185, 215], ["0px 24px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          }}
        >
          A frog whose length is the market cap.
        </Interactive.Div>
        <Interactive.Div
          name="Live"
          style={{
            fontSize: 84,
            fontWeight: 500,
            color: "#7ee0a6",
            letterSpacing: "-0.02em",
            opacity: interpolate(frame, [198, 222], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          }}
        >
          Live.
        </Interactive.Div>
        <Interactive.Div
          name="URL"
          style={{
            marginTop: 30,
            fontFamily: mono,
            fontSize: 44,
            letterSpacing: "0.08em",
            color: "#e8d9b8",
            opacity: interpolate(frame, [212, 236], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {url}
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

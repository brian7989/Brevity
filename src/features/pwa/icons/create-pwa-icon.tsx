import { ImageResponse } from "next/og";

export function createPwaIcon(size: 192 | 512) {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f4f1e9",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <span
        style={{
          color: "#171714",
          fontFamily: "Georgia, serif",
          fontSize: size * 0.58,
          fontWeight: 700,
          letterSpacing: size * -0.035,
          lineHeight: 1,
        }}
      >
        B
      </span>
      <span
        style={{
          background: "#e14b32",
          borderRadius: "50%",
          height: size * 0.1,
          marginLeft: size * 0.015,
          marginTop: size * 0.32,
          width: size * 0.1,
        }}
      />
    </div>,
    { height: size, width: size },
  );
}

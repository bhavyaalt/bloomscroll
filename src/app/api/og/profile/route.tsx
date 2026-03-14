import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const name = searchParams.get("name") || "A Reader";
  const cards = searchParams.get("cards") || "0";
  const streak = searchParams.get("streak") || "0";
  const longest = searchParams.get("longest") || "0";
  const quiz = searchParams.get("quiz") || "0";
  const days = searchParams.get("days") || "0";

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://scrollbliss.com";
  const chairUrl = `${baseUrl}/landing/center-chair.svg`;

  const stats = [
    { label: "Cards Read", value: cards, emoji: "\ud83d\udcda" },
    { label: "Day Streak", value: streak, emoji: "\ud83d\udd25" },
    { label: "Best Streak", value: longest, emoji: "\ud83c\udfc6" },
    { label: "Quiz Accuracy", value: `${quiz}%`, emoji: "\ud83c\udfaf" },
    { label: "Days Active", value: days, emoji: "\ud83d\udcc5" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 50,
          background:
            "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 50%, #E8D5F5 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Chair watermark */}
        <img
          src={chairUrl}
          width={400}
          height={400}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0.08,
          }}
        />

        {/* Top: Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#9B4ED8",
              fontWeight: 500,
            }}
          >
            BloomScroll Stats
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#7B2CBF",
            }}
          >
            {name}
          </div>
        </div>

        {/* Middle: Stats grid */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(255,255,255,0.85)",
                borderRadius: 20,
                padding: "24px 28px",
                minWidth: 170,
                border: "2px solid rgba(123, 44, 191, 0.12)",
              }}
            >
              <span style={{ fontSize: 32 }}>{stat.emoji}</span>
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: "#7B2CBF",
                  marginTop: 8,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: "#9B4ED8",
                  marginTop: 4,
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom: Branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{ fontSize: 28, fontWeight: 700, color: "#7B2CBF" }}
            >
              BloomScroll
            </span>
            <span style={{ fontSize: 20, color: "#9B4ED8" }}>
              · bloomscroll.club
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#9B4ED8",
              background: "rgba(123, 44, 191, 0.1)",
              padding: "8px 16px",
              borderRadius: 20,
            }}
          >
            Swipe smarter. Grow wiser.
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

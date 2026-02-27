// Share card as image for Instagram/Twitter stories

import { Card } from "./content-library";

export async function generateShareImage(card: Card): Promise<Blob> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  
  // Instagram story dimensions (9:16)
  canvas.width = 1080;
  canvas.height = 1920;
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#EACCD4");
  gradient.addColorStop(1, "#d4a5b0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Decorative elements
  ctx.fillStyle = "#007A5E";
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.arc(100, 200, 300, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(980, 1700, 400, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  // Topic badge
  ctx.fillStyle = "#007A5E";
  roundRect(ctx, 80, 120, 200, 50, 25);
  ctx.fill();
  ctx.fillStyle = "#EACCD4";
  ctx.font = "bold 24px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(`◆ ${card.topic[0].toUpperCase()}`, 180, 153);
  
  // Author name
  ctx.fillStyle = "#007A5E";
  ctx.font = "bold 72px Impact, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(card.author.toUpperCase(), 80, 350);
  
  // Book name
  ctx.font = "italic 36px Georgia, serif";
  ctx.fillStyle = "#007A5E";
  ctx.globalAlpha = 0.8;
  ctx.fillText(card.book, 80, 410);
  ctx.globalAlpha = 1;
  
  // Quote with word wrapping
  ctx.fillStyle = "#007A5E";
  ctx.font = "36px Georgia, serif";
  const quoteLines = wrapText(ctx, `"${card.quote}"`, 920);
  let y = 520;
  
  // Quote bar
  ctx.fillStyle = "#007A5E";
  ctx.fillRect(80, 490, 6, quoteLines.length * 50 + 40);
  
  quoteLines.forEach(line => {
    ctx.fillText(line, 110, y);
    y += 50;
  });
  
  // Insight
  ctx.font = "32px system-ui";
  ctx.fillStyle = "#007A5E";
  ctx.globalAlpha = 0.7;
  const insightLines = wrapText(ctx, card.insight, 920);
  y += 40;
  insightLines.forEach(line => {
    ctx.fillText(line, 80, y);
    y += 45;
  });
  ctx.globalAlpha = 1;
  
  // Branding
  ctx.fillStyle = "#007A5E";
  ctx.font = "bold 48px Impact, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("BLOOM", canvas.width / 2 - 60, canvas.height - 150);
  ctx.font = "italic 48px Georgia, serif";
  ctx.fillStyle = "#4D9E8A";
  ctx.fillText("scroll", canvas.width / 2 + 80, canvas.height - 150);
  
  ctx.font = "24px system-ui";
  ctx.fillStyle = "#007A5E";
  ctx.globalAlpha = 0.6;
  ctx.fillText("bloomscroll-nu.vercel.app", canvas.width / 2, canvas.height - 90);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  
  words.forEach(word => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function shareCard(card: Card): Promise<void> {
  try {
    const blob = await generateShareImage(card);
    const file = new File([blob], `bloomscroll-${card.author.toLowerCase().replace(/\s+/g, "-")}.png`, {
      type: "image/png",
    });
    
    // Try native share if available
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `${card.author} - Bloomscroll`,
        text: `"${card.quote}" — ${card.author}`,
      });
    } else {
      // Fallback: download the image
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    console.error("Share failed:", err);
  }
}

export function copyQuote(card: Card): void {
  const text = `"${card.quote}"\n\n— ${card.author}, ${card.book}\n\nvia Bloomscroll`;
  navigator.clipboard.writeText(text);
}

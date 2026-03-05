// Simple confetti animation using CSS

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  color: string;
  scale: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const COLORS = ["#7B2CBF", "#F3EAFA", "#A855F7", "#FFD700", "#FF6B6B", "#4ECDC4"];

export function createConfetti(container?: HTMLElement): () => void {
  const target = container || document.body;
  const canvas = document.createElement("canvas");
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  `;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  target.appendChild(canvas);
  
  const ctx = canvas.getContext("2d")!;
  const pieces: ConfettiPiece[] = [];
  
  // Create confetti pieces
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      rotation: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      scale: 0.5 + Math.random() * 0.5,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: 2 + Math.random() * 4,
      rotationSpeed: (Math.random() - 0.5) * 10,
    });
  }
  
  let animationId: number;
  let startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 3000) {
      canvas.remove();
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    pieces.forEach((piece) => {
      piece.x += piece.velocityX;
      piece.y += piece.velocityY;
      piece.rotation += piece.rotationSpeed;
      piece.velocityY += 0.1; // gravity
      
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.scale(piece.scale, piece.scale);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-5, -5, 10, 10);
      ctx.restore();
    });
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  return () => {
    cancelAnimationFrame(animationId);
    canvas.remove();
  };
}

// Burst confetti from center
export function burstConfetti(): void {
  if (typeof document === "undefined") return;
  createConfetti();
}

// Celebrate with multiple bursts
export function celebrate(): void {
  burstConfetti();
  setTimeout(burstConfetti, 200);
}

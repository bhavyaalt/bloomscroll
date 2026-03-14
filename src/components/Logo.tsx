import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { width: 24, height: 24, className: "w-6 h-6" },
  md: { width: 28, height: 28, className: "w-7 h-7" },
  lg: { width: 36, height: 36, className: "w-9 h-9" },
};

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const s = sizes[size];
  return (
    <Image
      src="/bloomscroll_logo.svg"
      alt="BloomScroll"
      width={s.width}
      height={s.height}
      className={`${s.className} ${className}`}
      priority
    />
  );
}

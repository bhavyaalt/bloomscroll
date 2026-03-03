"use client";

import { useAuth } from "@/components/AuthProvider";
import FollowButton from "./FollowButton";

interface GardenClientProps {
  targetUserId: string;
}

export default function GardenClient({ targetUserId }: GardenClientProps) {
  const { profile } = useAuth();
  
  return (
    <FollowButton
      currentUserId={profile?.id}
      targetUserId={targetUserId}
    />
  );
}

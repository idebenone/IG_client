"use client";

import authGuard from "@/utils/authGuard";
import FeedCards from "../_components/cards/feed-cards";

const Feed = () => {
  return (
    <div>
      <FeedCards />
    </div>
  );
};

export default authGuard(Feed);

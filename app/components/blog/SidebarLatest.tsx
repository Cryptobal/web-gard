'use client';

import LatestPosts from './LatestPosts';

export default function SidebarLatest() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <LatestPosts
        limit={5}
        showImage={false}
        compact={true}
        title="Artículos recientes"
        showViewAll={true}
      />
    </div>
  );
} 
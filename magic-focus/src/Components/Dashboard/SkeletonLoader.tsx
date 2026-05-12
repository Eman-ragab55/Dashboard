"use client";
export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Skeleton للمربعات (Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white/5 rounded-[2rem]"></div>
        ))}
      </div>
      {/* Skeleton للرسم البياني */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-80 bg-white/5 rounded-[2.5rem]"></div>
        <div className="h-80 bg-white/5 rounded-[2.5rem]"></div>
      </div>
    </div>
  );
};
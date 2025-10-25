import { Skeleton } from "@/components/ui/skeleton";

/**
 * LoadingSkeleton Component
 * Displays placeholder cards while movies are being fetched
 * Provides visual feedback during loading states
 */
export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="aspect-[2/3] w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};

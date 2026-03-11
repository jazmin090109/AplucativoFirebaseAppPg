import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/header';

const ProfilePageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <header className="shadow-sm">
        <div className="container mx-auto flex h-12 items-center justify-center px-2 md:justify-start md:px-3">
          <Skeleton className="h-6 w-24" />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-2 md:p-3">
        <Card className="max-w-md mx-auto shadow-sm">
            <CardHeader className="items-center text-center p-4">
                <Skeleton className="h-20 w-20 rounded-full mb-2" />
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
                 <div className="flex items-center gap-4 py-2 border-b">
                    <Skeleton className="h-5 w-5" />
                    <div className="flex-1 space-y-1.5">
                       <Skeleton className="h-3 w-20" />
                       <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                 <div className="flex items-center gap-4 py-2 border-b">
                    <Skeleton className="h-5 w-5" />
                    <div className="flex-1 space-y-1.5">
                       <Skeleton className="h-3 w-16" />
                       <Skeleton className="h-4 w-48" />
                    </div>
                </div>
                 <div className="flex items-center gap-4 py-2 border-b">
                    <Skeleton className="h-5 w-5" />
                    <div className="flex-1 space-y-1.5">
                       <Skeleton className="h-3 w-16" />
                       <Skeleton className="h-4 w-28" />
                    </div>
                </div>
                <div className="mt-6">
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
};


export default function Loading() {
  return (
    <div>
      <Header />
      <main className="flex-1">
        <ProfilePageSkeleton />
      </main>
    </div>
  );
}

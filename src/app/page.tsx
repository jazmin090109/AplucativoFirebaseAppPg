import { Suspense } from 'react';
import DistributorDashboard, { DistributorDashboardSkeleton } from '@/components/distributor-dashboard';
import Header from '@/components/header';
import BottomNavBar from '@/components/bottom-nav-bar';
import { getAssociateDashboard } from '@/lib/data';
import { auth } from '@/lib/auth';

export default async function Home() {
  const session = await auth();
  const associateNumber = session?.user?.associateNumber;
  
  // Fetch data here in the Server Component page
  const distributorData = associateNumber 
    ? await getAssociateDashboard(associateNumber) 
    : null;

  return (
    <>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<DistributorDashboardSkeleton />}>
          {distributorData ? (
             <DistributorDashboard distributorData={distributorData} />
          ) : (
            <div className="container mx-auto p-4 text-center">
                <p>No se pudieron cargar los datos del dashboard.</p>
            </div>
          )}
        </Suspense>
      </main>
      <BottomNavBar />
    </>
  );
}

// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { SideBar } from '@/src/components/SideBar';
import { TopMenu } from '@/src/components/TopMenu';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar/>
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">

        <TopMenu/>

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 py-6">
          { children }
        </div>
      </div>
    </>
  );
}
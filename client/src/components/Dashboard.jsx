import ActionCard from './elements/dashboard/ActionCard'
import PerformanceSection from './elements/dashboard/PerformanceSection';
import EmployeeCard from './elements/dashboard/EmployeeCard';
import Navbar from './elements/Navbar';
import Notifications from './elements/dashboard/Notifications'
import { Helmet } from 'react-helmet';

function Dashboard() {
  const pageTitle = 'Dashboard • Employee Suite';
  return (
    <div className="min-h-screen w-full flex flex-col font-sans antialiased bg-slate-50 text-slate-700 leading-relaxed">
        <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content="Overview of profile, notifications, actions, and performance." />
      </Helmet>
      {/* Main Content */}
      <main className="flex-1 p-6 bg-slate-50 w-full">
        <div className="container max-w-6xl mx-auto">
          
          <EmployeeCard />

          {/* Notifications */}
          <Notifications />

          {/* Action Cards */}
            <div className='max-w-4xl mx-auto' >
                <ActionCard />
            </div>

          {/* Performance Section */}
          <PerformanceSection />

        </div>
      </main>
    </div>
  );
}

export default Dashboard;


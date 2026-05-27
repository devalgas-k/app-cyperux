import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/shared/layout/MainLayout';
import HsePage from '@/templates/hse/HsePage';
import AdminPage from '@/templates/admin/AdminPage';
import AiConsolePage from '@/templates/ai-console/AiConsolePage';
import AuditPage from '@/templates/audit/AuditPage';
import BillingPage from '@/templates/billing/BillingPage';
import BimViewerPage from '@/templates/bim-viewer/BimViewerPage';
import CommunicationsPage from '@/templates/communications/CommunicationsPage';
import CsrdPage from '@/templates/csrd/CsrdPage';
import DailyReportPage from '@/templates/daily-report/DailyReportPage';
import DashboardPage from '@/templates/dashboard/DashboardPage';
import DesignSystemPage from '@/templates/design-system/DesignSystemPage';
import DeveloperPage from '@/templates/developer/DeveloperPage';
import DigitalTwinPage from '@/templates/digital-twin/DigitalTwinPage';
import DocumentsPage from '@/templates/documents/DocumentsPage';
import EquipmentPage from '@/templates/equipment/EquipmentPage';
import FinancePage from '@/templates/finance/FinancePage';
import GreenPage from '@/templates/green/GreenPage';
import IntegrationsPage from '@/templates/integrations/IntegrationsPage';
import IotTrackingPage from '@/templates/iot-tracking/IotTrackingPage';
import LogisticsPage from '@/templates/logistics/LogisticsPage';
import MarketplacePage from '@/templates/marketplace/MarketplacePage';
import MonitoringPage from '@/templates/monitoring/MonitoringPage';
import NotificationsPage from '@/templates/notifications/NotificationsPage';
import OfflinePage from '@/templates/offline/OfflinePage';
import OptimizationPage from '@/templates/optimization/OptimizationPage';
import OrganizationPage from '@/templates/organization/OrganizationPage';
import PlanningPage from '@/templates/planning/PlanningPage';
import ProfilePage from '@/templates/profile/ProfilePage';
import ProjectsPage from '@/templates/projects/ProjectsPage';
import ProvisioningPage from '@/templates/provisioning/ProvisioningPage';
import PunchListPage from '@/templates/punch-list/PunchListPage';
import PurchasingPage from '@/templates/purchasing/PurchasingPage';
import RealityCapturePage from '@/templates/reality-capture/RealityCapturePage';
import ResourcesPage from '@/templates/resources/ResourcesPage';
import ReusePage from '@/templates/reuse/ReusePage';
import SettingsPage from '@/templates/settings/SettingsPage';
import SimulatorPage from '@/templates/simulator/SimulatorPage';
import SiteDiaryPage from '@/templates/site-diary/SiteDiaryPage';
import SiteIssuesPage from '@/templates/site-issues/SiteIssuesPage';
import SubcontractorsPage from '@/templates/subcontractors/SubcontractorsPage';
import SupportPage from '@/templates/support/SupportPage';
import WastePage from '@/templates/waste/WastePage';
import WeatherPage from '@/templates/weather/WeatherPage';
import LoginPage from '@/login/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/templates',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/templates/dashboard" replace />,
      },
      {
        path: 'hse',
        element: <HsePage />,
      },
          {
            path: 'admin',
            element: <AdminPage />,
          },
          {
            path: 'ai-console',
            element: <AiConsolePage />,
          },
          {
            path: 'audit',
            element: <AuditPage />,
          },
          {
            path: 'billing',
            element: <BillingPage />,
          },
          {
            path: 'bim-viewer',
            element: <BimViewerPage />,
          },
          {
            path: 'communications',
            element: <CommunicationsPage />,
          },
          {
            path: 'csrd',
            element: <CsrdPage />,
          },
          {
            path: 'daily-report',
            element: <DailyReportPage />,
          },
          {
            path: 'dashboard',
            element: <DashboardPage />,
          },
          {
            path: 'design-system',
            element: <DesignSystemPage />,
          },
          {
            path: 'developer',
            element: <DeveloperPage />,
          },
          {
            path: 'digital-twin',
            element: <DigitalTwinPage />,
          },
          {
            path: 'documents',
            element: <DocumentsPage />,
          },
          {
            path: 'equipment',
            element: <EquipmentPage />,
          },
          {
            path: 'finance',
            element: <FinancePage />,
          },
          {
            path: 'green',
            element: <GreenPage />,
          },
          {
            path: 'integrations',
            element: <IntegrationsPage />,
          },
          {
            path: 'iot-tracking',
            element: <IotTrackingPage />,
          },
          {
            path: 'logistics',
            element: <LogisticsPage />,
          },
          {
            path: 'marketplace',
            element: <MarketplacePage />,
          },
          {
            path: 'monitoring',
            element: <MonitoringPage />,
          },
          {
            path: 'notifications',
            element: <NotificationsPage />,
          },
          {
            path: 'offline',
            element: <OfflinePage />,
          },
          {
            path: 'optimization',
            element: <OptimizationPage />,
          },
          {
            path: 'organization',
            element: <OrganizationPage />,
          },
          {
            path: 'planning',
            element: <PlanningPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'projects',
            element: <ProjectsPage />,
          },
          {
            path: 'provisioning',
            element: <ProvisioningPage />,
          },
          {
            path: 'punch-list',
            element: <PunchListPage />,
          },
          {
            path: 'purchasing',
            element: <PurchasingPage />,
          },
          {
            path: 'reality-capture',
            element: <RealityCapturePage />,
          },
          {
            path: 'resources',
            element: <ResourcesPage />,
          },
          {
            path: 'reuse',
            element: <ReusePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'simulator',
            element: <SimulatorPage />,
          },
          {
            path: 'site-diary',
            element: <SiteDiaryPage />,
          },
          {
            path: 'site-issues',
            element: <SiteIssuesPage />,
          },
          {
            path: 'subcontractors',
            element: <SubcontractorsPage />,
          },
          {
            path: 'support',
            element: <SupportPage />,
          },
          {
            path: 'waste',
            element: <WastePage />,
          },
          {
            path: 'weather',
            element: <WeatherPage />,
          },
    ],
  },
]);

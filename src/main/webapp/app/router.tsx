import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/shared/layout/MainLayout';
import HsePage from '@/templates/hse/HsePage';
import TrainingDetailsPage from '@/templates/hse/TrainingDetailsPage';
import AdminPage from '@/templates/admin/AdminPage';
import AdminSettingsPage from '@/templates/admin/AdminSettingsPage';
import AdminUsersPage from '@/templates/admin/AdminUsersPage';
import AnalyticsRe2020Page from '@/templates/analytics/AnalyticsRe2020Page';
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
import DocumentsBpePage from '@/templates/documents/DocumentsBpePage';
import DocumentsPage from '@/templates/documents/DocumentsPage';
import DocumentFormPage from '@/templates/documents/DocumentFormPage';
import EquipmentPage from '@/templates/equipment/EquipmentPage';
import FinancePage from '@/templates/finance/FinancePage';
import GreenPage from '@/templates/green/GreenPage';
import IntegrationsPage from '@/templates/integrations/IntegrationsPage';
import IotTrackingPage from '@/templates/iot-tracking/IotTrackingPage';
import LogisticsJitPage from '@/templates/logistics/LogisticsJitPage';
import LogisticsZfePage from '@/templates/logistics/LogisticsZfePage';
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
import ProjectFormPage from '@/templates/projects/ProjectFormPage';
import ProjectDetailsPage from '@/templates/projects/ProjectDetailsPage';
import ProvisioningPage from '@/templates/provisioning/ProvisioningPage';
import PunchListPage from '@/templates/punch-list/PunchListPage';
import PurchasingPage from '@/templates/purchasing/PurchasingPage';
import RealityCapturePage from '@/templates/reality-capture/RealityCapturePage';
import ResourcesPage from '@/templates/resources/ResourcesPage';
import TeamFormPage from '@/templates/resources/TeamFormPage';
import TeamDetailsPage from '@/templates/resources/TeamDetailsPage';
import ReusePage from '@/templates/reuse/ReusePage';
import SettingsPage from '@/templates/settings/SettingsPage';
import SimulatorPage from '@/templates/simulator/SimulatorPage';
import SiteDiaryPage from '@/templates/site-diary/SiteDiaryPage';
import SiteIssuesPage from '@/templates/site-issues/SiteIssuesPage';
import SubcontractorsPage from '@/templates/subcontractors/SubcontractorsPage';
import SubcontractorFormPage from '@/templates/subcontractors/SubcontractorFormPage';
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
            path: 'hse/trainings/:name',
            element: <TrainingDetailsPage />,
          },
          {
            path: 'admin',
            element: <AdminPage />,
          },
          {
            path: 'admin/settings',
            element: <AdminSettingsPage />,
          },
          {
            path: 'admin/users',
            element: <AdminUsersPage />,
          },
          {
            path: 'ai-console',
            element: <AiConsolePage />,
          },
          {
            path: 'analytics/re2020',
            element: <AnalyticsRe2020Page />,
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
            path: 'documents/new',
            element: <DocumentFormPage />,
          },
          {
            path: 'documents/:id/edit',
            element: <DocumentFormPage />,
          },
          {
            path: 'documents/bpe',
            element: <DocumentsBpePage />,
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
            path: 'logistics/zfe',
            element: <LogisticsZfePage />,
          },
          {
            path: 'logistics/jit',
            element: <LogisticsJitPage />,
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
            path: 'projects/new',
            element: <ProjectFormPage />,
          },
          {
            path: 'projects/:id/edit',
            element: <ProjectFormPage />,
          },
          {
            path: 'projects/:id',
            element: <ProjectDetailsPage />,
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
            path: 'resources/new',
            element: <TeamFormPage />,
          },
          {
            path: 'resources/:id/edit',
            element: <TeamFormPage />,
          },
          {
            path: 'resources/:id',
            element: <TeamDetailsPage />,
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
            path: 'subcontractors/new',
            element: <SubcontractorFormPage />,
          },
          {
            path: 'subcontractors/:id/edit',
            element: <SubcontractorFormPage />,
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

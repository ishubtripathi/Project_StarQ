import {
  dashboardStats,
  importantInformation,
  keyInsights,
  recentDocuments,
} from "../data/mockDashboard";

import StatCard from "../components/dashboard/StatCard";
import DocumentOverview from "../components/dashboard/DocumentOverview";
import ImportantInformation from "../components/dashboard/ImportantInformation";
import KeyInsights from "../components/dashboard/KeyInsights";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import RecentDocuments from "../components/dashboard/RecentDocuments";

export default function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl p-5 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Overview of your documents and insights.
          </p>
        </div>

        <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200 sm:w-auto">
          Upload Document
        </button>
      </div>

      {/* Statistics */}
      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </section>

      {/* Document Overview */}
      <section className="mt-6">
        <DocumentOverview
          filename="annual-report.pdf"
          type="PDF"
          status="Processed"
          pages={102}
        />
      </section>

      {/* Information + Insights */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ImportantInformation
          summary={importantInformation.summary}
          keyPoints={importantInformation.keyPoints}
          topics={importantInformation.topics}
        />

        <KeyInsights insights={keyInsights} />
      </section>

      {/* Analytics */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnalyticsCard
          title="Document Statistics"
          description="Overview of document content."
        />

        <AnalyticsCard
          title="Content Distribution"
          description="Distribution of extracted content."
        />
      </section>

      {/* Recent Documents */}
      <section className="mt-6">
        <RecentDocuments documents={recentDocuments} />
      </section>

    </div>
  );
}
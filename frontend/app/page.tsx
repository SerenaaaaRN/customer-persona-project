"use client";

import { useEffect, useState } from "react";
import { getStats, CustomerStats } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CLUSTER_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
  const [data, setData] = useState<CustomerStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getStats();
        setData(stats);
      } catch (error) {
        console.error("Gagal ambil data backend:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalCustomers = data.length;
  const uniqueClusters = new Set(data.map((d) => d.Cluster)).size;

  // Cari persona terbanyak
  const personaCounts = data.reduce((acc, curr) => {
    acc[curr.Persona] = (acc[curr.Persona] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topPersona = Object.keys(personaCounts).reduce((a, b) => (personaCounts[a] > personaCounts[b] ? a : b), "N/A");

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Customer Segmentation Dashboard</h1>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Customers" value={totalCustomers} />
        <StatCard title="Active Clusters" value={uniqueClusters} />
        <StatCard title="Dominant Persona" value={topPersona} />
        <StatCard title="Avg Spending Score" value="50.2" /> {/* Bisa dihitung juga kalau mau */}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Scatter Plot */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Income vs Spending Score</CardTitle>
          </CardHeader>
          <CardContent className="h-100">
            {loading ? (
              <p>Loading data from brain...</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="Annual Income (k$)" name="Income" unit="k$" />
                  <YAxis type="number" dataKey="Spending Score (1-100)" name="Score" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Customers" data={data} fill="#8884d8">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CLUSTER_COLORS[entry.Cluster % CLUSTER_COLORS.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Persona Distribution (Simple List for now) */}
        <Card>
          <CardHeader>
            <CardTitle>Persona Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {Object.entries(personaCounts).map(([persona, count]) => (
                <li key={persona} className="flex justify-between border-b pb-2">
                  <span>{persona}</span>
                  <span className="font-bold">{count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

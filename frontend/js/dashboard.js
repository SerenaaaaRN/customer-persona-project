const API_URL = "http://127.0.0.1:8000";

// Warna yang sama persis dengan CLUSTER_COLORS di Next.js
const CLUSTER_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

async function loadDashboard() {
  try {
    const response = await fetch(`${API_URL}/stats`);
    const result = await response.json();
    const data = result.data;

    const totalCustomers = data.length;
    const uniqueClusters = new Set(data.map((d) => d.Cluster)).size;

    const personaCounts = data.reduce((acc, curr) => {
      acc[curr.Persona] = (acc[curr.Persona] || 0) + 1;
      return acc;
    }, {});
    const topPersona = Object.keys(personaCounts).reduce(
      (a, b) => (personaCounts[a] > personaCounts[b] ? a : b),
      "N/A"
    );

    // Perhitungan Rata-rata Spending Score (Card ke-4)
    const avgSpending = data.reduce((sum, item) => sum + item["Spending Score (1-100)"], 0) / totalCustomers;

    // Update UI Stat Cards
    document.getElementById("totalCustomers").textContent = totalCustomers;
    document.getElementById("totalClusters").textContent = uniqueClusters;
    document.getElementById("topPersona").textContent = topPersona;
    document.getElementById("avgSpending").textContent = avgSpending.toFixed(1);

    // 2. Render Chart & List
    renderChart(data);
    renderPersonaList(personaCounts);
  } catch (error) {
    console.error("Gagal sinkronisasi data dashboard:", error);
  }
}

function renderChart(data) {
  const ctx = document.getElementById("personaChart").getContext("2d");
  const clusters = [...new Set(data.map((i) => i.Cluster))];

  const datasets = clusters.map((id) => {
    const clusterData = data.filter((i) => i.Cluster === id);
    return {
      label: clusterData[0].Persona,
      data: clusterData.map((i) => ({ x: i["Annual Income (k$)"], y: i["Spending Score (1-100)"] })),
      backgroundColor: CLUSTER_COLORS[id % CLUSTER_COLORS.length],
      pointRadius: 5,
    };
  });

  new Chart(ctx, {
    type: "scatter",
    data: { datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (c) => `Income: ${c.raw.x}k, Score: ${c.raw.y}`,
          },
        },
      },
    },
  });
}

function renderPersonaList(counts) {
  const container = document.getElementById("personaList");
  container.innerHTML = "";

  Object.entries(counts).map(([persona, count]) => {
    container.innerHTML += `
            <div class="flex justify-between items-center border-b border-slate-50 pb-2">
                <span class="text-sm text-slate-600">${persona}</span>
                <span class="font-bold text-slate-900">${count}</span>
            </div>
        `;
  });
}

loadDashboard();

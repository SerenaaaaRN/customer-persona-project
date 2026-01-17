const sidebarTemplate = `
<div class="flex flex-col h-screen w-64 bg-white border-r border-gray-200">
    <div class="p-6">
        <div class="flex items-center gap-2">
            <h2 class="text-lg font-bold tracking-tight text-gray-900">Customer Persona</h2>
        </div>
        <p class="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-4">Main Menu</p>
    </div>
    
    <nav class="flex-1 px-4 space-y-1">
        <a href="dashboard.html" id="nav-dashboard" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
            Dashboard
        </a>
        <a href="predictor.html" id="nav-predictor" class="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            Predictor
        </a>
    </nav>


</div>
`;

function initSidebar() {
  const container = document.getElementById("sidebar-container");
  if (container) {
    container.innerHTML = sidebarTemplate;
    const currentPath = window.location.pathname;
    if (currentPath.includes("dashboard.html") || currentPath.endsWith("/")) {
      document.getElementById("nav-dashboard").classList.add("bg-gray-100", "text-gray-900");
    } else if (currentPath.includes("predictor.html")) {
      document.getElementById("nav-predictor").classList.add("bg-gray-100", "text-gray-900");
    }
  }
}
document.addEventListener("DOMContentLoaded", initSidebar);

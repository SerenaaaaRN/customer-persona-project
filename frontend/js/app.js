const API_URL = "http://127.0.0.1:8000";

const form = document.getElementById("predictionForm");
const submitBtn = document.getElementById("submitBtn");
const placeholder = document.getElementById("placeholder");
const resultCard = document.getElementById("resultCard");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset errors
  document.querySelectorAll('[id^="error-"]').forEach((el) => el.classList.add("hidden"));

  const age = parseInt(document.getElementById("age").value);
  const income = parseFloat(document.getElementById("income").value);
  const score = parseInt(document.getElementById("score").value);

  // Manual Validation (Replacement for Zod)
  let hasError = false;
  if (age < 18 || age > 100) {
    const err = document.getElementById("error-age");
    err.textContent = "Umur minimal 18 dan maksimal 100";
    err.classList.remove("hidden");
    hasError = true;
  }
  if (income < 1) {
    document.getElementById("error-income").textContent = "Income minimal 1k$";
    document.getElementById("error-income").classList.remove("hidden");
    hasError = true;
  }
  if (score < 1 || score > 100) {
    document.getElementById("error-score").textContent = "Score maksimal 100";
    document.getElementById("error-score").classList.remove("hidden");
    hasError = true;
  }

  if (hasError) return;

  // Loading State
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Analyzing...`;

  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, annual_income: income, spending_score: score }),
    });

    const result = await response.json();

    document.getElementById("personaName").textContent = result.persona;
    document.getElementById("personaDesc").textContent = result.description;
    document.getElementById("clusterId").textContent = result.cluster_id;

    placeholder.classList.add("hidden");
    resultCard.classList.remove("hidden");
  } catch (error) {
    console.error("Prediction failed:", error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Analyze Customer";
  }
});

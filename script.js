document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("calculator-form");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const pipelineDiameter = parseFloat(document.getElementById("pipeline-diameter").value);
        const pipelineThickness = parseFloat(document.getElementById("pipeline-thickness").value);
        const operatingPressure = parseFloat(document.getElementById("operating-pressure").value);
        const operatingTemperature = parseFloat(document.getElementById("operating-temperature").value);
        const flowRate = parseFloat(document.getElementById("flow-rate").value);
        const hotTapSize = document.getElementById("hot-tap-size").value;

        const results = calculateHotTap(pipelineDiameter, pipelineThickness, operatingPressure, operatingTemperature, flowRate, hotTapSize);

        resultsDiv.innerHTML = "";

        for (const [key, value] of Object.entries(results)) {
            const resultElement = document.createElement("p");
            resultElement.className = "result";
            resultElement.textContent = `${key}: ${value}`;
            resultsDiv.appendChild(resultElement);
        }
    });
});

function calculateHotTap(D, t, P, T, Q, hotTapSize) {
    // Constants
    const f = 0.5;  // Design Factor
    const S = 20000;  // Allowable Stress of Pipe Material (psi)

    // Calculations
    const MAWP = f * S * 2 * t;
    const tPad = (P * D) / (2 * S - P);
    const tMin = 0.5;  // Example minimum pad thickness
    const PCrit = (f * S * tPad) / (2 * D - tPad);
    const PAllow = 5000;  // Example allowable external pressure

    // Results
    const results = {
        "Maximum Allowable Working Pressure (MAWP)": MAWP.toFixed(2),
        "Required Reinforcement Pad Thickness": tPad.toFixed(2),
        "Critical External Pressure": PCrit.toFixed(2),
        "Safety Factors": "Check calculations with applicable standards and codes. Verify results with engineering judgment and experience."
    };

    // Check Pad Thickness
    if (tPad >= tMin) {
        results["Pad Thickness Check"] = "Pass";
    } else {
        results["Pad Thickness Check"] = "Fail";
    }

    // Check Critical External Pressure
    if (PCrit <= PAllow) {
        results["Critical External Pressure Check"] = "Pass";
    } else {
        results["Critical External Pressure Check"] = "Fail";
    }

    return results;
}
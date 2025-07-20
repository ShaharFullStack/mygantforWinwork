// src/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href').split('/').pop();
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Initialize charts if they exist on the page
  if (typeof Chart !== 'undefined' && document.getElementById('competitorChart')) {
    initializeCharts();
  }
});

function initializeCharts() {
  // Chart initialization code from original file
  const tooltipTitleCallback = (tooltipItems) => {
    const item = tooltipItems[0];
    let label = item.chart.data.labels[item.dataIndex];
    if (Array.isArray(label)) {
      return label.join(" ");
    }
    return label;
  };

  const chartDefaultFont = { family: "'Assistant', sans-serif", size: 12 };
  const chartDefaultColor = "#8b949e";
  const gridColor = "rgba(255, 255, 255, 0.1)";

  // Competitor Chart
  const competitorCtx = document
    .getElementById("competitorChart")
    .getContext("2d");
  new Chart(competitorCtx, {
    type: "radar",
    data: {
      labels: [
        "מומחיות טכנית",
        "יצירתיות וחדשנות",
        "גמישות וזריזות",
        "מחיר נגיש",
        "תמיכה הוליסטית",
      ],
      datasets: [
        {
          label: "שחר מעוז",
          data: [9, 9, 8, 6, 5],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
        {
          label: "סוכנות קריאייטיב",
          data: [7, 8, 4, 3, 9],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "פרילנסר Full-Stack",
          data: [6, 4, 7, 8, 6],
          fill: true,
          backgroundColor: "rgba(255, 205, 86, 0.2)",
          borderColor: "rgb(255, 205, 86)",
          pointBackgroundColor: "rgb(255, 205, 86)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 205, 86)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: { callbacks: { title: tooltipTitleCallback } },
        legend: {
          labels: { color: chartDefaultColor, font: chartDefaultFont },
        },
      },
      scales: {
        r: {
          angleLines: { color: gridColor },
          grid: { color: gridColor },
          pointLabels: {
            font: { ...chartDefaultFont, size: 14 },
            color: "#c9d1d9",
          },
          ticks: {
            color: chartDefaultColor,
            backdropColor: "transparent",
            font: chartDefaultFont,
          },
        },
      },
    },
  });

  // Porter's Five Forces Chart
  if (document.getElementById("porterChart")) {
    const porterCtx = document.getElementById("porterChart").getContext("2d");
    const wrapLabels = (label) => {
      const words = label.split(" ");
      if (words.length > 2) {
        return [words.slice(0, 2).join(" "), words.slice(2).join(" ")];
      }
      return label;
    };
    new Chart(porterCtx, {
      type: "bar",
      data: {
        labels: [
          "איום כניסת מתחרים חדשים",
          "כוח מיקוח לקוחות",
          "כוח מיקוח ספקים",
          "איום מוצרים תחליפיים",
          "עצימות תחרות קיימת",
        ].map(wrapLabels),
        datasets: [
          {
            label: "עוצמת האיום (1=נמוך, 5=גבוה)",
            data: [1, 3, 1, 4, 3],
            backgroundColor: [
              "#2e7d32",
              "#f57c00",
              "#2e7d32",
              "#d32f2f",
              "#f57c00",
            ],
            borderColor: "#161b22",
            borderWidth: 2,
            borderRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { title: tooltipTitleCallback } },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 5,
            grid: { color: gridColor },
            ticks: { color: chartDefaultColor, font: chartDefaultFont },
          },
          y: {
            grid: { display: false },
            ticks: { color: chartDefaultColor, font: chartDefaultFont },
          },
        },
      },
    });
  }
}

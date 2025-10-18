// ===== Abrir / cerrar menú =====
function openMenu() {
  document.getElementById("sideMenu").style.width = "300px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}

// ===== Noticias hardcodeadas para el menú =====
const menuNews = [
  {
    title: "New Breakthrough in Heart Health",
    img: "Images/New Breakthrough .jpg",
    content: "Researchers discover promising treatment for cardiovascular disease."
  },
  {
    title: "Mental Health Awareness Gains Momentum",
    img: "images/Mental Health .jpg",
    content: "Communities are coming together to reduce stigma and improve care."
  },
  {
    title: "AI in Medicine: The Future of Healthcare",
    img: "images/AI in Medicine.jpg",
    content: "Artificial intelligence is revolutionizing early diagnosis and patient care."
  },
   {
    title: "Canada Launches Bold CanPlan to Tackle Mental Health Crisis",
    img: "images/Canada Launches .jpg",
    content: "Canadian officials unveiled a multi-billion-dollar program to expand therapy access."
  }
];

// ===== Insertar noticias en el menú (orden inverso) =====
const menuLinks = document.getElementById("menu-links");

// Add news header
const newsHeader = document.createElement("div");
newsHeader.className = "news-header";
newsHeader.textContent = "📰 Últimas Noticias";
menuLinks.appendChild(newsHeader);

menuNews.slice().reverse().forEach((item) => {
  const link = document.createElement("a");
  link.href = "#";
  link.className = "news-item";
  link.onclick = (e) => {
    e.preventDefault();
    openModal(item);
    closeMenu();
  };

  // Miniatura
  const img = document.createElement("img");
  img.src = item.img;
  img.alt = item.title;

  // Texto
  const span = document.createElement("span");
  span.textContent = item.title;

  // Construir el bloque
  link.appendChild(img);
  link.appendChild(span);

  menuLinks.appendChild(link);
});

// ===== Modal de noticias =====
function openModal(item) {
  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-img").src = item.image || item.img; // Soporta 'image' de news.json y 'img' de menuNews
  document.getElementById("modal-content").textContent = item.content;
  document.getElementById("newsModal").style.display = "block";
}

function closeModal() {
  document.getElementById("newsModal").style.display = "none";
}

// ===== Cargar noticias desde news.json para la página principal =====
document.addEventListener('DOMContentLoaded', () => {
    fetch('news.json')
        .then(response => response.json())
        .then(data => {
            displayMainNews(data); // 'data' es el array de news.json
        })
        .catch(error => console.error("Error loading main news:", error));

    // Cerrar modal si el usuario hace clic fuera del contenido
    window.onclick = function(event) {
      const modal = document.getElementById("newsModal");
      if (event.target === modal) {
        closeModal();
      }
    };
});

function displayMainNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Limpiar contenido existente

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${article.image}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.summary}</p>
        `;
        card.onclick = () => openModal(article); // Pasar el objeto completo del artículo
        newsContainer.appendChild(card);
    });
}
// Menú lateral
function openMenu() {
  document.getElementById("sideMenu").style.width = "250px";
}

function closeMenu() {
  document.getElementById("sideMenu").style.width = "0";
}

// Modal de noticia
function openModal(title, img, content) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-img').src = img;
  document.getElementById('modal-img').alt = title;
  document.getElementById('modal-content').innerText = content;
  document.getElementById('newsModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('newsModal').style.display = 'none';
}

// Cargar noticias desde news.json
async function loadNews() {
  try {
    const response = await fetch('news.json');
    const newsList = await response.json();
    const container = document.getElementById('news-container');
    const menu = document.getElementById('menu-links');

    newsList.forEach(item => {
      // Tarjeta
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
      `;
      card.onclick = () => openModal(item.title, item.image, item.content);
      container.appendChild(card);

      // Menú lateral
      const link = document.createElement('a');
      link.href = "javascript:void(0)";
      link.innerText = item.title;
      link.onclick = () => { 
        openModal(item.title, item.image, item.content); 
        closeMenu(); 
      };
      menu.appendChild(link);
    });
  } catch (error) {
    console.error("Error loading news:", error);
  }
}

loadNews();
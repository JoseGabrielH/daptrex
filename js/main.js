(() => {
  const RUTA = "img/web/";
  const FILTROS = [
    { etiqueta: "Todos", tipo: null },
    { etiqueta: "Suéteres", tipo: "Suéter" },
    { etiqueta: "Buzos", tipo: "Buzo" },
    { etiqueta: "Camisas", tipo: "Camisa" },
  ];

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const filters = $("filters");
  const viewer = $("viewer");
  const viewerImg = $("viewer-img");
  const thumbs = $("viewer-thumbs");

  const esRecorte = (foto) => /\.(png|webp)$/i.test(foto);

  function crearTarjeta(p, indice) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("aria-label", `Ver fotos: ${p.tipo} ${p.nombre}`);

    const img = document.createElement("img");
    img.src = RUTA + p.fotos[0];
    img.alt = "";
    img.loading = indice < 12 ? "eager" : "lazy";
    if (esRecorte(p.fotos[0])) img.classList.add("is-cutout");

    const tipo = document.createElement("span");
    tipo.className = "card__type";
    tipo.textContent = p.tipo;

    card.append(img, tipo);
    card.addEventListener("click", () => abrir(p));
    return card;
  }

  function mostrar(tipo) {
    const lista = tipo ? PRODUCTOS.filter((p) => p.tipo === tipo) : PRODUCTOS;
    grid.replaceChildren(...lista.map(crearTarjeta));
    filters.querySelectorAll(".chip").forEach((c) => {
      c.setAttribute("aria-pressed", String((c.dataset.tipo || null) === tipo));
    });
  }

  function crearFiltros() {
    FILTROS.forEach(({ etiqueta, tipo }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.tipo = tipo || "";
      chip.textContent = etiqueta;
      chip.addEventListener("click", () => mostrar(tipo));
      filters.append(chip);
    });
  }

  function verFoto(p, foto) {
    viewerImg.src = RUTA + foto;
    viewerImg.alt = `${p.tipo} ${p.nombre}`;
    thumbs.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-current", String(b.dataset.foto === foto));
    });
  }

  function abrir(p) {
    thumbs.replaceChildren(...p.fotos.map((foto, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.foto = foto;
      b.setAttribute("aria-label", `Foto ${i + 1}`);
      const img = document.createElement("img");
      img.src = RUTA + foto;
      img.alt = "";
      b.append(img);
      b.addEventListener("click", () => verFoto(p, foto));
      return b;
    }));
    thumbs.hidden = p.fotos.length < 2;
    verFoto(p, p.fotos[0]);
    $("viewer-type").textContent = p.tipo;
    viewer.showModal();
  }

  $("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

  crearFiltros();
  mostrar(null);
})();

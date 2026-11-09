(() => {
  const RUTA = "img/web/";
  const PLURAL = { "Suéter": "Suéteres", "Camisa": "Camisas", "Buzo": "Buzos" };

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const filters = $("filters");
  const count = $("count");
  const viewer = $("viewer");
  const viewerImg = $("viewer-img");
  const thumbs = $("viewer-thumbs");

  const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  const pedido = (p) => `Hola, me interesa: ${p.tipo} ${p.nombre}. ¿Está disponible?`;
  const esRecorte = (foto) => /\.(png|webp)$/i.test(foto);

  function pintarPrecio(el, precio) {
    if (precio == null) {
      el.className = "price price--ask";
      el.textContent = "Precio por WhatsApp";
      return;
    }
    el.className = "price";
    el.innerHTML = "";
    const signo = document.createElement("b");
    signo.textContent = "$";
    el.append(signo, precio.toLocaleString("es-CO"));
  }

  function crearTarjeta(p, indice) {
    const card = document.createElement("article");
    card.className = "card";

    const foto = document.createElement("button");
    foto.className = "card__photo";
    foto.type = "button";
    foto.setAttribute("aria-label", `Ver fotos de ${p.nombre}`);
    const img = document.createElement("img");
    img.src = RUTA + p.fotos[0];
    img.alt = `${p.tipo} ${p.nombre}`;
    img.loading = indice < 4 ? "eager" : "lazy";
    if (esRecorte(p.fotos[0])) img.classList.add("is-cutout");
    foto.append(img);
    foto.addEventListener("click", () => abrir(p));

    const body = document.createElement("div");
    body.className = "card__body";
    const tipo = document.createElement("p");
    tipo.className = "card__type";
    tipo.textContent = p.tipo;
    const nombre = document.createElement("h2");
    nombre.className = "card__name";
    nombre.textContent = p.nombre;
    const precio = document.createElement("p");
    pintarPrecio(precio, p.precio);
    const btn = document.createElement("a");
    btn.className = "btn";
    btn.href = waLink(pedido(p));
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = "Pedir por WhatsApp";

    body.append(tipo, nombre, precio, btn);
    card.append(foto, body);
    return card;
  }

  function mostrar(tipo) {
    const lista = tipo ? PRODUCTOS.filter((p) => p.tipo === tipo) : PRODUCTOS;
    grid.replaceChildren(...lista.map(crearTarjeta));
    count.textContent = `${lista.length} ${lista.length === 1 ? "prenda" : "prendas"}`;
    filters.querySelectorAll(".chip").forEach((c) => {
      c.setAttribute("aria-pressed", String((c.dataset.tipo || null) === tipo));
    });
  }

  function crearFiltros() {
    const tipos = [...new Set(PRODUCTOS.map((p) => p.tipo))];
    [null, ...tipos].forEach((tipo) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.tipo = tipo || "";
      chip.textContent = tipo ? PLURAL[tipo] || tipo : "Todo";
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
    $("viewer-name").textContent = p.nombre;
    pintarPrecio($("viewer-price"), p.precio);
    $("viewer-desc").textContent = DESCRIPCION;
    $("viewer-order").href = waLink(pedido(p));
    viewer.showModal();
  }

  $("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });
  $("wa-float").href = waLink("Hola, quiero información sobre sus prendas.");

  crearFiltros();
  mostrar(null);
})();

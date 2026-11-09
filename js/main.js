(() => {
  const RUTA = "img/web/";
  const FILTROS = [
    { etiqueta: "Todos", tipo: null },
    { etiqueta: "Suéteres", tipo: "Suéter" },
    { etiqueta: "Buzos", tipo: "Buzo" },
    { etiqueta: "Camisas", tipo: "Camisa" },
  ];
  const ZOOM_MS = 620;
  const CURVA = "cubic-bezier(.7, 0, .2, 1)";

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const filters = $("filters");
  const detail = $("detail");
  const frame = $("detail-frame");
  const detailImg = $("detail-img");
  const dots = $("detail-dots");

  const esRecorte = (foto) => /\.(png|webp)$/i.test(foto);
  const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));

  let tipoActual = null;
  let turnoFiltro = 0;
  let ocupado = false;
  let abierto = null; // { producto, foto, card, scroll, transform }

  /* ---------- Catálogo ---------- */

  function crearTarjeta(p, indice) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card card--in";
    card.style.setProperty("--i", Math.min(indice, 14));
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
    card.addEventListener("click", () => abrir(p, card));
    return card;
  }

  function marcarFiltro() {
    filters.querySelectorAll(".chip").forEach((c) => {
      c.setAttribute("aria-pressed", String((c.dataset.tipo || null) === tipoActual));
    });
  }

  function pintar() {
    const lista = tipoActual ? PRODUCTOS.filter((p) => p.tipo === tipoActual) : PRODUCTOS;
    grid.replaceChildren(...lista.map(crearTarjeta));
  }

  async function cambiarFiltro(tipo) {
    if (ocupado) return;
    const veniaDeDetalle = Boolean(abierto);
    if (abierto) {
      cerrarSinAnimar();
      history.back();
    }
    if (tipo === tipoActual && !veniaDeDetalle) return;
    tipoActual = tipo;
    marcarFiltro();
    const turno = ++turnoFiltro;
    if (!veniaDeDetalle) {
      grid.classList.add("is-out");
      await esperar(170);
      if (turno !== turnoFiltro) return;
    }
    grid.classList.remove("is-out");
    pintar();
    window.scrollTo(0, 0);
  }

  function crearFiltros() {
    FILTROS.forEach(({ etiqueta, tipo }) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.dataset.tipo = tipo || "";
      chip.textContent = etiqueta;
      chip.addEventListener("click", () => cambiarFiltro(tipo));
      filters.append(chip);
    });
  }

  /* ---------- Vista de la prenda ---------- */

  function verFoto(indice, animar) {
    const { producto } = abierto;
    const total = producto.fotos.length;
    abierto.foto = (indice + total) % total;
    detailImg.src = RUTA + producto.fotos[abierto.foto];
    dots.querySelectorAll("button").forEach((b, i) => {
      b.setAttribute("aria-current", String(i === abierto.foto));
    });
    if (animar) {
      detailImg.animate(
        [{ opacity: 0.15 }, { opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }],
        { duration: 240, easing: "steps(4, end)" }
      );
    }
  }

  function prepararDetalle(p) {
    dots.replaceChildren(...p.fotos.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Foto ${i + 1}`);
      b.append(document.createElement("span"));
      b.addEventListener("click", () => verFoto(i, true));
      return b;
    }));
    const varias = p.fotos.length > 1;
    dots.hidden = !varias;
    $("detail-prev").style.visibility = varias ? "" : "hidden";
    $("detail-next").style.visibility = varias ? "" : "hidden";
    detailImg.alt = `${p.tipo} ${p.nombre}`;
    $("detail-type").textContent = p.tipo;
    verFoto(0, false);
  }

  // Calcula el movimiento que lleva la foto tocada hasta donde estará la foto grande.
  function calcularZoom(card) {
    detail.style.cssText = "visibility:hidden;position:absolute;top:0;left:0;right:0";
    detail.hidden = false;
    const destino = frame.getBoundingClientRect();
    const destinoTop = destino.top + window.scrollY;
    detail.hidden = true;
    detail.style.cssText = "";

    const origen = card.querySelector("img").getBoundingClientRect();
    const caja = grid.getBoundingClientRect();
    const escala = destino.width / origen.width;
    const x = destino.left - (origen.left - caja.left) * escala - caja.left;
    const y = destinoTop - (origen.top - caja.top) * escala - caja.top;
    return `translate(${x}px, ${y}px) scale(${escala})`;
  }

  function desvanecerResto(card, desde, hasta) {
    const opciones = { duration: ZOOM_MS * 0.6, easing: "ease", fill: "both" };
    const anims = [...grid.children]
      .filter((c) => c !== card)
      .map((c) => c.animate([{ opacity: desde }, { opacity: hasta }], opciones));
    anims.push(card.querySelector(".card__type").animate([{ opacity: desde }, { opacity: hasta }], opciones));
    return anims;
  }

  function mostrarDetalle() {
    grid.hidden = true;
    detail.hidden = false;
    window.scrollTo(0, 0);
    $("detail-close").focus({ preventScroll: true });
  }

  async function abrir(p, card) {
    if (ocupado || abierto) return;
    ocupado = true;
    abierto = { producto: p, foto: 0, card, scroll: window.scrollY, transform: "" };
    prepararDetalle(p);
    history.pushState({ detalle: true }, "");

    grid.querySelectorAll(".card--in").forEach((c) => c.classList.remove("card--in"));
    abierto.transform = calcularZoom(card);
    const carga = detailImg.decode ? detailImg.decode().catch(() => {}) : Promise.resolve();
    const fundidos = desvanecerResto(card, 1, 0);
    const zoom = grid.animate(
      [{ transform: "none" }, { transform: abierto.transform }],
      { duration: ZOOM_MS, easing: CURVA, fill: "forwards" }
    );
    await Promise.race([zoom.finished, esperar(ZOOM_MS + 200)]);
    await Promise.race([carga, esperar(250)]);

    mostrarDetalle();
    zoom.cancel();
    fundidos.forEach((a) => a.cancel());
    detail.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 200, easing: "ease-out" });
    ocupado = false;
  }

  function cerrarSinAnimar() {
    const { scroll, card } = abierto;
    abierto = null;
    detail.hidden = true;
    grid.hidden = false;
    window.scrollTo(0, scroll);
    return card;
  }

  async function cerrar() {
    if (!abierto || ocupado) return;
    const { transform } = abierto;
    const card = cerrarSinAnimar();
    if (!transform || !card.isConnected) {
      card.focus({ preventScroll: true });
      return;
    }
    ocupado = true;
    const fundidos = desvanecerResto(card, 0, 1);
    const zoom = grid.animate(
      [{ transform }, { transform: "none" }],
      { duration: ZOOM_MS * 0.85, easing: CURVA }
    );
    await Promise.race([zoom.finished.catch(() => {}), esperar(ZOOM_MS + 200)]);
    zoom.cancel();
    fundidos.forEach((a) => a.cancel());
    card.focus({ preventScroll: true });
    ocupado = false;
  }

  $("detail-close").addEventListener("click", () => { if (!ocupado) history.back(); });
  $("detail-prev").addEventListener("click", () => verFoto(abierto.foto - 1, true));
  $("detail-next").addEventListener("click", () => verFoto(abierto.foto + 1, true));
  window.addEventListener("popstate", cerrar);

  document.addEventListener("keydown", (e) => {
    if (!abierto || ocupado) return;
    if (e.key === "Escape") history.back();
    if (abierto.producto.fotos.length < 2) return;
    if (e.key === "ArrowLeft") verFoto(abierto.foto - 1, true);
    if (e.key === "ArrowRight") verFoto(abierto.foto + 1, true);
  });

  // Deslizar con el dedo para cambiar de foto
  let inicioX = null;
  frame.addEventListener("touchstart", (e) => { inicioX = e.changedTouches[0].clientX; }, { passive: true });
  frame.addEventListener("touchend", (e) => {
    if (inicioX === null || !abierto || abierto.producto.fotos.length < 2) return;
    const d = e.changedTouches[0].clientX - inicioX;
    inicioX = null;
    if (Math.abs(d) > 40) verFoto(abierto.foto + (d < 0 ? 1 : -1), true);
  }, { passive: true });

  crearFiltros();
  marcarFiltro();
  pintar();
})();

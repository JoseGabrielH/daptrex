(() => {
  const RUTA = "img/web/";
  const FILTROS = [
    { etiqueta: "Todos", tipo: null },
    { etiqueta: "Suéteres", tipo: "Suéter" },
    { etiqueta: "Buzos", tipo: "Buzo" },
    { etiqueta: "Camisas", tipo: "Camisa" },
  ];
  const ZOOM_MS = 620;
  const SALIDA_MS = 240;
  const ENTRADA_MS = 380;
  const FOTO_MS = 200;
  const REGRESO_MS = 460;
  const CURVA = "cubic-bezier(.7, 0, .2, 1)";

  const $ = (id) => document.getElementById(id);
  const raiz = document.documentElement;
  const cabecera = document.querySelector(".top");
  const pie = $("pie");
  const grid = $("grid");
  const filters = $("filters");
  const detail = $("detail");
  const frame = $("detail-frame");
  const detailImg = $("detail-img");
  const dots = $("detail-dots");
  const bag = $("bag");
  const bagCount = $("bag-count");
  const cart = $("cart");

  const esRecorte = (foto) => /\.(png|webp)$/i.test(foto);
  const esperar = (ms) => new Promise((ok) => setTimeout(ok, ms));
  const pesos = (n) => "$" + n.toLocaleString("es-CO");
  const waLink = (texto) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
  const urlFoto = (p) => new URL(RUTA + p.fotos[0], location.href).href;
  const etiqueta = (p) => `${p.tipo} ${p.nombre}`;

  let tipoActual = null;
  let ocupado = false;
  let turnoFoto = 0;
  let carritoAbierto = false;
  let bolsa = cargarBolsa();
  let abierto = null; // { producto, foto, card, scroll, transform }

  /* ---------- Catálogo ---------- */

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
    if (ocupado || abierto || tipo === tipoActual) return;
    const posicion = (t) => FILTROS.findIndex((f) => f.tipo === t);
    const sentido = posicion(tipo) > posicion(tipoActual) ? 1 : -1;
    tipoActual = tipo;
    marcarFiltro();

    // Las prendas actuales salen hacia un lado y las nuevas entran por el otro.
    ocupado = true;
    const salida = grid.animate(
      [{ transform: "translateX(0)", opacity: 1 }, { transform: `translateX(${-sentido * 100}%)`, opacity: 0 }],
      { duration: SALIDA_MS, easing: "cubic-bezier(.5, 0, .9, .5)", fill: "forwards" }
    );
    await Promise.race([salida.finished.catch(() => {}), esperar(SALIDA_MS + 100)]);
    pintar();
    window.scrollTo(0, 0);
    salida.cancel();
    grid.animate(
      [{ transform: `translateX(${sentido * 100}%)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
      { duration: ENTRADA_MS, easing: "cubic-bezier(.15, .7, .25, 1)" }
    );
    ocupado = false;
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

  function verFoto(indice, sentido = 0) {
    const { producto } = abierto;
    const total = producto.fotos.length;
    const nueva = (indice + total) % total;
    if (sentido && nueva === abierto.foto) return;
    abierto.foto = nueva;
    const src = RUTA + producto.fotos[nueva];
    dots.querySelectorAll("button").forEach((b, i) => {
      b.setAttribute("aria-current", String(i === nueva));
    });
    if (sentido) deslizarFoto(src, sentido);
    else detailImg.src = src;
  }

  // La foto actual sale hacia un lado y la siguiente entra por el otro.
  async function deslizarFoto(src, sentido) {
    const turno = ++turnoFoto;
    detailImg.getAnimations().forEach((a) => a.cancel());
    const salida = detailImg.animate(
      [{ transform: "translateX(0)", opacity: 1 }, { transform: `translateX(${-sentido * 70}%)`, opacity: 0 }],
      { duration: FOTO_MS, easing: "cubic-bezier(.5, 0, .9, .5)", fill: "forwards" }
    );
    await Promise.race([salida.finished.catch(() => {}), esperar(FOTO_MS + 100)]);
    if (turno !== turnoFoto) return;
    const siguiente = new Image();
    siguiente.src = src;
    await Promise.race([siguiente.decode().catch(() => {}), esperar(200)]);
    if (turno !== turnoFoto) return;
    detailImg.src = src;
    salida.cancel();
    detailImg.animate(
      [{ transform: `translateX(${sentido * 70}%)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
      { duration: FOTO_MS + 80, easing: "cubic-bezier(.15, .7, .25, 1)" }
    );
  }

  function prepararDetalle(p) {
    dots.replaceChildren(...p.fotos.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", `Foto ${i + 1}`);
      b.append(document.createElement("span"));
      b.addEventListener("click", () => verFoto(i, i > abierto.foto ? 1 : -1));
      return b;
    }));
    const varias = p.fotos.length > 1;
    dots.hidden = !varias;
    $("detail-prev").style.visibility = varias ? "" : "hidden";
    $("detail-next").style.visibility = varias ? "" : "hidden";
    detailImg.alt = `${p.tipo} ${p.nombre}`;
    $("detail-type").textContent = p.tipo;
    $("detail-price").textContent = pesos(p.precio);
    $("detail-desc").textContent = DESCRIPCION;
    $("detail-buy").href = waLink(
      `Hola, quiero comprar esta prenda:\n\n${etiqueta(p)}\nPrecio: ${pesos(p.precio)}\nFoto: ${urlFoto(p)}`
    );
    verFoto(0);
  }

  // Calcula el movimiento que lleva la foto tocada hasta donde estará la foto grande.
  function calcularZoom(card) {
    detail.style.visibility = "hidden";
    detail.hidden = false;
    const destino = frame.getBoundingClientRect();
    detail.hidden = true;
    detail.style.visibility = "";

    const origen = card.querySelector("img").getBoundingClientRect();
    const caja = grid.getBoundingClientRect();
    const escala = destino.width / origen.width;
    const x = destino.left - (origen.left - caja.left) * escala - caja.left;
    const y = destino.top - (origen.top - caja.top) * escala - caja.top;
    return `translate(${x}px, ${y}px) scale(${escala})`;
  }

  function desvanecerResto(card, desde, hasta) {
    const opciones = { duration: ZOOM_MS * 0.6, easing: "ease", fill: "both" };
    const elementos = [...grid.children].filter((c) => c !== card);
    elementos.push(card.querySelector(".card__type"), cabecera, pie);
    return elementos.map((e) => e.animate([{ opacity: desde }, { opacity: hasta }], opciones));
  }

  function mostrarControles() {
    const controles = [$("detail-close"), $("detail-prev"), $("detail-next"), dots, $("detail-type"), $("detail-price"), $("detail-desc"), $("detail-actions")];
    controles.forEach((e) => e.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease-out" }));
  }

  async function abrir(p, card) {
    if (ocupado || abierto) return;
    ocupado = true;
    grid.getAnimations().forEach((a) => a.cancel());
    abierto = { producto: p, foto: 0, card, transform: "" };
    prepararDetalle(p);
    history.pushState({ detalle: true }, "");

    raiz.classList.add("bloqueado");
    if (card.matches(":hover")) card.classList.add("levantada");
    abierto.transform = calcularZoom(card);
    const carga = detailImg.decode ? detailImg.decode().catch(() => {}) : Promise.resolve();
    const fundidos = desvanecerResto(card, 1, 0);
    const zoom = grid.animate(
      [{ transform: "none" }, { transform: abierto.transform }],
      { duration: ZOOM_MS, easing: CURVA, fill: "forwards" }
    );
    await Promise.race([zoom.finished, esperar(ZOOM_MS + 200)]);
    await Promise.race([carga, esperar(250)]);

    // La foto grande queda exactamente sobre la que hizo el zoom: no hay corte.
    detail.hidden = false;
    raiz.classList.add("en-detalle");
    zoom.cancel();
    fundidos.forEach((a) => a.cancel());
    mostrarControles();
    $("detail-close").focus({ preventScroll: true });
    ocupado = false;
  }

  async function cerrar() {
    if (!abierto || ocupado) return;
    const { transform, card } = abierto;
    abierto = null;
    ocupado = true;
    detail.hidden = true;
    raiz.classList.remove("en-detalle");

    const fundidos = desvanecerResto(card, 0, 1);
    const zoom = grid.animate(
      [{ transform }, { transform: "none" }],
      { duration: ZOOM_MS * 0.85, easing: CURVA }
    );
    await Promise.race([zoom.finished.catch(() => {}), esperar(ZOOM_MS + 200)]);
    zoom.cancel();
    fundidos.forEach((a) => a.cancel());
    card.classList.remove("levantada");
    raiz.classList.remove("bloqueado");
    card.focus({ preventScroll: true });
    ocupado = false;
  }

  $("detail-close").addEventListener("click", () => { if (!ocupado) history.back(); });
  $("detail-prev").addEventListener("click", () => verFoto(abierto.foto - 1, -1));
  $("detail-next").addEventListener("click", () => verFoto(abierto.foto + 1, 1));
  window.addEventListener("popstate", () => {
    if (carritoAbierto) cerrarCarrito();
    else cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (carritoAbierto) {
      if (e.key === "Escape") history.back();
      return;
    }
    if (!abierto || ocupado) return;
    if (e.key === "Escape") history.back();
    if (abierto.producto.fotos.length < 2) return;
    if (e.key === "ArrowLeft") verFoto(abierto.foto - 1, -1);
    if (e.key === "ArrowRight") verFoto(abierto.foto + 1, 1);
  });

  // Deslizar con el dedo para cambiar de foto
  let inicioX = null;
  frame.addEventListener("touchstart", (e) => { inicioX = e.changedTouches[0].clientX; }, { passive: true });
  frame.addEventListener("touchend", (e) => {
    if (inicioX === null || !abierto || abierto.producto.fotos.length < 2) return;
    const d = e.changedTouches[0].clientX - inicioX;
    inicioX = null;
    if (Math.abs(d) > 40) verFoto(abierto.foto + (d < 0 ? 1 : -1), d < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- Bolsa de compra ---------- */

  // bolsa = { "nombre de la prenda": cantidad }
  function cargarBolsa() {
    try {
      const guardada = JSON.parse(localStorage.getItem("daptrex-bolsa")) || {};
      return Object.fromEntries(
        Object.entries(guardada).filter(([nombre, n]) => PRODUCTOS.some((p) => p.nombre === nombre) && n > 0)
      );
    } catch {
      return {};
    }
  }

  function guardarBolsa() {
    try {
      localStorage.setItem("daptrex-bolsa", JSON.stringify(bolsa));
    } catch {
      // Sin almacenamiento, la bolsa dura mientras la página esté abierta.
    }
  }

  function lineasBolsa() {
    return PRODUCTOS.filter((p) => bolsa[p.nombre]).map((p) => ({ p, cantidad: bolsa[p.nombre] }));
  }

  function actualizarContador() {
    const total = Object.values(bolsa).reduce((suma, n) => suma + n, 0);
    bagCount.hidden = total === 0;
    bagCount.textContent = total;
    bag.setAttribute("aria-label", `Ver bolsa de compra, ${total} ${total === 1 ? "prenda" : "prendas"}`);
  }

  function cambiarCantidad(nombre, delta) {
    const nueva = (bolsa[nombre] || 0) + delta;
    if (nueva > 0) bolsa[nombre] = nueva;
    else delete bolsa[nombre];
    guardarBolsa();
    actualizarContador();
    if (carritoAbierto) pintarCarrito();
  }

  function crearLinea({ p, cantidad }) {
    const linea = document.createElement("div");
    linea.className = "linea";

    const img = document.createElement("img");
    img.src = RUTA + p.fotos[0];
    img.alt = etiqueta(p);

    const datos = document.createElement("div");
    const fila1 = document.createElement("div");
    fila1.className = "linea__fila";
    const nombre = document.createElement("span");
    nombre.textContent = p.tipo;
    const precio = document.createElement("span");
    precio.textContent = pesos(p.precio * cantidad);
    fila1.append(nombre, precio);

    const fila2 = document.createElement("div");
    fila2.className = "linea__fila";
    const rotulo = document.createElement("span");
    rotulo.textContent = "Cantidad";
    const control = document.createElement("div");
    control.className = "cantidad";
    const crearBoton = (texto, aria, delta) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = texto;
      b.setAttribute("aria-label", aria);
      b.addEventListener("click", () => cambiarCantidad(p.nombre, delta));
      return b;
    };
    const numero = document.createElement("span");
    numero.textContent = cantidad;
    control.append(crearBoton("+", "Agregar una", 1), numero, crearBoton("−", "Quitar una", -1));
    fila2.append(rotulo, control);

    datos.append(fila1, fila2);
    linea.append(img, datos);
    return linea;
  }

  function pintarCarrito() {
    const lineas = lineasBolsa();
    const total = lineas.reduce((suma, { p, cantidad }) => suma + p.precio * cantidad, 0);
    $("cart-items").replaceChildren(...lineas.map(crearLinea));
    $("cart-empty").hidden = lineas.length > 0;
    $("cart-footer").hidden = lineas.length === 0;
    $("cart-total").textContent = pesos(total);
    const detalle = lineas.map(({ p, cantidad }) =>
      `${cantidad} x ${etiqueta(p)} - ${pesos(p.precio * cantidad)}\nFoto: ${urlFoto(p)}`
    ).join("\n\n");
    $("cart-buy").href = waLink(`Hola, quiero comprar:\n\n${detalle}\n\nTotal: ${pesos(total)}`);
  }

  function abrirCarrito() {
    if (ocupado) return;
    carritoAbierto = true;
    pintarCarrito();
    cart.hidden = false;
    raiz.classList.add("en-carrito", "bloqueado");
    history.pushState({ carrito: true }, "");
    cart.animate(
      [{ transform: "translateX(8%)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
      { duration: 280, easing: "cubic-bezier(.15, .7, .25, 1)" }
    );
    $("cart-close").focus({ preventScroll: true });
  }

  // La factura sale por la derecha mientras lo que había antes entra por la izquierda.
  async function cerrarCarrito() {
    carritoAbierto = false;
    ocupado = true;
    raiz.classList.remove("en-carrito");
    const opciones = { duration: REGRESO_MS, easing: "cubic-bezier(.6, 0, .2, 1)", fill: "both" };
    const anteriores = abierto ? [detail] : [cabecera, grid, pie];
    const movimientos = [
      cart.animate([{ transform: "translateX(0)" }, { transform: "translateX(100vw)" }], opciones),
      ...anteriores.map((e) =>
        e.animate([{ transform: "translateX(-100vw)" }, { transform: "translateX(0)" }], opciones)
      ),
    ];
    await Promise.race([movimientos[0].finished.catch(() => {}), esperar(REGRESO_MS + 100)]);
    cart.hidden = true;
    movimientos.forEach((m) => m.cancel());
    if (!abierto) raiz.classList.remove("bloqueado");
    bag.focus({ preventScroll: true });
    ocupado = false;
  }

  function agregarAlCarrito() {
    if (!abierto) return;
    cambiarCantidad(abierto.producto.nombre, 1);
    const boton = $("detail-add");
    boton.textContent = "✓";
    setTimeout(() => { boton.textContent = "+"; }, 900);
    bag.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "ease-out" }
    );
  }

  bag.addEventListener("click", () => {
    if (carritoAbierto) history.back();
    else abrirCarrito();
  });
  $("cart-close").addEventListener("click", () => history.back());
  $("detail-add").addEventListener("click", agregarAlCarrito);

  crearFiltros();
  marcarFiltro();
  actualizarContador();
  pintar();
})();

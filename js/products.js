/*
  CATÁLOGO DE DAPTREX. Aquí se edita todo:
  - nombre: como aparece en la tarjeta.
  - tipo: "Suéter", "Camisa" o "Buzo" (de aquí salen los filtros).
  - precio: número sin puntos (80000).
  - fotos: nombres de archivo dentro de img/web/. La primera es la foto principal.
    Las fotos .png (sin fondo) se muestran completas, sin recortar.
*/
const PRODUCTOS = [
  { nombre: "Best Wishes Flower", tipo: "Suéter", precio: 80000, fotos: ["IMG_1286.webp", "IMG_1284.webp"] },
  { nombre: "Sincere gris", tipo: "Suéter", precio: 60000, fotos: ["IMG_1295.webp", "IMG_1292.webp"] },
  { nombre: "Cruz negra", tipo: "Suéter", precio: 60000, fotos: ["IMG_1298.webp", "IMG_1300.webp"] },
  { nombre: "Come Home With Me", tipo: "Suéter", precio: 65000, fotos: ["IMG_1303.webp", "IMG_1301.webp"] },
  { nombre: "Devout Faith", tipo: "Suéter", precio: 60000, fotos: ["IMG_1309.webp"] },
  { nombre: "Only God Can Judge Me", tipo: "Suéter", precio: 60000, fotos: ["IMG_1311.webp", "IMG_1313.webp"] },
  { nombre: "Redemption", tipo: "Suéter", precio: 60000, fotos: ["IMG_1314.webp"] },
  { nombre: "Road Trips", tipo: "Suéter", precio: 60000, fotos: ["IMG_1322.webp"] },
  { nombre: "Tribal negro", tipo: "Suéter", precio: 50000, fotos: ["IMG_1324.webp"] },
  { nombre: "Paneles negro y gris", tipo: "Suéter", precio: 50000, fotos: ["IMG_1330.webp"] },
  { nombre: "Axepeak café", tipo: "Suéter", precio: 50000, fotos: ["IMG_1335.webp"] },
  { nombre: "Axepeak azul", tipo: "Suéter", precio: 50000, fotos: ["IMG_1337.webp"] },
  { nombre: "Tolerance", tipo: "Suéter", precio: 50000, fotos: ["IMG_1341.webp"] },
  { nombre: "Streetees negro", tipo: "Suéter", precio: 45000, fotos: ["IMG_1344.webp"] },
  { nombre: "Streetees blanco", tipo: "Suéter", precio: 50000, fotos: ["IMG_1343.webp"] },

  { nombre: "NY Ondas", tipo: "Camisa", precio: 55000, fotos: ["IMG_1288.webp"] },
  { nombre: "Ángeles beige", tipo: "Camisa", precio: 70000, fotos: ["IMG_1305.webp"] },
  { nombre: "Cremallera gris", tipo: "Camisa", precio: 70000, fotos: ["IMG_1316.webp"] },
  { nombre: "Girasoles", tipo: "Camisa", precio: 55000, fotos: ["IMG_1326.webp", "IMG_1328.webp"] },

  { nombre: "Always Vibrant", tipo: "Buzo", precio: 85000, fotos: ["IMG_1307.webp"] },
  { nombre: "Café", tipo: "Buzo", precio: 80000, fotos: ["IMG_1319.webp"] },
  { nombre: "Paneles gris", tipo: "Buzo", precio: 70000, fotos: ["IMG_1333.webp"] },
];

const DESCRIPCION = "Elaborados en algodón o tela deportiva, con diseños integrados directamente en la tela.";
const WHATSAPP = "573016640877";

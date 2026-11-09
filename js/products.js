/*
  CATÁLOGO DE DAPTREX. Aquí se edita todo:
  - nombre: como aparece en la tarjeta.
  - tipo: "Suéter", "Camisa" o "Buzo" (de aquí salen los filtros).
  - precio: número sin puntos (80000). Si es null, la tarjeta dice "Precio por WhatsApp".
  - fotos: nombres de archivo dentro de img/web/. La primera es la foto principal.
    Las fotos .png (sin fondo) se muestran completas, sin recortar.
*/
const PRODUCTOS = [
  { nombre: "Best Wishes Flower", tipo: "Suéter", precio: 80000, fotos: ["IMG_1286.webp", "IMG_1284.webp", "IMG_1285.webp", "IMG_1287.webp"] },
  { nombre: "Sincere gris", tipo: "Suéter", precio: null, fotos: ["IMG_1295.webp", "IMG_1296.webp", "IMG_1292.webp", "IMG_1293.webp", "IMG_1294.webp", "IMG_1297.webp"] },
  { nombre: "Cruz negra", tipo: "Suéter", precio: null, fotos: ["IMG_1298.webp", "IMG_1300.webp", "IMG_1299.webp"] },
  { nombre: "Come Home With Me", tipo: "Suéter", precio: null, fotos: ["IMG_1303.webp", "IMG_1301.webp", "IMG_1302.webp", "IMG_1304.webp"] },
  { nombre: "Devout Faith", tipo: "Suéter", precio: null, fotos: ["IMG_1309.webp", "IMG_1310.webp"] },
  { nombre: "Only God Can Judge Me", tipo: "Suéter", precio: null, fotos: ["IMG_1311.webp", "IMG_1313.webp", "IMG_1312.webp"] },
  { nombre: "Redemption", tipo: "Suéter", precio: null, fotos: ["IMG_1314.webp", "IMG_1315.webp"] },
  { nombre: "Road Trips", tipo: "Suéter", precio: null, fotos: ["IMG_1322.webp", "IMG_1323.webp"] },
  { nombre: "Tribal negro", tipo: "Suéter", precio: null, fotos: ["IMG_1324.webp", "IMG_1325.webp"] },
  { nombre: "Paneles negro y gris", tipo: "Suéter", precio: null, fotos: ["IMG_1330.webp", "IMG_1331.webp", "IMG_1332.webp"] },
  { nombre: "Axepeak café", tipo: "Suéter", precio: null, fotos: ["IMG_1335.webp", "IMG_1336.webp", "IMG_1339.webp", "IMG_1340.webp"] },
  { nombre: "Axepeak azul", tipo: "Suéter", precio: null, fotos: ["IMG_1337.webp", "IMG_1338.webp"] },
  { nombre: "Tolerance", tipo: "Suéter", precio: null, fotos: ["IMG_1341.webp", "IMG_1342.webp", "IMG_1348.webp"] },
  { nombre: "Streetees negro", tipo: "Suéter", precio: null, fotos: ["IMG_1344.webp", "IMG_1345.webp", "IMG_1346.webp", "IMG_1347.webp"] },
  { nombre: "Streetees blanco", tipo: "Suéter", precio: null, fotos: ["IMG_1343.webp"] },

  { nombre: "NY Ondas", tipo: "Camisa", precio: null, fotos: ["IMG_1288.webp", "IMG_1289.webp", "IMG_1290.webp", "IMG_1291.webp"] },
  { nombre: "Ángeles beige", tipo: "Camisa", precio: null, fotos: ["IMG_1305.webp", "IMG_1306.webp"] },
  { nombre: "Cremallera gris", tipo: "Camisa", precio: null, fotos: ["IMG_1316.webp", "IMG_1317.webp", "IMG_1318.webp"] },
  { nombre: "Girasoles", tipo: "Camisa", precio: null, fotos: ["IMG_1326.webp", "IMG_1328.webp", "IMG_1327.webp", "IMG_1329.webp"] },

  { nombre: "Always Vibrant", tipo: "Buzo", precio: null, fotos: ["IMG_1307.webp", "IMG_1308.webp"] },
  { nombre: "Café", tipo: "Buzo", precio: null, fotos: ["IMG_1319.webp", "IMG_1320.webp", "IMG_1321.webp"] },
  { nombre: "Paneles gris", tipo: "Buzo", precio: null, fotos: ["IMG_1333.webp", "IMG_1334.webp"] },
];

const DESCRIPCION = "Elaborados en algodón o tela deportiva, con diseños integrados directamente en la tela.";
const WHATSAPP = "573016640877";

/*
  CATÁLOGO DE DAPTREX. Aquí se edita todo:
  - nombre: como aparece en la tarjeta.
  - tipo: "Suéter", "Camisa" o "Buzo" (de aquí salen los filtros).
  - precio: número sin puntos (80000). Si es null, la tarjeta dice "Precio por WhatsApp".
  - fotos: nombres de archivo dentro de img/web/. La primera es la foto principal.
    Las fotos .png (sin fondo) se muestran completas, sin recortar.
*/
const PRODUCTOS = [
  { nombre: "Best Wishes Flower", tipo: "Suéter", precio: 80000, fotos: ["IMG_1286.jpg", "IMG_1284.jpg", "IMG_1285.jpg", "IMG_1287.jpg"] },
  { nombre: "Sincere gris", tipo: "Suéter", precio: null, fotos: ["IMG_1295.jpg", "IMG_1296.jpg", "IMG_1292.jpg", "IMG_1293.jpg", "IMG_1294.jpg", "IMG_1297.jpg"] },
  { nombre: "Cruz negra", tipo: "Suéter", precio: null, fotos: ["IMG_1298.jpg", "IMG_1300.jpg", "IMG_1299.jpg"] },
  { nombre: "Come Home With Me", tipo: "Suéter", precio: null, fotos: ["IMG_1303.jpg", "IMG_1301.jpg", "IMG_1302.jpg", "IMG_1304.jpg"] },
  { nombre: "Devout Faith", tipo: "Suéter", precio: null, fotos: ["IMG_1309.jpg", "IMG_1310.jpg"] },
  { nombre: "Only God Can Judge Me", tipo: "Suéter", precio: null, fotos: ["IMG_1311.jpg", "IMG_1313.jpg", "IMG_1312.jpg"] },
  { nombre: "Redemption", tipo: "Suéter", precio: null, fotos: ["IMG_1314.jpg", "IMG_1315.jpg"] },
  { nombre: "Road Trips", tipo: "Suéter", precio: null, fotos: ["IMG_1322.jpg", "IMG_1323.jpg"] },
  { nombre: "Tribal negro", tipo: "Suéter", precio: null, fotos: ["IMG_1324.jpg", "IMG_1325.jpg"] },
  { nombre: "Paneles negro y gris", tipo: "Suéter", precio: null, fotos: ["IMG_1330.jpg", "IMG_1331.jpg", "IMG_1332.jpg"] },
  { nombre: "Axepeak café", tipo: "Suéter", precio: null, fotos: ["IMG_1335.jpg", "IMG_1336.jpg", "IMG_1339.jpg", "IMG_1340.jpg"] },
  { nombre: "Axepeak azul", tipo: "Suéter", precio: null, fotos: ["IMG_1337.jpg", "IMG_1338.jpg"] },
  { nombre: "Tolerance", tipo: "Suéter", precio: null, fotos: ["IMG_1341.jpg", "IMG_1342.jpg", "IMG_1348.jpg"] },
  { nombre: "Streetees negro", tipo: "Suéter", precio: null, fotos: ["IMG_1344.jpg", "IMG_1345.jpg", "IMG_1346.jpg", "IMG_1347.jpg"] },
  { nombre: "Streetees blanco", tipo: "Suéter", precio: null, fotos: ["IMG_1343.jpg"] },

  { nombre: "NY Ondas", tipo: "Camisa", precio: null, fotos: ["IMG_1288.jpg", "IMG_1289.jpg", "IMG_1290.jpg", "IMG_1291.jpg"] },
  { nombre: "Ángeles beige", tipo: "Camisa", precio: null, fotos: ["IMG_1305.jpg", "IMG_1306.jpg"] },
  { nombre: "Cremallera gris", tipo: "Camisa", precio: null, fotos: ["IMG_1316.jpg", "IMG_1317.jpg", "IMG_1318.jpg"] },
  { nombre: "Girasoles", tipo: "Camisa", precio: null, fotos: ["IMG_1326.jpg", "IMG_1328.jpg", "IMG_1327.jpg", "IMG_1329.jpg"] },

  { nombre: "Always Vibrant", tipo: "Buzo", precio: null, fotos: ["IMG_1307.jpg", "IMG_1308.jpg"] },
  { nombre: "Café", tipo: "Buzo", precio: null, fotos: ["IMG_1319.jpg", "IMG_1320.jpg", "IMG_1321.jpg"] },
  { nombre: "Paneles gris", tipo: "Buzo", precio: null, fotos: ["IMG_1333.jpg", "IMG_1334.jpg"] },
];

const DESCRIPCION = "Elaborados en algodón o tela deportiva, con diseños integrados directamente en la tela.";
const WHATSAPP = "573016640877";

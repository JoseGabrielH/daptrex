/*
  CATÁLOGO DE DAPTREX. Aquí se edita todo:
  - nombre: como aparece en la tarjeta.
  - tipo: "Suéter", "Camisa" o "Buzo" (de aquí salen los filtros).
  - precio: número sin puntos (80000). Si es null, la tarjeta dice "Precio por WhatsApp".
  - fotos: nombres de archivo dentro de img/web/. La primera es la foto principal.
    Las fotos .png (sin fondo) se muestran completas, sin recortar.
*/
const PRODUCTOS = [
  { nombre: "Best Wishes Flower", tipo: "Suéter", precio: 80000, fotos: ["IMG_1286.png", "IMG_1284.png", "IMG_1285.png", "IMG_1287.png"] },
  { nombre: "Sincere gris", tipo: "Suéter", precio: null, fotos: ["IMG_1295.png", "IMG_1296.png", "IMG_1292.png", "IMG_1293.png", "IMG_1294.png", "IMG_1297.png"] },
  { nombre: "Cruz negra", tipo: "Suéter", precio: null, fotos: ["IMG_1298.png", "IMG_1300.png", "IMG_1299.png"] },
  { nombre: "Come Home With Me", tipo: "Suéter", precio: null, fotos: ["IMG_1303.png", "IMG_1301.png", "IMG_1302.png", "IMG_1304.png"] },
  { nombre: "Devout Faith", tipo: "Suéter", precio: null, fotos: ["IMG_1309.png", "IMG_1310.png"] },
  { nombre: "Only God Can Judge Me", tipo: "Suéter", precio: null, fotos: ["IMG_1311.png", "IMG_1313.png", "IMG_1312.png"] },
  { nombre: "Redemption", tipo: "Suéter", precio: null, fotos: ["IMG_1314.png", "IMG_1315.png"] },
  { nombre: "Road Trips", tipo: "Suéter", precio: null, fotos: ["IMG_1322.png", "IMG_1323.png"] },
  { nombre: "Tribal negro", tipo: "Suéter", precio: null, fotos: ["IMG_1324.png", "IMG_1325.png"] },
  { nombre: "Paneles negro y gris", tipo: "Suéter", precio: null, fotos: ["IMG_1330.png", "IMG_1331.png", "IMG_1332.png"] },
  { nombre: "Axepeak café", tipo: "Suéter", precio: null, fotos: ["IMG_1335.png", "IMG_1336.png", "IMG_1339.png", "IMG_1340.png"] },
  { nombre: "Axepeak azul", tipo: "Suéter", precio: null, fotos: ["IMG_1337.png", "IMG_1338.png"] },
  { nombre: "Tolerance", tipo: "Suéter", precio: null, fotos: ["IMG_1341.png", "IMG_1342.png", "IMG_1348.png"] },
  { nombre: "Streetees negro", tipo: "Suéter", precio: null, fotos: ["IMG_1344.png", "IMG_1345.png", "IMG_1346.png", "IMG_1347.png"] },
  { nombre: "Streetees blanco", tipo: "Suéter", precio: null, fotos: ["IMG_1343.png"] },

  { nombre: "NY Ondas", tipo: "Camisa", precio: null, fotos: ["IMG_1288.png", "IMG_1289.png", "IMG_1290.png", "IMG_1291.png"] },
  { nombre: "Ángeles beige", tipo: "Camisa", precio: null, fotos: ["IMG_1305.png", "IMG_1306.png"] },
  { nombre: "Cremallera gris", tipo: "Camisa", precio: null, fotos: ["IMG_1316.png", "IMG_1317.png", "IMG_1318.png"] },
  { nombre: "Girasoles", tipo: "Camisa", precio: null, fotos: ["IMG_1326.png", "IMG_1328.png", "IMG_1327.png", "IMG_1329.png"] },

  { nombre: "Always Vibrant", tipo: "Buzo", precio: null, fotos: ["IMG_1307.png", "IMG_1308.png"] },
  { nombre: "Café", tipo: "Buzo", precio: null, fotos: ["IMG_1319.png", "IMG_1320.png", "IMG_1321.png"] },
  { nombre: "Paneles gris", tipo: "Buzo", precio: null, fotos: ["IMG_1333.png", "IMG_1334.png"] },
];

const DESCRIPCION = "Elaborados en algodón o tela deportiva, con diseños integrados directamente en la tela.";
const WHATSAPP = "573016640877";

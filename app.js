const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  const express = require("express");

  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  /* 
envia texto a un contacto
*/
  app.post("/send-text", async (req, res) => {
    const { number, message } = req.body;
    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, { text: message });
    res.send({ data: "Mensaje Enviado!" });
  });

  /* 
envia un archivo IMAGEN
*/
  app.post("/send-image", async (req, res) => {
    const { number, url, caption } = req.body;
    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, {
      image: { url: url },
      caption: caption,
    });
    res.send({ data: "Imagen Enviado!" });
  });

  /* 
envia un archivo PDF
*/
  app.post("/send-pdf", async (req, res) => {
    const { number, url, caption } = req.body;

    const mimeType = mime.lookup(url);

    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, {
      document: { url: url },
      mimetype: mimeType,
      fileName: caption,
    });
    res.send({ data: "Documento Enviado!" });
  });

  /* 
envia un archivo AUDIO
*/
  app.post("/send-audio", async (req, res) => {
    const { number, url } = req.body;

    const mimeType = mime.lookup(url);

    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, {
      audio: { url: url },
      mimetype: mimeType,
      ptt: true,
    });
    res.send({ data: "Audio Enviado!" });
  });

  /* 
envia un archivo VIDEO
*/
  app.post("/send-video", async (req, res) => {
    const { number, url, caption } = req.body;

    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, {
      video: { url: url },
      caption: caption,
      gifPlayback: true,
    });
    res.send({ data: "Video Enviado!" });
  });

  /* 
envia una locacion a un contacto
*/
  app.post("/send-location", async (req, res) => {
    const { number, lat, long } = req.body;
    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, {
      location: { degreesLatitude: lat, degreesLongitude: long },
    });
    res.send({ data: "Locacion Enviada!" });
  });

  /* 
envia botones a un contacto
*/
  app.post("/send-buttons", async (req, res) => {
    const { number, text, footer, databuttons } = req.body;
    const buttons = databuttons;

    const buttonMessage = {
      text,
      footer,
      buttons: buttons,
      headerType: 1,
    };

    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, buttonMessage);
    res.send({ data: "Botones Enviados!" });
  });

  /* 
envia una lista a un contacto
*/
  app.post("/send-list", async (req, res) => {
    const { number, datasections, text, title, footer, buttonText } = req.body;
    const sections = datasections;

    const listMessage = {
      text,
      footer,
      title,
      buttonText,
      sections,
    };

    const modProvider = await adapterProvider.getInstance();
    await modProvider.sendMessage(`${number}@c.us`, listMessage);
    dsds;
  });

  app.get("/on", async (res) => {
    GLOBAL = true;
    res.send("PRENDIDO");
  });

  app.get("/on", function (req, res) {
    GLOBAL_STATE = true;
    res.send("PRENDIDO");
  });

   const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

  QRPortalWeb();
};

main();

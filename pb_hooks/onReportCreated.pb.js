/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateSuccess((e) => {
  e.next();

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat_id) return;

  const comment = e.record.get("comment");
  if (!comment) return;
  const state = e.record.get("state");
  const osm_id = e.record.get("osm_id");
  const message = `*Water Finder*\nNew __${state}__ comment on \`${osm_id}\`\n${comment}`;

  $http.send({
    method: "POST",
    url: `https://api.telegram.org/bot${token}/sendMessage`,
    body: JSON.stringify({
      chat_id: chat_id,
      text: message,
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Reports 💬",
              url: `https://api.waterfinder.org/reports/?osm=${osm_id}`,
            },
          ],
          [
            {
              text: "OpenStreetMap 🌍",
              url: `https://openstreetmap.org/node/${osm_id}`,
            },
          ],
        ],
      },
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}, "reports");

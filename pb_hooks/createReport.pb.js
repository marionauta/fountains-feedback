/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/v1/feedback", (e) => {
  const utils = require(`${__hooks}/utils.cjs`);

  const author_id = utils.authorization_id(
    e.request.header.get("Authorization"),
  );
  if (!author_id) return e.json(403, { error: true });

  const collection = $app.findCollectionByNameOrId("reports");
  const record = new Record(collection);
  record.set("author_id", author_id);
  const fieldNames = ["osm_id", "state", "comment"];
  for (const field of fieldNames) {
    record.set(field, e.request.formValue(field));
  }
  $app.save(record);

  return e.json(201, { ok: true });
});

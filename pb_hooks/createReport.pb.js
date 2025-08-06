/// <reference path="../pb_data/types.d.ts" />

routerAdd("POST", "/v1/feedback", (e) => {
  function authorization_id(authorization) {
    if (!authorization) return null;
    const [method, id] = authorization.split(" ", 2);
    if (method !== "Id" || !id) return null;
    return id;
  }

  const authorization = e.request.header.get("Authorization");
  const author_id = authorization_id(authorization);
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

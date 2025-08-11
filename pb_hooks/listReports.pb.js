/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/v1/feedback/{osm_id}", (e) => {
  const osm_id = e.request.pathValue("osm_id");
  const records = $app.findRecordsByFilter(
    "reports",
    "osm_id = {:osm_id}",
    "-createdAt",
    20,
    0,
    { osm_id },
  );
  const reports = records.map((r) => ({
    id: r.getString("id"),
    created_at: new Date(r.getDateTime("createdAt")),
    state: r.getString("state"),
    comment: r.getString("comment"),
  }));
  return e.json(200, { data: reports });
});

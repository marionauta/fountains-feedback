module.exports = {
  authorization_id(authorization) {
    if (!authorization) return null;
    const [method, id] = authorization.split(" ", 2);
    if (method !== "Id" || !id) return null;
    return id;
  },
};

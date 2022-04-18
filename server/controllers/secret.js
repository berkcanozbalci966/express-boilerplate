async function getSecret(req, res) {
  return res.json({ secret: "this is secret" });
}

module.exports = {
  getSecret,
};

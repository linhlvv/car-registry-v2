let logout = async (req, res) => {
  req.session.destroy();
  res.end()
}

module.exports = {
  logout
}
let logout = async (req, res) => {
  req.session.destroy()
  console.log('\t\t\x1b[4mLogout succeeded\x1b[0m')
  res.end()
}

module.exports = {
  logout
}
let users = [
  { username: "admin", password: "admin" }
];

function geting(req, res) {
  res.json(users);
}

function generateToken() {
  return Math.random().toString().substring(2);
}

function valueUser(req, res, next) {
  let token = req.cookies.token;
  console.log('Token', token);
  let user = users.find(u => u.token === token);
  if (!token) {
    res.status(400).json({ ok: false, message: 'Sin token' });
    return;
  }
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(400).json({ ok: false, message: 'No autorizado' });
  }
}

function register(req, res) {
  let { username, password } = req.body;

  let user = users.find(u => u.username === username);
  if (user) {
    res.status(400).json({ ok: false, message: 'Usuario ya registrado' });
  } else {
    users.push({ username, password });
    res.status(201).json({ ok: true, message: 'Usuario registrado' });
  }
}

async function login(req, res) {
  let { username, password } = req.body;

  let user = users.find(u => u.username === username && u.password === password);
  if (user) {
    let token = generateToken();
    user.token = token;
    res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60) }); // 1 hora de expiro
    res.status(200).json({ ok: true, message: 'Usuario logeado', token });
  } else {
    res.status(400).json({ ok: false, message: 'Nombre de usuario o contraseña incorrectos' });
  }
}

function logout(req, res) {
  let user = req.user;
  delete user.token;
  res.clearCookie('token');
  res.status(200).json({ ok: true, message: 'Usuario deslogeado' });
}

function info(req, res) {
  let user = req.user;
  res.status(200).json({ ok: true, user: { username: user.username, password: user.password } });
}

export default { geting, generateToken, valueUser, register, login, logout, info }

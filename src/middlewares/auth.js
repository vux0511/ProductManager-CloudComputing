const jwt = require('jsonwebtoken');

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    return false;
  } catch (error) {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);

  if (!tokenDecoded) return res.redirect('/login');
  
  req.user = tokenDecoded.id;
  req.token = token;

  next();
};

// const auth = (req, res, next) => {
//   try {
//     const token = req.header("x-auth-token");

//     if(!token) 
//       return res.status(401).json({ msg: "No auth token, access denied."})

//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     if(!verified)
//       return res.status(401).json({ msg: 'Token verification failed, authorization denied'})
    
//     req.user = verified.id;
//     req.token = token;
//     next();
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }

module.exports = { tokenDecode, auth }
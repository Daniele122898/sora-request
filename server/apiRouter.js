const router = require('express').Router();
const axios = require('axios');

const soraPort = 8187;

const authCheck = (req, res, next) => {
    if(req.user) {
      next();
    } else {
        if (req.originalUrl.includes('api')) {
            res.status(401).send('Unauthorized');
        } else {
            res.redirect('/auth/login')
        }
    }
};

router.get('/checkLogin', (req, res) => {
    if (req.user) {
      res.json({
        login: true,
        user: req.user
      });
    } else {
      res.json({
        login: false
      });
    }
});

router.post('/requestWaifu', authCheck, (req, res) => {
    let request = {
        ...req.body,
        userId: req.user.id
    }

    axios.post(`http://localhost:${soraPort}/api/SoraApi/waifuRequest`, request)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

module.exports = router;
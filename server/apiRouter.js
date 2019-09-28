const router = require('express').Router();
const axios = require('axios');

const soraPort = process.env.NODE_ENV === 'production' ? 8087 : 8187;

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

router.post('/requestApproval', authCheck, (req, res) => {
  let request = {
    ...req.body,
    userId: req.user.id
  };

  axios.post(`http://localhost:${soraPort}/api/Waifu/requestApproval`, request)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

router.get('/getAllRequests', authCheck, (req, res) => {
  axios.get(`http://localhost:${soraPort}/api/Waifu/getAllRequests/${req.user.id}`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

router.get('/getAdminRequests', authCheck, (req, res) => {

  axios.get(`http://localhost:${soraPort}/api/Waifu/getAdminRequests/${req.user.id}`)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

router.post('/editWaifu', authCheck, (req, res) => {
  let request = {
    ...req.body,
    userId: req.user.id
  };

  axios.post(`http://localhost:${soraPort}/api/Waifu/editWaifu`, request)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

router.post('/requestWaifu', authCheck, (req, res) => {
    let request = {
        ...req.body,
        userId: req.user.id
    };

    axios.post(`http://localhost:${soraPort}/api/Waifu/waifuRequest`, request)
    .then(r => {
        res.json(r.data);
    })
    .catch(e=> {
        console.log(e);
        res.status(500).send('Something broke ;_;')
    });
});

router.post('/setNotify', authCheck, (req, res) => {
  let request = {
    ...req.body,
    userId: req.user.id
  };

  axios.post(`http://localhost:${soraPort}/api/Waifu/setRequestNotify`, request)
  .then(r=> {
    res.json(r.data);
  })
  .catch(e=> {
    console.log(e);
    res.status(500).send('Something broke');
  });

});

module.exports = router;
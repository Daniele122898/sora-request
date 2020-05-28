const router = require('express').Router();
const axios = require('axios');

const soraPort = process.env.NODE_ENV === 'production' ? 8000 : 8100;
const ownerId = '192750776005689344';

const authCheck = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        if (req.originalUrl.includes('api')) {
            res.status(401).send('Unauthorized');
        } else {
            res.redirect('/auth/login')
        }
    }
};


const handleError = (res, error) => {
    if (error.response) {
        // The request was made and the server responded with a
        // status code that falls out of the range of 2xx
        res.status(error.response.status).send(error.response.data)
    } else {
        res.status(500).send('Something broke ;_;')
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

router.post('/request/:requestId/approve', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id
    if (userId != ownerId) {
        res.status(401).send("Only Sora admin can accept or reject requests!")
    }

    axios.post(`http://localhost:${soraPort}/api/requests/${requestId}/approve`, request)
        .then(r => {
            res.status(200).send();
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});


router.post('/request/:requestId/reject', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id
    if (userId != ownerId) {
        res.status(401).send("Only Sora admin can accept or reject requests!")
    }

    axios.post(`http://localhost:${soraPort}/api/requests/${requestId}/reject`, request)
        .then(r => {
            res.status(200).send();
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.get('/getAllRequests', authCheck, (req, res) => {
    axios.get(`http://localhost:${soraPort}/api/requests/user/${req.user.id}`)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.get('/getAdminRequests', authCheck, (req, res) => {
    const userId = req.user.id
    if (userId != ownerId) {
        res.status(401).send("Only Sora admin can access all requests!")
    }

    axios.get(`http://localhost:${soraPort}/api/requests`)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.post('/editWaifu', authCheck, (req, res) => {
    let request = {
        ...req.body,
        userId: req.user.id
    };

    axios.post(`http://localhost:${soraPort}/api/requests/${requestId}`, request)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.post('/requestWaifu', authCheck, (req, res) => {
    let request = {
        ...req.body,
        userId: req.user.id
    };

    axios.post(`http://localhost:${soraPort}/api​/requests​/user​/${req.user.id}`, request)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.post('/setNotify', authCheck, (req, res) => {
    let request = {
        ...req.body,
        userId: req.user.id
    };

    axios.post(`http://localhost:${soraPort}/api/requests/user/${req.user.id}/notify`, request)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });

});

module.exports = router;

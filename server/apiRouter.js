const router = require('express').Router();
const axios = require('axios');
const keys = require('./keys');

const soraPort = process.env.NODE_ENV === 'production' ? 8000 : 8100;
const url = process.env.NODE_ENV === 'production' ? 'http://api.sorabot.pw/bot/0/api' : `http://localhost:${soraPort}/api`;
const ownerId = '192750776005689344';
const axiosHeaders = {
    headers: {
        'Authorization': keys.apiKey
    }
}

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
        console.log("Sending error data: ", error.response.data);
        res.status(error.response.status).send({error: error.response.data});
    } else {
        res.status(500).send('Something broke ;_;');
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

router.patch('/request/:requestId/approve', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id
    if (userId != ownerId) {
        res.status(401).send("Only Sora admin can accept or reject requests!")
    }

    axios.patch(`${url}/requests/${requestId}/approve`, null, axiosHeaders)
        .then(r => {
            res.status(200).send();
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});


router.patch('/request/:requestId/reject', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id
    if (userId != ownerId) {
        res.status(401).send("Only Sora admin can accept or reject requests!")
    }

    axios.patch(`${url}/requests/${requestId}/reject`, null, axiosHeaders)
        .then(r => {
            res.status(200).send();
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.get('/getAllRequests', authCheck, (req, res) => {
    axios.get(`${url}/requests/user/${req.user.id}`, axiosHeaders)
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

    axios.get(`${url}/requests`, axiosHeaders)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.post('/editWaifu/:requestId', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    let request = {
        ...req.body,
        requestId: Number.parseInt(requestId),
        userId: req.user.id
    };

    let p;
    if (req.user.id == ownerId) {
        p = axios.put(`${url}/requests/${requestId}/admin`, request, axiosHeaders);
    } else {
        p = axios.put(`${url}/requests/${requestId}`, request, axiosHeaders);
    }

    p.then(r => {
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
    axios.post(`${url}/requests/user/${req.user.id}`, request, axiosHeaders)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});

router.delete('/removeRequest/:requestId', authCheck, (req, res) => {
    const requestId = req.params.requestId;
    const userId = req.user.id;
    axios.delete(`${url}/requests/user/${userId}/${requestId}`, axiosHeaders)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });
});


router.get('/getNotify', authCheck, (req, res) => {
    axios.get(`${url}/requests/user/${req.user.id}/notify`, axiosHeaders)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.error(e);
            handleError(res, e);
        });
});

router.post('/setNotify', authCheck, (req, res) => {
    axios.post(`${url}/requests/user/${req.user.id}/notify`, req.body, axiosHeaders)
        .then(r => {
            res.json(r.data);
        })
        .catch(e => {
            console.log(e);
            handleError(res, e);
        });

});

module.exports = router;

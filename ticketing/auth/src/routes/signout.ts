import express from 'express'

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    req.session = null;
    res.cookie('jwt',  null, {
        maxAge: -1
    });

    res.send({});
})

export { router as signoutRouter };
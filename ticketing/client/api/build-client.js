import axios from 'axios';

const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        // On the server

        // Dev Local
        // baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'

        return axios.create({
            baseURL:
                'http://www.endofeighty.com/',
            headers: req.headers,
        });
    } else {
        // On the browser
        return axios.create({
            baseURL: '/',
        });
    }
};

export default buildClient;
import * as chai from 'chai';
import chaiHttp = require('chai-http')
import 'mocha';

import app from '../../src/app';

chai.use(chaiHttp);

describe('/index', () => {
    it('Should respond with HTTP status code = 200', async () => {
        return chai
            .request(app)
            .get('/index')
            .then(res => {
                chai.expect(res.status).to.be.equal(200);
            });
    });

    it('Should respond with success message', async () => {
        return chai
            .request(app)
            .get('/index')
            .then(res => {
                chai.expect(res.body.status).to.be.equal('success');
            });
    });
});
const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:3000/`;
const request = require('supertest')(url);
describe('GraphQL', () => {
    it('Query Surveys ', (done) => {
        request.post('graphql')
        .send({ query: '{ surveys(limit:10){id, title,description,questions{id,surveyId,question,questionType}} }'})
        .expect(200)
        .end((err,res) => {
            // res will contain array with one user
            if (err) return done(err);
            // console.log(res);
             expect(res.body.data.surveys,'Surveys does not exist');
             assert.isArray(res.body.data.surveys);
             assert.isAtLeast(res.body.data.surveys.length,1,'Surveys does not have one element at least ');
             assert.containsAllKeys(res.body.data.surveys[0],['id', 'title','description','questions']);
            done();
        })
    })
});
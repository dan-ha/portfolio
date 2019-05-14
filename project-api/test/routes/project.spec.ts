'use strict'

import * as chai from 'chai';
import chaiHttp = require('chai-http');
const expect = chai.expect;
import {ObjectId} from 'mongodb';

import app from '../../src/app';
import { Project } from '../../src/model/project';


chai.use(chaiHttp);

const project: Project = {
    title: 'title',
    subtitle: 'subtitle',
    description: 'description',
    type: 'fun',
    tags: ['chai', 'mocha'],
    images: []
}
let projectId: string;

describe('Project API - CRUD operations', () => {
    describe('CREATE-POST /project', () => {
        it('should create new project - 201 Created', async () => {
            return chai
                .request(app)
                .post('/project')
                .send(project)
                .then(res => {
                    expect(res.status).to.be.equal(201);
                    expect(res.body.title).to.be.equal(project.title);
                    expect(res.body.subtitle).to.be.equal(project.subtitle);
                    expect(res.body.description).to.be.equal(project.description);
                    expect(res.body.type).to.be.equal(project.type);
                    expect(res.body.tags).include(project.tags[0]);
                    expect(res.body.tags).include(project.tags[1]);
                    projectId = res.body._id;
                });
        });
        it('should return 400 for invalid project', async () => {
            const invalidProject = {};
            return chai
                .request(app)
                .post('/project')
                .send(invalidProject)
                .then(res => {
                    expect(res.status).to.be.equal(400);
                })
        });
    });

    describe('READ-GET /project/{projectId}', () => {
        it('should get project - 200', async () => {
            return chai
                .request(app)
                .get(`/project/${projectId}`)
                .then(res => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body._id).to.be.equal(projectId);
                    expect(res.body.title).to.be.equal(project.title);
                    expect(res.body.subtitle).to.be.equal(project.subtitle);
                    expect(res.body.description).to.be.equal(project.description);
                    expect(res.body.type).to.be.equal(project.type);
                });
        });
        it('should return 400 for invalid id', async () => {
            const invalidId = 'invalidId';
            return chai
                .request(app)
                .get(`/project/${invalidId}`)
                .then(res => {
                    expect(res.status).to.be.equal(400);
                });
        });
        it('should return 404 for non-existing projectId', async () => {
            const nonExistingId = new ObjectId();
            return chai
                .request(app)
                .get(`/project/${nonExistingId}`)
                .then(res => {
                    expect(res.status).to.be.equal(404);
                });
        });

    });

    describe('UPDATE-PATCH /project/{projectId}', () => {
        it('should update existing project - 200', async () => {
            // Arrange
            const updateProject: Project = JSON.parse(JSON.stringify(project));
            const updatedTitle = 'updated title';
            const updatedDescription = 'updated description';
            updateProject.title = updatedTitle
            updateProject.description = updatedDescription;
            // Act
            return chai
                .request(app)
                .patch(`/project/${projectId}`)
                .send(updateProject)
                .then(res => {
                    // Assert
                    expect(res.status).to.be.equal(200);
                    expect(res.body._id).to.be.equal(projectId);
                    expect(res.body.title).to.be.equal(updatedTitle);
                    expect(res.body.description).to.be.equal(updatedDescription);
                });
        });
        it('should return 400 for invalid project', async () => {
            const projectId = '999999';
            return chai
                .request(app)
                .patch(`/project/${projectId}`)
                .send({})
                .then(res => {
                    expect(res.status).to.be.equal(400);
                });
        });
        it('should return 404 for non-existing project', async () => {
            const nonExistingId = new ObjectId();
            return chai
                .request(app)
                .patch(`/project/${nonExistingId}`)
                .send({})
                .then(res => {
                    expect(res.status).to.be.equal(404);
                });
        });
    });

    describe('DELETE /project/{projectId}', () => {
        it('should delete existing project - 200', async () => {
            return chai
                .request(app)
                .delete(`/project/${projectId}`)
                .then(res => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body._id).to.be.equal(projectId);
                });
        });
        it('should return 400 for invalid projectId', async() => {
            const invalidProjectId = 'invalidProjectId';
            return chai
                .request(app)
                .delete(`/project/${invalidProjectId}`)
                .then(res => {
                    expect(res.status).to.be.equal(400);
                });
        });
        it('should return 404 for non-existing project', async() => {
            const nonExisting = new ObjectId();
            return chai
                .request(app)
                .delete(`/project/${nonExisting}`)
                .then(res => {
                    expect(res.status).to.be.equal(404);
                });
        });
    })
});
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

it('return a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'update',
            price: 30,
        })
        .expect(404);
});

it('return a 401 if the user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'update',
            price: 30
        })
        .expect(401);
});

it('return a 401 if the user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcde213',
            price: 20
        });
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'update',
            price: 100
        }).expect(401);
});

it('return a 400 if the user provides an invalid title or price', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcde213',
            price: 20
        });
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 100
        }).expect(400);

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'test',
            price: -1
        }).expect(400);
});

it('updates the ticket provided valid input', async () => {
    const cookie = global.signin();

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcde213',
            price: 20
        });
        
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'New value',
            price: 100
        }).expect(200);

    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('New value');
    expect(ticketResponse.body.price).toEqual(100);
});

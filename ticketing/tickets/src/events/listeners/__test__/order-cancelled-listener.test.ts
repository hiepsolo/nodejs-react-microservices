import { OrderCancelledEvent, OrderCreatedEvent, OrderStatus } from '@epitickets/common';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
    // Create an instance of the listener
    const listener = new OrderCancelledListener(natsWrapper.client);

    const orderId = new mongoose.Types.ObjectId().toHexString();
    // Create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: 'asdsad'
    });
    ticket.set({orderId});
    await ticket.save();

    // Create the fake data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id!,
        },
    };

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn(),
    };

    return { listener, ticket, data, msg, orderId};
};

it('updates the ticket, publishes an event, and acks the message', async () => {
    const { listener, ticket, data, msg, orderId} = await setup();
    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

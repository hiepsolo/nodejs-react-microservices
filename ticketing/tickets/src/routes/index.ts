import express, {Request, Response} from 'express'
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined
    });
    console.log('🚀 ~ file: index.ts ~ line 10 ~ router.get ~ tickets', tickets);

    res.status(200).send(tickets);
});

export {router as indexTicketRouter};
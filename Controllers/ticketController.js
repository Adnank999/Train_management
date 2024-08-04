const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  const { userId, trainServiceId, stationIdStart, stationIdEnd, travelDate } = req.body;

  try {
   
    const trainService = await prisma.trainService.findUnique({ where: { id: trainServiceId } });
    if (!trainService) {
      return res.status(400).json({ message: 'Invalid train service ID' });
    }

    const stationStart = await prisma.station.findUnique({ where: { id: stationIdStart } });
    if (!stationStart) {
      return res.status(400).json({ message: 'Invalid start station ID' });
    }

    const stationEnd = await prisma.station.findUnique({ where: { id: stationIdEnd } });
    if (!stationEnd) {
      return res.status(400).json({ message: 'Invalid end station ID' });
    }

   
    const fare = 10.0;

    
    const ticket = await prisma.ticket.create({
      data: {
        userId,
        trainServiceId,
        stationIdStart,
        stationIdEnd,
        purchaseDate: new Date(),
        travelDate: new Date(travelDate),
        price: fare
      }
    });

    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error: error.message });
  }
};

const purchaseTicket = async (req, res) => {
  const { userId, ticketId } = req.body;

  try {
   
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    });

    if (!ticket) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    if (wallet.balance < ticket.price) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

  
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: { balance: wallet.balance - ticket.price }
    });

  
    await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: -ticket.price,
        date: new Date(),
        type: 'debit'
      }
    });

    res.status(200).json({ message: 'Ticket purchased successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing ticket', error: error.message });
  }
};

module.exports = { createTicket, purchaseTicket };

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {

  const station1 = await prisma.station.create({
    data: {
      name: 'Station A',
      latitude: 40.7128,
      longitude: -74.0060
    }
  });

  const station2 = await prisma.station.create({
    data: {
      name: 'Station B',
      latitude: 34.0522,
      longitude: -118.2437
    }
  });


  const trainService = await prisma.trainService.create({
    data: {
      name: 'Express Train',
      type: 'Express'
    }
  });


  const schedule1 = await prisma.schedule.create({
    data: {
      trainServiceId: trainService.id,
      stationId: station1.id,
      arrivalTime: new Date('2024-08-01T09:00:00Z'),
      departureTime: new Date('2024-08-01T09:15:00Z')
    }
  });

  const schedule2 = await prisma.schedule.create({
    data: {
      trainServiceId: trainService.id,
      stationId: station2.id,
      arrivalTime: new Date('2024-08-01T12:00:00Z'),
      departureTime: new Date('2024-08-01T12:15:00Z')
    },
    
  });

  const hashedPassword = await bcrypt.hash('hashedpassword123', 10);

  
  const user = await prisma.user.create({
    data: {
      name: 'John Doe 2',
      email: 'john2@example.com',
      password: hashedPassword  
    }
  });
  
  const wallet = await prisma.wallet.create({
    data: {
      userId: user.id,
      balance: 100.0
    }
  });

 
  const transaction1 = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      amount: 50.0,
      date: new Date('2024-08-01T09:00:00Z'),
      type: 'credit'
    }
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      amount: 30.0,
      date: new Date('2024-08-02T09:00:00Z'),
      type: 'debit'
    }
  });

  const ticket1 = await prisma.ticket.create({
    data: {
      userId: user.id,
      trainServiceId: trainService.id,
      stationIdStart: station1.id,
      stationIdEnd: station2.id,
      purchaseDate: new Date(),
      travelDate: new Date(),
      price: 50.0,
    }
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      userId: user.id,
      trainServiceId: trainService.id,
      stationIdStart: station1.id,
      stationIdEnd: station2.id,
      purchaseDate: new Date(),
      travelDate: new Date(),
      price: 100.0,
    }
  });

  console.log('Dummy data created!');
}

  


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

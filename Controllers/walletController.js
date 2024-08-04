
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addFunds = async (req, res) => {
  const { userId, amount } = req.body;

  try {
   
    let wallet = await prisma.wallet.findUnique({
      where: { userId }
    });

   
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: {
          userId,
          balance: amount, 
        }
      });

    
      const transaction = await prisma.transaction.create({
        data: {
          walletId: wallet.id,
          amount,
          date: new Date(),
          type: 'credit'
        }
      });

      return res.status(201).json({ message: 'Wallet created and funds added successfully', wallet, transaction });
    }

  
    const updatedWallet = await prisma.wallet.update({
      where: { userId },
      data: {
        balance: wallet.balance + amount
      }
    });

   
    const transaction = await prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount,
        date: new Date(),
        type: 'credit'
      }
    });

    res.status(200).json({ message: 'Funds added successfully', updatedWallet, transaction });
  } catch (error) {
    res.status(500).json({ message: 'Error adding funds', error: error.message });
  }
};

const getWalletBalance = async (req, res) => {
    const { userId } = req.params;
  
    try {
     
      const wallet = await prisma.wallet.findUnique({
        where: { userId },
        include: {
          user: true 
        }
      });
  
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      
      const { name, email } = wallet.user;
  
      res.status(200).json({
        user: {
          name,
          email,
          balance: wallet.balance
        },
        
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallet balance', error: error.message });
    }
  };

module.exports = { addFunds,getWalletBalance};


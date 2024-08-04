const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createStation = async (req, res) => {
  const { name, latitude, longitude } = req.body;

  try {
    const station = await prisma.station.create({
      data: {
        name,
        latitude,
        longitude
      }
    });
    res.status(201).json({ message: 'Station created successfully', station });
  } catch (error) {
    res.status(500).json({ message: 'Error creating station', error: error.message });
  }
};


const getStation = async (req, res) => {
  const { id } = req.params;

  try {
    const station = await prisma.station.findUnique({
      where: { id }
    });

    if (station) {
      res.status(200).json(station);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching station', error: error.message });
  }
};


const updateStation = async (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude } = req.body;

  try {
    const station = await prisma.station.update({
      where: { id },
      data: { name, latitude, longitude }
    });
    res.status(200).json({ message: 'Station updated successfully', station });
  } catch (error) {
    res.status(500).json({ message: 'Error updating station', error: error.message });
  }
};

module.exports = { createStation, getStation, updateStation };

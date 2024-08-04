const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createTrainService = async (req, res) => {
  const { name, type, schedule } = req.body;

  try {
    const trainService = await prisma.trainService.create({
      data: {
        name,
        type,
        schedule: {
          create: schedule.map((item) => ({
            stationId: item.stationId,
            arrivalTime: item.arrivalTime,
            departureTime: item.departureTime,
          })),
        },
      },
    });
    res
      .status(201)
      .json({ message: "Train service created successfully", trainService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating train service", error: error.message });
  }
};


const getTrainService = async (req, res) => {
  const { id } = req.params;

  try {
    const trainService = await prisma.trainService.findUnique({
      where: { id },
      include: {
        schedule: {
          include: {
            station: true,
          },
        },
      },
    });

    if (trainService) {
      res.status(200).json(trainService);
    } else {
      res.status(404).json({ message: "Train service not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching train service", error: error.message });
  }
};

const updateTrainService = async (req, res) => {
  const { id } = req.params;
  const { name, type, schedule } = req.body;

  try {
    const trainService = await prisma.trainService.update({
      where: { id },
      data: {
        name,
        type,
        schedule: {
          deleteMany: {},
          create: schedule.map((item) => ({
            stationId: item.stationId,
            arrivalTime: item.arrivalTime,
            departureTime: item.departureTime,
          })),
        },
      },
      include: { schedule: true },
    });
    res
      .status(200)
      .json({ message: "Train service updated successfully", trainService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating train service", error: error.message });
  }
};


const getAllTrainServices = async (req, res) => {
  try {
    const trainServices = await prisma.trainService.findMany({
      include: { schedule: true },
    });
    res.status(200).json(trainServices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching train services", error: error.message });
  }
};

module.exports = {
  createTrainService,
  getTrainService,
  updateTrainService,
  getAllTrainServices,
};

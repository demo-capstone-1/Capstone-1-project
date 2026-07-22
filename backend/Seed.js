const { sequelize, Option, Vote, Poll } = require("./models");

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database reset and synced.");

    const poll = await Poll.create({
      title: "Best Programming Language?",
      description: "Pick your favorite",
    });

    const choice1 = await Option.create({ text: "JavaScript", pollId: poll.id });
    const choice2 = await Option.create({ text: "CSS", pollId: poll.id });

    await Vote.create({ optionId: choice1.id });

    console.log("Seed data created successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();
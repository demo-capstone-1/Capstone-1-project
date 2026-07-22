const express = require("express");
const router = express.Router();
const { Poll, Option, Vote } = require("../models");

// GET: Return all polls
router.get("/polls", async (req, res, next) => {
  try {
    const polls = await Poll.findAll();
    res.json(polls);
  } catch (error) {
    next(error);
  }
});

// POST : create a new poll with its options
router.post("/polls", async (req, res, next) => {
  try {
    const { title, description, options } = req.body;
    const poll = await Poll.create({ title, description, options });

    options.map((opt) => ({
      text: opt.text,
      pollId: poll.id,
    }));
    res.status(201).json({ ...poll.toJSON() });
  } catch (error) {
    next(error);
  }
});
// Get: Return a single poll with its options and vote
router.get("/polls/:id", async (req, res, next) => {
  try {
    const poll = await Poll.findByPk(req.params.id, {
      include: {
        model: Option,
        as: "options",
        include: { model: Vote, as: "votes" },
      },
    });

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    res.json(poll);
  } catch (error) {
    next(error);
  }
});

// Post: Submit a vote for an option
router.post("/polls/:id/vote", async (req, res, next) => {
  try {
    const { optionId } = req.body;

    const option = await Option.findOne({
      where: {
        id: optionId,
        pollId: req.params.id,
      },
    });

    if (!option) {
      return res.status(400).json({ error: "Invalid option for the poll" });
    }

    const vote = await Vote.create({ optionId });
    res.status(201).send("Vote sent").json(vote);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

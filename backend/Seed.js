const { sequelize, Option, Vote, Poll } = require("./models")

async function SeedDatabase(){
    try{
    // Test the db connection
    await sequelize.authenticate();
    console.log("Database has connected!")
    // To sync the database models
    await sequelize.sync({alter: true})
    console.log("Models synced to the Database!")

    const poll = await Poll.create({
        title: "Best Programming Language?",
        description: "Pick your favorite",
    });
    console.log("Poll created:", poll.toJSON());

    const choice1 = await Option.create({ text: "JavaScript", pollId: poll.id });
    const choice2 = await Option.create({ text: "CSS", pollId: poll.id });
    console.log("Options created:", choice1.text, choice2.text);

    const vote = await Vote.create({
        optionId: choice1.id
    });
    console.log("Vote created for option:", choice1.text)

    const result = await Poll.findByPk(poll.id, {
        include: {
            model: Option,
            as: "options",
            include: {model : Vote, as: "votes"}
        },
    });

    console.log("Full nested result:");
    console.log(JSON.stringify(result, null, 2))

    }catch(error){
        console.error("Unable to connect:", error)
    }finally{
        await sequelize.close()
    }
}

SeedDatabase();
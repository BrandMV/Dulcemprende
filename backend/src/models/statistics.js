const mongoose = require("mongoose")

const statisticsSchema = new mongoose.Schema({
    invest: {
        type: Number
    },
    profit: {
        type: Number
    },
    selled: {
        type: Number
    },
})

const userStatisticsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        statistics: statisticsSchema,
    },
    { timestamps: true }
)

mongoose.model("Statistics", statisticsSchema)
module.exports = mongoose.model("UserStatistics", userStatisticsSchema)
const UserStatistics = require("../models/statistics")
const statistics = require("../models/statistics")
exports.addStatistics = (req, res) => {
    const { payload } = req.body
    if(payload.statistics){
        if(payload.statistics._id){
            UserStatistics.findOneAndUpdate(
                { user: req.user._id, "statistics._id": payload.statistics._id},
                {
                    $set: {
                        "statistics.$": payload.statistics
                    },
                }
            ).exec((error, statistics) => {
                if (error) return res.status(400).json({error})
                if (statistics){
                    res.status(201).json({statistics})
                }
            })
         } else{
            UserStatistics.findOneAndUpdate(
                { user: req.user._id},
                {
                    $push: {
                        statistics: payload.statistics,
                    },
                },
                { new: true, upsert: true }
            ).exec((error, statistics) => {
                if(error) return res.status(400).json({ error })
                if(statistics){
                    res.status(201).json({ statistics })
                }
            })
        }
    }else{
        res.status(400).json({ error: "Algo salio mal..."})
    }
}

exports.getStatistics = (req, res) => {
    UserStatistics.find({ user: req.user_id }).exec((error, statistics) => {
        if(error) return res.status(400).json({ error })
        if(statistics){
            res.status(200).json({ statistics })
    
        }
    })
    
        
}
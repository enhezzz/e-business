const mongoose = require('mongoose');
module.exports = {
    userId: mongoose.Schema.Types.ObjectId,
    prodInfo: {
        type: [
            {
                prodId: mongoose.Schema.Types.ObjectId,
                prodName: {
                    type: String,
                    default: ""
                },
                prodPrice: {
                    type: Number,
                    default: 0
                },
                prodNum: {
                    type: Number,
                    default: 0
                }
            }
           
            ],
        default: function(){
            return [];
        }
    }
    // prodId: mongoose.Schema.Types.ObjectId,
    // prodName: {
    //     type: String,
    //     default: ""
    // },
    // prodPrice: {
    //     type: Number,
    //     default: 0
    // },
    // prodNum: {
    //     type: Number,
    //     default: 0
    // }
}
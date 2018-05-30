module.exports = {
    "p_name":{
        type:String
    },
    "p_brand":{
        type:String
    },
    "p_style":{
        type:String
    },
    "p_desc":{
        type:String
    },
    "p_pics":[{
        type:String
    }],
    "p_price": {
        type: Number,
        default: 0
    },
    "p_num": {
        type: Number,
        default: 0
    },
    "p_date": {
        type: Date
    }
}
module.exports = {
    username:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required:true
    },
    auth:{
      type: Number,
      required: true
    },
    addrs:{
      type: Array,
      default: []
    }
  }
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username:{
         type: String,
         trim:true,
         rquired:'User name is required'
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/]
    },
    thoughts:[
      {
        type:Schema.Types.ObjectId,
        ref:'Thought'
      }
    ],
    friends:[
      {
        type:Schema.Types.ObjectId,
        ref:'User'
      }
    ]
},
{
  toJOSN:{
    virtual:true,
  },
  id:false
})

UserSchema.virtual('friendCount').get(function(){
   return this.friends.length;
});


const User = model('User',UserSchema);
module.exports = User;
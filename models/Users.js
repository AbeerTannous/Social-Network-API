const{schema ,model}= require('mongoose');

const UserSchema = new schema({
    username:{
         type: String,
         trim:true,
         rquired:'User name is required'
    },
    email: {
         type: String,
         unique: true,
         match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
      },
    thoughts:[ThoughtSchema],
    friends:[UserSchema]

});

UserSchema.virtual('friendCount').get(function(){
   return this.friends.length;
});


const User =model('User',UserSchema);
module.exports = User;
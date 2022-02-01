const {Schema , model ,Types} = require('mongoose');


// reaction schema
const ReactionSchema = new Schema({

     reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
     },

     reactionBody:{
         type:String,
         required:true,
         maxlength:280
     },

     username:{
         type:String,
         required:true
     },

     createdAt: {
          type:Date,
          default:Date.now,
          
     }
})


// thoughts chema
const ThoughtSchema = new Schema({

    thoughtText:{
        type:String,
        required:true,
        minlength: 1,
        maxlength: 280
    },

    createdAt:{
        type:Date,
        default:Date.now,
        
    },
    
    reactions:[ReactionSchema]

});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
 });

const Thought = model('Thought',ThoughtSchema);
module.exports = Thought;
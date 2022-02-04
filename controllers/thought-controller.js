const { Thought, User } = require('../models');

const thoughtController = {
  //get thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path:'reactions',
      select:'-__v'
    })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
//get single thought by id
getThoughtById({ params }, res) {
  Thought.findOne({ _id: params.thoughtId })
    .then(dbthoughtData => {
      if (!dbthoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbthoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //  remove thought 
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }else{
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );}
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }else
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
// update thoughts
updateThpught({ params, body }, res) {
  console.log(params,body);
  Thought.findOneAndUpdate({ _id: params.thoughtId },{$set: body}, { new: true })
    .then(dbthoughtData => {
      if (!dbthoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbthoughtData);
    })
    .catch(err => res.status(400).json(err));
},
  // add reaction to the thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.json(err));
  },
  //remove reaction from thought
  removeReaction({ params }, res) {
    
    Thought.findOneAndUpdate(
      { _id: params.thougtId },
      { $pull: { reactions: params.reactionId } } ,
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
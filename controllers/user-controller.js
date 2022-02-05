const {User} = require('../models');

const userController = {
   // get all users
   getAllUsers(req, res) {
    User.find({})
    .populate({
      path:'thoughts',
      select:'-__v'
    })
      
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },


   // get single user by id and his thought and friend data

   getUserById({ params }, res) {
    User.findOne({ _id: params.id })
       .populate({
          path:'thoughts',
          select:'-__v'
       })
      
       .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

   // post new user
   createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

   // put update user by id
   updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

   // delete remove user by id 
   deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // add friend
  addFriend({ params}, res) {
    User.findByIdAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
       .populate({path: 'friends', select: ('-__v')})
       .select('-__v')
       .then(dbuserData => {
        if (!dbuserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbuserData);
      })
      .catch(err => res.json(err));
  },
  
  // delete friend
  removeFriend({ params }, res) {
     User.findOneAndUpdate(
       { _id: params.id },
       { $pull: { friends: params.friendId } } ,
       { new: true }
     )
          .populate({path: 'friends', select: '-__v'})
          .select('-__v')
       .then(dbuserData => res.json(dbuserData))
       .catch(err => res.json(err));
   }

};


module.exports = userController;

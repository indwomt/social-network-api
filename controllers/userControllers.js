const {Thought, User} = require('../models')


// Gonna throw all these functions into one single export, then we'll do some shorter code for the routes.

module.exports = {
    getAllUsers(req, res) {
      User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
  
    getSingleUser(req, res) {
      
      User.findOne({ _id: req.params.id})
        .select('-__v')
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    createUser(req, res) {
      User.create(req.body)
        .then((newUser) => res.json(newUser))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
  
    deleteUser(req, res) {
        
      User.findOneAndDelete({ _id: req.params.courseId })
        .then((user) =>
        // if there's no user found, do this
          !course
            ? res.status(404).json({ message: 'No User with that Id found' })
            // User found? Do this!
            : Student.deleteMany({ _id: { $in: course.students } })
        )
        .then(() => res.json({ message: 'User deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        )
        .then((user) => {
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          return res.json(user);
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
        });
      }
  }



// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id
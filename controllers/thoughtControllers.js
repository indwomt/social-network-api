const {User, Thought} = require('../models')

module.exports = {

    getAllThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },

      getSingleThought(req, res) {
      
        Thought.findOne({ _id: req.params.id})
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

      createThought(req, res) {
        Thought.create(req.body)
          .then(({_id}) => {
            return User.findOneAndUpdate(
              {_id: body.userId},
              {$push: {thoughts: _id}},
              {new: true}
            )
          })
          .catch(err => res.json(err))
      }, 



      deleteThought(req, res) {
        
        Thought.findOneAndDelete({ _id: req.params.id })
          .then((thought) =>
          // if there's no thought found, do this
            !thought
              ? res.status(404).json({ message: 'No User with that Id found' })
              // User found? Do this!
              : Thought.deleteMany({ _id: { $in: course.students } })
          )
          .then(() => res.json({ message: 'Thought deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
  
      updateThought(req, res) {
          Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
          )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return res.json(thought);
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
          });
        }

}


// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value
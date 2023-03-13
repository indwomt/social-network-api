const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            // regex for validation, putting that hw to good use baby
            match: [/.+@.+\..+/]
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"

            },
        ],
        friends: [
            {
            type:Schema.Types.ObjectId,
            ref: "User"
        },
    ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    }
)

userSchema.virtual('friendCount').get(function (){
    return this.friends.length
})

// Initiate 'User' model, above is the schema, which is different in ways I do not fully understand yet

const User = model("User", userSchema);
module.exports = User


// **User**:

// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

// ---

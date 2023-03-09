const { Schema, model, Types } = require('mongoose');




//Schema for reactions
const reactionSchema = new Schema(
{ 
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },

    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 280
    },

    username: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        //convert the milliseconds into a readble date
        get: dateNowVal => dateNowVal.toString()
    }
    
}
)

reactionSchema.virtual('reactionCount').get(function () {
    return this.comments.length;
})








// Schema for thoughts
const thoughtSchema =  new Schema(
    {
        thoughtext: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
            createdAt: 'created_at'
        },

        createdAt: {
            type: Date,
            default: Date.now,
            //convert the milliseconds into a readble date
            get: dateNowVal => dateNowVal.toString()
        },

        username: {
            type:String,
            required: true
        },
        // the array of nested documents created with reactionSchema
        reactions: [reactionSchema],
    },
    {
        // Makes reactionCount and date functions possible
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id:false,
    }
)

// take that schema, make it model
const Thought = model('Thought', thoughtSchema)

// we only need to export the Thought model
module.exports = Thought














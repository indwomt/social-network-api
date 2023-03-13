const router = require('express').Router();


const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controllers/userControllers')

router.route('/').get(getAllUsers).post(createUser)

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser)



module.exports = router
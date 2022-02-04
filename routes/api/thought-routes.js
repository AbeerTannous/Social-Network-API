const router = require('express').Router();
const { addThought, removeThought ,addReaction ,removeReaction ,getAllThoughts, updateThpught, getThoughtById } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought).put(updateThpught).get(getThoughtById);

router.route('/').get(getAllThoughts);

//
router.route('/:userId/:thoughtId').post(addReaction);

//api/users/:thoughtId/:reactionId
router.route('/:thoughtId/:reactionId').put(removeReaction);





module.exports = router;
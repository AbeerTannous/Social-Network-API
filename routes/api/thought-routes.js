const router = require('express').Router();
const { addThought, removeThought ,addReaction ,removeReaction ,getAllThoughts, updateThpught, getThoughtById } = require('../../controllers/thought-controller');

// /api/thoughts//:userId
router.route('/:userId').post(addThought);

// /api/thoughts//:userId/:thoughtId>
router.route('/:userId/:thoughtId').delete(removeThought).put(updateThpught).get(getThoughtById);
// api/thoughts
router.route('/').get(getAllThoughts);

//api/thoughts//:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

//api/thoughts//:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').put(removeReaction);





module.exports = router;
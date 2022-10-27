const { Comment, Pizza } = require('../models');


const commentController = {
    // add comment to pizza
    addComment({ params, body}, res) {
      console.log(body);
      Comment.create(body)
        .then(({ _id }) => {
          return Pizza.findOneAndUpdate(
            { _id: params.pizzaID },
            { $push: { comments: _id} },
            { new: true }
          )
        })
        .then ( dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: "No Pizza found with this id!"})
          }

          res.status(200).json(dbPizzaData)
        })
        .catch( err => res.json(err))
    },
  
    // remove comment
    removeComment({ params }, res) {
      Comment.findOneAndDelete({ _id: params.commentID })
        .then(deletedComment => {
          if (!deletedComment) {
            return res.status(404).json({message: "No comment with that id was found!"})
          }

          return Pizza.findOneAndUpdate(
            { _id: params.pizzaID },
            { $pull: { comments: params.commentId }},
            { new: true }
          );
        })
        .then( dbPizzaData => {
          if (!dbPizzaData){
            res.status(404).json({message: "No pizza found with this id!"});
          }

          res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    }

}


module.exports = commentController;
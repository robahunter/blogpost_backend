const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
    },
    { timestamps: true }
  );

const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
});

const blogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    ratings: [ratingSchema], // Embed ratings array
    comments: [
        {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          content: { type: String, required: true },
        },
      ],
  },
  { timestamps: true }
);

// Add a virtual field for averageRating
blogSchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) return 0;
  const total = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
  return (total / this.ratings.length).toFixed(1);
});

module.exports = mongoose.model('Blog', blogSchema);

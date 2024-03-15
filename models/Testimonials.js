const { default: mongoose } = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  content: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId },
});

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;

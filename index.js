const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("could not connect to mongodb", err));
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Basset",
    tags: ["Angular", "frontend"],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}
async function getCourse() {
  const courses = await Course.find({ isPublished: false })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
getCourse();

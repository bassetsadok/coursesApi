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
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  console.log("result");

  //course.isPublished = true;
  //course.author = "yassmina sadok";
  course.set({
    isPublished: true,
    author: "yassmina sadok",
  });
  const result = await course.save();
  console.log(result);
}

async function updateCourseWithoutRetrieveItFirst(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      //mongodb operator facebook like $inc
      $set: {
        author: "yassmine ",
      },
    },
    { new: true } //send the new updated object
  );
  console.log(course);
}
async function removeCourse(id) {
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
removeCourse("625f52d864ecbc3de41283f1");

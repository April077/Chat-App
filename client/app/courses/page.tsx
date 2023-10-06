import Card from "@/components/Card";

interface CourseProp {
  id: String;
  title: String;
  description: String;
  price: Number;
  image: String;
  userId: String;
}

export default async function Courses() {
  const res = await fetch("http://localhost:3000/api/getCourses");
  const courses = await res.json();
  console.log(courses);

  return (
    // <div>
    //   {courses.map((course: CourseProp) => (
    //     <div key={course.id}>{course.id}</div>
    //   ))}
    // </div>
    <Card/>
  );
}

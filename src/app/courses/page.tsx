import { coursesData } from "../../utils/fakeData";
import { ImBook } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
export default function Course() {
  return (
    <div className="container mx-auto bg-white h-full p-5">
      <h2 className="uppercase font-bold text-2xl bg-gray-100 p-3 rounded-md text-indigo-500 flex items-center gap-3">
        <ImBook />
        Avaiable courses
      </h2>
      <div className="grid grid-cols-4 gap-5 my-3">
        {coursesData.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`}>
            <div className="bg-white shadow rounded-md p-5 cursor-pointer">
              <div className="p-5">
                <Image
                  className="rounded-full shadow-xl opacity-90"
                  src={"/assets/course.jpg"}
                  alt={"Course baged"}
                  width={512}
                  height={512}
                />
              </div>
              <h2 className="text-center w-full uppercase font-semibold text-xl hover:text-indigo-500">
                {course.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

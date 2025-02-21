import React from "react";

const BlogCard = ({ img, headlines, description }) => {
  return (
    <div className="group flex flex-col items-center text-center gap-2 w-full lg:w-1/3 p-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-lg cursor-pointer lg:hover:-translate-y-6 transition duration-300 ease-in-out">
      <div>
        <img
          src={img}
          alt="blog"
          className="h-56 w-full rounded-t-xl object-cover"
        />
      </div>
      <h1 className="font-semibold text-lg">{headlines}</h1>
      <p className="text-gray-700">{description}</p>
      <h3 className="text-backgroundColor cursor-pointer hover:text-[#ade9dc] transition duration-300 ease-in-out">
        Read More
      </h3>
    </div>
  );
};

export default BlogCard;

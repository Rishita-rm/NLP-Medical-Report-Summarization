import React from "react";
import Button from "../layouts/Button";
import BlogCard from "../layouts/BlogCard";
import img1 from "../assets/img/blog1.png";
import img2 from "../assets/img/blog2.png";
import img3 from "../assets/img/blog3.png";
import img4 from "../assets/img/blog4.png";
import img5 from "../assets/img/blog5.png";
import img6 from "../assets/img/blog6.png";

const Blogs = () => {
  return (
    <div
      id="health-tips" // Add this ID
      className="min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24"
    >
      <div className="flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-center lg:text-start">
            Health Tips & Insights
          </h1>
          <p className="mt-2 text-center lg:text-start">
            Get actionable health tips, wellness advice, and expert insights to
            improve your well-being.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button title="Explore More Tips" />
        </div>
      </div>
      <div className="my-8">
        <div className="flex flex-wrap justify-center gap-5">
          <BlogCard
            img={img1}
            headlines="5 Foods for a Healthy Heart"
            description="Discover the top 5 heart-healthy foods you should include in your diet."
          />
          <BlogCard
            img={img2}
            headlines="How to Stay Hydrated in Summer"
            description="Learn effective ways to stay hydrated during the hot summer months."
          />
          <BlogCard
            img={img3}
            headlines="Understanding Seasonal Allergies"
            description="Expert advice on managing and preventing seasonal allergies."
          />
          <BlogCard
            img={img4}
            headlines="The Benefits of Morning Yoga"
            description="Start your day right with these simple yoga routines for better health."
          />
          <BlogCard
            img={img5}
            headlines="Sleep Better Tonight"
            description="Tips and tricks to improve your sleep quality and wake up refreshed."
          />
          <BlogCard
            img={img6}
            headlines="Boosting Your Immune System"
            description="Learn how to strengthen your immune system with these easy steps."
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;

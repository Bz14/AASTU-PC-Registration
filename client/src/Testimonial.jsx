import React, { useState } from "react";


const testimonials = [
  {
    name: "Sarah M.",
    role: "Figma designer",
    stars: 5,
    testimonial: "Best UI/UX designer,It is best designer that designed our website",
    image: "/t1.jpg" 
  },
  {
    name: "melessa D.",
    role: "Front end developer",
    stars: 4,
    testimonial: "Front end developer ,she has huge experience in front end development and developed our Front end by integrating other team members .",
    image: "/t3.jpg" 
  },
  {
    name: "john W.",
    role: "Front end developer",
    stars: 5,
    testimonial: "Front end developer ,he has huge experience in front end development and developed our Front end by integrating other team members .",
    image: "/t22.jpg" 
  },
  {
    name: "jack R.",
    role: "Back end developer",
    stars: 4,
    testimonial: "back end developer ,he has huge experience in back end development and developed our back end by integrating other team members.",
    image: "/site.jpg"
  },
  {
    name: "Emma L.",
    role: "Mob Application Developer",
    stars: 5,
    testimonial: "she is best mobile App developer, developed our App for Admin.",
    image: "/lee.jpg" 
  }
];

const Testimonial = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleCircleClick = (index) => {
    setSelectedIndex(index);
  };

  const handleArrowClick = (direction) => {
    setSelectedIndex((prevIndex) => {
      if (direction === "left") {
        return prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#2c3e50] px-6 py-24 relative">
      <div className="text-center mb-12">
        <h2 className="text-xl text-[#f5f5f5] font-bold mb-2">- Testimonial</h2>
        <h3 className="text-3xl font-bold text-[#f5f5f5]">Our Team member</h3>
      </div>
      <div className="relative flex flex-col items-center">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-purple-800 transition-colors"
          onClick={() => handleArrowClick("left")}
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-purple-800 transition-colors"
          onClick={() => handleArrowClick("right")}
        >
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex space-x-4 mb-8">
          {testimonials.map((testimonial, index) => (
            <img
              key={index}
              src={testimonial.image}
              alt={testimonial.name}
              className={`w-12 h-12 rounded-full cursor-pointer border-2 ${selectedIndex === index ? 'border-[#5516DA] scale-125' : 'border-gray-300'} transition-transform duration-300`}
              onClick={() => handleCircleClick(index)}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <img
            src={testimonials[selectedIndex].image}
            alt={testimonials[selectedIndex].name}
            className="w-32 h-32 rounded-full border-4 border-[#2c3e50]]"
          />
          <div className="mb-2">
            <h4 className="text-xl font-semibold text-[#f5f5f5]">{testimonials[selectedIndex].name}</h4>
            <p className="text-md text-[#f5f5f5]">{testimonials[selectedIndex].role}</p>
          </div>
          <div className="mb-4 flex items-center justify-center ">
            {[...Array(testimonials[selectedIndex].stars)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .587l3.668 7.425 8.168 1.187-5.91 5.758 1.394 8.114L12 18.895l-7.32 3.87L6.074 14.957 0.164 9.233l8.13-1.186L12 .587z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-[#f5f5f5] italic max-w-xs text-center">
            {testimonials[selectedIndex].testimonial}
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

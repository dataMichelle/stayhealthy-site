"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import doctorData from "../../data/doctors";
import { motion } from "framer-motion";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex gap-1 items-center">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500">
          ★
        </span>
      ))}
      {halfStar === 1 && <span className="text-yellow-500">☆</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-400">
          ☆
        </span>
      ))}
      <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    // Load reviews from localStorage on mount
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(storedReviews);
  }, []);

  return (
    <div className="mt-10 mx-auto w-4/5">
      <div className="flex justify-between items-center mb-12">
        <motion.h1
          className="text-3xl font-bold text-teal-600 flex-grow text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Doctor Reviews
        </motion.h1>
        <Link
          href="/leave-review"
          className="bg-teal-600 text-white py-2 px-4 rounded"
        >
          Leave Review
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctorData.doctors.map((doctor, index) => {
          const doctorReview = reviews[doctor.id] || {};
          const rating = doctorReview.rating || 0;
          const reviewText = doctorReview.review || "No review yet";

          return (
            <motion.div
              key={doctor.id}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{doctor.specialty}</p>
              <StarRating rating={rating} />
              <p className="text-gray-600 italic mt-2">"{reviewText}"</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

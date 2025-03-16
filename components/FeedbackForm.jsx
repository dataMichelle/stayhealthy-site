// components/FeedbackForm.jsx
import { useState } from "react";

export default function FeedbackForm({ doctor, onSubmit }) {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, review, rating });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">
        Review for Dr. {doctor.firstName} {doctor.lastName}
      </h2>
      <label>
        Name:
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Review:
        <textarea
          className="border p-2 w-full mb-2"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <label>
        Rating:
        <div className="flex mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </label>
      <button
        type="submit"
        className="bg-teal-600 text-white py-2 px-4 rounded w-full"
      >
        Submit
      </button>
    </form>
  );
}

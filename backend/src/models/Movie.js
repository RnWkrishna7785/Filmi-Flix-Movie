import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Movie description is required"],
    },
    poster: {
      type: String,
      required: [true, "Movie poster is required"],
    },
    posterLocal: {
      type: String,
      default: "",
    },
    posterPublicId: {
      type: String,
      default: "",
    },
    backdrop: {
      type: String,
      default: "",
    },
    backdropLocal: {
      type: String,
      default: "",
    },
    backdropPublicId: {
      type: String,
      default: "",
    },
    genre: {
      type: [String],
      required: [true, "Movie genres are required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "N/A",
    },
    trailerUrl: {
      type: String,
      default: "",
    },
    cast: [
      {
        name: { type: String, required: true },
        character: { type: String, default: "" },
        profilePath: { type: String, default: "" },
      },
    ],
    isCustom: {
      type: Boolean,
      default: false,
    },
    tmdbId: {
      type: Number,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;

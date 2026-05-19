import User from "../models/User.js";
import Movie from "../models/Movie.js";
import Category from "../models/Category.js";
import Favorite from "../models/Favorite.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCustomMovies = await Movie.countDocuments({ isCustom: true });
    const totalCachedMovies = await Movie.countDocuments({ isCustom: false });
    const totalMovies = await Movie.countDocuments();
    const categoriesCount = await Category.countDocuments();
    const userWithFavorites = await User.findById(req.user._id).populate(
      "favorites",
    );
    const favoritesCount = userWithFavorites?.favorites?.length || 0;

    const recentUsers = await User.find({ role: "user" })
      .select("-password")
      .sort("-createdAt")
      .limit(5);

    const recentMovies = await Movie.find({ isCustom: true })
      .sort("-createdAt")
      .limit(5);

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        totalCustomMovies,
        totalCachedMovies,
        moviesCount: totalMovies,
        usersCount: totalUsers,
        categoriesCount,
        favoritesCount,
      },
      recentUsers,
      recentMovies,
    });
  } catch (error) {
    return next(error);
  }
};

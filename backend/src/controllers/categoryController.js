import Category from '../models/Category.js';

export const getCategories = async (req, res, next) => {
  try {
    let categories = await Category.find().sort('name');

    if (categories.length === 0) {
      console.log('🌱 Database categories empty. Seeding defaults (Action, Sci-Fi, Drama, Comedy)...');
      const defaults = [
        { name: 'Action', slug: 'action' },
        { name: 'Sci-Fi', slug: 'sci-fi' },
        { name: 'Drama', slug: 'drama' },
        { name: 'Comedy', slug: 'comedy' },
        { name: 'Horror', slug: 'horror' },
        { name: 'Thriller', slug: 'thriller' },
      ];
      categories = await Category.insertMany(defaults);
      categories.sort((a, b) => a.name.localeCompare(b.name));
    }

    return res.json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const categoryExists = await Category.findOne({ slug });
    if (categoryExists) {
      return res.status(400).json({ success: false, message: 'Genre/Category already exists' });
    }

    const category = await Category.create({ name, slug });
    
    return res.status(201).json({
      success: true,
      message: 'Category created successfully!',
      category,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await Category.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    return next(error);
  }
};

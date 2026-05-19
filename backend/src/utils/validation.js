export const validateRegisterInput = (name, email, password) => {
  const errors = [];
  if (!name || name.trim() === '') errors.push('Name is required');
  if (!email || !email.includes('@')) errors.push('Provide a valid email');
  if (!password || password.length < 6) errors.push('Password must be at least 6 characters long');
  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateLoginInput = (email, password) => {
  const errors = [];
  if (!email || !email.includes('@')) errors.push('Provide a valid email');
  if (!password) errors.push('Password is required');
  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateMovieInput = (title, description, poster, genre) => {
  const errors = [];
  if (!title || title.trim() === '') errors.push('Movie title is required');
  if (!description || description.trim() === '') errors.push('Movie description is required');
  if (!poster || poster.trim() === '') errors.push('Movie poster is required');
  if (!genre || genre.length === 0) errors.push('At least one genre/category is required');
  return {
    valid: errors.length === 0,
    errors,
  };
};

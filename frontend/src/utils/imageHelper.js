export const getPosterUrl = (posterPath) => {
  if (!posterPath) return 'https://placehold.co/500x750?text=No+Poster+Available';
  
  if (posterPath.startsWith('/uploads')) {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const serverBase = apiBase.replace('/api', '');
    return `${serverBase}${posterPath}`;
  }
  return posterPath;
};

export const getBackdropUrl = (backdropPath) => {
  if (!backdropPath) return 'https://placehold.co/1280x720?text=FILMIFLIX';
  
  if (backdropPath.startsWith('/uploads')) {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const serverBase = apiBase.replace('/api', '');
    return `${serverBase}${backdropPath}`;
  }
  return backdropPath;
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  } catch (error) {
    return dateString;
  }
};

export const getYear = (dateString) => {
  if (!dateString) return '';
  return dateString.split('-')[0];
};

import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MovieContext } from '../../context/MovieContext';
import { Plus, Trash2, Edit3, X, Image as ImageIcon, Film, ArrowLeft } from 'lucide-react';
import { getPosterUrl } from '../../utils/imageHelper';
import toast from 'react-hot-toast';

export const ManageMovies = () => {
  const { movies, categories, fetchCustomMovies } = useContext(MovieContext);
  const { addMovie, editMovie, deleteMovie, loading } = useContext(AdminContext);

  const [activeView, setActiveView] = useState('list'); // 'list' | 'add' | 'edit'
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('7.0');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [posterFile, setPosterFile] = useState(null);
  const [backdropFile, setBackdropFile] = useState(null);
  const [castName, setCastName] = useState('');
  const [castCharacter, setCastCharacter] = useState('');
  const [castList, setCastList] = useState([]);

  useEffect(() => {
    fetchCustomMovies();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setReleaseDate('');
    setDuration('');
    setRating('7.0');
    setTrailerUrl('');
    setSelectedGenres([]);
    setPosterFile(null);
    setBackdropFile(null);
    setCastList([]);
    setCastName('');
    setCastCharacter('');
    setSelectedMovie(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setActiveView('add');
  };

  const handleOpenEdit = (movie) => {
    resetForm();
    setSelectedMovie(movie);
    setTitle(movie.title || '');
    setDescription(movie.description || '');
    if (movie.releaseDate) {
      setReleaseDate(movie.releaseDate.substring(0, 10)); // Format to YYYY-MM-DD
    }
    setDuration(movie.duration || '');
    setRating(movie.rating ? movie.rating.toString() : '7.0');
    setTrailerUrl(movie.trailerUrl || '');
    setSelectedGenres(movie.genre || []);
    setCastList(movie.cast || []);
    setActiveView('edit');
  };

  const handleGenreToggle = (genreName) => {
    if (selectedGenres.includes(genreName)) {
      setSelectedGenres((prev) => prev.filter((g) => g !== genreName));
    } else {
      setSelectedGenres((prev) => [...prev, genreName]);
    }
  };

  const handleAddActor = () => {
    if (!castName.trim()) return toast.error('Actor name field is required.');
    setCastList((prev) => [...prev, { name: castName.trim(), character: castCharacter.trim() || 'N/A' }]);
    setCastName('');
    setCastCharacter('');
    toast.success('Actor appended to cast list. 🎭');
  };

  const handleRemoveActor = (index) => {
    setCastList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return toast.error('Both title and description details are required.');
    }

    if (selectedGenres.length === 0) {
      return toast.error('Please assign at least one category genre.');
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('releaseDate', releaseDate);
    formData.append('duration', duration.trim());
    formData.append('rating', rating);
    formData.append('trailerUrl', trailerUrl.trim());
    
    selectedGenres.forEach((g) => formData.append('genre', g));
    
    formData.append('cast', JSON.stringify(castList));

    if (posterFile) formData.append('poster', posterFile);
    if (backdropFile) formData.append('backdrop', backdropFile);

    let success = false;
    if (activeView === 'add') {
      success = await addMovie(formData);
    } else if (activeView === 'edit') {
      success = await editMovie(selectedMovie._id, formData);
    }

    if (success) {
      resetForm();
      setActiveView('list');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you absolutely sure you want to delete this custom movie? 🗑️')) {
      await deleteMovie(id);
    }
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Title block */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-black font-outfit text-white tracking-tight flex items-center space-x-3">
            <Film className="h-6 w-6 text-primary" />
            <span>CUSTOM MOVIE DIRECTORY</span>
          </h1>
          <p className="text-xs text-gray-500 font-light font-outfit">
            Create, read, update, and delete local database entries dynamically.
          </p>
        </div>

        {activeView === 'list' ? (
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl font-outfit text-sm font-bold shadow-neon-red transition-all focus:outline-none"
          >
            <Plus className="h-4 w-4" />
            <span>ADD CUSTOM MOVIE</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveView('list')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl font-outfit text-sm font-semibold transition-colors focus:outline-none"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>BACK TO LIST</span>
          </button>
        )}
      </div>

      {/* 1. LIST VIEW */}
      {activeView === 'list' && (
        <div className="bg-brandDark-card border border-white/5 rounded-2xl overflow-hidden shadow-md">
          {movies.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-outfit text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5 text-xs text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Movie Cover</th>
                    <th className="py-4 px-6 hidden sm:table-cell">Duration</th>
                    <th className="py-4 px-6 hidden md:table-cell">Rating</th>
                    <th className="py-4 px-6">Genres</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {movies.map((m) => (
                    <tr key={m._id} className="hover:bg-white/5 transition-colors">
                      
                      {/* Thumbnail Cover details */}
                      <td className="py-4 px-6 flex items-center space-x-4">
                        <img
                          src={getPosterUrl(m.poster)}
                          alt={m.title}
                          className="h-14 w-10 object-cover rounded-lg border border-white/10"
                        />
                        <div>
                          <p className="font-bold text-white line-clamp-1">{m.title}</p>
                          <p className="text-[10px] text-gray-500 font-light font-sans mt-0.5">
                            {m.releaseDate ? m.releaseDate.substring(0, 4) : 'N/A'}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-6 hidden sm:table-cell font-sans text-gray-400">
                        {m.duration || 'N/A'}
                      </td>

                      <td className="py-4 px-6 hidden md:table-cell">
                        <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2.5 py-1 rounded-md">
                          ⭐ {m.rating ? m.rating.toFixed(1) : '7.0'}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {m.genre &&
                            m.genre.slice(0, 2).map((g, idx) => (
                              <span
                                key={idx}
                                className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-semibold px-2 py-0.5 rounded-md"
                              >
                                {g}
                              </span>
                            ))}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right space-x-1.5">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="p-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg border border-blue-500/20 transition-all focus:outline-none"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(m._id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/20 transition-all focus:outline-none"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 space-y-4">
              <p className="font-outfit">No custom movies registered in local Mongoose database.</p>
              <button
                onClick={handleOpenAdd}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-lg font-outfit font-bold shadow-neon-red transition-all focus:outline-none"
              >
                Add Your First Movie
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. FORM ACTION: ADD OR EDIT */}
      {(activeView === 'add' || activeView === 'edit') && (
        <form
          onSubmit={handleSubmit}
          className="bg-brandDark-card border border-white/5 rounded-2xl p-6 md:p-8 space-y-6 shadow-md max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-bold font-outfit text-white border-b border-white/5 pb-4">
            {activeView === 'add'
              ? 'Add New Cinema Release'
              : 'Edit Cinematic Catalog Record'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Inception"
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm"
                required
              />
            </div>

            {/* Date */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Release Date</label>
              <input
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm"
                required
              />
            </div>

            {/* Duration */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 148 min"
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm"
                required
              />
            </div>

            {/* Ratings */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Star Rating (0 - 10)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm font-sans"
                required
              />
            </div>

            {/* Trailer */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">YouTube Embed URL</label>
              <input
                type="url"
                value={trailerUrl}
                onChange={(e) => setTrailerUrl(e.target.value)}
                placeholder="e.g. https://www.youtube.com/embed/zSWdZAIBMcY"
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Description / Plot Overview</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter cinema plot outline..."
                rows="4"
                className="w-full bg-brandDark text-white px-4 py-3 rounded-xl border border-white/5 focus:border-primary/50 focus:outline-none transition-all font-outfit text-sm resize-none"
                required
              />
            </div>

            {/* Categories checkbox */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Select Category Genres</label>
              <div className="flex flex-wrap gap-2 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => handleGenreToggle(cat.name)}
                    className={`px-3 py-1.5 rounded-lg border font-outfit text-xs font-semibold transition-all ${
                      selectedGenres.includes(cat.name)
                        ? 'bg-primary/20 border-primary text-primary shadow-sm'
                        : 'bg-brandDark text-gray-400 border-white/5 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Multer Image uploaders */}
            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Poster Artwork File</label>
              <div
                className="relative bg-brandDark border border-white/5 p-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:border-white/10 transition-colors"
              >
                <ImageIcon className="h-5 w-5 text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPosterFile(e.target.files[0])}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="text-xs text-gray-400 truncate">
                  {posterFile ? posterFile.name : 'Choose Poster Image'}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-xs text-gray-400 font-semibold font-outfit">Backdrop Wallpaper File</label>
              <div
                className="relative bg-brandDark border border-white/5 p-4 rounded-xl flex items-center space-x-3 cursor-pointer hover:border-white/10 transition-colors"
              >
                <ImageIcon className="h-5 w-5 text-gray-500" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBackdropFile(e.target.files[0])}
                  className="w-full absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="text-xs text-gray-400 truncate">
                  {backdropFile ? backdropFile.name : 'Choose Backdrop Image'}
                </span>
              </div>
            </div>

            {/* Cast appends */}
            <div className="flex flex-col space-y-3 md:col-span-2 border-t border-white/5 pt-6">
              <label className="text-xs text-gray-400 font-semibold font-outfit">
                Append Custom Cast Member
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <input
                  type="text"
                  value={castName}
                  onChange={(e) => setCastName(e.target.value)}
                  placeholder="Actor name"
                  className="sm:col-span-5 bg-brandDark text-white px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none font-outfit text-sm"
                />
                <input
                  type="text"
                  value={castCharacter}
                  onChange={(e) => setCastCharacter(e.target.value)}
                  placeholder="Character name"
                  className="sm:col-span-5 bg-brandDark text-white px-4 py-2.5 rounded-xl border border-white/5 focus:outline-none font-outfit text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddActor}
                  className="sm:col-span-2 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl font-outfit text-sm font-bold border border-white/10 transition-all focus:outline-none"
                >
                  Append
                </button>
              </div>

              {/* Added Actors tags */}
              {castList.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {castList.map((actor, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-brandDark border border-white/5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    >
                      <span className="text-white">{actor.name}</span>
                      <span className="text-gray-500">as</span>
                      <span className="text-primary">{actor.character}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveActor(idx)}
                        className="text-red-500 hover:text-red-400 transition-colors focus:outline-none ml-1.5"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Form Actions submission */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => setActiveView('list')}
              className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-outfit text-sm font-semibold transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-outfit font-bold shadow-neon-red hover:shadow-lg transition-all disabled:opacity-50 focus:outline-none"
            >
              {loading ? 'Processing...' : activeView === 'add' ? 'SAVE MOVIE' : 'UPDATE CHANGES'}
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default ManageMovies;

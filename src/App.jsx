import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const themes = ['theme1', 'theme2', 'theme3'];

const App = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [themeIndex, setThemeIndex] = useState(0);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      height: '180',
      weight: '80',
      build: 'athletic',
      text: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', { ...data, image: imageSrc });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setImageSrc(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setImageSrc(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageSrc(null);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        setThemeIndex((prev) => (prev + 1) % themes.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={`app ${themes[themeIndex]}`}>
      <h1 className="app-title">T-Shirt Customizer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-section" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <div className="drop-box">
            {imageSrc ? (
              <>
                <img src={imageSrc} alt="Thumb" className="thumb-preview" />
                <button type="button" className="remove-btn" onClick={removeImage}>
                  ❌ Remove Image
                </button>
              </>
            ) : (
              <>
                <div className="upload-icon">🖼️</div>
                <p>Drop an image here or</p>
                <label className="upload-btn">
                  Select File
                  <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                </label>
                <small>10 MB maximum</small>
              </>
            )}
          </div>

          <div className="form-box">
            <label>
              Height (cm)
              <input type="number" {...register('height')} />
            </label>
            <label>
              Weight (kg)
              <input type="number" {...register('weight')} />
            </label>
            <label>
              Build
              <select {...register('build')}>
                <option value="lean">Lean</option>
                <option value="reg">Regular</option>
                <option value="athletic">Athletic</option>
                <option value="big">Big</option>
              </select>
            </label>
          </div>
        </div>

        <div className="image-display">
          {imageSrc ? (
            <img src={imageSrc} alt="Full Preview" className="main-image" />
          ) : (
            <p className="placeholder-text">No image selected</p>
          )}
        </div>

        <div className="text-box-area">
          <label>
            Text to print (max 3 lines)
            <textarea maxLength={120} rows={3} {...register('text')} />
          </label>
        </div>

        <button type="submit" className="upload-btn">Submit</button>
      </form>
    </div>
  );
};

export default App;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Image, Loader } from 'lucide-react';
import {
  generateFlashcardsFromText,
  extractAndGenerateFlashcards,
} from '../api/flashcards';
import StatsPanel from '../components/StatsPanel';

const Home = () => {
  const navigate = useNavigate();
  const [inputMethod, setInputMethod] = useState('text'); // 'text' or 'image'
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTextSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = await generateFlashcardsFromText(text);

      // Navigate to result page with flashcards
      navigate('/result', { state: { flashcardsData: data } });
    } catch (err) {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setError('Please upload an image');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = await extractAndGenerateFlashcards(imageFile);

      // Navigate to result page
      navigate('/result', { state: { flashcardsData: data } });
    } catch (err) {
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setError('');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-400 mb-4">
            🧠 Smart Flashcard Generator
          </h1>
          <p className="text-gray-400 text-lg">
            AI-powered flashcard generation from text or images
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              {/* Method Selector */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setInputMethod('text')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
                    inputMethod === 'text'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Text Input
                </button>
                <button
                  onClick={() => setInputMethod('image')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors ${
                    inputMethod === 'image'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Image className="w-5 h-5" />
                  Image Upload
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
                  {error}
                </div>
              )}

              {/* Text Input Form */}
              {inputMethod === 'text' && (
                <form onSubmit={handleTextSubmit}>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your study material here..."
                    className="w-full h-64 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Generating Flashcards...
                      </>
                    ) : (
                      'Generate Flashcards'
                    )}
                  </button>
                </form>
              )}

              {/* Image Upload Form */}
              {inputMethod === 'image' && (
                <form onSubmit={handleImageSubmit}>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                    <Image className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-blue-400 hover:text-blue-300"
                    >
                      Click to upload image
                    </label>
                    {imageFile && (
                      <p className="mt-2 text-sm text-gray-400">
                        Selected: {imageFile.name}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Processing Image...
                      </>
                    ) : (
                      'Extract & Generate'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div>
            <StatsPanel />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Smart Flashcard Generator • Powered by AI</p>
          <p className="mt-1">
            © Asim Kazi & Chinmay Keripale 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Image as ImageIcon,
  Upload,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import {
  generateFlashcardsFromText,
  extractAndGenerateFlashcards,
} from '../api/flashcards';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { useToast } from '../hooks/useToast';
import Toast from '../components/common/Toast';

const Generator = memo(() => {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [inputMethod, setInputMethod] = useState('text');
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!text.trim()) {
        showToast('Please enter some text', 'error');
        return;
      }

      try {
        setLoading(true);
        const data = await generateFlashcardsFromText(text);
        navigate('/result', { state: { flashcardsData: data } });
        showToast('Flashcards generated successfully!', 'success');
      } catch (err) {
        showToast('Failed to generate flashcards', 'error');
      } finally {
        setLoading(false);
      }
    },
    [text, navigate, showToast],
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const handleImageSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!imageFile) {
        showToast('Please upload an image', 'error');
        return;
      }

      try {
        setLoading(true);
        const data = await extractAndGenerateFlashcards(imageFile);
        navigate('/result', { state: { flashcardsData: data } });
        showToast('Flashcards generated from image!', 'success');
      } catch (err) {
        showToast('Failed to process image', 'error');
      } finally {
        setLoading(false);
      }
    },
    [imageFile, navigate, showToast],
  );
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">
              Generate Flashcards
            </h1>
            <p className="text-gray-400 mt-1">Choose your input method below</p>
          </div>
        </div>
        <Card variant="glass">
          {/* Method Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => setInputMethod('text')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                inputMethod === 'text'
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
              }`}
            >
              <FileText
                className={`w-6 h-6 mx-auto mb-2 ${inputMethod === 'text' ? 'text-blue-400' : 'text-gray-400'}`}
              />
              <div
                className={`font-medium ${inputMethod === 'text' ? 'text-blue-300' : 'text-gray-300'}`}
              >
                Text Input
              </div>
            </button>

            <button
              onClick={() => setInputMethod('image')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                inputMethod === 'image'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-900/30'
              }`}
            >
              <ImageIcon
                className={`w-6 h-6 mx-auto mb-2 ${inputMethod === 'image' ? 'text-purple-400' : 'text-gray-400'}`}
              />
              <div
                className={`font-medium ${inputMethod === 'image' ? 'text-purple-300' : 'text-gray-300'}`}
              >
                Image Upload
              </div>
            </button>
          </div>

          {/* Text Input */}
          {inputMethod === 'text' && (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Paste your study material
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter or paste your text here... (minimum 10 characters)"
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl
                       text-gray-100 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       resize-none transition-all duration-200"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>{text.length} characters</span>
                  <span>
                    {text.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                loading={loading}
                disabled={!text.trim() || loading}
                className="w-full"
              >
                {loading ? 'Generating...' : 'Generate Flashcards'}
              </Button>
            </form>
          )}

          {/* Image Upload */}
          {inputMethod === 'image' && (
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload an image
                </label>

                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                      imagePreview
                        ? 'border-purple-500 bg-purple-500/5'
                        : 'border-gray-600 hover:border-gray-500 bg-gray-900/30'
                    }`}
                  >
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-purple-400 font-medium">
                          {imageFile?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 mx-auto text-gray-500" />
                        <div>
                          <p className="text-gray-300 font-medium">
                            Click to upload
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, JPEG (Max 10MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                variant="secondary"
                loading={loading}
                disabled={!imageFile || loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Extract & Generate'}
              </Button>
            </form>
          )}
        </Card>
      </div>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
});
Generator.displayName = 'Generator';
export default Generator;

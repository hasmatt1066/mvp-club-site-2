import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const categories = [
  { value: '', label: 'Select a category (optional)' },
  { value: 'content', label: 'Content Creation' },
  { value: 'data', label: 'Data Analysis' },
  { value: 'communication', label: 'Communication' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

const HeroGeneratorForm = ({ onGenerate }) => {
  const [workflow, setWorkflow] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!workflow.trim()) {
      return;
    }

    setIsLoading(true);

    // Call parent handler
    if (onGenerate) {
      await onGenerate({ workflow, category });
    }

    setIsLoading(false);
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-sm p-10 md:p-12 rounded-3xl border border-white/10"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-3 flex items-center justify-center gap-3">
          <img src="/mvp-club-logo.jpeg" alt="MVP Club" className="w-10 h-10 rounded-lg" />
          See Your Workflow Transform
        </h2>
        <p className="text-white/60 text-base">
          Describe a repetitive task and get a custom transformation
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Workflow Input */}
        <div className="mb-6">
          <label className="block text-white/80 text-base font-medium mb-3">
            Your workflow
          </label>
          <textarea
            value={workflow}
            onChange={(e) => setWorkflow(e.target.value)}
            placeholder="e.g., I spend 2 hours every Monday writing our team newsletter in Google Docs. I gather updates from Slack channels, format everything manually, and try to keep the tone consistent..."
            rows={5}
            maxLength={500}
            disabled={isLoading}
            className="w-full px-5 py-4 rounded-xl resize-none outline-none transition-all duration-200 text-base"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              color: 'var(--color-primary)',
              border: '2px solid transparent',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-accent)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'transparent';
            }}
          />
          <div className="flex justify-between mt-3">
            <span className="text-white/50 text-sm">
              Be specific: What tools? How often? What's frustrating?
            </span>
            <span className={`text-sm ${workflow.length > 450 ? 'text-amber-400' : 'text-white/50'}`}>
              {workflow.length}/500
            </span>
          </div>
        </div>

        {/* Category Select */}
        <div className="mb-7">
          <label className="block text-white/80 text-base font-medium mb-3">
            Category (optional)
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading}
            className="w-full md:w-64 px-5 py-4 rounded-xl outline-none transition-all duration-200 text-base"
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              color: 'var(--color-primary)',
              border: '2px solid transparent',
            }}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !workflow.trim()}
          className="w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>Transform this workflow</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default HeroGeneratorForm;

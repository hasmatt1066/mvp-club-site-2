import React from 'react';
import {
  FileText,
  Calendar,
  Layers,
  MessageCircle,
  Target,
  Sparkles,
  Zap,
  CheckCircle2,
  Brain,
  ArrowRight,
  ArrowDown,
} from 'lucide-react';

// Icon mapping
const iconMap = {
  FileText,
  Calendar,
  Layers,
  MessageCircle,
  Target,
  Sparkles,
  Zap,
  CheckCircle2,
  Brain,
};

const TransformationCard = ({ useCase }) => {
  const CurrentIcon = iconMap[useCase.currentState.icon] || FileText;
  const TransformIcon = iconMap[useCase.transformation.icon] || Sparkles;
  const FutureIcon = iconMap[useCase.futureState.icon] || Zap;

  return (
    <div
      className="card-hover bg-white p-6 md:p-8 rounded-2xl"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Title */}
      <h3
        className="font-display text-xl md:text-2xl mb-6"
        style={{ color: 'var(--color-primary)' }}
      >
        {useCase.title}
      </h3>

      {/* Desktop Layout */}
      <div className={`hidden lg:grid gap-4 items-stretch ${useCase.outcome?.metric ? 'lg:grid-cols-12' : 'lg:grid-cols-10'}`}>
        {/* Current State */}
        <div
          className="col-span-3 p-4 rounded-xl"
          style={{ backgroundColor: 'var(--color-background-dark)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <CurrentIcon size={18} className="text-gray-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {useCase.currentState.headline}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {useCase.currentState.description}
          </p>
          <ul className="space-y-2">
            {useCase.currentState.painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="text-gray-400 mt-0.5">-</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow */}
        <div className="col-span-1 flex items-center justify-center">
          <ArrowRight size={24} style={{ color: 'var(--color-secondary)' }} />
        </div>

        {/* Transformation */}
        <div
          className="col-span-2 p-4 rounded-xl flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          <TransformIcon size={28} className="text-white mb-2" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-2">
            {useCase.transformation.headline}
          </span>
          <p className="text-xs text-white/70 leading-relaxed">
            {useCase.transformation.description}
          </p>
        </div>

        {/* Arrow */}
        <div className="col-span-1 flex items-center justify-center">
          <ArrowRight size={24} style={{ color: 'var(--color-accent)' }} />
        </div>

        {/* Future State */}
        <div
          className="col-span-3 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--color-accent-tint)',
            border: '2px solid var(--color-accent)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FutureIcon size={18} style={{ color: 'var(--color-accent)' }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              {useCase.futureState.headline}
            </span>
          </div>
          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ color: 'var(--color-primary)' }}
          >
            {useCase.futureState.description}
          </p>
          <ul className="space-y-2">
            {useCase.futureState.wins.map((win, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle2
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <span style={{ color: 'var(--color-primary)' }}>{win}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome - Optional */}
        {useCase.outcome?.metric && (
          <div className="col-span-2 flex flex-col items-center justify-center text-center px-2">
            <div
              className="text-3xl font-display mb-1"
              style={{ color: 'var(--color-accent)' }}
            >
              {useCase.outcome.metric}
            </div>
            <div className="text-xs text-gray-500 leading-tight">
              {useCase.outcome.description}
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden space-y-4">
        {/* Current State */}
        <div
          className="p-4 rounded-xl"
          style={{ backgroundColor: 'var(--color-background-dark)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <CurrentIcon size={18} className="text-gray-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {useCase.currentState.headline}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
            {useCase.currentState.description}
          </p>
          <ul className="space-y-1">
            {useCase.currentState.painPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                <span className="text-gray-400">-</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <ArrowDown size={24} style={{ color: 'var(--color-secondary)' }} />
        </div>

        {/* Transformation */}
        <div
          className="p-4 rounded-xl text-center"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          <TransformIcon size={24} className="text-white mx-auto mb-2" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80 block mb-2">
            {useCase.transformation.headline}
          </span>
          <p className="text-xs text-white/70 leading-relaxed">
            {useCase.transformation.description}
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <ArrowDown size={24} style={{ color: 'var(--color-accent)' }} />
        </div>

        {/* Future State */}
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--color-accent-tint)',
            border: '2px solid var(--color-accent)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <FutureIcon size={18} style={{ color: 'var(--color-accent)' }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-accent)' }}
            >
              {useCase.futureState.headline}
            </span>
          </div>
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'var(--color-primary)' }}
          >
            {useCase.futureState.description}
          </p>
          <ul className="space-y-1">
            {useCase.futureState.wins.map((win, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <CheckCircle2
                  size={14}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: 'var(--color-secondary)' }}
                />
                <span style={{ color: 'var(--color-primary)' }}>{win}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outcome - Optional */}
        {useCase.outcome?.metric && (
          <div className="text-center py-2">
            <span
              className="text-2xl font-display"
              style={{ color: 'var(--color-accent)' }}
            >
              {useCase.outcome.metric}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {useCase.outcome.description}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransformationCard;

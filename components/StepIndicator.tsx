'use client';

interface StepIndicatorProps {
    currentStep: number;
    onStepClick?: (step: number) => void;
}

const steps = [
    { number: 1, name: 'Categories' },
    { number: 2, name: 'Weights' },
    { number: 3, name: 'Schools' },
    { number: 4, name: 'Decision' },
];

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                        {/* Step circle */}
                        <button
                            onClick={() => onStepClick?.(step.number)}
                            disabled={!onStepClick}
                            className={`
                step-indicator
                ${currentStep === step.number ? 'step-active' : ''}
                ${currentStep > step.number ? 'step-complete' : ''}
                ${currentStep < step.number ? 'step-inactive' : ''}
                ${onStepClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                transition-all
              `}
                        >
                            {currentStep > step.number ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.number
                            )}
                        </button>

                        {/* Step label */}
                        <div className="ml-3 hidden sm:block">
                            <div className={`text-sm font-medium ${currentStep >= step.number ? 'text-white' : 'text-gray-500'}`}>
                                {step.name}
                            </div>
                        </div>

                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <div className="flex-1 mx-2 sm:mx-4 h-0.5 bg-gray-700">
                                <div
                                    className={`h-full transition-all duration-500 ${currentStep > step.number ? 'bg-accent-green' : 'bg-transparent'
                                        }`}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile step label */}
            <div className="sm:hidden text-center mt-4">
                <div className="text-sm font-medium text-white">
                    {steps.find(s => s.number === currentStep)?.name}
                </div>
            </div>
        </div>
    );
}

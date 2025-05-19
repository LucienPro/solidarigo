"use client";

type ProgressBarProps = {
  current: number;
  goal: number;
};

export const ProgressBar = ({ current, goal }: ProgressBarProps) => {
  const percent = Math.min((current / goal) * 100, 100);

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-sm mb-1 text-gray-600">
        <span>{(current / 100).toFixed(2)} € collectés</span>
        <span>Objectif : {(goal / 100).toFixed(2)} €</span>

      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-sm text-right text-gray-500 mt-1">{Math.round(percent)}%</div>
    </div>
  );
};

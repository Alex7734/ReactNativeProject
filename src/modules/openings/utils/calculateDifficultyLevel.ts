export const calculateDifficultyColor = (difficultyLevel: number) => {
    if (difficultyLevel < 30) {
      return 'easy';
    } else if (difficultyLevel < 70) {
      return 'medium';
    } else {
      return 'hard';
    }
  }

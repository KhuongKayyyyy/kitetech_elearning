// Grade calculation formulas interface and data

export interface GradeFormula {
  id: string;
  name: string;
  qt1: number; // percentage
  qt2: number; // percentage
  midterm: number; // percentage
  final: number; // percentage
}

export const gradeFormulas: GradeFormula[] = [
  {
    id: "formula-1",
    name: "Standard Formula",
    qt1: 15,
    qt2: 15,
    midterm: 30,
    final: 40
  },
  {
    id: "formula-2",
    name: "Quiz Focused Formula",
    qt1: 25,
    qt2: 25,
    midterm: 25,
    final: 25
  },
  {
    id: "formula-3",
    name: "Final Heavy Formula",
    qt1: 10,
    qt2: 10,
    midterm: 20,
    final: 60
  },
  {
    id: "formula-4",
    name: "Balanced Formula",
    qt1: 20,
    qt2: 20,
    midterm: 30,
    final: 30
  }
];

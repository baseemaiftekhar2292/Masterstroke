export interface Chapter {
  id: string;
  title: string;
  script: string;
}

export interface Subject {
  name: string;
  chapters: Chapter[];
}

export const SYLLABUS_DATA: Record<string, Subject> = {
  physics: {
    name: "Physics",
    chapters: [
      {
        id: "ch-1",
        title: "Chapter 1: Vectors & Scalars",
        script: "Welcome to Physics Chapter 1. Today we are learning about physical quantities, scalar magnitude, and vector directions in simple terms."
      },
      {
        id: "ch-2",
        title: "Chapter 2: Kinematics & Motion",
        script: "In Chapter 2, we discuss velocity, displacement, acceleration, and straight line motion equations."
      }
    ]
  },
  chemistry: {
    name: "Chemistry",
    chapters: [
      {
        id: "ch-1",
        title: "Chapter 1: Atomic Structure",
        script: "Welcome to Chemistry Chapter 1. We will cover subatomic particles, atomic numbers, orbitals, and electron configurations."
      }
    ]
  }
};

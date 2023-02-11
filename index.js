class CgpaCalc {
  constructor() {
    this.semesters;
    this.years;
    this.currentSemester;
  }
}

class CourseUnit {
  constructor(name, creditUnits, grade, semester, academicYear = "") {
    this.name = name;
    this.creditUnits = creditUnits;
    this.grade = grade;
    this.semester = semester
    this.academicYear = academicYear;
  }
  getGradePoint() {
    return gradeToPoints(this.grade);
  }
}

function gradeToPoints(grade) {
  switch (grade) {
    case "A+":
    case "A":
      return 5;
    case "B+":
      return 4.5;
    case "B":
      return 4;
    case "C+":
      return 3.5;
    case "C":
      return 3;
    case "D+":
      return 2.5;
    case "D":
      return 2;
    case "E":
      return 1.5;
    case "E-":
      return 1;
    case "F":
      return 0;
    default:
      return 0;
  }
}

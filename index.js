class CgpaCalc {
  constructor() {
    this.semesters;
    this.years;
    this.currentSemester;
  }
}

class CourseUnit {
  constructor(name, creditUnits, grade) {
    this.name = name;
    this.creditUnits = creditUnits;
    this.grade = grade;
  }
  getGradePoint() {}
}

function gradeToPoints(grade) {
  switch (grade) {
    case "A+":
    case "A":
      return 5;
  }
}

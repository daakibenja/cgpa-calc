class CgpaCalc {
  constructor() {
    this.semesters;
    this.years;
    this.currentSemester;
  }
}

class CourseUnit {
  /**
   *Creates an instance of a course unit
   * @param {String} name The name of the course unit
   * @param {Number} creditUnits The number of credit units in the course unit
   * @param {Number|String} gradeOrMark The grade or mark you obtained in the course unit
   * @param {Number} semester The semester in the academic year
   * @param {String} academicYear The academic year
   */
  constructor(
    name = "",
    creditUnits = "",
    gradeOrMark = "",
    semester = "",
    academicYear = ""
  ) {
    this.name = name;
    this.creditUnits = creditUnits;
    if (Number.isNaN(gradeOrMark)) {
      this.grade = gradeOrMark;
    } else {
      this.mark = gradeOrMark;
    }
    this.semester = semester;
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

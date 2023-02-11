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
  // Getters
  getMark() {
    if (this.mark) return this.mark;
    if (this.grade) return;
  }
  getGradePoint() {
    if (this.grade) return gradeToPoints(this.grade);
    else if (this.mark) return gradeToPoints(markToGrade(this.mark));
    else return 0.00;
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

function gradeToMark(grade) {
  switch (grade) {
    case "A+":
      return 90 + randomMark(10);
    case "A":
      return 80 + randomMark(10);
    case "B+":
      return 75 + randomMark(5);
    case "B":
      return 70 + randomMark(5);
    case "C+":
      return 65 + randomMark(5);
    case "C":
      return 60 + randomMark(5);
    case "D+":
      return 55 + randomMark(5);
    case "D":
      return 50 + randomMark(5);
    case "E":
      return 40 + randomMark(10);
    case "E-":
      return 0 + randomMark(30);
    case "F":
      return 0;
    default:
      return 0;
  }
}

function markToGrade(mark) {
  if (mark >= 90) return "A+";
  if (mark >= 80) return "A";
  if (mark >= 75) return "B+";
  if (mark >= 70) return "B";
  if (mark >= 65) return "C+";
  if (mark >= 60) return "C";
  if (mark >= 55) return "D+";
  if (mark >= 50) return "D";
  if (mark >= 45) return "E";
  if (mark >= 40) return "E-";
  return "F";
}
function randomMark(max) {
  (Math.floor(Math.random() * 100) % 10) % max;
}

var course = new CourseUnit("Foundatons of IS", 3, 77, 1, "2019/2020");
var course1 = new CourseUnit("Foundatons of IS", 3, "A+", 1, "2019/2020");

console.log(course.getGradePoint(), course1.getGradePoint());

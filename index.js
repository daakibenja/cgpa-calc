class CgpaCalc {
  constructor(courseUnits = []) {
    this.courseUnits = courseUnits;
    this.semesters;
    this.years;
    this.currentSemester;
    this.courseTree = {};
  }
  addcourseUnit(courseUnit) {
    this.courseUnits.push(courseUnit);
  }

  computeCGPA() {
    var cumulativecUs = 0;
    var cgpa = 0;
    var CumulativeGpCuPdt = 0;
    for (var i = 0; i < this.courseUnits.length; i++) {
      var courseUnit = this.courseUnits[i];
      cumulativecUs += courseUnit.creditUnits;
      CumulativeGpCuPdt += courseUnit.getGradePoint() * courseUnit.creditUnits;
    }
    cgpa = CumulativeGpCuPdt / cumulativecUs;
    return cgpa;
  }
  buildCourseTree() {
    // First group by academic years
    var academicYears = {};
    for (var i = 0; i < this.courseUnits.length; i++) {
      var courseUnit = this.courseUnits[i];

      if (!academicYears[`${courseUnit.academicYear}`]) {
        academicYears[`${courseUnit.academicYear}`] = {};
      }

      if (
        !academicYears[`${courseUnit.academicYear}`][`${courseUnit.semester}`]
      ) {
        academicYears[`${courseUnit.academicYear}`][`${courseUnit.semester}`] =
          [];
      }
      academicYears[`${courseUnit.academicYear}`][
        `${courseUnit.semester}`
      ].push(courseUnit);
    }
    this.courseTree = academicYears;
  }
  printCourseTree() {}
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
    if (!Number.parseInt(gradeOrMark)) {
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
    else return 0.0;
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

var courses = [];
courses.push(
  //Year one semester one
  new CourseUnit("Foundatons of IS", 3, 77, 1, "2019/2020"),
  new CourseUnit("Problem Solving", 3, "B+", 1, "2019/2020"),
  new CourseUnit("Communication skills", 4, "A", 1, "2019/2020"),
  new CourseUnit("Computer literacy", 4, "A", 1, "2019/2020"),
  new CourseUnit("Structured Programming", 3, "A+", 1, "2019/2020"),

  //Year one Semester two
  new CourseUnit("System Analysis & Design", 4, "B", 2, "2019/2020"),
  new CourseUnit("Internet Programming", 4, "B+", 2, "2019/2020"),
  new CourseUnit("Numerical Methods", 3, "A", 2, "2019/2020"),
  new CourseUnit("Software Development principles", 4, "B", 2, "2019/2020"),
  new CourseUnit("Database &Information MGT", 4, "B+", 2, "2019/2020"),

  //Year one Recess
  new CourseUnit("Software Engineering Project 1", 5, "B+", 3, "2019/2020")
);
var cgpaCalc = new CgpaCalc(courses);

var cgpa = cgpaCalc.computeCGPA();
cgpaCalc.buildCourseTree();

console.log(cgpa, cgpaCalc.courseTree);

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
  printCourseTree() {
    // console.log(this.courseTree);
    // return
    console.log("...Generating tree ...");
    var total_cus = 0;
    var total_gp_cu_pdt = 0;
    var academicYears = Object.keys(this.courseTree);
    academicYears = academicYears.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    for (var i = 0; i < academicYears.length; i++) {
      console.log("\n\n");
      console.log(`Academic Year ${academicYears[i]} `);

      // Get semesters
      var semesters = Object.keys(this.courseTree[academicYears[i]]);
      semesters = semesters.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

      for (var j = 0; j < semesters.length; j++) {
        console.log(`\n************ Semester ${semesters[j]} ***********`);
        var courses = this.courseTree[academicYears[i]][semesters[j]];
        // console.log(courses);

        var cumulativecUs = 0;
        var gpa,
          cgpa = 0;
        var CumulativeGpCuPdt = 0;
        for (var k = 0; k < courses.length; k++) {
          var courseUnit = courses[k];
          cumulativecUs += courseUnit.creditUnits;
          CumulativeGpCuPdt +=
            courseUnit.getGradePoint() * courseUnit.creditUnits;
          var x = "";

          console.log(
            `${courseUnit.name}   ${courseUnit.getMark()}  ${
              courseUnit.grade
            } ${courseUnit.getGradePoint()}`
          );
        }
        total_cus += cumulativecUs;
        total_gp_cu_pdt += CumulativeGpCuPdt;
        gpa = CumulativeGpCuPdt / cumulativecUs;
        cgpa = total_gp_cu_pdt / total_cus;
        console.log(`***        CPA ${gpa}  CGPA ${cgpa}`);
        console.log("______________________________________________");
      }
    }
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
    // console.log("getting mark...", gradeToMark(this.grade));
    if (this.mark) return this.mark;
    if (this.grade) return gradeToMark(this.grade);
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
  // console.log("grade", grade);
  var val = 0;
  if (grade === "A+") {
    val = 90 + Number.parseInt(randomMark(10));
  } else if (grade === "A") {
    val = 80 + Number.parseInt(randomMark(10));
  } else if (grade === "B+") {
    val = 75 + Number.parseInt(randomMark(5));
  } else if (grade === "B") {
    val = 70 + Number.parseInt(randomMark(5));
  } else if (grade === "C+") {
    val = 65 + Number.parseInt(randomMark(5));
  } else if (grade === "C") {
    val = 60 + Number.parseInt(randomMark(5));
  } else if (grade === "D+") {
    val = 55 + Number.parseInt(randomMark(5));
  } else if (grade === "D") {
    val = 50 + Number.parseInt(randomMark(5));
  } else if (grade === "E") {
    val = 40 + Number.parseInt(randomMark(10));
  } else if (grade === "E-") {
    val = 0 + Number.parseInt(randomMark(30));
  } else if (grade === "F") {
    val = 0;
  } else {
    val = 0;
  }
  // console.log("Finalmark ", val);
  return val;
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
  var val = (Math.floor(Math.random() * 100) % 10) % max;
  // console.log("Value ", val);
  return val;
}

var courses = [];

courses.push(
  //Year one semester one
  new CourseUnit("Foundatons of IS    ", 3, "B+", 1, "2019/2020"),
  new CourseUnit("Problem Solving     ", 3, "B+", 1, "2019/2020"),
  new CourseUnit("Communication skills", 4, "A", 1, "2019/2020"),
  new CourseUnit("Computer literacy   ", 4, "A", 1, "2019/2020"),
  new CourseUnit("Structured Programmi", 3, "A+", 1, "2019/2020"),

  //Year one Semester two
  new CourseUnit("System Analysis & De", 4, "A", 2, "2019/2020"),
  new CourseUnit("Internet Programming", 4, "B+", 2, "2019/2020"),
  new CourseUnit("Numerical Methods   ", 3, "A", 2, "2019/2020"),
  new CourseUnit("Software Development", 4, "B", 2, "2019/2020"),
  new CourseUnit("Database &Informatio", 4, "B+", 2, "2019/2020"),

  //Year one Recess
  new CourseUnit("Software Engineering", 5, "B+", 3, "2019/2020"),

  //Year TWO semester one
  new CourseUnit("Discrete Mathematics", 3, "A", 1, "2020/2021"),
  new CourseUnit("Artificial Intellige", 3, "B+", 1, "2020/2021"),
  new CourseUnit("Data structures and ", 4, "A", 1, "2020/2021"),
  new CourseUnit("Computer Networks   ", 4, "A", 1, "2020/2021"),
  new CourseUnit("Formal Methods      ", 4, "A", 1, "2020/2021"),

  //Year TWO Semester two
  new CourseUnit("Calculus I          ", 4, "A", 2, "2020/2021"),
  new CourseUnit("OPERATING SYSTEMS   ", 4, "A", 2, "2020/2021"),
  new CourseUnit("OBJECT ORIENTED PROG", 4, "A+", 2, "2020/2021"),
  new CourseUnit("NETWORKS APPLICATION", 4, "A", 2, "2020/2021"),
  new CourseUnit("DATA COMMUNICATIONS ", 4, "B", 2, "2020/2021"),

  //Year TWO Recess
  new CourseUnit("Software Engineering", 5, "A", 3, "2020/2021"),

  //Year THREE semester one
  new CourseUnit("USER INTERFACE DESIG", 4, "A", 1, "2021/2022"),
  new CourseUnit("EMBEDDED SYATEMS    ", 4, "A", 1, "2021/2022"),
  new CourseUnit("REQUIREMENTS ENGINEE", 4, "B", 1, "2021/2022"),
  new CourseUnit("OO ANALYSIS AND DESI", 4, "B", 1, "2021/2022"),
  new CourseUnit("SOFTWARE METRICS    ", 3, "C+", 1, "2021/2022"),

  //Year THREE Semester two
  new CourseUnit("RESEARCH METHODOLOGY", 3, "A", 2, "2021/2022"),
  new CourseUnit("DISTRIBUTED SYSTEMS ", 4, "A", 2, "2021/2022"),
  new CourseUnit("SYSTEMS PROGRAMMING ", 4, "B+", 2, "2021/2022"),
  new CourseUnit("ADVANCED OOP        ", 4, "A+", 2, "2021/2022"),
  new CourseUnit("SOFTWARE ARCHITECTUR", 4, "A+", 2, "2021/2022"),

  //YAEAR 3 INTERNSHIP
  new CourseUnit("FIELD ATTACHMENT    ", 5, "A", 3, "2021/2022"),

  //Year FOUR semester one
  new CourseUnit("ENT PRINCIPLES      ", 3, "A", 1, "2022/2023"),
  new CourseUnit("BUSINESS PROCESS MGT", 4, "A", 1, "2022/2023"),
  new CourseUnit("PROJECT 1           ", 5, "A", 1, "2022/2023"),
  new CourseUnit("SRT                 ", 4, "D", 1, "2022/2023"),

  //Year FOUR Semester two
  new CourseUnit("SOFTWARE PATTERNS   ", 4, "A+", 2, "2022/2023"),
  new CourseUnit("PROJECT II          ", 5, "A+", 2, "2022/2023"),
  new CourseUnit("IT LAWS             ", 4, "A+", 2, "2022/2023")
);
var cgpaCalc = new CgpaCalc(courses);

var cgpa = cgpaCalc.computeCGPA();
cgpaCalc.buildCourseTree();

// console.log(cgpa, cgpaCalc.courseTree);
cgpaCalc.printCourseTree();
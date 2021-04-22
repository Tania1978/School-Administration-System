
// COMMON FUNCTIONS
function showaddform() {
    let addform = document.querySelectorAll("#addcourseform,#addstudentform,#addtrainerform,#addassignmentform");
    let editform = document.querySelectorAll("#existingcourses,#existingtrainers,#existingstudents,#existingassignments");
    for (let i = 0; i < addform.length; i++) {
        addform[i].style.visibility = "visible";
    }
    for (let i = 0; i < editform.length; i++) {
        editform[i].style.visibility = "hidden";
    }
    let submit = document.querySelectorAll("#submitbutton");
    for (let i = 0; i < submit.length; i++) {
        submit[i].innerHTML = "Add";
    }
    let reset = document.querySelectorAll("#resetbutton");
    for (let i = 0; i < reset.length; i++) {
        reset[i].style.display = "block";
    }
}

function showeditform() {
    let addform = document.querySelectorAll("#addcourseform,#addstudentform,#addtrainerform,#addassignmentform");
    let editform = document.querySelectorAll("#existingcourses,#existingtrainers,#existingstudents,#existingassignments");
    document.querySelector("#deletebutton").style.visibility = "visible";
    for (let i = 0; i < addform.length; i++) {
        addform[i].style.visibility = "visible";
    }
    for (let i = 0; i < editform.length; i++) {
        editform[i].style.visibility = "visible";
    }
    let submit = document.querySelectorAll("#submitbutton");
    for (let i = 0; i < submit.length; i++) {
        submit[i].innerHTML = "Update";
    }
}

function resetAll() {
    document.getElementById("resetbutton").click();
}

function makeeditable() {
    let inputs = document.querySelectorAll(".inputs");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = false;
    }
    let selects = document.querySelectorAll(".selects");
    for (let i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
    }
}

function checkdigit() {
    let number = /[0-9]/g;
    let telinput = document.querySelector("#tel");
    let tel = document.querySelector("#tel").value;

    if (tel.match(number)) {
        telinput.classList.remove("invalid");
        telinput.classList.add("valid");
        document.querySelector("#telno").style.visibility = "hidden";
        return true;

    } else {
        document.querySelector("#telno").style.visibility = "visible";
        document.querySelector("#telno").innerHTML = "Only digits from 0-9 are allowed";
        telinput.classList.remove("valid");
        telinput.classList.add("invalid");
        return false;
    }
}

function checkBirthDate() {
    let bod = new Date(document.querySelector("#stdob").value);
    let today = new Date();
    let age = today.getFullYear() - bod.getFullYear();
    if (age < 18 || age > 60) {
        document.querySelector("#dobno").style.visibility = "visible";
        return false;
    } else {
        document.querySelector("#dobno").style.visibility = "hidden";
        return true;
    }

}

function hideerrormsg() {
    let errors = document.querySelectorAll("#titleno, #streamno,#firstno,#lastno,#emailno,#dobno,#telno,#dateno,#subdateno,#subno");
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.visibility = "hidden";
    }
}


// courses


function createCourses() {
    let existingCourses = JSON.parse(localStorage.getItem("allCourses"));

    if (existingCourses === null) {
        existingCourses = [];
        let course1 = { title: "CB1", stream: "Java", type: "Full-Time", start: "2020-09-10", end: "2021-05-31" };
        let course2 = { title: "CB2", stream: "C#", type: "Part-Time", start: "2020-10-17", end: "2021-01-31" };
        let course3 = { title: "CB3", stream: "Python", type: "Part-Time", start: "2020-03-15", end: "2020-06-15" };
        let course4 = { title: "CB4", stream: "Ruby", type: "Full-Time", start: "2020-09-10", end: "2021-05-31" };
        existingCourses.push(course1);
        existingCourses.push(course2);
        existingCourses.push(course3);
        existingCourses.push(course4);
        localStorage.setItem("allCourses", JSON.stringify(existingCourses));
        console.log("Courses List Created...");
    } else {
        console.log("Courses list has already been created");
    }
}


function saveandshowcourse() {
    let buttonvalue = document.querySelector("#submitbutton").innerHTML;
    if (!validatecourse()) {
        return false;
    } else {
        if (buttonvalue === "Add") {
            addCourse();
            resetAll();
            return true;
        }
        if (buttonvalue === "Update") {
            updateCourse();
            resetAll();
            return true;
        }
    }
}

function addCourse() {
    let existingCourses = JSON.parse(localStorage.getItem("allCourses"));
    if (existingCourses == null) {
        existingCourses = [];
    }
    let course = {title: document.querySelector("#title").value, stream: document.querySelector("#stream").value, type: document.querySelector("#coursetype").value,start: document.querySelector("#start").value,
        end: document.querySelector("#end").value}
    existingCourses.push(course);
    localStorage.setItem("allCourses", JSON.stringify(existingCourses)); 
    alert("You have successfully added the following Course: " + course.title + ", " + course.stream + ", " + course.type + ". Start Date: " + course.start + ". End Date: " + course.end);
}


function populateCourseSelect() {
    $("#selectcourse").empty();
    let coursesarray = JSON.parse(localStorage.getItem("allCourses"));
    let select = document.getElementById("selectcourse");
    for (let i = 0; i < coursesarray.length; i++) {
        let text = [coursesarray[i].title, coursesarray[i].stream, coursesarray[i].type];
        let value = [coursesarray[i].title, coursesarray[i].stream, coursesarray[i].type, coursesarray[i].start, coursesarray[i].end];
        let option1 = document.createElement("OPTION");
        let txt = document.createTextNode(text);
        option1.appendChild(txt);
        option1.setAttribute("value", value);
        select.insertBefore(option1, select.lastChild);
    }
}

function validatecourse() {
    let title = document.forms["courseform"]["title"].value;
    let stream = document.forms["courseform"]["stream"].value;
    let type = document.forms["courseform"]["type"].value;
    let start = document.forms["courseform"]["start"].value;
    let end = document.forms["courseform"]["end"].value;

    if (title == "" || stream == "" || start == "" || end == "" || type == "") {
        alert("All fields must be filled out!");
        return false;
    }
    if (title.length < 2) {
        document.querySelector("#titleno").style.visibility = "visible";
        return false;
    }
    if (stream.length < 2) {
        document.querySelector("#streamno").style.visibility = "visible";
        return false;
    }
    if (end < start) {
        document.querySelector("#dateno").style.visibility = "visible";
        return false;
    }
    else {
        hideerrormsg();
        return true;
    }
}

function populatecoursefields() {
    let selectedcourse = document.querySelector("#selectcourse");
    let selectedvalues = selectedcourse.value.split(",");
    document.querySelector("#title").value = selectedvalues[0];
    document.querySelector("#stream").value = selectedvalues[1];
    let type = document.querySelector("#coursetype").value = selectedvalues[2];
    document.querySelector("#start").value = selectedvalues[3];
    document.querySelector("#end").value = selectedvalues[4];
    let inputs = document.querySelectorAll("#title, #stream, #start, #end");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = true;
    }
    document.querySelector("#coursetype").disabled = true;
}



function deleteCourse() {
    let selectedcourse = document.querySelector("#selectcourse").value;
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    courseslistparsed.splice(getIndexOfCourse(), 1);
    alert("Course " + selectedcourse + " will be permanently deleted.");
    resetAll();
    makeeditable();
    localStorage.setItem("allCourses", JSON.stringify(courseslistparsed));
}



function updateCourse() {
    let selectedcourse = document.querySelector("#selectcourse").value;
    let values = selectedcourse.split(",");
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    for (let i = 0; i < courseslistparsed.length; i++) {
        if (courseslistparsed[i].title === values[0] && courseslistparsed[i].stream === values[1] && courseslistparsed[i].type === values[2]) {
            var title = courseslistparsed[i].title = document.querySelector("#title").value;
            var stream = courseslistparsed[i].stream = document.querySelector("#stream").value;
            var type = courseslistparsed[i].type = document.querySelector("#coursetype").value;
            var start = courseslistparsed[i].start = document.querySelector("#start").value;
            var end = courseslistparsed[i].end = document.querySelector("#end").value;
        }
        localStorage.setItem("allCourses", JSON.stringify(courseslistparsed));
    }
    alert("Course [ " + selectedcourse + " ] was successfully updated to: [" + title + "," + stream + ", " + type + ", " + start + ", " + end + " ]");
}

function getIndexOfCourse() {
    let selectedcourse = document.querySelector("#selectcourse").value;
    let values = selectedcourse.split(",");
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    for (let i = 0; i < courseslistparsed.length; i++) {
        if (courseslistparsed[i].title === values[0] && courseslistparsed[i].stream === values[1] && courseslistparsed[i].type === values[2]) {
            var index = courseslistparsed.indexOf(courseslistparsed[i]);
        }
    }
    return index;
}

//trainers

function createTrainers() {
    let existingTrainers = JSON.parse(localStorage.getItem("allTrainers"));
    if (existingTrainers === null) {
        existingTrainers = [];
        let trainer1 = { first: "Eleni", last: "Smaragdi", gender: "Female", subject: "Back End", tel: "6987543421", email: "elenismaragdi@hotmail.com" };
        let trainer2 = { first: "Dimitris", last: "Karagiannis", gender: "Male", subject: "Back End", tel: "6945673229", email: "dkaragiannis@hotmail.com" };
        let trainer3 = { first: "Christos", last: "Kalopoulos", gender: "Male", subject: "Front End", tel: "6994532412", email: "christoskal@hotmail.com" };
        let trainer4 = { first: "John", last: "Karens", gender: "Male", subject: "Front End", tel: "6983421356", email: "karensjohn@gmail.com" };
        let trainer5 = { first: "Maria", last: "Koliva", gender: "Female", subject: "Frameworks", tel: "6987543542", email: "mariakoliva@hotmail.com" };
        let trainer6 = { first: "Aliki", last: "Tsalikoglou", gender: "Female", subject: "Frameworks", tel: "6934786521", email: "atsalik@hotmail.com" };
        existingTrainers.push(trainer1);
        existingTrainers.push(trainer2);
        existingTrainers.push(trainer3);
        existingTrainers.push(trainer4);
        existingTrainers.push(trainer5);
        existingTrainers.push(trainer6);
        localStorage.setItem("allTrainers", JSON.stringify(existingTrainers));
        console.log("Trainers List Created...");
    } else {
        console.log("Trainers list has already been created");
    }
}

function addTrainer() {
    let existingTrainers = JSON.parse(localStorage.getItem("allTrainers"));
    if (existingTrainers == null) {
        existingTrainers = [];
    }
    let trainer = {
        first: document.querySelector("#firstname").value,
        last: document.querySelector("#lastname").value,
        gender: document.querySelector("#selectgender").value,
        subject: document.querySelector("#selectsubject").value,
        tel: document.querySelector("#tel").value,
        email: document.querySelector("#email").value
    }
    existingTrainers.push(trainer);
    localStorage.setItem("allTrainers", JSON.stringify(existingTrainers));
    alert("You have successfully added the following Trainer: " + trainer.first + " " + trainer.last + ". Gender: " + trainer.gender +
        ". Subject: " + trainer.subject + ". Tel: " + trainer.tel + ". Email: " + trainer.email);
}



function validatetrainer() {
    let first = document.forms["trainerform"]["firstname"].value;
    let last = document.forms["trainerform"]["lastname"].value;
    let subject = document.forms["trainerform"]["selectsubject"].value;
    let gender = document.forms["trainerform"]["selectgender"].value;
    let tel = document.forms["trainerform"]["tel"].value;
    let email = document.forms["trainerform"]["email"].value;

    if (first == "" || last == "" || subject == "" || gender == "" || tel == "" || email == "") {
        alert("All fields must be filled out!");
        return false;
    }
    if (first.length < 2) {
        document.querySelector("#firstno").style.visibility = "visible";
        return false;
    }
    if (last.length < 2) {
        document.querySelector("#lastno").style.visibility = "visible";
        return false;
    }
    if (!checkdigit) {
        return false;
    }
    if (tel.length < 10) {
        document.querySelector("#telno").innerHTML = "A valid phone number contains 10 digits";
        document.querySelector("#telno").style.visibility = "visible";
        return false;
    }
    else {
        hideerrormsg();
        return true;
    }
}

function saveandshowtrainer() {
    let buttonvalue = document.querySelector("#submitbutton").innerHTML;
    if (!validatetrainer()) {
        return false;
    } else {
        if (buttonvalue === "Add") {
            addTrainer();
            resetAll();
            return true;
        }
        if (buttonvalue === "Update") {
            updateTrainer();
            resetAll();
            return true;
        }
    }
}

function deleteTrainer() {
    let selectedtrainer = document.querySelector("#selecttrainer").value;
    let trainerslistparsed = JSON.parse(localStorage.getItem("allTrainers"));
    trainerslistparsed.splice(getIndexOfTrainer(), 1);
    alert("Trainer " + selectedtrainer + " will be permanently deleted.");
    resetAll();
    makeeditable();
    localStorage.setItem("allTrainers", JSON.stringify(trainerslistparsed));
}


function updateTrainer() {
    let selectedTrainer = document.querySelector("#selecttrainer").value;
    let values = selectedTrainer.split(",");
    let trainerslistparsed = JSON.parse(localStorage.getItem("allTrainers"));
    for (let i = 0; i < trainerslistparsed.length; i++) {
        if (trainerslistparsed[i].first === values[0] && trainerslistparsed[i].last === values[1] && trainerslistparsed[i].gender === values[2]) {
            var first = trainerslistparsed[i].first = document.querySelector("#firstname").value;
            var last = trainerslistparsed[i].last = document.querySelector("#lastname").value;
            var gender = trainerslistparsed[i].gender = document.querySelector("#selectgender").value;
            var subject = trainerslistparsed[i].subject = document.querySelector("#selectsubject").value;
            var tel = trainerslistparsed[i].tel = document.querySelector("#tel").value;
            var email = trainerslistparsed[i].email = document.querySelector("#email").value;
        }
        localStorage.setItem("allTrainers", JSON.stringify(trainerslistparsed));
    }
    alert("Trainer [ " + selectedTrainer + " ] was successfully updated to: [" + first + "," + last + ", " + gender + ", " + subject + ", " + tel + ", " + email + " ]");
}



function populateTrainerSelect() {
    $("#selecttrainer").empty();
    let select = document.getElementById("selecttrainer");
    let trainerslist = localStorage.getItem("allTrainers");
    let trainersarray = JSON.parse(trainerslist);
    if (trainersarray == null) {
        trainersarray = [];
    }
    for (let i = 0; i < trainersarray.length; i++) {
        let text = [trainersarray[i].first, trainersarray[i].last, trainersarray[i].subject];
        let value = [trainersarray[i].first, trainersarray[i].last, trainersarray[i].gender, trainersarray[i].subject, trainersarray[i].tel, trainersarray[i].email];
        let option2 = document.createElement("OPTION");
        let txt = document.createTextNode(text);
        option2.appendChild(txt);
        option2.setAttribute("value", value);
        select.insertBefore(option2, select.lastChild);
    }
}

function populatetrainerfields() {
    let selectedtrainer = document.querySelector("#selecttrainer");
    let selectedvalues = selectedtrainer.value.split(",");
    document.getElementById("firstname").value = selectedvalues[0];
    document.getElementById("lastname").value = selectedvalues[1];
    document.getElementById("selectgender").value = selectedvalues[2];
    document.getElementById("selectsubject").value = selectedvalues[3];
    document.getElementById("tel").value = selectedvalues[4];
    document.getElementById("email").value = selectedvalues[5];
    let classes = document.querySelectorAll("#firstname, #lastname, #email, #tel");
    for (let i = 0; i < classes.length; i++) {
        classes[i].readOnly = true;
    }
    document.querySelector("#selectgender").disabled = true;
    document.querySelector("#selectsubject").disabled = true;
    document.querySelector("#tel").style.color = "black";
}

function getIndexOfTrainer() {
    var selectedTrainer = document.querySelector("#selecttrainer").value;
    var values = selectedTrainer.split(",");
    var trainerslistparsed = JSON.parse(localStorage.getItem("allTrainers"));
    for (var i = 0; i < trainerslistparsed.length; i++) {
        if (trainerslistparsed[i].first === values[0] && trainerslistparsed[i].last === values[1] && trainerslistparsed[i].gender === values[2]) {
            var index = trainerslistparsed.indexOf(trainerslistparsed[i]);
        }
    }
    return index;
}

//students
function createStudents() {
    let existingStudents = JSON.parse(localStorage.getItem("allStudents"));
    console.log(existingStudents);
    if (existingStudents === null) {
        existingStudents = [];

        let student1 = { first: "Liam", last: "Smith", gender: "Male", dob: "1978-02-03", tel: "6987556721", email: "liams@hotmail.com" };
        let student2 = { first: "John", last: "Graves", gender: "Male", dob: "1985-02-07", tel: "6987432321", email: "graves@hotmail.com" };
        let student3 = { first: "William", last: "Boyd", gender: "Male", dob: "1990-05-20", tel: "6987587431", email: "wboyd@hotmail.com" };
        let student4 = { first: "Maria", last: "Kanari", gender: "Female", dob: "1978-06-23", tel: "64324556721", email: "mkanari@hotmail.com" };
        let student5 = { first: "Helen", last: "Rogers", gender: "Female", dob: "1979-08-08", tel: "6987555386", email: "mrogers@hotmail.com" };
        let student6 = { first: "Olivia", last: "Newton", gender: "Female", dob: "1982-09-07", tel: "6987523458", email: "newtonol@hotmail.com" };
        let student7 = { first: "Emma", last: "Collins", gender: "Female", dob: "1984-02-05", tel: "6987987624", email: "emma@hotmail.com" };
        let student8 = { first: "Nicol", last: "Smith", gender: "Female", dob: "1983-12-16", tel: "6998756721", email: "nicoles@hotmail.com" };
        let student9 = { first: "Tania", last: "Varens", gender: "Female", dob: "1988-11-18", tel: "6983256721", email: "varens@hotmail.com" };
        let student10 = { first: "Dimitris", last: "Habakis", gender: "Male", dob: "1983-08-03", tel: "6998216729", email: "habakis@hotmail.com" };
        let student11 = { first: "George", last: "Williams", gender: "Male", dob: "1999-07-03", tel: "6987598123", email: "lwilliams@hotmail.com" };

        existingStudents.push(student1);
        existingStudents.push(student2);
        existingStudents.push(student3);
        existingStudents.push(student4);
        existingStudents.push(student5);
        existingStudents.push(student6);
        existingStudents.push(student7);
        existingStudents.push(student8);
        existingStudents.push(student9);
        existingStudents.push(student10);
        existingStudents.push(student11);
        localStorage.setItem("allStudents", JSON.stringify(existingStudents));
        console.log("Students List Created...");
    }
    if (existingStudents !== null) {
        console.log("Students list has already been created");
    }
}


function addStudent() {
    let existingStudents = JSON.parse(localStorage.getItem("allStudents"));
    if (existingStudents == null) {
        existingStudents = [];
    }
    let student = {
        first: document.querySelector("#firstname").value,
        last: document.querySelector("#lastname").value,
        gender: document.querySelector("#selectgender").value,
        dob: document.querySelector("#stdob").value,
        tel: document.querySelector("#tel").value,
        email: document.querySelector("#stemail").value
    }
    existingStudents.push(student);
    localStorage.setItem("allStudents", JSON.stringify(existingStudents));
    alert("You have successfully submitted the following: Student: " + student.first + " " + student.last + ". Gender: " + student.gender +
        ".Date of Birth: " + student.dob + ". Tel: " + student.tel + ". Email: " + student.email);
}


function validatestudent() {

    let first = document.forms["studentform"]["firstname"].value;
    let last = document.forms["studentform"]["lastname"].value;
    let gender = document.forms["studentform"]["selectgender"].value;
    let dob = document.forms["studentform"]["stdob"].value;
    let tel = document.forms["studentform"]["tel"].value;
    let email = document.forms["studentform"]["email"].value;
    if (first == "" || last == "" || dob == "" || gender == "" || tel == "" || email == "") {
        alert("All fields must be filled out!");
        return false;
    }

    if (first.length < 2) {
        document.querySelector("#firstno").style.visibility = "visible";
        return false;
    }
    if (last.length < 2) {
        document.querySelector("#lastno").style.visibility = "visible";
        return false;
    }

    if (!checkdigit) {
        return false;
    }

    if (tel.length < 10) {
        document.querySelector("#telno").innerHTML = "A valid phone number contains 10 digits";
        document.querySelector("#telno").style.visibility = "visible";
        return false;
    }

    let date = new Date(document.querySelector("#stdob").value);
    let today = new Date();
    let year = today.getFullYear();
    let age = year - date.getFullYear();
    if (age < 18 || age > 60) {
        document.querySelector("#dobno").style.visibility = "visible";
        return false;
    }
    else {
        hideerrormsg();
        return true;
    }
}

function saveandshowstudent() {
    let buttonvalue = document.querySelector("#submitbutton").innerHTML;
    if (!validatestudent()) {
        return false;
    } else {
        if (buttonvalue === "Add") {
            addStudent();
            resetAll();
            return true;
        }
        if (buttonvalue === "Update") {
            updateStudent();
            resetAll();
            return true;
        }
    }
}

function deleteStudent() {
    let selectedstudent = document.querySelector("#selectstudent").value;
    let studentslistparsed = JSON.parse(localStorage.getItem("allStudents"));
    studentslistparsed.splice(getIndexOfStudent(), 1);
    alert("Student " + selectedstudent + " will be permanently deleted.");
    resetAll();
    makeeditable();
    localStorage.setItem("allStudents", JSON.stringify(studentslistparsed));
}

function updateStudent() {
    let selectedstudent = document.querySelector("#selectstudent ").value;
    let values = selectedstudent.split(",");
    let studentslistparsed = JSON.parse(localStorage.getItem("allStudents"));
    for (let i = 0; i < studentslistparsed.length; i++) {
        if (studentslistparsed[i].first === values[0] && studentslistparsed[i].last === values[1] && studentslistparsed[i].gender === values[2]) {
            var first = studentslistparsed[i].first = document.querySelector("#firstname").value;
            var last = studentslistparsed[i].last = document.querySelector("#lastname").value;
            var gender = studentslistparsed[i].gender = document.querySelector("#selectgender").value;
            var dob = studentslistparsed[i].dob = document.querySelector("#stdob").value;
            var tel = studentslistparsed[i].tel = document.querySelector("#tel").value;
            var email = studentslistparsed[i].email = document.querySelector("#stemail").value;
        }

        localStorage.setItem("allStudents", JSON.stringify(studentslistparsed));
    }
    alert("Student [ " + selectedstudent + " ] was successfully updated to: [" + first + "," + last + ", " + gender + ", " + dob + ", " + tel + ", " + email + " ]");
    $("#selectstudent").empty();
}

function populateStudentSelect() {
    $("#selectstudent").empty();
    let select = document.getElementById("selectstudent");
    let studentslist = localStorage.getItem("allStudents");
    let studentsarray = JSON.parse(studentslist);
    if (studentsarray == null) {
        studentsarray = [];
    }
    for (let i = 0; i < studentsarray.length; i++) {
        let text = [studentsarray[i].first, studentsarray[i].last, studentsarray[i].dob];
        let value = [studentsarray[i].first, studentsarray[i].last, studentsarray[i].gender, studentsarray[i].dob, studentsarray[i].tel, studentsarray[i].email];
        let option2 = document.createElement("OPTION");
        let txt = document.createTextNode(text);
        option2.appendChild(txt);
        option2.setAttribute("value", value);
        select.insertBefore(option2, select.lastChild);
    }
}

function populatestudentfields() {
    let selectedstudent = document.querySelector("#selectstudent");
    let selectedvalues = selectedstudent.value.split(",");
    document.getElementById("firstname").value = selectedvalues[0];
    document.getElementById("lastname").value = selectedvalues[1];
    document.getElementById("selectgender").value = selectedvalues[2];
    document.getElementById("stdob").value = selectedvalues[3];
    document.getElementById("tel").value = selectedvalues[4];
    document.getElementById("stemail").value = selectedvalues[5];

    let classes = document.querySelectorAll("#firstname, #lastname, #stdob, #stemail, #tel");
    for (let i = 0; i < classes.length; i++) {
        classes[i].readOnly = true;
    }
    document.querySelector("#selectgender").disabled = true;
    document.querySelector("#tel").style.color = "black";
}


function getIndexOfStudent() {
    var selectedstudent = document.querySelector("#selectstudent").value;
    var values = selectedstudent.split(",");
    var studentslistparsed = JSON.parse(localStorage.getItem("allStudents"));
    for (var i = 0; i < studentslistparsed.length; i++) {
        if (studentslistparsed[i].first === values[0] && studentslistparsed[i].last === values[1] && studentslistparsed[i].gender === values[2]) {
            var index = studentslistparsed.indexOf(studentslistparsed[i]);
        }
    }
    return index;
}
// assignments

function createAssignments() {
    let existingAssignments = JSON.parse(localStorage.getItem("allAssignments"));
    if (existingAssignments === null) {
        existingAssignments = [];
        let assignment1 = { title: "Individual Project A", description: "Introduction to Programming", subdate: "2020-11-15" };
        let assignment2 = { title: "Individual Project B", description: "Back End Connectivity", subdate: "2021-03-12" };
        let assignment3 = { title: "Front End Assignment", description: "Website Creation", subdate: "2020-11-05" };
        let assignment4 = { title: "Group Project", description: "From Front End to DB", subdate: "2020-12-15" };

        existingAssignments.push(assignment1);
        existingAssignments.push(assignment2);
        existingAssignments.push(assignment3);
        existingAssignments.push(assignment4);
        localStorage.setItem("allAssignments", JSON.stringify(existingAssignments));
        console.log("Assignments List Created...");
    }
    if (existingAssignments !== null) {
        console.log("Assignments list has already been created");
    }
}


function saveandshowassignment() {
    let buttonvalue = document.querySelector("#submitbutton").innerHTML;
    if (!validateassignment()) {
        return false;
    } else {
        if (buttonvalue === "Add") {
            addAssignment();
            resetAll();
            return true;
        }
        if (buttonvalue === "Update") {
            updateAssignment();
            resetAll();
            return true;
        }
    }
}

function addAssignment() {
    let existingAssignments = JSON.parse(localStorage.getItem("allAssignments"));
    if (existingAssignments == null) {
        existingAssignments = [];
    }
    let assignment = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        subdate: document.querySelector("#subdate").value

    }
    existingAssignments.push(assignment);
    localStorage.setItem("allAssignments", JSON.stringify(existingAssignments));
    localStorage.setItem("assignment", JSON.stringify(assignment));
    let assignmentobject = JSON.parse(localStorage.getItem("assignment"));
    alert("You have successfully added the following Assignment: [ Title: " + assignmentobject.title + ", Description: " + assignmentobject.description + ", Submission Date: " + assignmentobject.subdate + " ]");
}


function populateAssignmentSelect() {
    $("#selectass").empty();
    let asslist = localStorage.getItem("allAssignments");
    let select = document.getElementById("selectass"),
        assarray = JSON.parse(asslist);

    for (let i = 0; i < assarray.length; i++) {
        let text = [assarray[i].title, assarray[i].subdate];
        let value = [assarray[i].title, assarray[i].description, assarray[i].subdate];
        let option1 = document.createElement("OPTION");
        let txt = document.createTextNode(text);
        option1.appendChild(txt);
        option1.setAttribute("value", value);
        select.insertBefore(option1, select.lastChild);
    }
}

function validateassignment() {
    let title = document.forms["assignmentform"]["title"].value;
    let description = document.forms["assignmentform"]["description"].value;
    let subdate = document.forms["assignmentform"]["subdate"].value;
    if (title == "" || description == "" || subdate == "") {
        alert("All fields must be filled out!");
        return false;
    }
    if (title.length < 2) {
        document.querySelector("#titleno").style.visibility = "visible";
        return false;
    }
    if (description.length < 2) {
        document.querySelector("#descriptionno").style.visibility = "visible";
        return false;
    }

    else {
        hideerrormsg();
        return true;
    }
}

function populateassignmentfields() {
    let selectedass = document.querySelector("#selectass").value;
    let selectedvalues = selectedass.split(",");
    document.querySelector("#title").value = selectedvalues[0];
    document.querySelector("#description").value = selectedvalues[1];
    subdate = document.querySelector("#subdate").value = selectedvalues[2];

    let inputs = document.querySelectorAll("#title, #description, #subdate");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = true;
    }
}


function deleteAssignment() {
    let selectedass = document.querySelector("#selectass").value;
    let asslistparsed = JSON.parse(localStorage.getItem("allAssignments"));
    asslistparsed.splice(getIndexOfAssignment(), 1);
    alert("Course " + selectedass + " will be permanently deleted");
    resetAll();
    makeeditable();
    localStorage.setItem("allAssignments", JSON.stringify(asslistparsed));
}

function updateAssignment() {
    let selectedass = document.querySelector("#selectass").value;
    let values = selectedass.split(",");
    let asslistparsed = JSON.parse(localStorage.getItem("allAssignments"));
    for (let i = 0; i < asslistparsed.length; i++) {
        if (asslistparsed[i].title === values[0] && asslistparsed[i].description == values[1] && asslistparsed[i].subdate === values[2]) {
            var title = asslistparsed[i].title = document.querySelector("#title").value;
            var description = asslistparsed[i].description = document.querySelector("#description").value;
            var subdate = asslistparsed[i].subdate = document.querySelector("#subdate").value;
        }
        localStorage.setItem("allAssignments", JSON.stringify(asslistparsed));
    }
    alert("Assignment [ " + selectedass + " ] was successfully updated to: [" + title + "," + description + ", " + subdate + " ]");
}

function myFunction() {
    let x = document.getElementById("topmenu");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function getIndexOfAssignment() {
    var selectedass = document.querySelector("#selectass").value;
    var values = selectedass.split(",");
    var asslistparsed = JSON.parse(localStorage.getItem("allAssignments"));
    for (var i = 0; i < asslistparsed.length; i++) {
        if (asslistparsed[i].title === values[0] && asslistparsed[i].description == values[1] && asslistparsed[i].subdate === values[2]) {
            var index = asslistparsed.indexOf(asslistparsed[i]);
        }
    }
    return index;
}

//trainer to course
function createTrainerLinks() {
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    let trainerslistparsed = JSON.parse(localStorage.getItem("allTrainers"));
    let existingTrainerLinks = JSON.parse(localStorage.getItem("allTrainerLinks"));

    if (existingTrainerLinks == null) {
        existingTrainerLinks = [];
        let trlink1 = { course: courseslistparsed[0], trainer: trainerslistparsed[0] };
        let trlink2 = { course: courseslistparsed[0], trainer: trainerslistparsed[1] };
        let trlink3 = { course: courseslistparsed[1], trainer: trainerslistparsed[2] };
        let trlink4 = { course: courseslistparsed[2], trainer: trainerslistparsed[3] };
        existingTrainerLinks.push(trlink1);
        existingTrainerLinks.push(trlink2);
        existingTrainerLinks.push(trlink3);
        existingTrainerLinks.push(trlink4);
        localStorage.setItem("allTrainerLinks", JSON.stringify(existingTrainerLinks));
        console.log("TrainerLinks List Created...");

    }
    if (existingTrainerLinks !== null) {
        console.log("TrainerLinks have already been created");
    }
}

function createLinksTable() {
    let table = document.getElementById("trlinktable");
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    let existingTrainerLinks = JSON.parse(localStorage.getItem("allTrainerLinks"));
    for (let i = 0; i < existingTrainerLinks.length; i++) {
        let table = document.querySelector("#trlinktable");
        let row = table.insertRow(1);
        let td1 = row.insertCell(0);
        let td2 = row.insertCell(1);
        td1.innerHTML = existingTrainerLinks[i].course.title + "," + existingTrainerLinks[i].course.stream + "," + existingTrainerLinks[i].course.type;
        td2.innerHTML = existingTrainerLinks[i].trainer.first + " " + existingTrainerLinks[i].trainer.last;
        $(td2).hover(function () {
            $(this).css('cursor', 'pointer');
        });
        $(td1).hover(function () {
            $(this).css('cursor', 'pointer');
        });
        td2.onclick = findandremovelink;
    }
}

function findandremovelink() {

    let course = $(this).closest('tr').find('td:nth-child(1)');
    let trainer = $(this).closest('tr').find('td:nth-child(2)');
    course.css('background', 'rgba(236, 13, 80, 0.9)');
    trainer.css('background', 'rgba(236, 13, 80, 0.9)');

    let existingTrainerLinks = JSON.parse(localStorage.getItem("allTrainerLinks"));
    let c = $(this).closest('tr').find('td:nth-child(1)').html();
    let t = $(this).closest('tr').find('td:nth-child(2)').html();
    let cvalues = c.split(",");
    let tvalues = t.split(" ");
    let ctitle = cvalues[0];
    let tlast = tvalues[1];
    for (var i = 0; i < existingTrainerLinks.length; i++) {
        if (existingTrainerLinks[i].course.title === ctitle && existingTrainerLinks[i].trainer.last == tlast) {
            var index = existingTrainerLinks.indexOf(existingTrainerLinks[i]);
        }
    }
    existingTrainerLinks.splice(index, 1);
    localStorage.setItem("allTrainerLinks", JSON.stringify(existingTrainerLinks));

}


function showLinkTable() {
    document.querySelector("#trlinktable").style.display = "table";
    document.querySelector("#link").style.display = "none"; 
    document.querySelector("#backadd").style.display = "none";
    document.querySelector("#updateandback").style.display="table";
}

function showAddLink() {
    document.querySelector("#link").style.display = "table";
    document.querySelector("#trlinktable").style.display = "none";
    document.querySelector("#backadd").style.display = "table";
    document.querySelector("#updateandback").style.display="none";


}

function createTrainerLink() {
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    let trainerslistparsed = JSON.parse(localStorage.getItem("allTrainers"));
    let existingTrainerLinks = JSON.parse(localStorage.getItem("allTrainerLinks"));
    if (existingTrainerLinks == null) {
        existingTrainerLinks = [];
    }
    if(trlinkExists()){
        alert("Trainer already teaches course");
        return false;
    } else {
    var trlink = {
        course: courseslistparsed[getIndexOfCourse()],
        trainer: trainerslistparsed[getIndexOfTrainer()]
    }
    existingTrainerLinks.push(trlink);
    localStorage.setItem("allTrainerLinks", JSON.stringify(existingTrainerLinks));
    alert("Trainer " + trlink.trainer.first + " " + trlink.trainer.last + " was successfully linked to Course " + trlink.course.title + ", " + trlink.course.stream);
    $("#selectcourse").empty();
    $("#selecttrainer").empty();
    document.getElementById("edittrainer").click();
    return true;
}
}

function trlinkExists() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingtrainers = JSON.parse(localStorage.getItem("allTrainers"));
    let existingTrainerLinks = JSON.parse(localStorage.getItem("allTrainerLinks"));
    if (existingTrainerLinks.some(e => e.course.title === existingcourses[getIndexOfCourse()].title && e.trainer.first === existingtrainers[getIndexOfTrainer()].first)) {
        console.log("exists");
        return true;
    } else {
        console.log("doesnt exist");
        return false;
    }
}

function displaymsg() {

    alert("Trainer Course Link will be permanently deleted.")

}

//student to course

function createStudentLinks() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingstudents = JSON.parse(localStorage.getItem("allStudents"));
    let existingStudentLinks = JSON.parse(localStorage.getItem("allStudentLinks"));


    if (existingStudentLinks == null) {
        existingStudentLinks = [];
        let stlink1 = { course: existingcourses[0], student: existingstudents[0] };
        let stlink2 = { course: existingcourses[0], student: existingstudents[1] };
        let stlink3 = { course: existingcourses[1], student: existingstudents[2] };
        let stlink4 = { course: existingcourses[1], student: existingstudents[3] };
        let stlink5 = { course: existingcourses[2], student: existingstudents[4] };
        let stlink6 = { course: existingcourses[2], student: existingstudents[5] };
        let stlink7 = { course: existingcourses[3], student: existingstudents[6] };
        let stlink8 = { course: existingcourses[3], student: existingstudents[7] };


        existingStudentLinks.push(stlink1);
        existingStudentLinks.push(stlink2);
        existingStudentLinks.push(stlink3);
        existingStudentLinks.push(stlink4);
        existingStudentLinks.push(stlink5);
        existingStudentLinks.push(stlink6);
        existingStudentLinks.push(stlink7);
        existingStudentLinks.push(stlink8);

        localStorage.setItem("allStudentLinks", JSON.stringify(existingStudentLinks));
        console.log("StudentLinks List Created...");

    }
    if (existingStudentLinks !== null) {
        console.log("Student Links have already been created");
    }
}

function createStudentLink() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingstudents = JSON.parse(localStorage.getItem("allStudents"));
    let existingStudentLinks = JSON.parse(localStorage.getItem("allStudentLinks"));
    if (existingStudentLinks == null) {
        existingStudentLinks = [];
    }
    if(stlinkExists()){
        alert("Student is already enrolled in the course");
        return false;
    } else {
    var stlink = {
        course: existingcourses[getIndexOfCourse()],
        student: existingstudents[getIndexOfStudent()]
    }
    existingStudentLinks.push(stlink);
    localStorage.setItem("allStudentLinks", JSON.stringify(existingStudentLinks));
    alert("Student " + stlink.student.first + " " + stlink.student.last + " was successfully enrolled to Course " + stlink.course.title + ", " + stlink.course.stream);
    $("#selectcourse").empty();
    $("#selectstudent").empty();
    return true;
}
}

function stlinkExists() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingstudents = JSON.parse(localStorage.getItem("allStudents"));
    let existingStudentLinks = JSON.parse(localStorage.getItem("allStudentLinks"));
    if (existingStudentLinks.some(e => e.course.title === existingcourses[getIndexOfCourse()].title && e.student.first === existingstudents[getIndexOfStudent()].first)) {
        return true;
    } else {
        return false;
    }
}

function showAddStLink() {
    document.querySelector("#stlink").style.display = "table";
    document.querySelector("#backadd").style.display = "table";
    document.querySelector("#enrollments").style.visibility = "hidden";
    document.querySelector("#enrollmentsinput").style.visibility = "hidden";
    document.querySelector("#resetbutton").style.visibility = "hidden";
    document.querySelector("#updateandbackst").style.display= "none";
}

function showUpdateStLink() {
    document.querySelector("#stlink").style.display = "none";
    document.querySelector("#backadd").style.display = "none";
    document.querySelector("#enrollments").style.visibility = "visible";
    document.querySelector("#enrollmentsinput").style.visibility = "visible";
    document.querySelector("#resetbutton").style.visibility = "hidden";
    document.querySelector("#updateandbackst").style.display= "table";
}


function populateEnrollmentDatalist() {
    $("#enrollments").empty();
    let str = ''; // variable to store the options
    let existingsubmissions = JSON.parse(localStorage.getItem("allStudentLinks"));
    let datalist = document.getElementById("enrollments");
    for (let i = 0; i < existingsubmissions.length; i++) {
        str += '<option value="' + existingsubmissions[i].student.first + " " + existingsubmissions[i].student.last + " - " + existingsubmissions[i].course.title + " " + existingsubmissions[i].course.stream + " " + existingsubmissions[i].course.type + '" />'; // Storing options in variable
    }
    datalist.innerHTML = str;
}

function findandremovestlink() {
    let selection = document.querySelector("#enrollmentsinput").value;
    let selectionvalues = selection.split(" ");
    let existingStudentLinks = JSON.parse(localStorage.getItem("allStudentLinks"));
    for (var i = 0; i < existingStudentLinks.length; i++) {
        if (existingStudentLinks[i].course.title == selectionvalues[3] && existingStudentLinks[i].course.stream == selectionvalues[4] && existingStudentLinks[i].student.first == selectionvalues[0] &&
            existingStudentLinks[i].student.last == selectionvalues[1]) {
            var index = existingStudentLinks.indexOf(existingStudentLinks[i]);
        }
    }
    existingStudentLinks.splice(index, 1);
    localStorage.setItem("allStudentLinks", JSON.stringify(existingStudentLinks));
    alert("Enrollment will be permanently deleted");

    resetAll();
}


//assignment to course

function createAssignmentLinks() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));


    if (existingAssignmentLinks == null) {
        existingAssignmentLinks = [];
        let asslink1 = { course: existingcourses[0], assignment: existingassignments[0] };
        let asslink2 = { course: existingcourses[0], assignment: existingassignments[1] };
        let asslink3 = { course: existingcourses[0], assignment: existingassignments[2] };
        let asslink4 = { course: existingcourses[0], assignment: existingassignments[3] };
        let asslink5 = { course: existingcourses[1], assignment: existingassignments[0] };
        let asslink6 = { course: existingcourses[1], assignment: existingassignments[1] };
        let asslink7 = { course: existingcourses[1], assignment: existingassignments[2] };
        let asslink8 = { course: existingcourses[1], assignment: existingassignments[3] };
        let asslink9 = { course: existingcourses[2], assignment: existingassignments[0] };
        let asslink10 = { course: existingcourses[2], assignment: existingassignments[1] };
        let asslink11= { course: existingcourses[2], assignment: existingassignments[2] };
        let asslink12 ={ course: existingcourses[2], assignment: existingassignments[3] };
        let asslink13= { course: existingcourses[3], assignment: existingassignments[0] };
        let asslink14 = { course: existingcourses[3], assignment: existingassignments[1] };
        let asslink15 = { course: existingcourses[3], assignment: existingassignments[2] };
        let asslink16= { course: existingcourses[3], assignment: existingassignments[3] };
       
       

        existingAssignmentLinks.push(asslink1);
        existingAssignmentLinks.push(asslink2);
        existingAssignmentLinks.push(asslink3);
        existingAssignmentLinks.push(asslink4);
        existingAssignmentLinks.push(asslink5);
        existingAssignmentLinks.push(asslink6);
        existingAssignmentLinks.push(asslink7);
        existingAssignmentLinks.push(asslink8);
        existingAssignmentLinks.push(asslink9);
        existingAssignmentLinks.push(asslink10);
        existingAssignmentLinks.push(asslink11);
        existingAssignmentLinks.push(asslink12);
        existingAssignmentLinks.push(asslink13);
        existingAssignmentLinks.push(asslink14);
        existingAssignmentLinks.push(asslink15);
        existingAssignmentLinks.push(asslink16);

        localStorage.setItem("allAssignmentLinks", JSON.stringify(existingAssignmentLinks));
        console.log("Assignment Links List Created...");

    }
    if (existingAssignmentLinks !== null) {
        console.log("Assignment Links have already been created");
    }
}

function createAssignmentLink() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));
    if (existingAssignmentLinks == null) {
        existingAssignmentLinks = [];
    }
    if(asslinkExists()){
        alert("Assignment is already in course");
        return false;
    } else {
    var asslink = { course: existingcourses[getIndexOfCourse()], assignment: existingassignments[getIndexOfAssignment()] };
    existingAssignmentLinks.push(asslink);
    localStorage.setItem("allAssignmentLinks", JSON.stringify(existingAssignmentLinks));
    alert("Assignment " + asslink.assignment.title + " " + asslink.assignment.description + " was successfully added to Course " + asslink.course.title + ", " + asslink.course.stream);
    $("#selectcourse").empty();
    $("#selectass").empty();
    return true;
}
}


function asslinkExists() {
    let existingcourses = JSON.parse(localStorage.getItem("allCourses"));
    let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));
    if (existingAssignmentLinks.some(e => e.course.title === existingcourses[getIndexOfCourse()].title && e.assignment.title === existingassignments[getIndexOfAssignment()].title)) {
        return true;
    } else {
        return false;
    }
}

function showAddAssLink() {
    document.querySelector("#link").style.display = "table";
    document.querySelector("#backadd").style.display = "table";
    document.querySelector("#asstable").style.display = "none";
    document.querySelector("#updateassdiv").style.visibility = "hidden";
    document.querySelector("#selectcourseAssdiv").style.visibility = "hidden";
    document.querySelector("#updateandbackass").style.display="none";
 
}

function showUpdAssLink() {
    document.querySelector("#link").style.display = "none";
    document.querySelector("#backadd").style.display = "none";
    document.querySelector("#asstable").style.display = "table";
    document.querySelector("#updateassdiv").style.visibility = "visible";
    document.querySelector("#selectcourseAssdiv").style.visibility = "visible";
    document.querySelector("#updateandbackass").style.display="table";

}


function populateCourseAssSelect() {
    $("#selectcourseAss").empty();
    let courseslist = localStorage.getItem("allCourses");
    let select = document.getElementById("selectcourseAss");
    let coursesarray = JSON.parse(courseslist);
    for (let i = 0; i < coursesarray.length; i++) {
        let text = [coursesarray[i].title, coursesarray[i].stream, coursesarray[i].type];
        let value = [coursesarray[i].title, coursesarray[i].stream, coursesarray[i].type, coursesarray[i].start, coursesarray[i].end];
        let option1 = document.createElement("OPTION");
        let txt = document.createTextNode(text);
        option1.appendChild(txt);
        option1.setAttribute("value", value);
        select.insertBefore(option1, select.lastChild);
    }
}

function createAssLinksTable() {
    let table = document.getElementById("asstable");
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));
    let existingCourses = JSON.parse(localStorage.getItem("allCourses"));
    let courseAsslinks = [];
    var selectedcourse = document.querySelector("#selectcourseAss").value;
    var index = getIndexOfCourseAss(selectedcourse);
    for (let i = 0; i < existingAssignmentLinks.length; i++) {
        if (existingCourses[index].title == existingAssignmentLinks[i].course.title && existingCourses[index].stream == existingAssignmentLinks[i].course.stream) {
            courseAsslinks.push(existingAssignmentLinks[i]);
        }
    }
    for (let i = 0; i < courseAsslinks.length; i++) {
        let table = document.querySelector("#asstable");
        let row = table.insertRow(1);
        let td1 = row.insertCell(0);
        let td2 = row.insertCell(1);
        let td3 = row.insertCell(2);
        td1.innerHTML = courseAsslinks[i].assignment.title;
        td2.innerHTML = courseAsslinks[i].assignment.description;
        td3.innerHTML = courseAsslinks[i].assignment.subdate;
        td2.onclick = findandremoveAsslink;
        $(td2).hover(function () {
            $(this).css('cursor', 'pointer');
        });
    }

}

function getIndexOfCourseAss(selectedcourse) {
    let values = selectedcourse.split(",");
    let courseslistparsed = JSON.parse(localStorage.getItem("allCourses"));
    for (let i = 0; i < courseslistparsed.length; i++) {
        if (courseslistparsed[i].title === values[0] && courseslistparsed[i].stream === values[1] && courseslistparsed[i].type === values[2]) {
            var index = courseslistparsed.indexOf(courseslistparsed[i]);
        }
    }
    return index;
}

function findandremoveAsslink() {
    let title = $(this).closest('tr').find('td:nth-child(1)');
    let subdate = $(this).closest('tr').find('td:nth-child(3)');
    let description = $(this).closest('tr').find('td:nth-child(2)');
    title.css('background', 'purple');
    subdate.css('background', 'purple');
    description.css('background', 'purple');

    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));
    var selectedcourse = document.querySelector("#selectcourseAss").value;
    let selcoursevalues = selectedcourse.split(",")
    let t = $(this).closest('tr').find('td:nth-child(1)').html();
    let d = $(this).html();
    for (let i = 0; i < existingAssignmentLinks.length; i++) {
        if (existingAssignmentLinks[i].assignment.title == t && existingAssignmentLinks[i].assignment.description == d && existingAssignmentLinks[i].course.title == selcoursevalues[0] &&
            existingAssignmentLinks[i].course.stream == selcoursevalues[1]) {
            var index = existingAssignmentLinks.indexOf(existingAssignmentLinks[i]);
        }
    }
    existingAssignmentLinks.splice(index, 1);
    localStorage.setItem("allAssignmentLinks", JSON.stringify(existingAssignmentLinks));

}

function assmsg() {
    alert("Assignment will be permanently removed from course");
    createAssLinksTable();
}



// assignment per student per course

function showAddAssStudLink() {
    document.querySelector("#grading").style.display = "table";
    document.querySelector("#gradeform").style.display = "table";
    document.querySelector("#updategrading").style.display = "none";
    document.querySelector("#resetbutton").style.visibility = "hidden";
    document.querySelector("#addlink").innerHTML="Submit Assignment";
}

function showUpdAssStudLink() {
    document.querySelector("#grading").style.display = "none";
    document.querySelector("#updategrading").style.display = "table";
    document.querySelector("#gradeform").style.display = "table";
    document.querySelector("#resetbutton").style.visibility = "hidden";
    document.querySelector("#addlink").innerHTML="Resubmit Assignment";
}



function populateAssignmentOfCourseSelect() {
    $("#selectassignment").empty();
    let existingAssignmentLinks = JSON.parse(localStorage.getItem("allAssignmentLinks"));
    let select = document.getElementById("selectassignment");
    let selection = document.getElementById("enrollmentselect").value;
    let selectionvalues = selection.split(" ");
   
    for (let i = 0; i < existingAssignmentLinks.length; i++) {
        if (existingAssignmentLinks[i].course.title == selectionvalues[3] && existingAssignmentLinks[i].course.stream == selectionvalues[4] && existingAssignmentLinks[i].course.type == selectionvalues[5]) {
            let text = [existingAssignmentLinks[i].assignment.title, existingAssignmentLinks[i].assignment.description];
            let value = [existingAssignmentLinks[i].assignment.title, existingAssignmentLinks[i].assignment.description, existingAssignmentLinks[i].assignment.subdate];
            let option1 = document.createElement("OPTION");
            let txt = document.createTextNode(text);
            option1.appendChild(txt);
            option1.setAttribute("value", value);
            select.insertBefore(option1, select.lastChild);
        }
    } 
}

function createSubmissions(){
    let existingenrollements = JSON.parse(localStorage.getItem("allStudentLinks"));  
    let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));


    if (existingsubmissions  == null) {
        existingsubmissions  = [];
        let submission1 = { enrollment:existingenrollements[0], assignment: existingassignments[0], oral:19, total:78 };
        let submission2 = { enrollment:existingenrollements[2], assignment: existingassignments[0], oral:20, total:65 };
        existingsubmissions.push(submission1);
        existingsubmissions.push(submission2);
        localStorage.setItem("allSubmissions", JSON.stringify(existingsubmissions));
        console.log("Submissions Created...");
    }
    if (existingsubmissions !== null) {
        console.log("Submissions have already been created");
    }
}

function validateSubmission(){
    let oral = document.getElementById("oral");
    let total = document.getElementById("total");
    if(oral.value>20 || oral.value<0 ){
        alert("Oral grade must be between 0 - 20!");
        oral.classList.remove("valid");
        oral.classList.add("invalid");
       return false;
    }
    
    if (total.value <0 || total.value > 80 ){
        alert("Total grade must be between 0 - 80!");
        total.classList.remove("valid");
        total.classList.add("invalid");
       return false;
    }else {
        oral.classList.remove("invalid");
        oral.classList.add("valid");
        total.classList.remove("invalid");
        total.classList.add("valid");
            return true;
        }
    }

    function addGrades() {
        let buttonvalue = document.querySelector("#addlink").innerHTML;
            if (buttonvalue === "Submit Assignment") {
                return(createSubmission());
            }
            if (buttonvalue === "Resubmit Assignment") {
                return(updateSubmission());
            }
        }
    
    
    function createSubmission() {
        let existingenrollments = JSON.parse(localStorage.getItem("allStudentLinks"));
        let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
        let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
        let selectedass = document.querySelector("#selectassignment").value;
        let oralg = document.getElementById("oral").value;
        let totalg = document.getElementById("total").value;
        let enroll=existingenrollments[getIndexOfEnrollment()]; 
        let ass=existingassignments[getIndexOfAssignmentCourse(selectedass)];
        if (existingsubmissions == null) {
           existingsubmissions = [];
       }
        if(!validateSubmission()){
            return false;
        } else {
        if(!submissionExists() ){
        var submission = { enrollment: enroll, assignment: ass, oral: oralg, total: totalg };
        existingsubmissions.push(submission);
        localStorage.setItem("allSubmissions", JSON.stringify(existingsubmissions));
        alert("Assignment: " + submission.assignment.title + ", " + submission.assignment.description + " was successfully submitted for Student: " + submission.enrollment.student.first + " " + submission.enrollment.student.last +
            ". Oral Grade: " + submission.oral + " Total Grade: " + submission.total);
        resetAll();
        return true;
        } else {
            alert("Assignment has already been submitted. You may resubmit it - please click on Update Submissions");
            resetAll();
            return false;
        }
    }
}

function getIndexOfEnrollment() {
    let existingenrollments = JSON.parse(localStorage.getItem("allStudentLinks"));
    let selection = document.getElementById("enrollmentselect").value;
    let selectionvalues = selection.split(" ");
    for (let i = 0; i < existingenrollments.length; i++) {
        if (existingenrollments[i].course.title === selectionvalues[3] && existingenrollments[i].course.stream === selectionvalues[4] && existingenrollments[i].course.type === selectionvalues[5] &&
            existingenrollments[i].student.first === selectionvalues[0] && existingenrollments[i].student.last === selectionvalues[1]) {
            var index = existingenrollments.indexOf(existingenrollments[i]);
        }
    }
    return index;
}

function getIndexOfAssignmentCourse(selectedass) {
    var values = selectedass.split(",");
    var asslistparsed = JSON.parse(localStorage.getItem("allAssignments"));
    for (var i = 0; i < asslistparsed.length; i++) {
        if (asslistparsed[i].title === values[0] && asslistparsed[i].description == values[1] && asslistparsed[i].subdate === values[2]) {
            var index = asslistparsed.indexOf(asslistparsed[i]);
        }
    }
    return index;
}


function populateSubmissionDatalist() {
    $("#selectassPerStPerC").empty();
    let str = ''; // variable to store the options
    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
    let datalist = document.getElementById("selectassPerStPerC");
    if (existingsubmissions === null || existingsubmissions.length==0) {
        str = '<option value="No Assignments Have been Submitted yet"/>';
    } else {
        for (var i = 0; i < existingsubmissions.length; i++) {
            str += '<option value="' + existingsubmissions[i].enrollment.course.title + " " + existingsubmissions[i].enrollment.course.stream + " - " + existingsubmissions[i].enrollment.student.first + " " + existingsubmissions[i].enrollment.student.last +
                " - " + existingsubmissions[i].assignment.title + '" />'; 

        }
    }
    datalist.innerHTML = str;
}

function getIndexOfSubmission() {
    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
    let selection = document.getElementById("submissionsinput").value;
    let selectionvalues = selection.split(" ");
    for (let i = 0; i < existingsubmissions.length; i++) {
        let assvalues = existingsubmissions[i].assignment.title.split(" ");
        if (existingsubmissions[i].enrollment.course.title == selectionvalues[0] && existingsubmissions[i].enrollment.course.stream == selectionvalues[1] && existingsubmissions[i].enrollment.student.first == selectionvalues[3] &&
            existingsubmissions[i].enrollment.student.last == selectionvalues[4] && assvalues[0] == selectionvalues[6] && assvalues[1] == selectionvalues[7] && assvalues[2] == selectionvalues[8]) {
            var index = existingsubmissions.indexOf(existingsubmissions[i]);
        }

    }
    return index;

}

function populateGradeFields() {

    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
    let oralg = document.getElementById("oral");
    oralg.value = existingsubmissions[getIndexOfSubmission()].oral;
    let totalg = document.getElementById("total");
    totalg.value = existingsubmissions[getIndexOfSubmission()].total;
    document.querySelector("#oral").readOnly = true;
    document.querySelector("#total").readOnly = true;

}

function updateSubmission() {
    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
    let oralg = document.getElementById("oral");
    let totalg = document.getElementById("total");
    if(!validateSubmission()){
        return false;
    } else {
    existingsubmissions[getIndexOfSubmission()].oral =  oralg.value;
    existingsubmissions[getIndexOfSubmission()].total =  totalg.value;
     localStorage.setItem("allSubmissions", JSON.stringify(existingsubmissions));
    alert("Grades for Assignment [" + existingsubmissions[getIndexOfSubmission()].assignment.title + ", " + existingsubmissions[getIndexOfSubmission()].assignment.description + "] for Student [" + 
    existingsubmissions[getIndexOfSubmission()].enrollment.student.first + " " + existingsubmissions[getIndexOfSubmission()].enrollment.student.last +
    "] were updated to: Oral Grade: " + 
    existingsubmissions[getIndexOfSubmission()].oral + " Total Grade:" +  existingsubmissions[getIndexOfSubmission()].total);
    resetAll();
    return true;
    }
}

function submissionExists() {
    let existingenrollments = JSON.parse(localStorage.getItem("allStudentLinks"));
    let existingsubmissions = JSON.parse(localStorage.getItem("allSubmissions"));
    let existingassignments = JSON.parse(localStorage.getItem("allAssignments"));
    let stfirst= existingenrollments[getIndexOfEnrollment()].student.first;
    let stlast= existingenrollments[getIndexOfEnrollment()].student.last;
    let ctitle= existingenrollments[getIndexOfEnrollment()].course.title;
    let cstream= existingenrollments[getIndexOfEnrollment()].course.stream;
    let selectedass = document.getElementById("selectassignment").value;

    if (existingsubmissions === null) {
        existingsubmissions = [];
    }
    if(selectedass==null || selectedass=="" || selectedass.length==0){
        alert("Course has no assignments to submit");
        resetAll();
        return false;
    } else {
    let asstitle=existingassignments[getIndexOfAssignmentCourse(selectedass)].title;
    let assdescription=existingassignments[getIndexOfAssignmentCourse(selectedass)].description;
    if (existingsubmissions.some(e => e.enrollment.course.title === ctitle && e.enrollment.course.stream === cstream && e.enrollment.student.first === stfirst &&
        e.enrollment.student.last === stlast && e.assignment.title === asstitle &&  e.assignment.description === assdescription )) {
            console.log("exists");
            resetAll();
        return true;
    } else  {
        console.log("does not exist");
        resetAll();
        return false;
    } 
}
}





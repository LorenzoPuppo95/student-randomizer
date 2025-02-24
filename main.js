const fs = require('fs');

function betterSplice(array, index = 0, removals = 1) {
    const newArray = [...array];
    newArray.splice(index, removals);
    return newArray;
}

function randomArrayIndex(array) {
    const randomIndex = Math.round(Math.random()*(array.length - 1));
    return randomIndex;
}

function createStudentCouples(studentsArray) {
    const arrayCouples = [];
    while (studentsArray.length > 0) {
        let index = randomArrayIndex(studentsArray);
        let couple = [];
        couple.push(studentsArray[index].name);
        studentsArray = betterSplice(studentsArray, index, 1);
        index = randomArrayIndex(studentsArray);
        couple.push(studentsArray[index].name);
        studentsArray = betterSplice(studentsArray, index, 1);
        arrayCouples.push(couple);
    }
    return arrayCouples;
}

function printStudentCouples(studentCouples){
    let studentCouplesString = "";
    for (let i = 0; i < studentCouples.length; i++) {
        const couple = studentCouples[i];
        studentCouplesString += `${i+1}) ${couple[0]} - ${couple[1]} \n`       
    }
    return studentCouplesString;
}

function getStudentsFromJsonFile(filePath) {
    const stringJSON = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(stringJSON);
}

// browser version
// async function getStudentsFromJsonFile(filePath) {
//     const response = await fetch(filePath);
//     const data = await response.json();
//     return data;
// }

//student randomizer
// async function main() { //browser version
function main() {
    // //0:recupera le informazioni degli studenti dal file students.json
    const allStudents = getStudentsFromJsonFile("students.json");
    // const allStudents = await getStudentsFromJsonFile("students.json"); //browser version
    console.log(allStudents);
    //1: dall'array di studenti estrai un array di coppie di studenti
    const studentCouples = createStudentCouples(allStudents);
    console.log(studentCouples);
    //2:fare console log delle coppie di studenti generate
    const studentCoupleString = printStudentCouples(studentCouples);
    console.log(studentCoupleString);   
}

main();
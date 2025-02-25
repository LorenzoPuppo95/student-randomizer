const fs = require('fs'); //comment this for browser version

// Funzione che simula un comportamento simile a `splice()` ma senza modificare l'array originale
function betterSplice(array, index = 0, removals = 1) {
    // Crea una copia dell'array originale, così da non modificarlo direttamente (immutabilità)
    const newArray = [...array];   
    // Utilizza il metodo `splice()` sulla copia dell'array per rimuovere elementi
    // `index`: posizione iniziale da cui rimuovere gli elementi
    // `removals`: numero di elementi da rimuovere
    newArray.splice(index, removals);  
    // Ritorna la nuova copia dell'array con gli elementi rimossi
    return newArray;
}

// Funzione che restituisce un indice casuale da un array
function randomArrayIndex(array) {
    // `Math.random()` restituisce un numero casuale tra 0 (incluso) e 1 (escluso)
    // Moltiplichiamo per `array.length - 1` per ottenere un valore tra 0 e `array.length - 1`
    const randomIndex = Math.round(Math.random() * (array.length - 1));
    // Restituisce l'indice casuale generato
    return randomIndex;
}

// Funzione che crea coppie casuali di studenti
function createStudentCouples(studentsArray) {
    // Crea una copia dell'array originale degli studenti per evitare di modificarlo direttamente
    let cloneArray = [...studentsArray];
    // Crea un array vuoto che conterrà le coppie di studenti
    const arrayCouples = [];   
    // Continua finché ci sono studenti nell'array
    while (cloneArray.length > 0) {      
        // Seleziona un indice casuale nell'array di studenti
        let index = randomArrayIndex(cloneArray);
        // Crea una coppia vuota
        const couple = [];      
        // Aggiungi il nome del primo studente alla coppia
        couple.push(cloneArray[index].name);
        // Rimuovi il primo studente dall'array
        cloneArray = betterSplice(cloneArray, index, 1);       
        // Se ci sono ancora studenti nell'array, selezioniamo il secondo studente
        if (cloneArray.length > 0) {
            // Selezioniamo un altro indice casuale per il secondo studente
            index = randomArrayIndex(cloneArray);
            // Aggiungiamo il nome del secondo studente alla coppia
            couple.push(cloneArray[index].name);
            // Rimuoviamo il secondo studente dall'array
            cloneArray = betterSplice(cloneArray, index, 1);
        }
        // Aggiungi la coppia all'array delle coppie
        arrayCouples.push(couple);
    } 
    // Restituisce l'array contenente tutte le coppie di studenti
    return arrayCouples;
}

// Funzione che stampa le coppie di studenti
function printStudentCouples(studentCouples) {
    // Inizializza una stringa vuota che conterrà la rappresentazione delle coppie
    let studentCouplesString = "";   
    // Cicla attraverso l'array delle coppie di studenti
    for (let i = 0; i < studentCouples.length; i++) {
        // Ottiene la coppia corrente (un array con i nomi degli studenti)
        const couple = studentCouples[i];   
        // Aggiunge alla stringa `studentCouplesString` la coppia con il formato: "indice) nome1 - nome2"
        studentCouplesString += `${i+1}) ${couple[0]} - ${couple[1]} \n`;
    }    
    // Restituisce la stringa contenente tutte le coppie formattate
    return studentCouplesString;
}

// Funzione che legge un file JSON e restituisce i dati degli studenti
function getStudentsFromJsonFile(filePath) {
    try {
        // Legge il contenuto del file specificato dal percorso `filePath` come stringa (in formato UTF-8)
        const stringJSON = fs.readFileSync("./" + filePath, 'utf8');      
        // Converte la stringa JSON letta dal file in un oggetto JavaScript e lo restituisce
        return JSON.parse(stringJSON);
    } catch (error) {
        // Stampa un messaggio di errore in caso di problemi nella lettura del file
        console.error(`Error reading file ./${filePath}:`, error);
    }     
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
    // console.log(allStudents);
    //1: dall'array di studenti estrai un array di coppie di studenti
    const studentCouples = createStudentCouples(allStudents);
    console.log(studentCouples);
    //2:fare console log delle coppie di studenti generate
    const studentCoupleString = printStudentCouples(studentCouples);
    console.log(studentCoupleString);   
}

main();
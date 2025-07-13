
const semesters = [
    ["Bases para la Ciencia", "Sistemas Orgánicos Integrados I", "Práctica Médica en Comunidad I", "Relevancia Práctica en Individuos", "Vocación y Sentido Médico I", "Core curriculum Persona & Cultu", "Competencias Digitales"],
    ["Sistemas Orgánicos Integrados II", "Práctica Médica en Comunidad II", "Relevancia Práctica en Individuos II", "Vocación y Sentido Médico II", "Core Curriculum: Persona & Cultu II", "Tecnologías para la educación en", "Lenguas extranjeras I"],
    ["Sistemas Orgánicos Integrados III", "Práctica Médica en Comunidad III", "Relevancia Práctica en Individuos III", "Humanidades Médicas I", "Core Curriculum: Persona & Cultu III", "Electiva I", "Lenguas extranjeras II"],
    ["Mecanismos de la Enfermedad I", "Práctica de Atención Primaria I", "Relevancia Práctica Fisiopatología I", "Humanidades Médicas II", "Core Curriculum: Persona & Cultu IV", "Innovación en salud I", "Electiva II", "Lenguas extranjeras III"],
    ["Mecanismos de la Enfermedad II", "Práctica de Atención Primaria II", "Relevancia Práctica Fisiopatología II", "Core Curriculum: Persona & Curri V", "Innovación en Salud I", "Electiva III"],
    ["Medicina Interna", "Psiquiatría", "Medicina Familiar I", "Relevancia Práctica en el Adulto", "Bioética Clínica I", "Competencias Comuni & Profesi"],
    ["Cirugía y Especialidades", "Medicina Familiar II", "Relevancia Práctica Quirúrgicos", "Profesionalismo Médico I", "Global Perspectives in Health Care"],
    ["Ginecología y Obstetricia", "Psiquiatría", "Medicina Familiar II", "Relevancia Práctica Materno/Peri", "Profesionalismo Médico II", "Innovation Leadership in Health C"],
    ["Pediatría", "Medicina Legal", "Cuidados Paliativos", "Relevancia Práctica Niño y Adoles", "Bioética Clínica II"],
    ["Internado Básico", "Escuela de Internos I"],
    ["Internado Flexible", "Escuela de Internos II"],
    ["Internado Flexible Coterminal", "Escuela de Internos III"]
];

const prerequisites = {
    "Sistemas Orgánicos Integrados II": "Sistemas Orgánicos Integrados I",
    "Sistemas Orgánicos Integrados III": "Sistemas Orgánicos Integrados II",
    "Práctica Médica en Comunidad II": "Práctica Médica en Comunidad I",
    "Práctica Médica en Comunidad III": "Práctica Médica en Comunidad II",
    "Relevancia Práctica en Individuos II": "Relevancia Práctica en Individuos",
    "Relevancia Práctica en Individuos III": "Relevancia Práctica en Individuos II",
    "Vocación y Sentido Médico II": "Vocación y Sentido Médico I",
    "Humanidades Médicas I": "Vocación y Sentido Médico I",
    "Electiva II": "Electiva I",
    "Electiva III": "Electiva II",
    "Relevancia Práctica Fisiopatología II": "Relevancia Práctica Fisiopatología I",
    "Medicina Familiar II": "Medicina Familiar I",
};

let completed = new Set();

function createSemesterElement(semester, index) {
    const div = document.createElement("div");
    div.className = "semester" + (index === 0 ? "" : " locked");
    div.id = "sem" + index;
    const title = document.createElement("h2");
    title.textContent = "Semestre " + (index + 1);
    div.appendChild(title);
    semester.forEach(subject => {
        const subj = document.createElement("div");
        subj.className = "subject";
        subj.textContent = subject;
        subj.addEventListener("click", () => handleSubjectClick(subj, subject, index));
        div.appendChild(subj);
    });
    return div;
}

function handleSubjectClick(element, subject, semesterIndex) {
    const prereq = prerequisites[subject];
    if (prereq && !completed.has(prereq)) {
        alert("Primero debes completar: " + prereq);
        return;
    }
    if (completed.has(subject)) {
        completed.delete(subject);
        element.classList.remove("completed");
    } else {
        completed.add(subject);
        element.classList.add("completed");
        checkUnlockNextSemester(semesterIndex);
    }
}

function checkUnlockNextSemester(index) {
    const currentSemester = document.getElementById("sem" + index);
    const subjects = currentSemester.querySelectorAll(".subject");
    const allCompleted = Array.from(subjects).every(sub => completed.has(sub.textContent));
    if (allCompleted) {
        const next = document.getElementById("sem" + (index + 1));
        if (next) next.classList.remove("locked");
    }
}

window.onload = function () {
    const container = document.getElementById("carousel");
    semesters.forEach((sem, i) => container.appendChild(createSemesterElement(sem, i)));
};

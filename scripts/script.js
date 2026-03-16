const loadLesson = () =>{
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(Response => Response.json())
    .then(json => displayLesson(json.data));
}

const btnRemoveClass = () => {
    const lessonBtn = document.querySelectorAll('.lesson-btn');
    lessonBtn.forEach(btn => btn.classList.remove('active'))
}

const loadWords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then(res => res.json())
    .then(words => {
        btnRemoveClass(); //active class removing function
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add('active');
        
        showWords(words.data)
    })
}



                    // getting words dynamically
const showWords = (words) => {
    const wordContainer = document.getElementById('words-container');
    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
        <div class= "flex flex-col items-center bg-gray-200 w-11/12 py-10 text-center rounded-3xl col-span-full ">
            <img class="w-24 mb-4" src="assets/alert-error.png" alt="">

            <p class="bangla-font text-gray-500 mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>

            <h2 class="text-4xl font-medium">নেক্সট Lesson এ যান</h2>
        </div>
        `
    }







    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div class="text-center bg-white p-6 sm:p-14 rounded-xl">
                <div class="space-y-6 sm:mb-14">
                    <h3 class="font-bold text-3xl">${word.word}</h3>
                    <p class="font-medium text-xl">Meaning/Pronounciation</p>
                    <p class="bangla-font font-semibold text-3xl text-gray-700">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation}"</p>
                </div>

                <div class="flex justify-between">
                    <button class="btn bg-[#1A91FF20]" onclick="modalDetails(${word.id})"><i class="fa-solid fa-circle-info"></i></button>

                    <button class="bg-[#1A91FF20] p-2 rounded-sm"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        wordContainer.appendChild(wordDiv)
    })
}

                    // modal dynamic details function
    
    function modalDetails(id){
        const modalUrl = `https://openapi.programming-hero.com/api/word/${id}`

        fetch(modalUrl)
        .then(res => res.json())
        .then(modalData => showModalDetails(modalData.data))
    }


    const showModalDetails = (wordDetails) => {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
                <h3 class="text-4xl font-semibold mb-8">${wordDetails.word} (${wordDetails.pronunciation})</h3>
                <p class="font-semibold text-2xl">Meaning :</p>
                <p class="bangla-font text-2xl mb-8">${wordDetails.meaning}</p>
                <p class="font-semibold text-2xl">Example :</p>
                <p class="text-xl mb-8">${wordDetails.sentence}</p>
                <p class="font-medium text-2xl">সমার্থক শব্দ গুলো :</p>
            
                <div class="flex gap-2">
                    <p class="p-2 rounded-sm bg-[#1A91FF20]">Enthusiastic</p>
                    <p class="p-2 rounded-sm bg-[#1A91FF20]">excited</p>
                    <p class="p-2 rounded-sm bg-[#1A91FF20]">keen</p>
                </div>
        `;
        document.getElementById('word_modal').showModal();
    }

                // getting lesson buttons
const displayLesson = (lessons) => {

    const lessonsContainer = document.getElementById('lessons-container');
    lessonsContainer.innerHTML = "";

    lessons.forEach(lesson => {

        
        const lessonDiv = document.createElement('div');
        lessonDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick = "loadWords(${lesson.level_no})"class="btn btn-outline btn-primary p-2 md:p-4 lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        lessonsContainer.appendChild(lessonDiv);
    })
}

loadLesson()

const abc=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
"P","Q","R","S","T","U","V","W","X","Y","Z"
]
const hiden_words=["hola","fernet","hockey","html","perro","quilmes","tiffer","chocolate","mister","palmera","josemachan","mister","sillon","react","franco","animal","sol","neuquen","alcohol","drogas","cleto"]
const btn_next=document.querySelector(".btn_next")
const btn_start=document.querySelector(".btn_start")
const word_hiden_container=document.querySelector(".word_hiden_container")
const options_container=document.querySelector(".options_container")

btn_start.addEventListener("click",()=>{
    options_container.classList.remove("hide")
    word_hiden_container.classList.remove("hide")
    btn_start.classList.add("hide")
    get_word_hiden()
})

btn_next.addEventListener("click",()=>{
    options_container.innerHTML=""
    word_hiden_container.innerHTML=""
    btn_next.classList.add("hide")
    get_word_hiden()
})

function get_options(word_hiden){
    console.log(word_hiden)
    let options=[]
    for (let i = 0; i < word_hiden.length; i++){
        options.push(word_hiden[i])
    }
    console.log(options)
    shuffle_options=options.sort(()=> Math.random() - 0.5);
    console.log(shuffle_options)
    render_options(shuffle_options,word_hiden)
}
function get_hiden_iputs(word){
    let options=[]
    for (let i = 0; i < word.length; i++){
        options.push(word[i])
    }
    render_hiden_inputs(options)
}

function render_options(options,word_hiden){
    options.forEach(option=>{
        const element=document.createElement("button")
        element.className="option"
        element.id=`option ${option}`
        element.innerText=`${option}`
        options_container.appendChild(element)
        element.addEventListener("click",(e)=>{
            e.target.classList.add("invisible")
            const option_selected=e.target.innerText
            check_result(option_selected,word_hiden)
        })
    })
}

function render_hiden_inputs(options){
    options.forEach(option=>{
        const element=document.createElement("div")
        element.className="input_word_hiden"
        element.id=`hiden input ${option}`
        word_hiden_container.appendChild(element)
        element.addEventListener("click",(e)=>{
            reset_option(e.target.innerText)
            e.target.innerText=""
        })
    })
}

function check_result(letter,word_hiden){
    const inputs_word_hiden=document.querySelectorAll(".input_word_hiden")
    let aux=letter
    inputs_word_hiden.forEach(input=>{
        if(input.textContent==""){
            input.textContent=`${aux}`
            aux=""
        }
    })
    const validation=[...inputs_word_hiden].every(input=>input.textContent!="")
    const word_made=get_word_made(inputs_word_hiden)
    if(validation){check_win(word_hiden,word_made)}
}

function reset_option(letter){
    const restored_option=document.getElementById(`option ${letter}`)
    restored_option.classList.remove("invisible")
}

function get_word_made(inputs){
    let word=""
    inputs.forEach(input=>{
        const aux=input.textContent
        word=word+aux
    })
    return word
}

function check_win(word_hiden,word_made){
    const inputs=document.querySelectorAll(".input_word_hiden")
    inputs.forEach(input=>{
        input.classList.add(word_hiden==word_made?"correct":"incorrect")
    })
    btn_next.classList.remove("hide")
}

function get_word_hiden(){
    const index= Math.floor(Math.random()*hiden_words.length)
    const word_hidden=hiden_words[index]
    hiden_words.splice(index,1)
    console.log(hiden_words)
    get_hiden_iputs(word_hidden)
    get_options(word_hidden)
}
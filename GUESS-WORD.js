const abc=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
"P","Q","R","S","T","U","V","W","X","Y","Z"
]
const hiden_words=["hola","fernet","hockey","html","perro","quilmes","tiffer","chocolate","mister","palmera","josemachan","mister","sillon","react","franco","animal","sol","neuquen","alcohol","drogas","cleto","politica","bresh","lamina","tele","gato","conejo","esfera","noticia","guerra","explosion","jarron","francia","torre","nube","neblina","kyojuro","espada","ninja","auto","nave","astronauta","planeta","marte","luna","armas","militares","dictador","soldado","paz","amor","sexo","control","almohada","rueda","comida","cinturon","presidente","susto","flor","arbol","planta","agua","fuego","tierra","viento","sonido","rayo","bestia","insecto","serpiente","nieve","hielo","frio","calor","calido","lluvia","nevada","esquiar","montaña","cielo","estrella","rojo","adivina","luz","foco","electricidad","termo","fluidos","faraday-lenz","mimbre","magnetismo","inducir","conducir","abrir","cerrar","puerta","llave","cerradura","hogar","herida","bombero","valentia","gordo","negro","programar","ironman","thor","ant-man","spider-man","batman","javascript","cookies","mate","hojas","abrigo","medias","lentes","camisa","gorra","empleo","jefe","anciano","pelado","silla","lampara","fuerza","maraton","hashira","rasengan","parlante","demencia","argentina"]
const btn_next=document.querySelector(".btn_next")
const btn_start=document.querySelector(".btn_start")
const word_hiden_container=document.querySelector(".word_hiden_container")
const options_container=document.querySelector(".options_container")
const container_indice=document.querySelector(".container_indice")
const index_element=document.querySelector(".index")

btn_start.addEventListener("click",()=>{
    options_container.classList.remove("hide")
    word_hiden_container.classList.remove("hide")
    btn_start.classList.add("hide")
    get_options()
    get_hiden_iputs()
    update_index()
})

btn_next.addEventListener("click",()=>{
    options_container.innerHTML=""
    word_hiden_container.innerHTML=""
    btn_next.classList.add("hide")
    index++ //Incrementamos el indice para pasar a la siguiente palabra
    get_options()
    get_hiden_iputs()
    update_index()
})

function get_options(){
    const word_hiden=get_word_hiden()
    let options=[]
    for (let i = 0; i < word_hiden.length; i++){
        options.push(word_hiden[i])
    }
    console.log(options)
    shuffle_options=options.sort(()=> Math.random() - 0.5);
    console.log(shuffle_options)
    render_options(shuffle_options,word_hiden)
}
function get_hiden_iputs(){
    const word=get_word_hiden()
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
            check_state(option_selected,word_hiden)
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

function check_state(letter,word_hiden){
    const inputs_word_hiden=document.querySelectorAll(".input_word_hiden")
    let aux=letter
    inputs_word_hiden.forEach(input=>{
        if(input.textContent==""){
            input.textContent=`${aux}`
            aux=""
        }
    })
    const is_word_completed=[...inputs_word_hiden].every(input=>input.textContent!="")
    if(is_word_completed){
        const word_made=get_word_made()
        check_result(word_hiden,word_made)
    }
}

function reset_option(letter){
    const restored_option=document.getElementById(`option ${letter}`)
    restored_option.classList.remove("invisible")
}

function get_word_made(){
    const inputs=document.querySelectorAll(".input_word_hiden")
    let word=""
    inputs.forEach(input=>{
        const aux=input.textContent
        word=word+aux
    })
    return word
}

function check_result(word_hiden,word_made){
    const inputs=document.querySelectorAll(".input_word_hiden")
    if(word_hiden==word_made){
        inputs.forEach(input=>{
            input.classList.add("correct")
        })
        btn_next.classList.remove("hide")
    }else{
        check_letters(word_hiden,word_made)
    }
}

function check_letters(word_hiden,word_made){
    const inputs=document.querySelectorAll(".input_word_hiden")
    const word_hiden_arr=word_to_array(word_hiden)
    const word_made_arr=word_to_array(word_made)
    word_hiden_arr.forEach((letter,i)=>{
        if(letter==word_made_arr[i]){
            inputs[i].classList.add("correct")
        }else{
            inputs[i].classList.add("incorrect")
        }
    })
    setTimeout(reset_level,2000);
}

function reset_level(){
    options_container.innerHTML=""
    word_hiden_container.innerHTML=""
    get_options()
    get_hiden_iputs()
}

function word_to_array(word){
    let word_arr=[]
    for (let i=0; i<word.length; i++) {
        word_arr.push(word[i])
    }
    return word_arr
}

let index=0
function get_word_hiden(){
    const word_hidden=hiden_words[index]
    return word_hidden
}

function update_index(){
    container_indice.classList.remove("hide")
    index_element.innerText=`Level ${index+1}`
}
function shuffle_words(){
    hiden_words.sort(()=> Math.random() - 0.5);
}
shuffle_words() //Se autoinvoca para que el array ya comience mezclado


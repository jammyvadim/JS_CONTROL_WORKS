let arr=[]
let obj = {}
let arr_str, obj_str = ''

if(!localStorage.getItem('js_control_work_01')){
    localStorage.setItem('js_control_work_01', JSON.stringify(arr))
}

arr_str = localStorage.getItem('js_control_work_01')
arr = JSON.parse(arr_str)

let input_new_pair = document.getElementById('id_input_new_pair')
input_new_pair.classList.add('input_new_pair')

const div_pairs_list = document.getElementById('id_div_pairs_list')
div_pairs_list.classList.add('div_pairs_list')

const button_add_new = document.getElementById('id_button_add_new')
button_add_new.classList.add('button_add_new')

pairs_list_update()

button_add_new.onclick = function(){
    const id_input_new_err = document.getElementById('id_input_new_err')
    id_input_new_err.classList.add('id_input_new_err')
    id_input_new_err.innerText = ''

    if(input_new_pair.value === ''){
        id_input_new_err.innerText = 'Input non-empty value'
    }else{
        arr.push({
            pair_value: input_new_pair.value
        })
    }
    arr_str = JSON.stringify(arr)
    localStorage.setItem('js_control_work_01', arr_str)
    pairs_list_update()
    input_new_pair.value = ''
}

function pairs_list_update() {
    div_pairs_list.innerHTML = ''
    for (const item of arr) {
        let is_pair_selected=false

        const p_pair = document.createElement('p')
        p_pair.classList.add('p_pair')
        p_pair.innerText=item.pair_value
        div_pairs_list.appendChild(p_pair)

        p_pair.onclick=function (){
            if (is_pair_selected===true){
                p_pair.classList.replace('p_pair_selected','p_pair')
                is_pair_selected=false
            }else{
                p_pair.classList.replace('p_pair','p_pair_selected')
                is_pair_selected=true
            }
        }

    }
}


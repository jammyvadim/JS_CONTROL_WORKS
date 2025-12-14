let arr=[]
let arr_str, obj_str = ''

if (!localStorage.getItem('js_control_work_01_input')) {
    localStorage.setItem('js_control_work_01_input', '')
}

if(!localStorage.getItem('js_control_work_01_arr')){
    localStorage.setItem('js_control_work_01_arr', JSON.stringify(arr))
}

arr_str = localStorage.getItem('js_control_work_01_arr')
arr = JSON.parse(arr_str)

let input_new_pair = document.getElementById('id_input_new_pair')
input_new_pair.classList.add('input_new_pair')

const div_pairs_list = document.getElementById('id_div_pairs_list')
div_pairs_list.classList.add('div_pairs_list')

const button_add_new = document.getElementById('id_button_add_new')
button_add_new.classList.add('button_add_new')

const button_sort_by_name = document.getElementById('id_button_sort_by_name')
button_sort_by_name.classList.add('button_sort_by_name')

const button_sort_by_value = document.getElementById('id_button_sort_by_value')
button_sort_by_value.classList.add('button_sort_by_value')

const button_delete = document.getElementById('id_button_delete')
button_delete.classList.add('button_delete')

pairs_list_update()

button_add_new.onclick = function(){
    const id_input_new_err = document.getElementById('id_input_new_err')
    let str_input, str_input_left, str_input_right = ''
    let int_len_of_input, int_index_of_equal, int_index_of_needless_equal  = 0
    id_input_new_err.classList.add('id_input_new_err')
    id_input_new_err.innerText = ''

    str_input = input_new_pair.value
    localStorage.setItem('js_control_work_01_input', str_input)

    while (str_input.includes('  ')){
        str_input = str_input.replace('  ', ' ')
    }

    str_input = str_input.replace(' =', '=')
    str_input = str_input.replace('= ', '=')

    int_len_of_input = str_input.length
    int_index_of_equal = str_input.indexOf('=')
    int_index_of_needless_equal = str_input.indexOf('=', int_index_of_equal + 1)
    str_input_left = str_input.slice(0, int_index_of_equal)
    str_input_right = str_input.slice(int_index_of_equal + 1, int_len_of_input)

    if(int_len_of_input === 0 ){
        id_input_new_err.innerText = 'error: empty string'
    }else if(int_index_of_equal === -1 ){
        id_input_new_err.innerText = 'error: string must have a symbol "="'
    }else if(int_index_of_needless_equal > int_index_of_equal ){
        id_input_new_err.innerText = 'error: string must have only one symbol "="'
    }else if (str_input_left.length === 0 ){
        id_input_new_err.innerText = 'error: string must have <name> (left side before symbol "=")'
    }else if (str_input_right.length === 0 ){
        id_input_new_err.innerText = 'error: string must have <value> (right side after symbol "=")'
    }else if (!/^[a-zA-Z0-9]+$/.test(str_input_left)){
        id_input_new_err.innerText = 'error: <name> can contain only alpha-numeric characters'
    }else if (!/^[a-zA-Z0-9]+$/.test(str_input_right)){
        id_input_new_err.innerText = 'error: <value> can contain only alpha-numeric characters'
    }else{
        arr.push({
            pair_name: str_input_left,
            pair_value: str_input_right,
            is_pair_selected: false
        })
        localStorage.setItem('js_control_work_01_input', '')
    }

    arr_str = JSON.stringify(arr)
    localStorage.setItem('js_control_work_01_arr', arr_str)
    pairs_list_update()
    input_new_pair.value = localStorage.getItem('js_control_work_01_input')
}

button_sort_by_name.onclick = function (){
    arr.sort((a, b) => a.pair_name.localeCompare(b.pair_name))
    arr_str = JSON.stringify(arr)
    localStorage.setItem('js_control_work_01_arr', arr_str)
    pairs_list_update()
}


button_sort_by_value.onclick = function (){
    arr.sort((a, b) => a.pair_value.localeCompare(b.pair_value))
    arr_str = JSON.stringify(arr)
    localStorage.setItem('js_control_work_01_arr', arr_str)
    pairs_list_update()
}

button_delete.onclick=function () {
    arr = arr.filter(item => item.is_pair_selected === false)
    arr_str = JSON.stringify(arr)
    localStorage.setItem('js_control_work_01_arr', arr_str)
    pairs_list_update()
}

function pairs_list_update() {
    div_pairs_list.innerHTML = ''
    for (const item of arr) {
        let is_pair_selected=false

        const p_pair = document.createElement('p')
        p_pair.classList.add('p_pair')
        p_pair.innerText=item.pair_name + '=' + item.pair_value
        div_pairs_list.appendChild(p_pair)

        p_pair.onclick=function (){
            if (is_pair_selected===true){
                p_pair.classList.replace('p_pair_selected','p_pair')
                is_pair_selected=false
                item.is_pair_selected=false
            }else{
                p_pair.classList.replace('p_pair','p_pair_selected')
                is_pair_selected=true
                item.is_pair_selected=true
            }
        }
    }
}
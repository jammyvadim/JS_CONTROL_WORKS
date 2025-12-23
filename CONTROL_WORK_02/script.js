const database_link = 'https://jsonplaceholder.typicode.com'
const users_db_link= database_link + '/users'
const div_users = document.getElementById('div_users')

let selected_user_id = 0
let loc_st_obj = {database_link: database_link, selected_user_id: selected_user_id}
let loc_st_str = JSON.stringify(loc_st_obj)

fetch(users_db_link)
    .then(response=> response.json())
    .then(json=> {
        const users = json

        for (const user of users) {

            const div_user_block = document.createElement('div')
            div_user_block.classList.add('div_user')
            div_users.appendChild(div_user_block)

            const p_user_main_info = document.createElement('p')
            p_user_main_info.classList.add('p_user_main_info')
            p_user_main_info.innerText = user.id + '. ' + user.name

            const b_user_details = document.createElement('button')
            b_user_details.classList.add('b_user_details')
            b_user_details.innerText = 'Go to ' + user.name + ' page'
            div_user_block.append(p_user_main_info, b_user_details)

            b_user_details.onclick = function (){
                loc_st_obj.selected_user_id = user.id
                loc_st_str = JSON.stringify(loc_st_obj)
                localStorage.setItem('js_control_work_02', loc_st_str)
                window.open('user_details/user-details.html')
            }
        }

    })
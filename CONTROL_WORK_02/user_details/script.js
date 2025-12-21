
const loc_st_str = localStorage.getItem('js_control_work_02')
const loc_st_obj = JSON.parse(loc_st_str)

const selected_user_db_link = loc_st_obj.database_link + '/' + loc_st_obj.selected_user_id

const div_fields = document.getElementById('div_fields')

fetch(selected_user_db_link)
    .then(response=> response.json())
    .then(json=> {
        const selected_user = json

        const h3_selected_user_name = document.getElementById('h3_selected_user_name')
        h3_selected_user_name.innerText = selected_user.name

        function iter_obj (obj, gap) {
            for (const key in obj) {

                const key_name = gap + key + ':'

                const p_field_name = document.createElement('p')
                p_field_name.classList.add('p_field_name')
                p_field_name.innerText = key_name

                const p_field_value = document.createElement('p')
                p_field_value.classList.add('p_field_value')

                if (typeof(obj[key])==="object"){
                    p_field_value.innerText = ''
                    div_fields.append(p_field_name, p_field_value)

                    iter_obj (obj[key], ' '.repeat(key_name.length) + '- ')
                }else{
                    p_field_value.innerText = obj[key]
                    div_fields.append(p_field_name, p_field_value)
                }
            }
        }

        iter_obj(selected_user, '')

    })

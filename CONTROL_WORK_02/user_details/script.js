
let loc_st_str = localStorage.getItem('js_control_work_02')
let loc_st_obj = JSON.parse(loc_st_str)

const selected_user_db_link = loc_st_obj.database_link + '/users/' + loc_st_obj.selected_user_id

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

const button_user_posts = document.getElementById('button_user_posts')
let is_posts_showed = false

button_user_posts.onclick = function () {

    const div_posts = document.getElementById('div_posts')
    div_posts.innerHTML=''

    if (is_posts_showed === true){
        is_posts_showed = false
        button_user_posts.innerText = 'show posts of current user'
    }else{
        is_posts_showed = true
        button_user_posts.innerText = 'hide posts'

        const selected_user_db_posts_link = selected_user_db_link  + '/posts'

        fetch(selected_user_db_posts_link)
            .then(response=> response.json())
            .then(json=> {

                const posts = json

                for (const post of posts) {

                    const div_post_block = document.createElement('div')
                    div_post_block.classList.add('div_post')
                    div_posts.appendChild(div_post_block)

                    const p_post_main_info = document.createElement('p')
                    p_post_main_info.classList.add('p_post_main_info')
                    p_post_main_info.innerText = post.id + '. ' + post.title + '... '

                    const a_post_details = document.createElement('a')
                    a_post_details.classList.add('a_post_details')
                    a_post_details.innerText = 'show full post ' + post.id
                    a_post_details.href = 'post_details/index.html'
                    div_post_block.append(p_post_main_info, a_post_details)

                    a_post_details.onclick = function (){
                        loc_st_obj.selected_post_id = post.id
                        loc_st_str = JSON.stringify(loc_st_obj)
                        localStorage.setItem('js_control_work_02', loc_st_str)
                    }
                }
            })
    }
}



let loc_st_str = localStorage.getItem('js_control_work_02')
let loc_st_obj = JSON.parse(loc_st_str)

const selected_post_db_link = loc_st_obj.database_link + '/posts/' + loc_st_obj.selected_post_id

const div_fields = document.getElementById('div_fields')

fetch(selected_post_db_link)
    .then(response=> response.json())
    .then(json=> {

        const selected_post = json

        const h3_selected_post_title = document.getElementById('h3_selected_post_title')
        h3_selected_post_title.innerText = selected_post.title

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

        iter_obj(selected_post, '')

    })

    const div_comments = document.getElementById('div_comments')

        const selected_post_db_comments_link = selected_post_db_link  + '/comments'

        fetch(selected_post_db_comments_link)
            .then(response=> response.json())
            .then(json=> {

                const comments = json

                for (const comment of comments) {

                    const div_comment_block = document.createElement('div')
                    div_comment_block.classList.add('div_comment')
                    div_comments.appendChild(div_comment_block)

                    const p_comment_main_info = document.createElement('p')
                    p_comment_main_info.classList.add('p_comment_main_info')
                    p_comment_main_info.innerText = comment.id + '. ' + comment.name
                    div_comment_block.appendChild(p_comment_main_info)

                }
            })


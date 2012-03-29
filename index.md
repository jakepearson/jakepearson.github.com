---
layout: page
title: char* from Broomfield
---
{% include JB/setup %}

<div class="post">
  {% for post in site.categories.blog limit:5 %}
    <h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a> written on {{ post.date | date_to_string }}</h2>
    {{ post.content }}    
    <hr />
  {% endfor %}
</div>

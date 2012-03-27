---
layout: page
title: Home
---
{% include JB/setup %}

<div class="post">
  {% for post in site.categories.blog limit:5 %}
    <h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></h2>
    <b>{{ post.date | date_to_string }}</b><br />
    {{ post.content }}    
    <hr />
  {% endfor %}
</div>

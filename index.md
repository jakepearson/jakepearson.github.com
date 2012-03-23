---
layout: page
title: Hot Talk
tagline: from Jake
---
{% include JB/setup %}

<div class="post">
  {% for post in site.posts limit:5 %}
    <h2><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a> written on {{ post.date | date_to_string }}</h2>
    {{ post.content }}    
    <hr />
  {% endfor %}
</div>

---
layout: default
title: Recipes
group: navigation
---

<div class="post">
 <ul>
    {% assign sorted_recipes = site.recipes | sort:"title" %}
  {% for post in sorted_recipes %}
   <li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
   </ul>
</div>

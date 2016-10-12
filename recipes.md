---
layout: page
title: Recipes
group: navigation
---


<div class="post">
	<ul>
		{% for post in site.categories.recipes %}
			<li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		{% endfor %}
  	</ul>
</div>

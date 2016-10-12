---
layout: default
title: Recipes
group: navigation
---

<div class="post">
	<ul>
		{% for post in site.recipes %}
			<li><a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
		{% endfor %}
  	</ul>
</div>

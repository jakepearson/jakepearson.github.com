---
layout: page
title: Home
---
{% include JB/setup %}

<div class="post">
  {% for post in site.categories.blog limit:5 %}
	<div class="span8">
		<h2>{{ post.title }}</h2>
	    {{ post.content }}
	    <h4>Published</h4>
			<div class="date">
				<span>{{ post.date | date_to_long_string }}</span>
			</div>
	    <hr>
	</div>
  {% endfor %}
</div>

---
layout: article_1.njk
title: Blog Homepage
---

## Blog Posts

<p><a href="/feed.xml">Subscribe to my RSS feed</a></p>

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> - <time>{{ post.date }}</time>
  </li>
{% endfor %}
</ul>

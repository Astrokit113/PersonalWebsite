---
layout: myTemplate.njk
title: My Blog
---

## Blog Posts

<p><a href="/feed.xml">Subscribe to my RSS feed</a></p>

<ul>
{% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a> - <time>{{ post.date | readableDate }}</time>
  </li>
{% endfor %}
</ul>
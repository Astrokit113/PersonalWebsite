---
layout: article_1.njk
title: Blog Homepage
---

## Blog Posts

<p><a href="/feed.xml">Subscribe to my RSS feed</a></p>

<ul class="post-list">
{% for post in collections.postsReversed %}
  <li>
    <a href="{{ post.url }}" class="post-title">{{ post.data.title }}</a>
    <time class="post-date">{{ post.date }}</time>
  </li>
{% endfor %}
</ul>

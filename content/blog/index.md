---
layout: article_1.njk
title: Blog Homepage
noComments: true
---

## Blog Posts

<p>
  <a href="/rss.xml">Subscribe to all posts RSS</a> | 
  <a href="/rss-ttrpg.xml">Subscribe to TTRPG RSS</a>
</p>

<ul class="post-list">
{% for post in collections.postsReversed %}
  <li>
    <a href="{{ post.url }}" class="post-title">{{ post.data.title }}</a>
    <time class="post-date">{{ post.date }}</time>
    {% if post.data.description %}
      <div class="post-description">{{ post.data.description }}</div>
    {% endif %}
  </li>
{% endfor %}
</ul>

<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title" /> Feed
        </title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html {
            scroll-behavior: smooth;
          }
          body {
            font-family: 'Atkinson Hyperlegible', Verdana, Tahoma, sans-serif;
            background: #470a0a;
            color: #ffffff;
            line-height: 1.6;
            background-attachment: fixed;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #b21c0e;
            padding-bottom: 20px;
          }
          .header h1 {
            font-family: 'Nunito', Verdana, Tahoma, sans-serif;
            color: #DA587E;
            font-size: 2.5em;
            margin-bottom: 10px;
          }
          .header p {
            color: #FFE1C6;
            margin-bottom: 15px;
          }
          .subscribe-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 15px;
          }
          .btn {
            background: #b21c0e;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            transition: all 0.3s;
            font-weight: bold;
            border: 2px solid #DA587E;
          }
          .btn:hover {
            background: #FFE1C6;
            color: #DA587E;
          }
          .posts {
            list-style: none;
          }
          .post-item {
            background: #470a0a;
            border-left: 4px solid #DA587E;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 5px;
            border: 1px solid #b21c0e;
          }
          .post-title {
            color: #DA587E;
            font-family: 'Nunito', Verdana, Tahoma, sans-serif;
            font-size: 1.5em;
            margin-bottom: 8px;
          }
          .post-title a {
            color: #DA587E;
            text-decoration: none;
            transition: color 0.3s;
          }
          .post-title a:hover {
            color: #FFE1C6;
          }
          .post-date {
            color: #FFE1C6;
            font-size: 0.9em;
            display: block;
            margin-bottom: 12px;
          }
          .post-description {
            color: #ffffff;
            margin-bottom: 12px;
          }
          .read-more {
            display: inline-block;
            color: #FFE1C6;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
          }
          .read-more:hover {
            color: #DA587E;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 3px solid #b21c0e;
            color: #FFE1C6;
            font-size: 0.9em;
          }
          .info-box {
            background: #b21c0e;
            border-left: 4px solid #DA587E;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .info-box p {
            color: #FFE1C6;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>
              <xsl:value-of select="/rss/channel/title" />
            </h1>
            <p>
              <xsl:value-of select="/rss/channel/description" />
            </p>
            <div class="subscribe-buttons">
              <a class="btn" href="{/rss/channel/link}">Visit Blog</a>
              <a class="btn" href="{/rss/atom:link/@href}">Subscribe (RSS)</a>
            </div>
          </div>

          <div class="info-box">
            <p>📬 This is an RSS feed. Subscribe using your favorite RSS reader to get updates automatically!</p>
          </div>

          <ul class="posts">
            <xsl:for-each select="/rss/channel/item">
              <li class="post-item">
                <div class="post-title">
                  <a href="{link}">
                    <xsl:value-of select="title" />
                  </a>
                </div>
                <span class="post-date">
                  <xsl:value-of select="pubDate" />
                </span>
                <p class="post-description">
                  <xsl:value-of select="description" />
                </p>
                <a href="{link}" class="read-more">Read full post →</a>
              </li>
            </xsl:for-each>
          </ul>

          <div class="footer">
            <p>Generated on <xsl:value-of select="/rss/channel/lastBuildDate" /></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

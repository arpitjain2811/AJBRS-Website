---
layout: page
title: Debug Stats
---

<h1>Debug Information</h1>

<p>Site data stats:</p>
<ul>
  <li>Recipients count: {{ site.data.stats.recipients_count }}</li>
  <li>Publications count: {{ site.data.stats.publications_count }}</li>
  <li>Scholarships granted: {{ site.data.stats.scholarships_granted }}</li>
  <li>Scholarships formatted: {{ site.data.stats.scholarships_granted_formatted }}</li>
</ul>

<p>Raw site data:</p>
<pre>{{ site.data | jsonify }}</pre>
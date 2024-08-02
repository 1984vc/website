---
title: Getting Started
weight: 1
next: /docs/founders-handbook/cap-table
prev: /docs
---

## Quick Start from Template

{{< icon "github" >}}&nbsp;[imfing/hextra-starter-template](https://github.com/imfing/hextra-starter-template)

You could quickly get started by using the above template repository.

<img src="https://docs.github.com/assets/cb-77734/mw-1440/images/help/repository/use-this-template-button.webp" width="500">

We have provided a [GitHub Actions workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow) which can help automatically build and deploy your site to GitHub Pages, and host it for free.
For more options, check out [Deploy Site](../guide/deploy-site).

[🌐 Demo ↗](https://imfing.github.io/hextra-starter-template/)

# Cap Table Premiere


Let’s start with a simple example. Two founders start a company splitting the cap table 50/50. A new investor wants to invest $2m at a $10m valuation for 20% of the company. The new investor will result in a cap table that’s 20/40/40

| Stakeholder | Ownership Before Investment |
| --- | --- |
| Founder A | 20% |
| Founder B | 40% |
| New Investor | 40% |

Now imagine a new employee joins and the founders want to reward them with 5% ownership. That 5% would, in this example, dilute everyone equally, resulting in a 19/38/38/5 ownership. However, because investors don’t want to be diluted with every new employee joining, investors ask for an option pool, say 10%, that’s reserved as part of the round. So as a result the round will end up being 20/35/35/10 reserved option pool. And when new employees join, their shares come out of the option pool without diluting the investors resulting in a 20/35/35/5/5 remaining option pool.

[Now, if the company is acquired before the issuance of the next option pool, the unissued option pool is effectively wiped off and everyone ownership goes up a little]

[a shareholders ownership after a round equals their ownership before the round multiplied by the dilution from the round. So a founder who owns 40% and raised a round with 20% effective dilution ends up at 36% ownership]
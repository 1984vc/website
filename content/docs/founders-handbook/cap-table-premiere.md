---
title: Cap Table Premiere
weight: 1
next: /docs/founders-handbook/intro-to-safes
---

To most founders, cap table math can be bewildering. It's unintuitive, highly recursive, and has little parallel in traditional finance training. Fortunately, it's easy to learn. And founders who master their cap tables gain an unfair advantage in negotiations. Our goal from this guide is to equip founders with the tools and knowledge to master their cap table and outperform their counterparts in any financing negotiation. 

The cap table has exactly 100 points—no more, no less. When new shares are granted to employees or investors, the resulting ownership must come from elsewhere in the cap table. That’s why while first time founders focus on *valuation*, more experienced founders care about o*wnership.*To bring this point home, most of the examples in this guide use percentage points to help founders understand the tradeoffs. 

## Raising your seed round

Let's start with a simple example. Two founders start a company, granting themselves 1M shares each and splitting the cap table 50/50. Following, A VC invests would like to buy 20% of the company.  The founders and investors agree on a $2 million investment at a valuation of $8M pre-money, $10M post-money.

{{< callout emoji="📢">}}
**Pre-money** and **Post-money** describe the valuation of a company at two different points in time: **before** and **after** the financing round**.**  A company valued at X before the investment and receiving Y in investment will have a pre-money valuation of X and a post money valuation of (X + Y).

{{< /callout >}}

Now for this example let’s assume a priced round which is more straightforward to model than a SAFE. The mechanics for issuing a priced round works as follows:

1. First, we calculate the Pre-money capitalization, which is the number of shares in the business before the round takes place.  In this case it’s the 2M shares held by the founders.
2. Next, we calculate the Price Per Share, which is equal to the pre-money valuation (what the company is worth before the investment) divided by Pre-money Capitalization. In this case the PPS will be 8,000,000 (pre money) / 2,000,000 (shares)= $4 
3. Last we calculate the number of new shares being issued to the investor based on their purchase price.  In this case the investor is investing $2M into the company at a price per share of $4 resulting in 2M/4 = 500,000 new shares. 

<aside>
📢 The Price Per Share (**PPS**) in a round can be calculated as the pre-money valuation divided by number of shares (often called Company Capitalization).

</aside>

This investment will result in the following a cap table.

|  | Starting ownership (shares) | Starting ownership (%) | New Shares | Ownership after Investment (shares) | Ownership after Investment (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 50%  |  | 1,000,000 | 40%  |
| Founder B | 1,000,000 | 50% |  | 1,000,000 | 40%  |
| Seed Investor |  |  | 500,000 | 500,000 | 20%  |
|  | 2,000,000 | 100% |  | 2,500,000 | 100% |

Now the post-money valuation is simply the pre-money plus the investment amount = $2M + $8M = $10M.  A more accurate post-money definition is the final number of shares, called fully diluted shares or FDS, multiplied by the PPS, which in this case comes out 2.5M shares * $4 = $10M.  

The new investment *dilutes* the existing ownership for each founder from by 20% from 50% starting ownership to 40% after. 

{{< callout emoji="📢">}}
In cap table lexicon, **Dilution** is the percentage reduction in ownership from a round. It is calculated as the number of new shares being issued from the transaction divided by the fully diluted shares after the transaction. So, in this case, 500,000/2,500,000=20%,  A founder who starts at 50% will experiences a 20% dilution will end up with 50% * 0.8  = 40%.
{{< /callout >}}


Now depending on whether the round was a SAFE or a priced round the shares will be issued immediately or promised in the future, but the effect is largely the same [with a few difference](SAFE%20vs%20Priced%20Round%203c5a0edb257449558cf968f5ded58812.md)s that we will discuss in the next chapter. 

## Option Pool

To understand why option pools exist, it is helpful to first show what happens *without* an option pool. After the investment, the founders identify their first engineer and decide to offer them 5% ownership. Assuming there’s no pool, the company asks the board to issue 131,578 new shares to the employee or 5% of the total shares. Once granted, the new shares would dilute everyone's ownership equally.

|  | Ownership after Investment (shares) | Ownership after Investment (%) | New employee shares | Ownership after employee joins (shares) | Ownership after employee joins (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 40%  |  | 1,000,000 | 38.00% |
| Founder B | 1,000,000 | 40%  |  | 1,000,000 | 38.00% |
| Seed Investor | 500,000 | 20%  |  | 500,000 | 19.00% |
| Employee |  |  | 131,578 | 131,578 | 5.00% |
|  | 2,500,000 | 100% |  | 2,631,578 | 100% |

Now the investors' ownership has been diluted from 20% to 19%. However, investors do not expect to be diluted with each new employee hire. To address this, investors in a priced round typically request a reserved option pool—often around 10%—as part of the round. When new employees join, their shares are allocated from this option pool, avoiding further dilution of the investors' stake (and avoiding the hassle of issuing new set of shares). So assuming the investors demand an option pool in the round, the ownership structure becomes 20% for the investor, 10% for the reserved option pool, and 35% for each founder. 

|  | Starting ownership (shares) | Starting ownership (%) | New Shares | Ownership after Seed Investment (shares) | Ownership after Seed Investment (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 50% |  | 1,000,000 | 35% |
| Founder B | 1,000,000 | 50% |  | 1,000,000 | 35% |
| Seed Investor |  |  | 571,428 | 571,426 | 20% |
| Option Pool |  |  | 285,714 | 285,714 | 10% |
| Employee |  |  |  |  |  |
|  |  | 100% |  | 2,857,142 | 100% |

[*Link to Cap Table*](https://1984vc.github.io/startup-finance/safe-conversion#AAN4IgTg9g7gIghgFziAXAbVASwCapABhABoQEBPABwFM8BjCAWwYgDtiQW4GaUQAxCAFcW2KmAAEAQXYBnABZwwVGagCM.DZpLQWY.ZgoAFWglQBWfCWyYANoIRVsx0ygDMZgHSb877.5JwNjbQMFQ2VA6oCGCCVAC.RFi4vKrs5NR0jMxsJJzceALCohIAQrIKSioo6t6WIDp6cgbO5nXWdg5OJqjuXpq._WYBQSFhETzRsQlJeABMaZQ8IPRMrOx5SwCSMjKx2OIA8hQImKwqJPKKyqh1DWD6Rt0obbb2ji3Pw8GwY5Eok_FEiAcHgABwLDK8GRiTDXXJcJYAZSojnEmxYADdlAgIGB2JhMdjuCwXLNanVLpVzAB2VQAFlmADZtFBdPcmo8XKoAJwebn87mzAX81xfUbhP4AM0C0LiAF0SBQlABZVhUMioUHkkhIMAAcwiRxOZ0MEAgNjUdWEgmh2CNpxYVTqChkADkqFAAEpCERRGLxIA=)

Following, in order to grant 5% to the new employee, these shares are moved from the option pool to the employee as opposed to getting issued.  The other shareholder’s ownership would thus remain at 20%.

|  | Ownership after Seed Investment (shares) | Ownership after Seed Investment (%) | Employee Grant  | Ownership after employee grant (shares) | Ownership after employee grant (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 35% |  | 1,000,000 | 35% |
| Founder B | 1,000,000 | 35% |  | 1,000,000 | 35% |
| Seed Investor | 571,428 | 20% |  | 571,428 | 20% |
| Option Pool | 285,714 | 10% | (142,857) | 142,857 | 5% |
| Employee |  |  | 142,857 | 142,857 | 5% |
|  | 2,857,142 | 100% |  | 2,857,142 | 100% |

{{< callout emoji="📢">}}
Founders often mistakenly assume that the new employee shares are granted at the time of the offer letter. But they’re actually not granted until much later because these shares require board approval, which typically occurs during the first board meeting after the employee joins the company. This delay can impact the price of the shares or options being granted.
{{< /callout >}}


Note that if the company is acquired before exhausting all unissued options, these options are effectively wiped off and everyone’s ownership increases by 5%

Until the mid-2000s, priced rounds like the example above were the primary way founders raised capital. Then came convertible notes, and then came SAFEs.

[Suggested Reading: Introduction to SAFEs](Introduction%20to%20SAFEs%20f6e49d655a4b43a39b10c934addc1aa6.md)

***The Usual Disclaimer***

*The information in this User Guide is provided solely for general educational purposes and is not intended as legal advice. This User Guide should not replace competent legal counsel from a licensed attorney in your state.*

*1984 and its affiliates expressly disclaim all responsibility for any consequences resulting from the use of this User Guide, any version of the Cap Table Worksheet, or any other document found on 1984's website.*

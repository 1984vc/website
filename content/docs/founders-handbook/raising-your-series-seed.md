---
title: Raising Your Series Seed
weight: 1
next: /docs/founders-handbook/raising-your-a
prev: /docs/founders-handbook
---

To most founders, cap table math can be bewildering. It's unintuitive at first and has no parallel in traditional finance training. However, founders who master their cap tables gain an unfair advantage in negotiations. Fortunately, it's easy to learn. Our goal from this guide is to equip founders with the tools and knowledge to master their cap table and outperform their counterparts in any financing negotiation.

While most new founders focus on valuation, experienced founders understand that ownership percentage is what matters. The cap table has exactly 100 points—no more, no less. When new shares are granted to employees or investors, it must come from elsewhere in the cap table. To bring this point home, most of the examples in this guide use percentage points to help founders understand the tradeoffs.

## Raising your seed round

Let's start with a simple example. Two founders start a company, granting themselves 1M shares each and splitting the cap table 50/50. Following, A VC invests $2 million at a $10 million post-money valuation for 20% of the company. This investment will result in a cap table that's  40/40/20.  The new investment *dilutes* the existing ownership by 20%.  

|  | Starting ownership (shares) | Starting ownership (%) | New Shares | Ownership after Investment (shares) | Ownership after Investment (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 50%  |  | 1,000,000 | 40%  |
| Founder B | 1,000,000 | 50% |  | 1,000,000 | 40%  |
| Seed Investor |  |  | 500,000 | 500,000 | 20%  |
|  | 2,000,000 | 100% |  | 2,500,000 | 100% |

{{< callout emoji="📢" type="info">}}
In cap table lexicon, **Dilution** is the percentage reduction in ownership from a round. It is calculated as the number of new shares being issued from the transaction divided by the fully diluted shares after the transaction. So, in this case, 500,000/2,500,000=20%,  A founder who starts at 50% will experiences a 20% dilution will end up with 50% * 0.8 (which is 1 - 20%)  = 40%.
{{< /callout >}}

Now, depending on whether the round was a SAFE or a priced round the shares might be issued immediately or promised in the future, but the effect is largely the same [with a few differences](SAFE%20vs%20Priced%20Round%203c5a0edb257449558cf968f5ded58812.md).

## Option Pool

To understand why option pools exist, it is helpful to first show an example *without* an option pool. After the investment, the founders identify their first engineer and decide to offer them 5% ownership. Assuming there’s no pool, the company will issue 131,578 new shares to the employee or 5% of the total shares. The new shares would dilute everyone's ownership equally.

|  | Ownership after Investment (shares) | Ownership after Investment (%) | New employee shares | Ownership after employee joins (shares) | Ownership after employee joins (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 40%  |  | 1,000,000 | 38.00% |
| Founder B | 1,000,000 | 40%  |  | 1,000,000 | 38.00% |
| Seed Investor | 500,000 | 20%  |  | 500,000 | 19.00% |
| Employee |  |  | 131,578 | 131,578 | 5.00% |
|  | 2,500,000 | 100% |  | 2,631,578 | 100% |

Due to the new shares, investors' ownership has been diluted from 20% to 19%. However, investors prefer not to be diluted with each new employee hire. To address this, investors in a priced round typically request a reserved option pool—often around 10%—as part of the round. When new employees join, their shares are allocated from this option pool, avoiding further dilution of the investors' stake. Consequently, the round's ownership structure becomes 20% for the investor, 10% for the reserved option pool, and 35% for each founder. 

|  | Starting ownership (shares) | Starting ownership (%) | New Shares | Ownership after Seed Investment (shares) | Ownership after Seed Investment (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 50% |  | 1,000,000 | 35% |
| Founder B | 1,000,000 | 50% |  | 1,000,000 | 35% |
| Seed Investor |  |  | 571,428 | 571,428 | 20% |
| Option Pool |  |  | 285,714 | 285,714 | 10% |
| Employee |  |  |  |  |  |
|  |  | 100% |  | 2,857,142 | 100% |

[*Link to Cap Table*](https://1984vc.github.io/startup-finance/safe-conversion#AAN4IgTg9g7gIghgFziAXAbVASwCapABhABoQEBPABwFM8BjCAWwYgDtiQW4GaUQApCAAsWAAgDCEADaTMAZ1btZguGCqzUARnzadJaCypglmCgAVaCVACYrAOgDs9gKxWAbK4AsVp_neeS2JiSAK4IVNjmligarrbu.ACcABwAzCmuGvZWGqkkcNLQMFSSVGGoCGDBVAC.RFi4vBrs5NR0jMxsJJzceKaIYJi0ANbiUjLynSBKKmqaOrog.obGZhaoHhq2SVbbrikaCfgaVh4uAUGh4ZGoKfi2TsnJafhWCa9OTnkFsMWlPBVVWr1PBWZqUHggehMBRdLgQgCSslkVWwIgA8hQEJhWOoSNNVOoUPg9FADEZBCZrkTziEwhE1tSQPlJIVfmUUACanUQDg8PYwa1eLI4AAzGiwnq8MQAJQAaiIABRiZRgEqyETSzAAN0MIllVBYCGCBIAlOxMCwdbIENxDahiZC4BRNLd5g7ArJ6ME7YyluTKQyHfjZozmaySuyRflZFRzsKAEYlbAAMUwxWwhLQAF0SPRLctsSwACrgvAUCDWkBAnkNEBJAUQmMDWYSiEAcTb8rETswSEk5vz1ttUSsbqDKpDTnsGi8rhJZJWVIOtgSq7ea9XKS.LJ.EZ4UckMeqOZAFFUAFlWFQyKgkmOSEgwABzUoYrE40wQKRzEje4Ix7A30LQkHWUWQADkqCgaUIG9BpOWqIA=)

Following, in order to grant 5% to the new employee, these shares are moved from the option pool to the employee as opposed to getting issued.  The other shareholder’s ownership would thus remain at 20%.

|  | Ownership after Seed Investment (shares) | Ownership after Seed Investment (%) | Employee Grant  | Ownership after employee grant (shares) | Ownership after employee grant (%) |
| --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 35% |  | 1,000,000 | 35% |
| Founder B | 1,000,000 | 35% |  | 1,000,000 | 35% |
| Seed Investor | 571,428 | 20% |  | 571,428 | 20% |
| Option Pool | 285,714 | 10% | (142,857) | 142,857 | 5% |
| Employee |  |  | 142,857 | 142,857 | 5% |
|  | 2,857,142 | 100% |  | 2,857,142 | 100% |

{{< callout emoji="📢" type="info">}}
Founders often mistakenly assume that the new employee shares are granted at the time of the offer letter. But  they’re actually not granted until much later because these shares require board approval, which typically occurs during the first board meeting after the employee joins the company,. This delay can impact the price of the shares or options being granted.
{{< /callout >}}


(Note that if the company is acquired before exhausting all unissued options, these options are effectively wiped off and everyone’s ownership increases by 5%)
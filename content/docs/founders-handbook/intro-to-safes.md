---
title: Introduction to SAFEs
weight: 2
prev: /docs/founders-handbook/cap-table-premiere
next: /docs/founders-handbook/pre-money-vs-post-money-conversion
---


## Brief History of Early Stage Investment

To best understand the SAFE it’s helpful to understand how it came about. Historically, startups received initial funding through the Series A equity rounds. As the venture capital industry grew and startup costs decreased in the mid-2000s, the Seed ecosystem emerged with smaller rounds and a focus on speed. Seed investors initially used Convertible Notes, which were quicker to issue than equity.  But because Convertibles are fundamentally a debt instrument, they had many drawbacks: Convertible have an expiration dates requiring repayment or renegotiation, they accrue interest, and it is very hard for founders or note holders to understand their exact ownership because a note’s conversion takes place on a [pre-money basis.](Pre-money%20vs%20Post-money%20Conversion%2023f1324e5ecc4d32af0e81e60a03cf18.md) Fundamentally, Convertibles were debt instrument with the conversion being an afterthought, while all investors cared about was the future Conversion to equity.

## Introducing SAFEs

In response, Y Combinator introduced the first SAFE (Simple Agreement for Future Equity) instrument in 2013 as a "best of both worlds" solution. A SAFE is neither debt nor equity, but rather a promise of future equity. It is a simple instrument with only two negotiated terms: the Conversion Cap and the Discount (and today only the Conversion Cap). SAFEs don't expire or accrue interest alleviating a lot of headaches for founders, and they give their holders a number of rights that more closely resemble those of a shareholder—for example, the original SAFE included pro-rata rights for investors.  Like a good product finding Product Market Fit, SAFEs became wildly successful. However, the conversion mechanics of the initial SAFE operated on a [pre-money as opposed to a post-money](Pre-money%20vs%20Post-money%20Conversion%2023f1324e5ecc4d32af0e81e60a03cf18.md) basis, so the confusion around ownership persisted.

Following, YC introduced the post-money SAFE in 2018. This new instrument had several improvements over the original 2013 version, granting investors more equity-like rights in M&A events, removing pro-rate by default, and offering a more streamlined investment payout. The most significant change, however, was the shift from pre-money conversion to post-money conversion.

A SAFE can be downloaded from [YC’s website](https://www.ycombinator.com/documents) (the current version for a "Valuation Cap, no Discount”, the most common form of SAFE, is 1.2) 

## High level terms of the SAFE

Today the vast majority of early stage investment takes place via a Post-Money SAFE instrument.  The high level terms: 

- **Promise of future equity:** Investors receive the right to future shares in the company, rather than immediate equity or debt.
- **Conversion at a Post-money valuation:** The Valuation described in the SAFE is what the investment will convert to in the next financing round (irrespective of how many other SAFEs are issued). That ownership will still get diluted by the financing round itself and by any increase to the Option Pool.
- **Automatic Conversion:** investors do not have a choice about converting in an equity financing round; a safe is intended to turn safe holders into stockholders.
- **Option Pool:** As the SAFE instrument evolved, so did the definition of what constitutes an Option Pool. In today’s SAFE (1.2),  Post-Money Valuation Cap is “post” the Options and option pool existing prior to the Equity Financing, but not “post” the new or increased option pool adopted as part of the Equity Financing (e.g. Series A).
- **No concept of a “round”:** A SAFE instrument is an agreement between an investor and the company, and doesn’t require a minimum or maximum round size to take effect. This provides founders with tremendous flexibility during fund raising: they can stack SAFEs, increase valuation over time, etc.
- **Liquidity in an M&A:**  The safe functions like standard non-participating preferred stock in an M&A (or on a dissolution) so it is junior to debt (including any outstanding notes) and on par with payments to shareholders and other SAFE holders
- **No interest or maturity date:** Unlike convertible notes, SAFEs don't accrue interest or have an expiration date.

For a more detailed review of the SAFE document, we recommend [YC’s Quick Start Guide](https://bookface-static.ycombinator.com/assets/ycdc/Website%20User%20Guide%20Feb%202023%20-%20final-28acf9a3b938e643cc270b7da514194d5c271359be25b631b025605673fa9f95.pdf)

## Mechanics of SAFE Conversion

The mechanics of converting SAFE into shares as part of a priced round are pretty similar to a traditional round: 

1. First we calculate the Pre-money capitalization for the priced round (which is all shares Issued and Outstanding + Unissued Options + Shares from converting securities including SAFEs)
2. Next we calculate the Price Per Share  for both the SAFE (based on its cap) and the priced Round. A Post-money Safe with a Cap will convert at the lower PPS of the two (i.e if the round’s pre-money is lower than the Safe Cap then the SAFE will convert at the round’s PPS) 
3. Last, we issue new shares for the SAFE holders and the price round investors. 

Straightforward. But there’s a wrinkle: to calculate the Pre-money capitalization of the round we need to know the number of shares issued from converting the SAFE.  But the number of shares issued from converting the SAFE depends on the pre-money capitalization. Herein lies our first [Recursive](https://en.wikipedia.org/wiki/Recursion) calculation for cap tables (And why we put together a [model](https://1984.vc/docs/founders-handbook/cap-table-worksheet) so you don’t have to construct circular references in Excel) .  

If you’re curious, here’s how the math works. Let’s go back to our example where an investor has invested $2M on a Post-money SAFE with a cap of $10M.  Next, founders agree with the Series A lead on an $8M investment at a $32M pre / $40M post money valuation. In theory, the new investor would buy enough new shares to own at least 20% of the cap table (2/10)

|  | Starting ownership (shares) | Starting ownership (%) | First Safe Round |
| --- | --- | --- | --- |
| Founder A | 1,000,000 | 50%  |  |
| Founder B | 1,000,000 | 50% |  |
| Seed Investor 1 |  |  | The right to buy at least 2/(8+2) = 20% of equity  |
|  | 2,000,000 | 100% |  |

The SAFE investor will own 20% of the company *before* the priced round transaction.  To calculate their shares, we need to calculate the PPS for the Safe Conversion,  the PPS for the priced round, and use the lower number.  But first we need The Company Capitalization.

Company Capitalization is equal to Capital Stock Issued and Outstanding + Unissued Options + Converting Securities from the SAFE.  And because the investor will own at least 20% of the company, we can rewrite Company Capitalization as:

Company Capitalization = Capital Stock Issued and Outstanding + Unissued Options +  (0.2 * Company Capitalization) 
Therefore

- Company Capitalization = 2,000,000 shares + 0 + (0.2 * Company Capitalization)
- Therefore Company Capitalization before the priced round  = 2,000,000 / (1-0.2) = 2,500,000
- PPS for SAFE conversion is 10,000,000 / 2,500,000 = $4
- PPS for priced round = pre money for the prices round / company capitalization = 32,000,000 / 2,500,000 = $12.8
- Shares for Seed Investor  = $2,000,000 / $4  = 500,000 shares
- Shares for Series A Investor = $8,000,000 / $12.8 = 625,000 shares

|  | Starting ownership (shares) | Starting ownership (%) | Safe Round | Shares in Priced Round | FDS Shares  | FDS % |
| --- | --- | --- | --- | --- | --- | --- |
| Founder A | 1,000,000 | 50%  |  |  | 1,000,000 | 32% |
| Founder B | 1,000,000 | 50% |  |  | 1,000,000 | 32% |
| Seed Investor  |  |  | The right to buy at least 2/(8+2) = 20% of equity  | 500,000  | 500,000  | 16% |
| Series A Investor |  |  |  | 625,000 | 625,000 | 20% |
|  | 2,000,000 | 100% |  |  | 3,125,000 |  |

[*Link to Cap Table*](https://1984.vc/docs/founders-handbook/cap-table-worksheet/#AAN4IgTg9g7gIghgFziAXAbVASwCapABhABoQEBPABwFM8BjCAWwYgDtiQW4GaUQAxCAFcW2KmAAEAQXYBnABZwwVGagCM.DZpLQWY.ZgqoMIeYuVrNWkNTC0qLBKgCs.AL5FQppSpTrL.Ehs7B1QAFjcPEwVvC39AsWDHFABmACYAOktk_AB2VI1UgE5QwtcAXRI4ABsq6BgqKqoEHgQwQSp3LFxeVXZyajpGZjYSTm48AWFRCQAhWWjzX38AkB09OQMjTwWfP0t423skl06os13lg8SwiO3z2P3rBKPUNMzNbLyC4tKKkGrarAGk0Wm0OpEcHgAJIyGTtbAAeQoCEwrBUJH6PBA9CYrHYYyxMLhVGw4iRKLR83uKBWazA.kM6DuMRpVxeNNOXkWKyC7NuZxZPOeIQ5fwBdWBzVQrXap0hvFCfUoWJkcAAZjRRlwsQBlKgk8RQlgAN2UCAgEnYmBNZu4IvycWxcEZe0e2EwMnowiStKgunpG0Zxl59pWXJ8_JDSVUTnShXjhScqmSTnjTmS2VCJHDYQThQAHOVKjUJY0pSgZVQSO7VQAjRrYPiYBrYHxoP70G301EsAAqyrwFAgMkccu6IBySoGvBkYmb6I42rwerA86khptI4tVs3CDtSXzl1WfvWmyZAsWADZUiV42yRapCnGE_mco_46.30X_iWgWWeGq1Szt.FBKAAsqwVBkK8DqPEgYAAOZNOSPYyAAChAEBVKgKzCIIs6IsiqE4a4QA) 

Et voila. The series A owns 20%. The safe investors originally owned 20% and were then diluted by the Series A’s 20% resulting in a 16% ownership. And the overall dilution to the founders are 36% (20%+16%, or 1,125,000/3,125,000)

Now of course things aren’t *that* simple.  The Series A investor will also demand that the company allocates a new option pool for new hires, which will add more recursive iterations into the calculation. We won’t go into all the Math here, but you can see the resulting [cap table here](https://1984.vc/docs/founders-handbook/cap-table-worksheet/#AAN4IgTg9g7gIghgFziAXAbVASwCapABhABoQEBPABwFM8BjCAWwYgDtiQW4GaUR4XMVADYACAKIBrdgGcAFnDBVpqAIz51GktBZUwczBVQYQchUtUbNIamFpUWCVQFYAdAGYAHABYAbCqeevv6eTgC.RKCmisooapb4JDZ2DqoqLgBMTl5ebgDsHj4AnB7p6V4eueGR8tEW8Ym6yY4oHi65uSoehU4qxT5OhW74bqEAuiRwQkLQMMJUCDwIYACuVFUgOHgq7OTUdIzMbCSc3HgAUhCyLCIAwhBTmNKsMjXmsfEJINq6.obo1WYYnFLA1bPZmm43O5ITDYbD1lE3sCrElwagyu5vH4Aljgh4Ea8gR9QU1VIUXB4Su0VJ0aSo_F4xhMpjM5gtUEtVutNrwAJLSaSrbAAeQoCEwrGUJF2PBA9CYz2OXFl_MFVGwIlF4slL0BqE.3z0sgMRgBtRQn1RKQtBL1FpJaJtERMhP1Dut.CZIEm01gbMWKzWzp5IC8O0osukcAAZjQladeL1vCIAGrg5a1EiYFgANyUCG41vSxLlcD.yKs2Ee9GWHq0UB0RpN_2sjUdxZIiJinudVuaKihhSHhT8hV63RUmVynddKC8w.KXp9rKE8wDqxIVajACNV9gAGKCITYGJocZy1h5vQSlgAFQjeAoEGkjm5uF4uXDe140l0gilHDKngt6Bqm6bRCI7DZnmL6Fs0Hgloavymi6do.GUw7uv25ILhU47FNSS4sn6q7sig0aTL.XoUIoACyrBUGQqBuMW9SkAoADm8xaje0gAAoQPcFgkLWyy_iKYq8fqoRAA#AAN4IgTg9g7gIghgFziAXAbVASwCapABhABoQEBPABwFM8BjCAWwYgDtiQW4GaUR4XMVADYACAKIBrdgGcAFnDBVpqAIz51GktBZUwczBVQYQchUtUbNIamFpUWCVQFYAdAGYAHABYAbCqeevv6eTgC.RKCmisooapb4JDZ2DqoqLgBMTl5ebgDsHj4AnB7p6V4eueGR8tEW8Ym6yY4oHi65uSoehU4qxT5OhW74bqEAuiRwQkLQMMJUCDwIYACuVFUgOHgq7OTUdIzMbCSc3HgAUhCyLCIAwhBTmNKsMjXmsfEJINq6.obo1WYYnFLA1bPZmm43O5ITDYbD1lE3sCrElwagyu5vH4Aljgh4Ea8gR9QU1VIUXB4Su0VJ0aSo_F4xhMpjM5gtUEtVutNrwAJLSaSrbAAeQoCEwrGUJF2PBA9CYz2OXFl_MFVGwIlF4slL0BqE.3z0sgMRgBtRQn1RKQtBL1FpJaJtERMhP1Dut.CZIEm01gbMWKzWzp5IC8O0osukcAAZjQladeL1vCIAGrg5a1EiYFgANyUCG41vSxLlcD.yKs2Ee9GWHq0UB0RpN_2sjUdxZIiJinudVuaKihhSHhT8hV63RUmVynddKC8w.KXp9rKE8wDqxIVajACNV9gAGKCITYGJocZy1h5vQSlgAFQjeAoEGkjm5uF4uXDe140l0gilHDKngt6Bqm6bRCI7DZnmL6Fs0Hgloavymi6do.GUw7uv25ILhU47FNSS4sn6q7sig0aTL.XoUIoACyrBUGQqBuMW9SkAoADm8xaje0gAAoQPcFgkLWyy_iKYq8fqoRAA). 

[Suggested Reading: Safe Side Letters](SAFE%20Side%20Letters%2067e9cba3dc044a8c9bb1473fe8f7f93e.md)
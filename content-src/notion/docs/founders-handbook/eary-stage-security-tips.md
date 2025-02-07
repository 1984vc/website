---
title: Essential Security Practices for Early-Stage Startups
notionId: 18382923-1d09-8006-94d2-e5f73bb1d151
createdAt: 2025-01-22T21:18:00.000Z
weight: null
draft: true
description: ""
Name: Essential Security Practices for Early-Stage Startups
authors:
  - name: Mark Percival
    link: https://www.linkedin.com/in/markpercival
    image: /landing/people/Mark.svg

---


![image](https://media.licdn.com/dms/image/v2/D4E12AQGImys58aYgKA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1709754882507?e=2147483647&v=beta&t=Cm03cwIINEvbd_6fSjjxyT20Qmo0Sf_1vtkQ7haBJwA)


_Credit: My poor prompting skills + AI generation_


It started as an MVP, but now you've got real customers, possibly real funding, and you're too busy with the new features to look at your security posture because it either seems too early or not important enough. But before you break out the SOC II checklist or set up your own Identity Access Management platform, now's a great time to start by knocking out the low hanging fruit.


Taking a critical look at your security is not just about keeping your data, customers and brand safe; it is part of building a great technical team.


With that, let's take a look at some of the security issues an early org should be looking at.


## The easy ones


### Two Factor Authentication


Every employee should have this turned on, and where possible it should be enforced. For example, your Google Workspace should force users into using 2FA. This is one of the easiest changes and knocks out a decent number of attacks.


### Provide and pay for a password manager


The best way to improve password security in an org is to make sure everyone is using a password manager. Free alternatives include Google Chrome and Safari, but they don't solve the issue of occasionally needing to share a secret with another team member. Yes, sharing credentials is not great, but it's going to happen in nearly every org, so at least make it auditable and as secure as possible.


### Make sure you leave a trail


This one should be pretty simple in most of today's cloud computing environments. Pick your vendor and turn it on. Querying and analyzing your logs can come later, what you don't want is to be caught out in a month wondering about the extent of an attack that happened a week earlier.


_Caveats: Look at the data you're logging and check for anything sensitive in those logs (emails, passwords, any PII). Now's a good time to think about how you'll handle this in the future._


## A little bit harder


### Tell me your secrets


Start by analyzing the secrets you're handing out to your engineers when they first onboard. Things like API Keys (Stripe, AWS, etc), should hopefully be limited to non-production keys, but it's not uncommon in early startups to see production keys shared. Moving off of these needs to be a priority.


_Caveats: Consider any production keys shared with developers as compromised and therefore need to be rotated as soon as possible._


### Sharing those secrets


Maybe you start by sending new engineers the environment variables via Slack, or even better, in some encrypted format. Even if it includes unprivileged development keys, it's not an ideal setup, as it's almost guaranteed to get out of sync. While this isn't exactly a solved problem yet, there are solutions. Open source products like [Infisical](https://infisical.com/) and DMNO are great for keeping this up to date, and usually doesn't involve much setup. Just import your .env file and add your developers. Avoid solutions that check the .env file into an SCM (git), as these live on in the history which make cleanup much harder (someone with a key from 6 months ago can still decrypt the old .env files).


## The hardest


### PII is radioactive


The best PII is the PII you don't have to store. Services like Stripe and Authy let us keep this data at bay, but there's always going to be some Personal Identifiable Information in most services. One example is email which meets the PII standard in both Europe and the US (via the CCPA from California).


Look at every place you store PII and think carefully about where it lives, who has access to it, and what could go wrong to expose it. An example would be a GraphQL query that allows an unauthenticated user or the wrong authenticated user to see another users email.


_Caveats: Think carefully about where your PII travels as well. It's not uncommon to hand your marketing person a list of email addresses for users. If this list gets leaked, you're in the same boat as a database breach in terms of PII regulations. Find a way to sync up directly with the services your marketing team uses, and don't forget the 2FA!_


### Access to production


Production access - every early engineer's favorite debugging tool. This of course is an absolute disaster in terms of security. What this SHOULD NOT limit is developers access to production logs and traces, which will be critical in determining outages. Having a staging environment here can help, but beware of access to real production data (if any engineer can access staging, but staging has access to prod data, you're in the same position)


### Production data vs testing or development data


Nothing is more annoying than finding a bug that only shows up on production because of production data. In the early days it's easy to just pass around production data, but this fails for two reasons:

1. Obviously you can't have production data floating around on developers machines. You could "sanitize" the data but eventually this fails because of #2
2. Eventually the size of the data will make this impossible.

The right solution here is writing tests to reproduce these data edge cases. This means having a set of fixtures that you can load in for testing. The added benefit here is that when you onboard developers you have an easy way of seeding data to get them started on development.


_Caveats: A common solution is to set up staging to mirror a recent copy of production data. This is a good way to run a final test, but it's tempting to allow engineers to deploy any branch to staging in order to run these end to end tests. The issue here is that if there's no code review before running the branch against staging, then one engineer still has the ability to dump your production data (or the bigger concern, the attacker that has your engineers credentials now has that ability - Think it can't happen? Look at how LastPass got hacked via an engineers home network setup_ [_^1_](https://thehackernews.com/2023/03/lastpass-hack-engineers-failure-to.html)_)._


## Conclusions


This is by no means meant to be an exhaustive list, but should be viewed as a starting point for security conversation at your organization. It's easy in early startups to push this off till the next iteration, but like technical debt, there's interest and it accrues daily. Don't wait until you're making a security disclosure to start and pay it off.


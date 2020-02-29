---
title: Estimating software projects
date: "2020-02-29T14:00:00.000Z"
description: "How I approach answering the evergreen client question, 'What will this cost me and how long will it take?'"
---

Let's discuss something that, for a long time, was among my most hated things to do: estimate how long and how much a software project would end up costing a client.

Software project estimation might be among the hardest of all the black-magic that you have to get right in order to thrive as a software development agency. If you charge too little, you make no profit, and if you do this too many times in a row, you'll find yourself quickly rid of the problem because you'll no longer have a business at all. If you charge too much, you risk alienating someone who could be a great long-term relationship, and sending them into the (inevitably burly and well-priced) arms of your competition.

I've went through a number of __extremely__ sophisticated estimation techniques over the years:

- Running comps on previous projects similar to how a realtor assesses home values
- Assigning time estimates to common components across projects (user auth, payments, etc), reducing the mental bandwidth needed to estimate the business-logic custom code you'll need to write
- "trusting your gut and multiplying by 1.5"
<br/>
<br/>
<br/>
<br/>
And....they all proved to be inadequate, resulting in us rather consistently missing the actual mark. Why?
<br/>
<br/>
<br/>
- Comps proved to not be as comparable as we hoped. There was simply too much variation in our projects for comps to be very accurate.
- Standardized time estimates for common components often ended up mutating due to shifting client requirements changing after work has begun
- My gut is extraordinarily smart about a lot of things, but my ego overruled it and too often told me "yea, you _can_ do {project_name} in 6 weeks!"

Was my gut right? Could I do {project_name} in 6 weeks?

![Super troopers shaking head no gif](https://media.giphy.com/media/9NLYiOUxnKAJLIycEv/giphy.gif)

So I set out to figure out some other way to do this. I had my first chance to use a new technique on an agriculture management software platform that included some very custom IoT integrations. Here's what the process looked like:

#### 1. Start from designs

I convinced my company to make it policy that we only provide detailed quotes after the client has agreed to a finalized design. I do not know if this is possible for you, but this has had the biggest impact on my ability to provide useful, realistic quotes. The designs themselves allow the clients to formalize what they have envisioned in their heads, it limits surprises, and the design acts as a quasi-contract between you and the client.

>"Well...I really imagined it looking and functioning like X instead of Y"
>
> \- Clients everywhere after discovering they actually wanted something different than what they asked to be built

Sorry bud - we already explored exactly what you want it to look like and how you want it to function. Let's explore a scope change to accomodate your new preferences!

#### 2. 'Componentize' the UI & identify likely API endpoints, data models, services that will be necessary

Most often, our projects are structured as a mobile app, a web app, and a shared API. So from the designs, I can 'componentize' them, and work backwards into the likely API endpoints/data models/services that will be needed. This is where the bulk of the work lies, and it's the step that relies the most on the experience & knowledge of the estimator. 

It's also where a few psychological issues with estimation come into play:

- __Known knowns__ - It's easy to estimate what you know.
- __Known unknowns__ - It's hard to estimate what you know you don't know.
- __Unknown unknowns__ - It's _very_ hard to estimate things that you don't know you don't know.

For the tasks you do a lot, you can probably fairly easily estimate how long it'll take you to implement those features, barring some client requirement that's extremely custom and irregular. These are your __Known knowns__, and you should be very thankful for them. They are your rock of stability in a sea of chaos.

#### 3. Create three time estimates for each endpoint, data model, and service

I have a template Excel spreadsheet I use where I enter each known endpoint, data model, and service class that I'll end up needing to write. Then as I am estimating, I include estimates for each possibility. If things go well, we'll be closer to our optimistic range. If they go as planned, we'll hit nominal. If we run into a number of issues along the way, maybe we end up closer to pessimistic. For __Known unknowns__, I am very liberal with my pessimistic estimate, and very conservative with my optimistic estimate.

After doing all of my __Known knowns__, I then include an actual line item for __Unknown unknowns__, the things we don't know that we don't yet know. This varies considerably, but seems to mostly be correlated to general size of the project and if the project is doing something unique we've never done before.

#### 4. Aggregate the scores
I have a master sheet where I aggregate all estimates according to their type. Example:
- pessimistic: 750 hours
- nominal: 720 hours
- optimistic: 700 hours

#### 5. Create a standard deviation of development hours
From that, I find the standard deviation of development hours based on the optimistic/pessimistic range.

#### 6. Choose a risk factor to calculate your estimate
I then choose a risk factor (this is essentially the project's [z-score](https://www.statisticshowto.datasciencecentral.com/probability-and-statistics/z-score/)) by identifying what I think is the project "riskiness", on a scale from -3 to +3.

I tend to define 'riskiness' as the general exposure the project leaves us open to:
- Is the project dealing with a lot of new technologies for us?
- Is the project full of various types uncertain elements?
- Who is the project for? Have we worked with them in the past? What's our relationship like? Is this project possibly a precursor to larger future projects?
- Etc

Riskiness is subjective. But like Justice Stewart said in the Supreme Court on the topic of obscenity, "I know it when I see it", and I think it's a good bet that you probably do too.

I use that 'riskiness' as my z-score. 

If the standard deviation was 12, and I chose a 1.5 z-score, then in my fake project above, my estimate would be 738 hours.

#### Wrap Up
This method has worked __extremely__ well for me over the last several projects that I've quoted this way, but obviously, improvements to both speed up and make the estimation process more accurate can easily translate to a really high ROI, so I'm still actively looking to see if there are any ways I can make this process more accurate.

As for transparency with clients, I typically (if possible) break the estimate out into dev-hours per feature.

For example:
- Shared: 300 hours
- Feature 1: 125 hours
- Feature 2: 250 hours
- Feature 3: 63 hours

This way, the client can decide what features they find necessary and economical, and can make good business decisions from that.

Hopefully, this method can help you refine your software project estimation process. And if you find it revolting, feel free to @ me on [Twitter](https://www.twitter.com/tacticalminivan) and tell me all about it!

Until my next post...
<br/>
![Arnold Schwarzenegger I'll be back gif](https://media.giphy.com/media/JDKxRN0Bvmm2c/giphy.gif)
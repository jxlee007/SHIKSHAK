# 🚀 Prompt Engineering Insights from Top AI Startups

## 🎯 Goal
Build high-performing, domain-specific LLM agents by applying field-tested prompt design patterns, metaprompting strategies, and evaluation methodologies.

---

## 🧱 1. Prompt Architecture Design

### 📌 Layered Prompt Composition
- **System Prompt**: Defines the high-level behavior and rules (e.g., “You are a customer service manager”).
- **Developer Prompt**: Adds customer-specific rules and data handling logic.
- **User Prompt**: Accepts freeform input from the end user.

🧠 Treat prompts as structured APIs—not just instructions.

---

## 🧩 2. Prompt Structure Best Practices

### 🧭 Step-by-Step Planning Format
- Define goal
- Create plan with numbered steps
- Specify constraints (e.g., don’t call non-approved tools)
- Define response format (often XML/JSON-style for structure)
- Include examples per scenario

```xml
<plan>
  <step>Identify the tool request type</step>
  <step>Validate tool permissions</step>
  ...
</plan>
```


---
state-of-the-art prompt engineering for AI agents, discussing the practical tips and techniques used by top AI startups [00:39].

Key topics covered include:

Prompt Engineering Examples: The video provides an example from Parahelp, a company doing AI customer support for other AI companies like Perplexity and Replit. It showcases the actual detailed prompt used by Parahelp's AI agent, which is six pages long [01:06].
Structure of Effective Prompts: The discussion highlights that good prompts start by defining the LLM's role, outlining the task, providing a high-level plan with step-by-step instructions, specifying output structure, and including examples [01:54].
Meta-Prompting and Prompt Folding: The video introduces meta-prompting as a powerful tool where prompts can dynamically generate better versions of themselves based on previous queries or examples where the prompt failed [07:15].
LLM Escape Hatches: It's emphasized that LLMs need "escape hatches" to indicate when they lack sufficient information, rather than hallucinating responses [09:26]. This can be achieved by allowing the LLM to report debug information or complaints back to the developer [10:02].
System, Developer, and User Prompts: The video explains the emerging architecture of prompts, distinguishing between a system prompt (high-level API of company operations), a developer prompt (customer-specific context), and a user prompt (end-user input) [05:06].
The Importance of Evals: Evals (evaluations) are considered the "crown jewels" of data assets for AI companies, as they reveal why a prompt was written a certain way and are crucial for improvement [14:32].
Founders as Forward-Deployed Engineers: The discussion draws a parallel to Palantir's "forward-deployed engineer" model, where founders directly engage with users to understand specific workflows and codify that knowledge into effective software and prompts [17:25]. This hands-on approach is vital for building successful vertical AI agents and closing deals with large enterprises [23:22].
Model Personalities and Rubrics: Different LLMs exhibit distinct personalities (e.g., Claude being more human-steerable, GPT-3 being rigid, Gemini 2.5 Pro being flexible) [26:21]. Using rubrics can guide LLMs, but founders should be aware of how different models interpret and apply these guidelines [27:30].
Prompt Engineering as Management: The hosts conclude by comparing prompt engineering to managing a person, focusing on clear communication, setting expectations, and continuous improvement (Kaizen) [30:11].

---
# tactiq.io free youtube transcript
# Prompt Engineering Advice From Top AI Startups
# https://www.youtube.com/watch/DL82mGde6wo

00:00:00.080 Metarprompting is turning out to be a
00:00:02.080 very very powerful tool that everyone's
00:00:03.840 using now. It kind of actually feels
00:00:05.600 like coding in you know 1995 like the
00:00:09.040 tools are not all the way there. We're
00:00:11.200 you know in this new frontier. But
00:00:13.200 personally it also kind of feels like
00:00:15.440 learning how to manage a person where
00:00:17.520 it's like how do I actually communicate
00:00:20.240 uh you know the things that they need to
00:00:22.160 know in order to make a good decision.

00:00:32.479 Welcome back to another episode of the
00:00:34.320 light cone. Today we're pulling back the
00:00:36.640 curtain on what is actually happening
00:00:39.520 inside the best AI startups when it
00:00:42.320 comes to prompt engineering. We surveyed
00:00:44.879 more than a dozen companies and got
00:00:47.920 their take right from the frontier of
00:00:50.719 building this stuff, the practical tips.
00:00:53.600 Jared, why don't we start with an
00:00:55.039 example from one of your best AI
00:00:57.280 startups? I managed to get an example
00:00:59.760 from a company called Parahelp. Parahelp
00:01:02.399 does AI customer support. There are a
00:01:04.559 bunch of companies who who are doing
00:01:05.519 this, but Parhel is doing it really
00:01:06.799 really well. They're actually powering
00:01:08.400 the customer support for Perplexity and
00:01:11.040 Replet and Bolt and a bunch of other
00:01:13.119 like top AI companies now. So, if you if
00:01:15.200 you go and you like email a customer
00:01:16.720 support ticket into Perplexity, what's
00:01:18.400 actually responding is like their AI
00:01:20.080 agent. The cool thing is that the
00:01:21.680 Powerhel guys very graciously agreed to
00:01:23.600 show us the actual prompt that is
00:01:26.159 powering this agent um and to put it on
00:01:28.479 screen on YouTube for the entire world
00:01:29.920 to see. Um it's like relatively hard to
00:01:32.000 get these prompts for vertical AI agents
00:01:33.759 because they're kind of like the crown
00:01:35.040 jewels of the IP of these companies and
00:01:37.119 so very grateful to the Powerhel guys
00:01:38.960 for agreeing to basically like open
00:01:40.159 source this prompt. Diana, can you walk
00:01:42.320 us through this very detailed prompt?
00:01:44.720 It's super interesting and it's very
00:01:46.240 rare to get a chance to see this in
00:01:48.000 action. So the interesting thing about
00:01:49.520 this prompt is actually first it's
00:01:51.119 really long. It's very detailed in this
00:01:53.200 document you can see is like six pages
00:01:55.520 long just scrolling through it. The big
00:01:57.840 thing that a lot of the best prompts
00:01:59.520 start with is this concept of uh setting
00:02:02.240 up the role of the LLM. You're a manager
00:02:05.040 of a customer service agent and it
00:02:07.280 breaks down into bullet points what it
00:02:09.440 needs to do. Then the big thing is
00:02:11.440 telling the the task which is to approve
00:02:14.319 or reject a tool call because it's
00:02:16.400 orchestrating agent calls from all these
00:02:18.239 other ones. And then it gives it a bit
00:02:21.520 of the highle plan. It breaks it down
00:02:23.760 step by step. You see steps one, two,
00:02:25.840 three, four, five. And then it gives
00:02:28.239 some of the important things to keep in
00:02:30.000 mind that it should not kind of go weird
00:02:34.560 into calling different kinds of tools.
00:02:36.720 It tells them how to structure the
00:02:38.319 output because a lot of things with
00:02:40.400 agents is you need them to integrate
00:02:42.640 with other agents. So almost like gluing
00:02:44.720 the API call. So the is important to
00:02:47.440 specify that it's going to give certain
00:02:50.080 uh output of accepting or rejecting and
00:02:52.239 in this format. Then this is sort of the
00:02:53.840 highle section and one thing that the
00:02:56.879 best prompts do they break it down sort
00:02:58.879 of in this markdown type of style uh
00:03:01.360 formatting. So you have sort of the
00:03:02.800 heading here and then later on it goes
00:03:05.680 into more details on how to do the
00:03:07.680 planning and you see this is like a sub
00:03:09.519 bullet part of it and as part of the
00:03:11.760 plan there's actually three big sections
00:03:14.080 is how to plan and then how to create
00:03:16.720 each of the steps in the plan and then
00:03:19.120 the highle example of the plan. One big
00:03:21.760 thing about the best prompts is they
00:03:24.080 outline how to reason about the task and
00:03:27.519 then a big thing is giving it giving it
00:03:29.440 an example and this is what it does. And
00:03:31.840 one thing that's interesting about this
00:03:34.000 it it looks more like programming than
00:03:36.080 writing English because it has this uh
00:03:38.799 XML tag kind of format to specify sort
00:03:42.480 of the plan. We found that it makes it a
00:03:44.799 lot easier for LMS to follow because a
00:03:47.280 lot of LMS were post-trained in LHF with
00:03:50.959 kind of XML type of input and it turns
00:03:53.599 out to produce better results. Yeah. One
00:03:55.840 thing I'm surprised that isn't in here
00:03:57.680 or maybe this is just the version that
00:03:59.280 they released. What I almost expect is
00:04:01.360 there to be a section where it describes
00:04:04.239 a particular scenario and uh actually
00:04:07.599 gives example output for that scenario.
00:04:10.560 That's in like the next stage of the
00:04:12.959 pipeline. Yeah. Oh, really? Okay. Yeah.
00:04:15.840 Because it's customer specific, right?
00:04:17.440 Because like every customer has their
00:04:18.639 own like flavor of how to respond to
00:04:20.880 these support tickets. And so their
00:04:22.639 challenge like a lot of these agent
00:04:23.919 companies is like how do you build a
00:04:25.520 general purpose product when every
00:04:28.400 customer like wants you know has like
00:04:30.720 slightly different workflows and like
00:04:32.479 preferences. has a really interesting
00:04:34.320 thing that I see the vertical AI agent
00:04:36.400 companies talking about a lot which is
00:04:38.000 like how do you have enough flexibility
00:04:39.520 to make special purpose logic without
00:04:41.600 turning into a consulting company where
00:04:42.960 you're building like a new prompt for
00:04:44.800 for for every customer. I actually think
00:04:46.800 this like concept of like forking and
00:04:48.639 merging prompts across customers and
00:04:51.120 which part of the prompt is customer
00:04:52.720 specific versus like companywide is like
00:04:54.800 a like a really interesting thing that
00:04:57.040 the world is only just beginning to
00:04:58.320 explore. Yeah, that's a very good point
00:04:59.919 Jared. So this is concept of uh defining
00:05:02.960 the prompt in the system prompt. Then
00:05:05.199 there's a de developer prompt and then
00:05:07.280 there's a user prompt. So what this mean
00:05:10.000 is uh the system prompt is basically
00:05:12.479 almost like defining uh sort of the
00:05:15.120 highle API of how your company operates.
00:05:17.680 In this case the example of parhel is
00:05:19.440 very much a system prompt. There's
00:05:20.800 nothing specific about the customer. And
00:05:22.639 then as they add specific instances of
00:05:24.560 that API and calling it then they stuff
00:05:26.960 all that in into more the developer
00:05:29.360 prompt which is not shown here and
00:05:31.199 that's adds all the context of let's say
00:05:33.280 working with perplexity there's certain
00:05:34.880 ways of how you handle rack questions as
00:05:37.360 opposed to working with bold is very
00:05:39.919 different right and then I don't think
00:05:41.919 parhelp has a user prompt because their
00:05:44.320 product is not consumed directly by an
00:05:46.160 end user but a end user prompt could be
00:05:48.479 more like replet or a zero right where
00:05:52.639 users need to type is like generate me a
00:05:54.880 site that that has these buttons this
00:05:56.800 and that that goes all in the user
00:05:58.479 prompt. So that's sort of the
00:06:00.320 architecture that's sort of emerging.
00:06:02.080 And to your point about avoiding
00:06:03.360 becoming a consulting company, I think
00:06:06.039 um there's so many startup opportunities
00:06:08.960 and building the tooling around all of
00:06:11.280 this stuff like for example like um
00:06:13.600 anyone who's done prompt engineering
00:06:14.880 knows that the examples and worked
00:06:17.280 examples are really important to
00:06:18.720 improving the quality of the output. And
00:06:20.639 so then if you take like power as an
00:06:22.240 example, they really want good worked
00:06:25.280 examples that are specific to each
00:06:27.120 company. And so you can imagine that as
00:06:30.000 they scale, you almost want that done
00:06:32.160 automatically. Like in your dream world,
00:06:33.680 what you want is just like a an agent
00:06:35.680 itself that can pluck out the best
00:06:37.199 examples from like the customer data set
00:06:39.759 and then software that just like ingests
00:06:41.919 that straight into like wherever it
00:06:44.080 should belong in the pipeline without
00:06:45.600 you having to manually go out and plug
00:06:47.759 that all and ingest it in all of
00:06:49.120 yourself. That's probably a great segue
00:06:50.880 into metaparrompting which is one of the
00:06:52.880 things we want to talk about because
00:06:53.919 that's that's a consistent theme that
00:06:55.919 keeps coming up when we talk to our AI
00:06:57.680 startups. Yeah, Tropier is uh one of the
00:06:59.919 startups I'm working with in the current
00:07:01.280 YC batch and they've really helped
00:07:03.599 people like YC company Ducky do really
00:07:07.039 in-depth understanding and debugging of
00:07:09.840 the prompts and the return values from a
00:07:13.039 multi-stage workflow. And one of the
00:07:15.199 things they figured out is prompt
00:07:16.479 folding. So you know basically one
00:07:18.560 prompt can dynamically generate better
00:07:21.440 versions of itself. So a good example of
00:07:23.360 that is a classifier prompt that
00:07:24.800 generates a specialized prompt based on
00:07:27.360 the previous query. And so you can
00:07:28.880 actually go in take uh the existing
00:07:31.919 prompt that you have and actually feed
00:07:34.160 it more examples where maybe the prompt
00:07:37.039 failed or didn't quite do what you
00:07:38.560 wanted and you can actually instead of
00:07:40.960 you having to go and rewrite the prompt,
00:07:43.199 you just put it into um you know the raw
00:07:46.160 LLM and say help me make this prompt
00:07:49.120 better. And because it knows itself so
00:07:51.680 well, strangely um metaprompting is
00:07:54.400 turning out to be a very very powerful
00:07:56.240 tool that everyone's using now. And the
00:07:58.240 next step after uh you do sort of prompt
00:08:00.639 folding if the task is very complex
00:08:03.680 there's this concept of uh using
00:08:05.919 examples and this is what Jasberry does
00:08:08.639 is one of the companies I'm working with
00:08:10.639 this batch they basically build
00:08:12.479 automatic bug finding in code which is a
00:08:14.879 lot harder and the way they do it is
00:08:17.440 they feed a bunch of really hard
00:08:19.440 examples that only expert programmers
00:08:21.599 could do let's say if you want to find
00:08:22.800 an N plus1 query it's actually hard for
00:08:25.039 today for even like the best LMS to find
00:08:27.360 those and the way to do those is they
00:08:29.280 find parts of the code then they add
00:08:32.240 those into the prompt a meta prompt
00:08:34.399 that's like hey this is an example of n
00:08:36.479 plus1 type of error and then that works
00:08:39.440 it out and I think this pattern of
00:08:40.880 sometimes when it's too hard to even
00:08:43.919 kind of write a pros around it let's
00:08:46.000 just give you an example that turns out
00:08:47.920 to work really well because it helps LM
00:08:50.240 to reason around complicated tasks and
00:08:53.760 steer it better because you can't quite
00:08:55.760 kind of put exact act parameters and
00:08:57.760 it's almost like um unit testing
00:09:00.080 programming in a sense like test-driven
00:09:01.640 development is sort of the LLM v version
00:09:04.560 of that. Yeah. Another thing that trope
00:09:06.720 uh sort of talks about is you know the
00:09:08.720 the model really wants to actually help
00:09:10.959 you so much that if you just tell it
00:09:13.279 give me back output in this particular
00:09:15.440 format even if it doesn't quite have the
00:09:18.320 information it needs it'll actually just
00:09:21.360 tell you what it thinks you want to hear
00:09:23.360 and it's literally a hallucination. So,
00:09:25.920 one thing they discovered is that you
00:09:27.440 actually have to give the LLM's a real
00:09:29.440 escape hatch. You need to tell it if you
00:09:31.760 do not have enough information to say
00:09:34.880 yes or no or make a determination, don't
00:09:38.080 just make it up. Stop and ask me. And
00:09:41.120 that's a very different way to think
00:09:42.959 about it. That's actually something we
00:09:44.480 learned at some of the internal work
00:09:46.160 that we've done with agents at YC where
00:09:48.640 Jared came up with a really inventive
00:09:51.680 way to give the LLM escape patch. Did
00:09:54.880 you want to talk about that? Yeah. So
00:09:56.480 the trope approach is one way to give
00:09:58.720 the LM an escape patch. We came up with
00:10:00.320 a different way which is in the response
00:10:02.640 format to give it the ability to have
00:10:04.880 part of the response be essentially a
00:10:07.200 complaint to you the developer that like
00:10:10.800 you have given it confusing or
00:10:12.320 underspecified information and it
00:10:13.920 doesn't know what to do. And then the
00:10:16.480 nice thing about that is that we just
00:10:18.480 run your LLM like in production with
00:10:20.720 real hoser data and then you can go back
00:10:22.880 and you can look at the outputs that it
00:10:25.120 has given you in that like output
00:10:26.640 parameter. Um we we call it debug info
00:10:29.360 internally. So like we have this like
00:10:31.200 debug info parameter where it's
00:10:32.800 basically reporting to us things that we
00:10:35.120 need to fix about it and it literally
00:10:37.519 ends up being like a to-do list that you
00:10:39.600 the agent developer has to do. It's like
00:10:41.600 really kind of mind-blowing stuff. Yeah.
00:10:43.279 Yeah, I mean just even for hobbyists or
00:10:44.880 people who are interested in playing
00:10:46.160 around for this for personal projects.
00:10:47.920 Like a very simple way to get started
00:10:49.360 with meta prompting is to follow the
00:10:51.120 same structure of the prompt is give it
00:10:52.480 a role and make the role be like you
00:10:54.320 know you're a expert prompt engineer who
00:10:56.320 gives really like detailed um great
00:10:58.800 critiques and advice on how to um
00:11:00.880 improve prompts and give it the prompt
00:11:03.200 that you had in mind and it will spit
00:11:05.600 you back a much a more expanded better
00:11:08.160 prompt and so you can just keep running
00:11:09.760 that loop for a while. Works
00:11:11.360 surprisingly well. I think it's a common
00:11:13.040 pattern sometimes for companies when
00:11:15.040 they need to get um responses from
00:11:17.440 element elements in their product a lot
00:11:19.120 quicker. They do the meta prompting with
00:11:21.440 a bigger beefier model any of the I
00:11:24.000 don't know hundreds of billions of
00:11:25.040 parameter plus models like uh I guess
00:11:27.920 cloud 4 3.7 or your uh GPD 03 and they
00:11:34.560 do this meta prompting and then they
00:11:36.399 have a very good working one that then
00:11:38.720 they use into the distilled model. So
00:11:40.959 they use it on uh for example an FRO and
00:11:43.200 it ends up working pretty well
00:11:46.079 specifically sometimes for uh voice AI
00:11:48.560 agents companies because uh latency is
00:11:51.440 very important to uh get this whole
00:11:54.959 touring test to pass because if you have
00:11:57.279 too much pause be before the agent
00:11:59.360 responds I think humans can detect
00:12:01.040 something is off. So they use a faster
00:12:03.519 model but with a bigger better prompt
00:12:05.760 that was refined from the bigger models.
00:12:08.320 So that's like a common pattern as well.
00:12:09.760 Another again less sophisticated maybe
00:12:12.240 but um like as the prompt gets longer
00:12:15.120 and longer like it becomes a a large
00:12:17.120 working doc um one thing I found useful
00:12:19.680 is as you're using it if you just note
00:12:21.839 down in a Google doc things that you're
00:12:24.639 seeing just um the outputs not being how
00:12:28.000 you want or not ways that you can think
00:12:30.160 of to improve it. you can just write
00:12:31.600 those in note form and then give Gemini
00:12:35.440 Pro like your notes plus the original
00:12:37.600 prompt and ask it to suggest a bunch of
00:12:39.440 edits to the prompt um to incorporate
00:12:42.000 these in well and it does that quite
00:12:43.680 well. The other trick is uh in uh Gemini
00:12:46.560 2.5 Pro if you look at the thinking
00:12:49.440 traces as is uh parsing through uh
00:12:53.399 evaluation you could actually learn a
00:12:55.440 lot about all those misses as well.
00:12:57.680 We've done that internal as well, right?
00:12:59.360 As this is critical because if you're
00:13:00.720 just using Gemini via the API until
00:13:03.040 recently, you did not get the thinking
00:13:04.639 traces and like the thinking traces are
00:13:06.639 like the critical debug information to
00:13:08.959 like understand like what's wrong with
00:13:10.959 your prompt. They just added it to the
00:13:12.720 API. So you can now actually like pipe
00:13:15.040 that back into your developer tools and
00:13:17.519 workflows. Yeah, I think it's an
00:13:19.120 underrated um consequence of Gemini Pro
00:13:22.480 having such long context windows is you
00:13:24.560 can effectively use it like a a ripple.
00:13:27.040 Go sort of like one by one like put your
00:13:28.639 prompt on like one example then
00:13:30.160 literally watch the reasoning trace in
00:13:32.639 real time to figure out like how you can
00:13:35.360 steer it in the direction you want.
00:13:36.800 Jared and the software team at YC has
00:13:38.639 actually built this um you know various
00:13:41.600 forms of workbenches that allow us to
00:13:43.680 like do debug and things like that. But
00:13:45.760 to your point like sometimes it's better
00:13:48.399 just to use
00:13:49.959 gemini.google.com directly and then drag
00:13:52.560 and drop you know literally JSON files
00:13:55.760 and uh you know you don't have to do it
00:13:57.680 in some sort of special container like
00:14:00.240 it you know seems to be totally
00:14:02.639 something that works even directly in
00:14:05.120 you know chat GPT itself. Yeah, this is
00:14:07.600 all stuff. Um, I would give a shout out
00:14:09.680 to YC's head of data, Eric Bacon, who's
00:14:12.800 um, helped us all a lot a lot of this
00:14:14.560 metaparrotting and using Gemini Pro 2.5
00:14:16.959 as a effectively a ripple. What about
00:14:18.959 evals? I mean, we've uh, talked about
00:14:21.120 evals for going on a year now. Um, what
00:14:24.399 are some of the things that founders are
00:14:26.000 discovering? Even though we've been
00:14:27.920 saying this for a year or more now,
00:14:29.600 Gary, I think it's still the case that
00:14:31.519 like evals are the true crown jewel like
00:14:35.120 data asset for all of these companies.
00:14:37.279 Like one one reason that Powerhel was
00:14:39.519 willing to open source the prompt is
00:14:41.440 they told me that they actually don't
00:14:43.440 consider the prompts to be the crown
00:14:45.279 jewels like the evals are the crown
00:14:47.360 jewels because without the evals you
00:14:49.120 don't know why the prompt was written
00:14:51.519 the way that it was. Um and it's very
00:14:54.079 hard to improve it. Yeah. And I I think
00:14:56.160 in abstraction you can think about you
00:14:58.240 know YC funds a lot of companies
00:15:00.160 especially in vertical AI and SAS and
00:15:02.720 then you can't get the eval unless you
00:15:05.199 sitting literally side by side with
00:15:07.920 people who are doing X Y or Z knowledge
00:15:10.720 work. you know, you need to sit next to
00:15:12.399 the tractor sales regional manager and
00:15:15.920 understand, well, you know, this person
00:15:17.920 cares, you know, this is how they get
00:15:19.360 promoted. This is what they care about.
00:15:21.120 This is that person's reward function.
00:15:23.519 And then you know what you're doing is
00:15:25.440 taking these in-person interactions
00:15:27.440 sitting next to someone in Nebraska and
00:15:29.920 then going back to your computer and
00:15:32.320 codifying it into uh very specific evals
00:15:35.680 like this particular user wants this
00:15:38.639 outcome after they you know after this
00:15:40.560 invoice comes in we have to decide
00:15:42.639 whether we're going to honor the you the
00:15:44.639 warranty on this tractor. Like just to
00:15:46.720 take one of one example that's the true
00:15:49.440 value right like you everyone's really
00:15:51.519 worried about um are we just rappers and
00:15:56.079 you know what is going to happen to
00:15:57.759 startups and I think this is literally
00:15:59.600 where the rubber meets the road where um
00:16:02.800 if you you know if you are out there in
00:16:04.959 particular places understanding that
00:16:07.360 user better than anyone else and having
00:16:09.680 the software actually work for those
00:16:12.000 people that's the moat is that is like
00:16:14.639 such a perfect depiction of like what is
00:16:16.720 the core competency required of founders
00:16:19.040 today? Like literally like the thing
00:16:20.959 that you just said like that's your job
00:16:22.800 as a founder of a company like this is
00:16:24.880 to be really good at that thing and like
00:16:27.199 maniacally obsessed with like the
00:16:29.040 details of the regional tractor sales
00:16:30.880 manager workflow. Yeah. And then the
00:16:32.560 wild thing is it's very hard to do like
00:16:35.040 you know how you have you even been to
00:16:36.639 Nebraska you know the classic view is
00:16:39.120 that uh the best founders in the world
00:16:40.880 they're you know sort of really great
00:16:43.040 cracked engineers and technologists and
00:16:46.000 uh just really brilliant and then at the
00:16:48.399 same time they have to understand some
00:16:50.800 part of the world that very few people
00:16:52.720 understand and then there's this little
00:16:54.720 sliver that is you know uh the founder
00:16:57.759 of a multi-billion dollar startup you
00:17:00.320 know I think of Ryan Peterson from
00:17:01.920 Flexport, you know, really really great
00:17:04.640 person who understands how software is
00:17:06.559 built, but then also I think he was the
00:17:08.839 third biggest uh importer of medical hot
00:17:12.000 tubs for an entire year like you know a
00:17:14.880 decade ago. So you know the weirder that
00:17:17.599 is the more of the world that you've
00:17:19.280 seen that nobody else who's a
00:17:20.799 technologist has seen uh the greater the
00:17:23.439 opportunity actually. I think you've put
00:17:25.839 this in a really interesting way before
00:17:27.119 Gary where you're sort of saying that
00:17:28.160 every founder's become a forward
00:17:29.919 deployed engineer. That's like a term
00:17:31.760 that traces back to Palunteer and since
00:17:33.440 you were early at Palanteer maybe tell
00:17:35.600 us a little bit about how did forward
00:17:37.120 deployed engineer become a thing at
00:17:38.720 Palunteer and and what can founders
00:17:40.480 learn from it now? I mean I think the
00:17:41.840 whole thesis of Palunteer at some level
00:17:43.600 was that um if you look at Meta back
00:17:46.720 then it was called Facebook or Google or
00:17:49.520 any of the top software startups that
00:17:52.640 everyone sort of knew back then. One of
00:17:54.880 the key recognitions that Peter Teal and
00:17:57.760 Alex Karp and Stefan Cohen and Joe
00:18:00.080 Lansdale, Nathan Gettings, like the
00:18:01.679 original founders of Palunteer had was
00:18:04.000 that uh go into anywhere in the Fortune
00:18:07.360 500, go into any government agency in
00:18:11.039 the world, including the United States,
00:18:13.520 and nobody who understands computer
00:18:16.559 science and technology at the level that
00:18:19.200 you at the highest possible level would
00:18:21.520 ever even be in that room. And so
00:18:23.640 Palenteer's sort of really really big
00:18:26.000 idea that they discovered very early was
00:18:28.320 that uh the problems that those places
00:18:30.880 face they're actually multi-billion
00:18:33.440 dollar sometimes trillion dollar
00:18:35.360 problems and yet uh this was well before
00:18:37.840 AI became a thing you know I mean people
00:18:40.240 were sort of talking about machine
00:18:41.520 learning but you know back then they
00:18:43.520 called it data mining you know the world
00:18:45.200 is a wash in data these you know giant
00:18:47.520 databases of people and things and
00:18:49.760 transactions and we have no idea what to
00:18:52.559 do with it. That's what Palanteer was,
00:18:54.880 is and still is. That um you can go and
00:18:57.919 find the world's best technologists who
00:19:00.559 know how to write software to actually
00:19:03.360 make sense of the world. You know, you
00:19:05.039 have these pabytes of data and you don't
00:19:07.520 know how do you find the needle in the
00:19:09.280 haststack. Um and you know the wild
00:19:11.280 thing is going on uh something like 20
00:19:14.400 22 years later it's only become more
00:19:17.440 true that we have more and more data and
00:19:20.320 we have less and less of an
00:19:21.679 understanding of what's going on and uh
00:19:24.240 it's no mistake that actually now that
00:19:26.880 we have LLMs like we actually it is
00:19:29.280 becoming much more tractable and then
00:19:31.200 the forward deployed engineer title was
00:19:33.679 specifically how do you sit next to
00:19:35.919 literally the FBI agent who's um
00:19:39.679 investigating domestic terrorism. How do
00:19:41.679 you sit right next to them in their
00:19:43.679 actual office and see what does the case
00:19:45.840 coming in look like? What are all the
00:19:47.440 steps? Uh when you actually need to go
00:19:50.160 to the federal prosecutor, what are the
00:19:52.320 things that they're sending? Is it I
00:19:54.400 mean what's funny is like literally it's
00:19:56.160 like word documents and Excel
00:19:58.080 spreadsheets, right? And um what you do
00:20:00.559 as a forward deployed engineer is take
00:20:02.960 these sort of you know file cabinet and
00:20:05.600 fax machine things that people have to
00:20:07.679 do and then convert it into really clean
00:20:10.720 software. So you know the classic view
00:20:13.039 is that it should be as easy to actually
00:20:15.200 do uh an investigation at a threeletter
00:20:18.000 agency as going and taking a photo of
00:20:20.320 your lunch on Instagram and posting it
00:20:22.000 to all your friends. Like that's you
00:20:23.840 know kind of the funniest part of it.
00:20:25.360 And so you I think it's no mistake today
00:20:27.679 that four deployed engineers who came up
00:20:30.480 through that system at Palanteer now
00:20:31.919 they're turning out to be some of the
00:20:33.039 best founders at YC actually. Yeah. I
00:20:35.039 mean produced this incredible an
00:20:37.360 incredible number of startup founders
00:20:38.960 cuz yeah like the training to be a fore
00:20:40.720 deployed engineer that's exactly the
00:20:42.000 right training to be a founder of these
00:20:43.440 companies. Now the the other interesting
00:20:45.200 thing about Palunteer is like other
00:20:46.559 companies would send like a salesperson
00:20:48.640 to go and sit with the FBI agent and
00:20:50.720 like Palunteer sent engineers to go and
00:20:52.960 do that. I think Palenter was probably
00:20:54.480 the first company to really like
00:20:56.240 institutionalize that and scale that as
00:20:58.080 a process, right? Yeah. I mean, I think
00:21:00.320 what happened there, the reason why they
00:21:02.240 were able to get these sort of seven and
00:21:03.840 eight and now nine figure contracts very
00:21:05.840 consistently is that uh instead of
00:21:08.159 sending someone who's like hair and
00:21:09.760 teeth and they're in there and you know,
00:21:11.679 let's go to the let's go to the uh
00:21:13.440 steakhouse. You know, it's all like
00:21:15.120 relationship. and you'd have one meeting
00:21:17.679 uh they would really like the
00:21:19.159 salesperson and then through sheer force
00:21:21.440 of personality you'd try to get them to
00:21:23.919 give you a seven-figure contract and
00:21:25.600 like the time scales on this would be
00:21:27.520 you know 6 weeks 10 weeks 12 weeks like
00:21:30.080 5 years I don't know it's like and the
00:21:32.159 software would never work uh whereas if
00:21:34.400 you put an engineer in there and you
00:21:36.640 give them uh you know Palunteer Foundry
00:21:39.520 which is what they now call sort of
00:21:40.880 their core uh data viz and data mining
00:21:44.000 suites instead of the next meeting being
00:21:46.960 reviewing 50 pages of you know sort of
00:21:49.840 sales documentation or a contract or a
00:21:52.159 spec or anything like that. It's
00:21:53.840 literally like, "Okay, we built it." And
00:21:56.480 then you're getting like real live
00:21:58.799 feedback within days. And I mean, that's
00:22:01.360 honestly the biggest opportunity for
00:22:03.360 startup founders. If startup founders
00:22:05.120 can do that and uh that's what forward
00:22:07.840 deployed engineers are sort of used to
00:22:09.360 doing that's how you could beat a
00:22:11.280 Salesforce or an Oracle or you know a
00:22:14.240 Booze Allen or literally any company out
00:22:16.880 there that has a big office and a big
00:22:19.280 fancy you know you have big fancy
00:22:21.200 salespeople with big strong handshakes
00:22:23.440 and it's like how does a really good
00:22:25.440 engineer with a weak handshake go in
00:22:27.120 there and beat them? It's actually you
00:22:29.039 show them something that they've never
00:22:30.559 seen before and like make them feel
00:22:33.360 super heard. You have to be super
00:22:35.200 empathetic about it. Like you actually
00:22:36.640 have to be a great designer and product
00:22:38.799 person and then you know come back and
00:22:41.760 you can just blow them away. Like the
00:22:43.520 software is so powerful that you know
00:22:46.000 the second you see something that you
00:22:47.919 know makes you feel seen you want to buy
00:22:50.080 it on the spot. Is a good way of
00:22:51.520 thinking about it that founders should
00:22:52.720 think about themselves as being the four
00:22:54.960 deployed engineers of their own company.
00:22:56.720 Absolutely. Yeah. Like you definitely
00:22:58.159 can't farm this out. Like literally the
00:23:00.640 founders themselves, they're technical.
00:23:02.880 They have to be the great product
00:23:04.080 people. They have to be the
00:23:05.600 ethnographer. They have to be the
00:23:07.360 designer. You want the person on the
00:23:10.000 second meeting to see the demo you put
00:23:11.760 together based on the stuff you heard.
00:23:13.600 And you want them to say, "Wow, I've
00:23:15.840 never seen anything like that." And take
00:23:17.840 my money. I think the incredible thing
00:23:19.520 about this model is this is why we're
00:23:21.440 seeing a lot of the vertical AI agents
00:23:23.760 take off is precisely this because they
00:23:27.200 can have these meetings with the end
00:23:30.080 buyer and champion at these big
00:23:32.440 enterprises. They take that context and
00:23:35.039 then they stuff it basically in the
00:23:37.159 prompt and then they can quickly come
00:23:39.520 back in a meeting like just the next day
00:23:41.520 maybe with Palunteer would have taken a
00:23:42.720 bit longer and a team of engineers here.
00:23:44.960 It could be just the two founders go in
00:23:47.200 and then they would close this six,
00:23:49.039 seven figure deals which we've seen and
00:23:51.200 with large enterprises which has never
00:23:54.720 been done before and it's just possible
00:23:56.960 with this new model of forward deploy
00:23:59.280 engineer plus AI is just on
00:24:02.720 accelerating. It just reminds me of a
00:24:04.799 company I mentioned before on the
00:24:05.840 podcast like Giger ML who do customer
00:24:07.600 another customer support and especially
00:24:09.919 a lot of voice support and it's just
00:24:12.159 classic case of two extremely um
00:24:15.200 talented software engineers not natural
00:24:17.440 sales people but they force themselves
00:24:19.279 to be essentially forward deployed
00:24:21.360 engineers and they closed a huge deal
00:24:23.840 with Zeppto and then a couple of other
00:24:25.440 companies they can't announce yet but do
00:24:27.520 they physically go on site like the
00:24:28.960 palentier model? Yes. So they did so
00:24:30.880 they they did all of that where once
00:24:32.400 they close the deal they go on site and
00:24:34.159 they sit there with all the customer
00:24:35.360 support people and figuring out how to
00:24:37.200 keep tuning and getting the software or
00:24:39.520 the LM to work even better. But before
00:24:41.600 that even to win the deal what they
00:24:44.080 found is that they can they can win by
00:24:46.240 just having the most impressive demo.
00:24:47.919 And in their case they've um innovated a
00:24:50.640 bit on the rag pipeline so that they can
00:24:53.360 um have their voice responses be both
00:24:55.520 accurate and very low latency. sort of
00:24:57.360 like a technically challenging thing to
00:24:59.120 do, but I just feel like in the like pre
00:25:02.000 sort of the current LLM rise, you
00:25:03.919 couldn't necessarily differentiate
00:25:05.279 enough in the demo phase of sales to
00:25:07.760 beat out incumbent. So, you can really
00:25:09.679 beat Salesforce by having a slightly
00:25:11.360 better CRM with a better UI. But now
00:25:14.080 because the technology evolves so fast
00:25:15.679 and it's so hard to get this like last
00:25:17.600 five 10 five to 10% correct, you can
00:25:20.640 actually if you're a forward deployed
00:25:22.000 engineer go in do the first meeting
00:25:24.799 tweak it so that it works really well
00:25:26.320 for that customer. Go back with the demo
00:25:28.159 and just get that oh wow like we've not
00:25:30.080 seen anyone else pull this off before
00:25:31.840 experience and close huge deals. And
00:25:34.080 that was the exact same case with Happy
00:25:36.080 Robot who has sold seven figure
00:25:39.679 contracts to the top three largest
00:25:42.480 logistic brokers in the world. They
00:25:44.880 build AI voice agents for that. They are
00:25:47.200 the ones doing the forward deploy
00:25:48.720 engineer model and talking to like the
00:25:50.400 CIOS of these companies and quickly
00:25:53.200 shipping a lot of product like very very
00:25:56.000 quick turnaround. And it's been
00:25:57.279 incredible to see that take off right
00:25:59.039 now. And it started from six figure
00:26:00.960 deals now doing closing and seven figure
00:26:03.279 deals which is crazy. This is just a
00:26:05.360 couple months after. So that's the kind
00:26:06.880 of stuff that you can do with uh I mean
00:26:09.480 unbelievably very very smart prompt
00:26:11.600 engineering actually. Well, one of the
00:26:13.679 things that's kind of interesting about
00:26:16.080 uh each model is that they each seem to
00:26:18.640 have their own personality. And one of
00:26:21.600 the things the founders are really
00:26:23.279 realizing is that you're going to go to
00:26:25.520 different people for different things.
00:26:26.960 Actually, one of the things that's known
00:26:29.200 a lot is Claude is sort of the more
00:26:31.440 happy and more human steerable model.
00:26:35.440 And the uh other one is Lama 4 is one
00:26:40.320 that needs a lot more steering. It's
00:26:42.240 almost like talking to a developer and
00:26:43.840 part of it could be an artifact of not
00:26:45.840 having done as much RL RHF on top of it.
00:26:49.120 So is a bit more rough to work with, but
00:26:51.679 you could actually steer it very well if
00:26:54.320 you
00:26:55.320 actually are good at actually doing a
00:26:58.720 lot of prompting and almost doing a bit
00:27:00.080 more RLHF, but it's a bit harder to work
00:27:02.000 with actually. Well, one of the things
00:27:03.520 we've been using uh LLMs for internally
00:27:06.000 is actually helping founders figure out
00:27:08.960 who they should take money from. And so
00:27:11.120 in that case, sometimes you need a very
00:27:13.600 straightforward rubric, a zero to 100.
00:27:16.640 zero being never ever take their money
00:27:18.960 and 100 being take their money right
00:27:21.039 away. Like they actually help you so
00:27:22.960 much that you'd be crazy not to take
00:27:24.880 their money. Harj, we've been working on
00:27:27.120 uh some scoring rubrics around that
00:27:29.200 using prompts. What What are some of the
00:27:30.960 things we've learned? So, it's certainly
00:27:32.960 best practice to give um LLM's rubrics,
00:27:36.799 especially if you want to get a
00:27:37.520 numerical score as the output. You want
00:27:39.279 to give it a rubric to help it
00:27:40.640 understand like how should I think
00:27:41.919 through and what's like a 80 versus a
00:27:43.919 90. But these rubrics are never perfect.
00:27:45.919 there's often always exceptions and you
00:27:47.760 tried it with uh 03 versus Gemini 2.5
00:27:51.440 and you found this this is what we found
00:27:53.200 really interesting is that um you can
00:27:54.720 give the same rubric to two different
00:27:56.480 models and in our in our specific case
00:27:58.480 what we found is that um 03 was very
00:28:01.360 rigid actually like it really sticks to
00:28:03.520 the rubric it's heavily penalizes for
00:28:06.000 anything that doesn't fit like the
00:28:07.039 rubric that you've given it whereas
00:28:08.799 Gemini 2.5 Pro was actually quite good
00:28:11.840 at being flexible in that it would apply
00:28:14.240 the rubric but it could also sort of
00:28:16.159 almost reason through why someone might
00:28:18.320 be like an exception or why you might
00:28:20.880 want to um push something up more
00:28:22.880 positively or negatively than the rubric
00:28:24.880 might suggest, which I just thought was
00:28:26.720 really interesting cuz that it's just
00:28:28.960 like when you're training a person,
00:28:30.320 you're trying to you give them a rubric
00:28:32.240 like you want them to use a rubric as a
00:28:33.919 guide, but there are always these sort
00:28:35.440 of edge cases where you need to sort of
00:28:37.120 think a little bit more deeply. Um, and
00:28:39.279 I just thought it was interesting that
00:28:40.880 the models themselves will handle that
00:28:43.279 differently, which means they sort of
00:28:44.399 have different personalities, right?
00:28:45.840 Like 03 felt a little bit more like the
00:28:48.000 soldier sort of like, okay, I'm
00:28:49.360 definitely like check, check, check,
00:28:50.399 check, check. Um, and Gemini Pro 2.5
00:28:53.120 felt a little bit more like a a high
00:28:54.640 agency sort of employee was like, "Oh,
00:28:56.399 okay. I think this makes sense, but this
00:28:57.840 might be an exception in this case,"
00:28:59.279 which was um just really interesting to
00:29:01.200 see. Yeah, it's funny to see that for
00:29:02.720 investors. You know, sometimes you have
00:29:04.080 investors like a Benchmark or a Thrive,
00:29:06.000 it's like, "Yeah, take their money right
00:29:07.520 away. Their process is immaculate. They
00:29:10.080 never ghost anyone. They answer their
00:29:12.240 emails faster than most founders. It's,
00:29:14.559 you know, very impressive. And then, uh,
00:29:16.640 one example here might be, you know,
00:29:18.480 there are plenty of investors who are
00:29:19.919 just overwhelmed and maybe they're just
00:29:21.440 not that good at managing their time.
00:29:24.000 And so, they might be really great
00:29:25.679 investors and their track record bears
00:29:27.279 that out, but they're sort of slow to
00:29:29.440 get back. They seem overwhelmed all the
00:29:31.200 time. They accidentally, probably not
00:29:33.440 intentionally ghost people. And so this
00:29:36.000 is legitimately exactly what an LLM is
00:29:38.960 for. Like the debug info on some of
00:29:41.279 these are very interesting to see like
00:29:43.440 you know maybe it's a 91 instead of like
00:29:46.080 an 89. We'll see. I guess one of the
00:29:48.320 things that's been really surprising to
00:29:49.840 me as you know we ourselves are playing
00:29:51.919 with it and we spend you know maybe 80
00:29:53.760 to 90% of our time with founders who are
00:29:56.159 all the way out on the edge is uh you
00:29:58.720 know on the one hand the analogies I
00:30:00.320 think even we use to discuss this is uh
00:30:03.200 it's kind of like coding. It kind of
00:30:04.799 actually feels like coding in, you know,
00:30:07.640 1995. Like the tools are not all the way
00:30:10.320 there. There's a lot of stuff that's
00:30:11.840 unspecified. We're, you know, in this
00:30:14.000 new frontier. But personally, it also
00:30:16.640 kind of feels like learning how to
00:30:18.240 manage a person where it's like, how do
00:30:21.279 I actually communicate uh, you know, the
00:30:23.679 things that they need to know in order
00:30:26.000 to make a good decision? And how do I
00:30:28.480 make sure that they know um, you know,
00:30:30.880 how I'm going to evaluate and score
00:30:32.640 them? And uh not only that, like there's
00:30:35.600 this aspect of Kaizen, you know, this um
00:30:38.320 this manufacturing technique that
00:30:40.000 created really really good cars for
00:30:41.760 Japan in the '90s. Uh and that principle
00:30:44.799 actually says that the people who are
00:30:47.120 the absolute best at improving the
00:30:48.960 process are the people actually doing
00:30:50.559 it. That's literally why uh Japanese
00:30:53.279 cars got so good in the '90s. And that's
00:30:55.360 metaprompting to me. So, I don't know.
00:30:57.840 It's a brave new world. We're sort of in
00:30:59.679 this new moment. So, with that, we're
00:31:02.159 out of time. But can't wait to see what
00:31:04.559 kind of prompts you guys come up with.
00:31:06.159 And we'll see you next time.

---
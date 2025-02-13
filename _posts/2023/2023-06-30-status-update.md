---
layout: post 
comments: false
title: "Metalama Status Update, June 2023"
date: 2023-06-30 08:00:01 +01:00
categories: [Status Update]
permalink: /blog/metalama-status-update-2023-06

author: "Gael Fraiteur"
image: /assets/images/2023/2023-06-30-status-update/llama.png
tag: featured
summary: "The blog post announces the general availability of Metalama 2023.1, the preview of Metalama 2023.2, the porting of PostSharp.Patterns to Metalama, and the introduction of office hours for direct community interaction."
---

Greetings, fellow clean code enthusiasts! As we bid farewell to June and its barbecues, I am thrilled to serve up some fresh updates straight from the Metalama kitchen: a GA, a preview, a new project, and a community initiative!

## Metalama 2023.1 GA: Now Available

Our first announcement this month is the general availability of Metalama 2023.1. This release includes support for Visual Studio 17.6. Additionally, we have implemented eight minor improvements and addressed 50 bugs, now mostly minor ones. For a detailed overview of what this release entails, check out our [release announcement](https://blog.postsharp.net/post/metalama-2023-1-ga).

## Metalama 2023.2 Preview

We have recently launched the first preview of Metalama 2023.2. Similar to 2023.1, 2023.2 will primarily focus on bug fixes, with six weeks of development and three weeks of RC stabilization. The first Release Candidate is expected to be available on July 17th.

## Porting PostSharp.Patterns to Metalama

As part of our ongoing efforts to make Metalama a worthy replacement for PostSharp, we have initiated the process of porting `PostSharp.Patterns`, our well-established library of pre-built aspects, to Metalama. We are proud to announce that the entire `Metalama.Patterns` library will be available under the open-source MIT license. While we haven't released a NuGet package just yet, you can track our progress on our [GitHub repository](https://github.com/postsharp/Metalama.Patterns/tree/develop/2023.2). I am delighted to inform you that we have successfully completed the first version of Contracts, with all tests inherited from PostSharp displaying a promising green light. Currently, our focus is on Caching!

The initial components of `Metalama.Patterns` will be included in the 2023.2 release. However, please note that these packages will remain in the preview stage, even after the other 2023.2 packages become publicly available.

## Introducing Office Hours

To strengthen our community and facilitate more direct interactions, we are excited to introduce office hours. Based on a community poll, these sessions have been scheduled for Thursdays at 5 PM, Central European Time. This time slot has been specifically reserved for _you_. Don't hesitate to [book your seat](https://calendly.com/gaelf/metalama-office-hours) online.

Furthermore, we will be recording these sessions and uploading them to our [YouTube channel](https://www.youtube-nocookie.com/playlist?list=PLsz2cAZTx3-C1faF8DW8ywnwYHsr8c6sW) for those who wish to catch up later.

## Metalama: An Introduction Video

We have recently released an introductory video for Metalama. Would you like to hear me discuss code with my distinct Belgian-French accent? [Watch the video on YouTube](https://www.youtube-nocookie.com/watch?v=hvNKFKW6YZw) and feel free to share it with interested colleagues or friends.

We encourage you to join us on [Slack](https://www.postsharp.net/slack) or [Discord](https://www.postsharp.net/discord) to seek help or just stay up to date with all things Metalama.

Until next time, happy meta-programming!

-gael

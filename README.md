

# Research and Construction of the System for Detecting the Fake Reviews
<p align = "center">
<img width="418" alt="image" src="https://user-images.githubusercontent.com/38277893/201544297-321fae20-585a-4d4f-ab93-b2876a8a0a24.png">
</p>

Detection of fake reviews has attracted much interest nowadays due to the significant increase of fake reviews which could artificially mislead consumers. However, most studies on fake reviews detection are based on English corpora and those existing approaches are rarely to be applied in the Chinese context. This project investigates an integrated detection system based on Chinese reviews which comprises review crawler, text analysis, and visualization.

In this project, We collected Chinese review datasets from Dianping Website through the crawler module, and processed and manually annotated datasets. Then we constructed the classifier based on the logistic regression model. The data characteristics were analyzed based on the collected datasets, the text vectors were extracted through Doc2Vec algorithm, and feature attributes were extracted from three aspects: text, metadata, and sentiment. Finally, we designed and developed a B/S system that includes four types of modules: web crawler, text analysis, result visualization, and user management. This system was capable of detecting fake reviews of hotels and restaurants on the Dianping Website according to requirements, and displaying the results visually, and realizing the basic user management functions.

This project can be divided into two parts: [Review Detection](https://github.com/ppzhenghua/FakeReviewDetectionSystem-FrontEnd/blob/main/Document/ReviewDetection.md) and [Web Application](https://github.com/ppzhenghua/FakeReviewDetectionSystem-FrontEnd/blob/main/Document/WebApplication.md).

However, there still exist some shortcomings in this paper. First, datasets were labeled by person, there exists a certain amount of error and personal bias. Secondly, the feature attributes in this paper are completely based on text contents, but text contents cannot fully describe the characteristics of fake reviews. It is learned that the Dianping Website has its filtering mechanism, such as comparing the location of reviewers and stores by IP address to avoid cross-domain fake reviews, or comparing the LAN of reviewers and stores to avoid reviews written by store employees, and so on. Therefore, reviewer behavior is also a very important part of fake review detection. It is possible to crawl the historical information on individual pages through user IDs. Such as the historical ratings, historical stars, review areas, user ratings, etc. Again, in the process of system design and development, it was further found that the fake review detection system is somewhat bulky with the B/S system. Although the demand for fake review detection is high, there are few opportunities for users to log out from the review website and then log into the fake review detection system. This detection system should appear in a more portable and lighter way, such as a plug-in on review sites so that the application scenarios will be more practical.


<p align = "center">
<img width="312" alt="image" src="https://user-images.githubusercontent.com/38277893/201544288-a1fbdece-817b-4bc2-aa53-05de6aa3f09f.png">
<img width="328" alt="image" src="https://user-images.githubusercontent.com/38277893/201544290-958e3040-ed7f-4ce3-8710-eb07e062cc5f.png">
</p>


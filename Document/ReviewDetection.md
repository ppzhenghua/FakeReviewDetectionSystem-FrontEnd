

# Research and Construction of the System for Detecting the Fake Reviews
Selenium and PyQuery were applied to collect reviews of restaurants and hotels on [Dianping website](http://www.dianping.com)(a public review website like Yelp), using manual annotation to categorize the data set into two groups. Afterward, a logistic regression model was used to construct the classifier, and features were extracted from three aspects: text, metadata, and sentiment. The experimental results show that the proposed system performs well on both restaurant and hotel datasets. The F1-scores of our classifier is around 0.87(in hotel dataset) and 0.83(in restaurant dataset) which means the classification effect is good and the system can reduce the interference of fake reviews to users and provide effective support for users' consumption decisions.
## Datasets
This project obtained several reviews of different stores in two areas, restaurants and hotels, from the [Dianping Website](http://www.dianping.com). Dianping Website is the first and leading local search portal in China and the first independent third-party consumer review website in the world. It not only provides users with information about merchants and consumer reviews, but also O2O (Online to Offline) services such as group buying, restaurant reservations and takeout. It covers more than 2,500 cities in China and nearly 100 popular travel countries and regions such as the United States, Japan, and France. The comments obtained directly from Dianping Websites are more realistic and more representative than those written by third-party platforms. In this paper, we manually labeled the dataset, and the annotation standard refers to ["30 Ways You Can Spot Fake Online Reviews"](https://consumerist.com/2010/04/14/how-you-spot-fake-online-reviews/). The specific data set is shown in the following table.

<div align = "center">

|  Field   | Total number of comment text  | Number of fake reviews  |
|  :----:  | :----:  | :----:  |
| Restaurant  | 588 | 62 |
| Hotel  | 1000 | 65 |

</div>

## Data Preprocess

Preprocessing is mainly divided into word segmentation and the removal of stop words. In English, spaces are used as natural boundaries between words, while in Chinese, only sentences and paragraphs can be simply delimited by obvious boundaries, but words do not have a formal one. Therefore, the first step for preprocessing is word segmentation which could help the classifier understand the semantic of texts. In this paper, we used the exact pattern of [Jieba](https://pypi.org/project/jieba), an open-source library developed by Sun junyi, to split words. When processing the collected data, we found some words are not in the original dictionary of Jieba, and the semantics of these words are affected by excessive splitting. For example, "吐槽" (which means troll or roast) is divided into "吐"(which means spit) and "槽"(which means trough), which completely loses the original semantics. As a result, a new vocabulary list was added, mainly focusing on restaurant reviews, with a total of 12 words. 

The second step is removing stop words which have little real meaning but appear frequently in the text. To some degree, filtering stop words could help improve search efficiency as well as save storage space. Common stop words are intonation auxiliaries ("ah", etc.), adverbs ("sometimes", "together", "separately", etc.), conjunctions ("because", "in short", etc.), prepositions ("in order to ", "for", etc.), and some special symbols. In this paper, a total of 1510 words are used in the list.


## Sentiment Analysis

Sentiment analysis is a kind of semantic analysis, which can obtain the intensity of emotional polarity according to the distribution of emotional words in the review text. It is often used in the classification of text sentiment tendencies, such as distinguishing positive and negative texts, insulting texts, etc. Naive Bayes, support vector machines, and convolutional neural networks can be applied in sentiment analysis.

Sentiment analysis techniques generally fall into two categories. One is the machine learning-based approach, which uses statistical machine learning algorithms to extract features from a large number of annotated and unannotated subjective corpus. The other is based on the sentiment dictionaries approach, which makes text sentiment analysis under different granularity according to the sentiment tendency of words provided by the sentiment dictionaries.

This project adopts sentence granularity sentiment analysis based on sentiment dictionaries to extract sentiment features. Before sentiment analysis, the following five types of dictionaries should be organized. 

- ***Dictionary of positive and negative words:*** is derived from the combination of Li Jun's Commentating and Derogatory Dictionary of Tsinghua University and NTUSD Chinese Sentiment Dictionary of Taiwan University. This dictionary has removed repeated words, phrases, and insulting words. The final positive word dictionary contains 12,739 words and the negative word dictionary contains 16,515 words. 

- ***Dictionary of sentiment:*** we use BosonNLP Sentiment Dictionary (114,766 words in total) as the dictionary of sentiment. The dictionary is based on data from Weibo Website, Internet forums, news, and other platforms, is relatively comprehensive and close to real life, and contains the most common evaluative words. 

- ***Dictionary of degree words:***  In sentiment analysis, degree words around emotion words have a great influence on the final value of emotion polarity intensity. For example, "super", "extremely" and "deeply" could greatly strengthen the sentiment intensity of the text. The dictionary of degree words used in this paper contains 219 words. 

- ***Dictionary of negation words:*** Negation words could flip the sentiment tendency in a single sentence. For example, "not particularly satisfied" and "particularly satisfied" have different meanings. In this paper, the dictionary of negation words contains 32 words Includes all the models we implemented (for different videos, features, pre-trained networks).

- ***Dictionary of transitive words:*** used to determine the presence of infection words in a review text, can indicate whether there is an emotional or attitudinal change. The dictionary contains 30 turning words, such as "but" and "however".

We applied sentence granularity sentiment analysis based on sentiment dictionary and the process of calculating sentiment polarity intensity is shown in following figure. After preprocessing the review text, the entire text is traversed to find the position of all sentiment words and to find whether there are degree words and negation words between the current sentiment word and the previous sentiment word. If there is a degree word, the weight of the degree word is multiplied by the value of the current sentiment word. If there are negation words, then multiply the value of the current sentiment word by minus one to reverse the sentiment bias.

<div align = "center">

<img width="287" alt="image" src="https://user-images.githubusercontent.com/38277893/201540825-1439378a-840c-4698-bf54-57390d3c44ce.png">

</div>

## Feature Attribute Extraction

Reviews on Dianping Website are not completely sorted by date. Generally, comments labeled as "quality reviews" can appear at the front of the page. The main purpose of paid reviews is to improve the ranking of the store and attract more customers. Therefore, this type of fake reviews usually has the following characteristics: high star ratings, high scores, no negative content. At the same time, in order to have a higher weight and be displayed in the front of the review page, fake reviews are usually wordy, comprehensive, and accompanied by many beautiful pictures, and fake reviewers are highly active. Based on this situation, the following feature attributes are selected in this project, which are divided into three categories, text features, metadata features, and sentiment features.

<div align = "center">

|  Number   | Description  |
|  :----:  | :----:  |
| F1	| Whether the comment text contains turning points（isTurnPoin）| 
| F2	| Number of times the brand name or store name appears in the comment text（brandCount）| 
| F3	| Review length（length）| 
| F4	| Stars given by reviewers（star）| 
| F5	| Average of multiple ratings given by reviewers（scoreAverage）| 
| F6	| Difference between the mean value of single comment text F4 and total F4（StarAverageDeviation）| 
| F7	| Difference between the mean value of single comment text F6 and total F6 （scoreAverageDeviation）| 
| F8	| Review sentiment tendency（tendency）| 
| F9	| Number of positive words in comment text（postivieWordCount）| 
| F10| 	Number of negative words in comment text（negativeWordCount）| 
| F11| 	Ratio of occurrences of positive and negative words in comment text（ratioPostive）| 
| F12| 	Strength of sentiment（sentimentScore）| 
| F13| 	Strength of sentiment per word（eachSentimentScore）| 

</div>

## Results
There are two kinds of datasets (hotels and restaurants) in the experiment, and they are put into the logistic regression model respectively.

As can be seen from table, the same classifier has slightly different evaluation results in different domains, which also appears in other types of classifiers. Datasets in different domains may have characteristic differences. In this paper, this point may have a greater impact on the extraction of sentiment features. In the review text of the hotel domain, there will be a large number of descriptions about the surrounding environment of hotels, especially the hotel in the scenic areas. Many positive descriptions are actually of locations such as water town, ski resorts, hot springs, and other places rather than the hotel itself. This results in some reviews have inflated emotional intensities which will confuse the classifier. For fake reviews in the hotel dataset, the precision is 0.86, the recall is 0.67, and the F1-score is 0.75. For fake reviews in restaurant dataset, the precision is 0.71, the recall is 0.67, and the F1-score is 0.69. The result indicates that the effect of the classifier is credible, and it is able to distinguish the fake reviews from datasets.

<div align = "center">


<table>
  <tr>
    <th>Field</th>
    <th>Type</th>
    <th>Precision</th>
    <th>Recall</th>
    <th>F1</th>
    <th>Accuracy</th>
  </tr>
  <tr>
    <td rowspan="3">Hotel</td>
    <td> Fake </td>
    <td> 0.86 </td>
    <td> 0.67 </td>
    <td> 0.75 </td>
    <td rowspan="3"> 0.98 </td>
  </tr>
  <tr>
    <td> Truthful </td>
    <td> 0.98 </td> 
    <td> 0.99 </td>
    <td> 0.99 </td>
  </tr>
  <tr>
    <td> Average (macro_avg) </td>
    <td> 0.92 </td> 
    <td> 0.83 </td>
    <td> 0.87 </td>
  </tr>
  <tr>
    <td rowspan="3">Restaurant</td>
    <td> Fake </td>
    <td> 0.71 </td>
    <td> 0.67 </td>
    <td> 0.69 </td>
    <td rowspan="3"> 0.94 </td>
  </tr>
  <tr>
    <td> Truthful </td>
    <td> 0.96 </td> 
    <td> 0.97 </td>
    <td> 0.97 </td>
  </tr>
  <tr>
    <td> Average (macro_avg) </td>
    <td> 0.84 </td> 
    <td> 0.82 </td>
    <td> 0.83 </td>
  </tr>
</table
    
    
</div>    

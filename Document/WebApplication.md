# Research and Construction of the System for Detecting the Fake Reviews

This system aims to automatically detect fake reviews of restaurants and hotels on the website and present visualized information to users according to their levels of access.

## System main function

In addition to the basic functions such as logging in and logging out, registration, modification of personal information, the system also includes the main functions such as crawler search, result visualization, and user management. In this section, the main functions of result visualization are described according to user authorities. There are four types of users, average consumers, merchants, and supervisors of review platforms. Different users will get different visualization results.
<div algin = "center">
              
| User types	| Access| 
| :---: | :---: | 
| General consumers	| Truthful Review List| 
| Merchants	| Review detection documents (keyword word cloud, star ratio, number and proportion of fake reviews, emotional trend)| 
| Supervisor of review platforms	| Review detection documents (keyword word cloud, star ratio, number and proportion of fake reviews, emotional trend, information of fake reviewers)| 

</div>

### (A) General consumers (4 levels of authority)
General consumers can get the truthful review list after filtering the fake reviews, including the store information at the head, various data, and specific text content of the reviews.

<p align="center">
  
  <img  width="500" alt="image" src="https://user-images.githubusercontent.com/38277893/201543690-089f254d-9a97-4d6c-bfe4-ab6b6d721a9b.png">

</p>

### (B) Merchants (3 levels of authority)
Merchants can get a fake review detection document. The specific components are shown in the figure below. It mainly includes four aspects of review texts: word frequency, star ratio, review type ratio, and sentiment trend.

- Word cloud

    Word cloud consists of positive and negative words. The word cloud can describe the high-frequency words with different emotional tendencies in the collected reviews, which can reflect the attitude of the consumers to the store.
<p align="center">
  <img width="400" alt="image" src="https://user-images.githubusercontent.com/38277893/201543871-765d3712-c50d-4f5a-b0fc-debddbd776d9.png">
</p>


- Star ratio

    Star ratio includes both before and after filtering fake reviews. The proportion of stars could illustrate the distribution characteristics of fake reviews on star ratings. As shown in figure below, the left one is the original star ratio, and the right figure shows the star ratio after filtering fake reviews. It can be seen that most of the fake reviews are concentrated in the high star area.
    
<p align="center">
  <img width="328" alt="image" src="https://user-images.githubusercontent.com/38277893/201543967-40c94f2a-e960-4eaa-858e-04c083304eb2.png">
</p>


- The proportion of the number of fake reviews on the total number of reviews

    The left figure shows the number of all reviews, the number of true reviews, and the number of fake reviews, while the right figure shows the proportion of false comments and true comments in the total comments by the size of the ring area.
    
<p align="center">
  <img width="337" alt="image" src="https://user-images.githubusercontent.com/38277893/201543998-14c24f23-7b29-4079-a454-c9d9d8c37e9f.png">
</p>

- Sentiment trend


  It can be viewed by pulling the date bar, which indicates the cumulative number of positive and negative reviews during the current time. To some extent, it is able to reflect users' satisfaction or sentiment tendency towards the store during that period.
  
<p align="center">

  <img width="312" alt="image" src="https://user-images.githubusercontent.com/38277893/201544069-7c9b28e8-7d6c-414e-b774-42af3a2b26d2.png">  

</p>



### (C) Supervisor of the review platform(2 levels of authority)

Supervisors of the review platform are also provided with a review test document that includes all the content that the merchant can see. The supervisor is also given an additional copy of a possible fake reviewer list. This list could display the personal information and recent comment frequency of fake reviewers and the reasons why the system identifies him or her as fake reviewers, as shown in Figure 10. The comment frequency can be used as one of the bases for the judgment of fake reviewers and provide a reference for the supervisors.

<p align="center">
<img width="344" alt="image" src="https://user-images.githubusercontent.com/38277893/201544187-c004894a-2168-46f6-a5e2-4c652299bfea.png">
<img width="187" alt="image" src="https://user-images.githubusercontent.com/38277893/201544189-a059955b-f28b-450e-9f99-68637765fd77.png">
</p>




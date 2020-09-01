## Incubate-me web app
***
*Author:* Trevor Shepard  
*Created:* 09/01/2020  
*Version:* 1.0.1  

## Installation
* Clone the code:
    * `git clone https://github.com/trevor-shepard/incubate-me-web && cd tdr`
* Initialize install dependencies.
    * `npm install`
* Run the server on localhost:3000
    * `npm start`

## Database Structure (collections)
* Users
     ```
        username: string
        uid: string
        email: string
        linkedIn: string
        companyUrl: string
        fundingStage: 'self/family' | 'bank' | 'angel' | 'seed' | 'series-a' | 'other'
        services: {
            accounting: boolean
            humanResource: boolean
            stratigicFinance: boolean
        }
        neededExpertise: {
            bookKeeping: boolean
            accounting: boolean
            cpa: boolean
            tresauryManagment: boolean
            paymentManagement: boolean
            receivablesManagment: boolean
            fluxAnalysisOfMonthlyFinancialStatements: boolean
            budgetingPlanning: boolean
            financialModeling: boolean
            alternativeFinancingGovFinancing: boolean
            CFOAdvisory: boolean
            Management1099: boolean
            w2Onboarding: boolean
            payrollManagment: boolean
            healthcareManagment: boolean
        }
        expertIDs: string[]
* Experts
     ```
        bio: string
        id: string
        name: string
        email: string
        title: string
        location: string
        expertise: string[]
        chatIDs: string[]
        image: string
        linkedInProfile?: string (optional field)
* Chats (conversation is subcollection, will be missing in the database if no messages have been sent)
     ```
        id: string
        participants: {
            [userID: string]: string (string representation of date)
        }
        conversation {
            [id: string]: {
                senderID: string
                text: string
                date: string (string representation of date)
                id: string
            }
        }

## To Add an Expert
* Add an authentication user in the admin pannel 
  * ![alt text](./src/assets/readme/add_user.png "Logo Title")
* Copy Auth user Uid  
  * ![alt text](./src/assets/readme/copy_uid.png "Logo Title")
* Add document with the id of copied uid to experts collection in Cloud Firestore
  * ![alt text](./src/assets/readme/add_doc_under_uid.png "Logo Title")
* Add all required fields except for image, chatIDs must be empty array
  * ![alt text](./src/assets/readme/add_info.png "Logo Title")
* Add the experts profile picture to the folder expertProfilePictures/ in the storage bucket
  * ![alt text](./src/assets/readme/add_photo.png "Logo Title")
* Click the link under name of the photo and copy the url
  * ![alt text](./src/assets/readme/copy_photo_url.png "Logo Title")
* Add the url to the expert document under the field `image`
  * ![alt text](./src/assets/readme/add_photo_url.png "Logo Title")
* Final document should look like this
  * ![alt text](./src/assets/readme/final.png "Logo Title")

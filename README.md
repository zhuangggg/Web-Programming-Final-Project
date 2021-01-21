# Web Programming README 

* 專題題目名稱 : Gantt Chart
* Deployed 連結 : https://gantt-final-project.herokuapp.com/
* 描述這個服務在做什麼
提供甘特圖與行事曆兩項工具，可利用甘特圖進行團體專案規劃，並使用行事曆查看個人負責事項。
* 使用/操作方式 (含伺服器端以及使用者端)
    * 登入
        * 填寫姓名及密碼註冊或登入
        * 姓名如同帳號名，因此不能註冊已存在的帳號名
    * 個人主頁
        * 點擊 Calendar 進入行事曆
        * 點擊 Add Project 新增專案
        * 點擊 Edit Project 之後，可點選專案以更改專案顏色，或刪除專案
        * 數據分析:
            * 分析此專案之完成度（方式為各Event之進度平均）
            * 分析此專案各個負責人的貢獻度（方式為各Item之進度平均）
            * 顯示此專案目前最近更新情形
        * 顯示最近更新的動態
    * 甘特圖
        * 提供兩種模式編輯甘特圖
            1.  在左邊列表新增 Event 或 Item；
            點擊 Edit 之後再點選欲編輯之 Event 或 Item，可編輯日程、負責人等。
            2. 拖曳或縮放甘特圖中的物件，可更改日程時間及進度。
            
     ![](https://i.imgur.com/MnFsMxK.png)

            
    * 行事曆
        * 左邊列表顯示現有的 Project、Event 及對應的顏色，點擊checkbox後可選擇是否顯示此event在行事曆上
        * 右邊行事曆顯示細部的 Item，點擊item會跳出細項的小視窗
        
     ![](https://i.imgur.com/lCYF9Nb.png)

* 程式架構
    * Web-Programming-Final-Project
        * /src
            * /Timeline_Component
            * /leftpart
                * Event.js
                * Item.js
                * Leftpart.js
                * Project.js
            * /graphql
                * index.js
                * mutations.js
                * queries.js
                * subscriptions.js
            * /css
            * /font
            * /images
            * >container
            * index.js 
            * App.js, App.css
            * Login.js,  login.css
            * next.js,  next.css
            * GetInfo.js 
            * Home.js,  home.css
            * Gantt.js,  gantt.css
            * Calendar.js,  calendar.css
            * >component
            * Analysis.js,  analysis.css
            * Piechart.js
            * Timeline.js,  Timeline.css
        * /backend
            * /resolvers
                * Mutation.js
                * Query.js
                * Subscription.js
            * /models
                * project.js
                * user.js
            * server.js
            * schema.js
            * 
* (Optional, 如果願意開源) Github link
* 其他說明
* 使用與參考之框架/模組/原始碼
    * 前端 : React、React-apollo、apollo-boost、react-router-dom
    * 後端 : express、express-graphql、mongoose、nodemon、cors、path
* 專題製作心得
    * 我們的專題方向較沒有強大的後端、看起來很厲害的套件，而比較專注在前端的頁面設計和邏輯分層，取代很多原本應該有的繁雜過程，用滑鼠拉就能調整日期和進度。希望大家能夠感受到直覺的使用方式、簡潔的頁面和我們加入的小巧思，雖然網站離真實的服務還有很大一段距離，但希望這個專題能夠成為生活記事、整理的小助手。
* 使用之第三方套件、框架、程式碼
    * 甘特圖介面：frappe-gantt
    * 行事曆介面：Toast-UI calendar
    * 組件：antd, @ant-design/icons
    * 圓餅圖：@ant-design/charts
* 每位組員之貢獻
    * 謝郡軒 : 行事曆部分、主頁css
    * 劉昱辰 : 甘特圖時間軸部分、deploy、主頁css
    * 莊佾宸 : 甘特圖列表部分、後端grapgql、主頁css

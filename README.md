# 學生資料管理系統

## 安裝與執行指引

### 前置需求
- Node.js 版本 16 以上
- MongoDB 資料庫
- 安裝 Yarn 或 npm

### 安裝指引
1. 克隆專案到本地：
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. 安裝依賴：
   ```bash
   npm install
   ```

3. 設定環境變數：
   在專案根目錄創建 `.env` 文件，並設定以下參數：
   ```env
   PORT=2083
   DB_URI=mongodb://<username>:<password>@localhost:27017/<database-name>
   ```

4. 啟動後端服務：
   ```bash
   npm run start
   ```

5. 前端專案：
   - 進入前端資料夾：
     ```bash
     cd react-ts-midteacher
     ```
   - 安裝依賴並啟動：
     ```bash
     npm install
     npm start
     ```

後端服務將運行在 `http://localhost:2083`，前端服務將運行在 `http://localhost:5173`。

---

## API 規格說明

### 基本結構
- Base URL: `http://localhost:2083/api/v1/user`

### API 一覽表

| 功能       | 方法 | 路徑                     | 說明             |
|------------|------|--------------------------|------------------|
| 獲取所有學生 | GET  | `/`                      | 獲取所有學生資料   |
| 查詢學生   | GET  | `/:id`                  | 根據 ID 獲取學生  |
| 新增學生   | POST | `/addOne`               | 新增一位學生     |
| 修改學生   | PUT  | `/updateOne/:id`        | 修改一位學生資料 |
| 刪除學生   | DELETE | `/deleteById?id=:id`   | 刪除指定學生     |

### 請求方式與範例

#### 1. 獲取所有學生資料
- 方法：`GET`
- 路徑：`/`

**回應範例：**
```json
{
    "code": 200,
    "message": "Students retrieved successfully",
    "body": [
        {
            "_id": "675a766b0b4bbb9d53ad3e00",
            "userName": "tkuim8674",
            "sid": "49",
            "name": "楊冠霖",
            "department": "資訊管理系",
            "grade": "三年級",
            "class": "D",
            "email": "tkuim8674@tkuim.com"
        }
    ]
}
```

#### 2. 查詢學生
- 方法：`GET`
- 路徑：`/:id`
- 範例：`/675a766b0b4bbb9d53ad3e00`

**回應範例：**
```json
{
    "code": 200,
    "message": "Student found",
    "body": {
        "_id": "675a766b0b4bbb9d53ad3e00",
        "userName": "tkuim8674",
        "sid": "49",
        "name": "楊冠霖",
        "department": "資訊管理系",
        "grade": "三年級",
        "class": "D",
        "email": "tkuim8674@tkuim.com"
    }
}
```

#### 3. 新增學生
- 方法：`POST`
- 路徑：`/addOne`
- 請求體：
```json
{
    "userName": "tkuim1234",
    "sid": "50",
    "name": "劉豪",
    "department": "資訊工程系",
    "grade": "四年級",
    "class": "A",
    "email": "tkuim1234@tkuim.com"
}
```

**回應範例：**
```json
{
    "code": 200,
    "message": "Student added successfully",
    "body": {
        "_id": "675a766b0b4bbb9d53ad3e01",
        "userName": "tkuim1234",
        "sid": "50",
        "name": "劉豪",
        "department": "資訊工程系",
        "grade": "四年級",
        "class": "A",
        "email": "tkuim1234@tkuim.com"
    }
}
```

#### 4. 修改學生資料
- 方法：`PUT`
- 路徑：`/updateOne/:id`
- 請求體：
```json
{
    "id": "id",
    "name": "new name"
}
```

**回應範例：**
```json
{
    "code": 200,
    "message": "Student updated successfully",
    "body": {
        "_id": "675a766b0b4bbb9d53ad3e00",
        "userName": "tkuim8674",
        "sid": "49",
        "name": "新名字",
        "department": "資訊管理系",
        "grade": "三年級",
        "class": "D",
        "email": "newemail@example.com"
    }
}
```

#### 5. 刪除學生
- 方法：`DELETE`
- 路徑：`/deleteById?id=:id`
- 範例：`/deleteById?id=675a766b0b4bbb9d53ad3e00`

**回應範例：**
```json
{
    "code": 200,
    "message": "Student deleted successfully"
}
```

---

## 架構圖

```plaintext
+-------------+       +--------------------+       +----------------+
|   前端應用   | <-->  |   後端 API 服務    | <-->  |   資料庫 MongoDB |
+-------------+       +--------------------+       +----------------+
```

### 描述
1. **前端應用**：使用 React.js 開發，負責與使用者互動。
2. **後端 API 服務**：使用 Node.js + Express 實現，處理前端請求並與資料庫互動。
3. **資料庫 MongoDB**：存儲學生資料，包括姓名、學號、年級等資訊。

---

## CRUD 功能操作流程圖

### 新增學生流程
1. 使用者在前端填寫學生資料。
2. 前端發送 `POST` 請求至 `/addOne`。
3. 後端接收請求，驗證數據，並存入資料庫。
4. 回應操作結果至前端。

### 修改學生資料流程
1. 使用者點擊某學生的編輯按鈕。
2. 前端發送 `PUT` 請求至 `/updateOne/:id`，包含更新數據。
3. 後端驗證數據並更新資料庫。
4. 回應操作結果至前端。

### 刪除學生流程
1. 使用者點擊某學生的刪除按鈕。
2. 前端發送 `DELETE` 請求至 `/deleteById?id=:id`。
3. 後端確認刪除資料庫中的學生資料。
4. 回應操作結果至前端。

---


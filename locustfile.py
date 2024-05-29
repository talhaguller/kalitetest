from locust import HttpUser, TaskSet, between, task


class UserBehavior(TaskSet):

    def on_start(self):
        self.token = ""
        self.user_id = ""
        self.group_id=""
        # Kullanıcı kaydı
        response = self.client.post("/api/user/login",
                                     json= {"email":"tall@example.com", "password":"123456"})
        if response.status_code != 200:
            self.client.close()
            return
        json_response = response.json()
        self.token = json_response.get('token', "")
        self.user_id = json_response.get('_id', "")
        


    @task(1)
    def create(self):
        # Chat oluşturma
        self.client.post("/api/chat",
                         headers={'Authorization': 'Bearer ' + self.token},
                         json={"userId": self.user_id})

    @task(2)
    def user_list(self):
        # Kullanıcıları listeleme
        self.client.get("/api/user?search=t",
                        headers={'Authorization': 'Bearer ' + self.token})
   
    @task(3)
    def fetching_list(self):
        self.client.get("/api/chat",
                         headers={'Authorization': 'Bearer ' + self.token})
    @task(4)
    def create_group(self):
        self.users = f'[ "6603d5061caf110b00b875bd", "{self.user_id}", "66055c5f527746524809dce3"]'
        group_response=self.client.post("/api/chat/group",
                         headers={'Authorization': 'Bearer ' + self.token},
                         json = { "name":"Test Group",
                                "users": self.users})
        json_response = group_response.json()
        self.group_id= json_response.get('_id',"")

    @task(5)
    def rename_group(self):
        self.client.put("/api/chat/rename",
                        headers={'Authorization': 'Bearer ' + self.token},
                        json ={"chatId":"6605ad3ef7cd0c6f600fc271",
                            "chatName":"Test Group Update3"})
    
    @task(6)        
    def add_user_group(self):
        self.client.put("/api/chat/groupadd",
                        headers={'Authorization': 'Bearer ' + self.token},
                        json = {"chatId":"6605ad3ef7cd0c6f600fc271",
                                "userId":"661868c842943d24b4079a3f"})
    @task(7) 
    def user_group_remove(self):
        self.client.put("/api/chat/groupremove",
                        headers={'Authorization': 'Bearer ' + self.token},
                        json = {"chatId":"6605ad3ef7cd0c6f600fc271",
                                "userId":"661868c842943d24b4079a3f"})
    @task(8) 
    def send_message(self):
        self.client.post("/api/message",
                        headers={'Authorization': 'Bearer ' + self.token},
                        json = { "content": "Hii",
                                "chatId":"6605ad3ef7cd0c6f600fc271"})
    @task(9) 
    def fetch_chat(self):
        url = f'/api/message/6605ad3ef7cd0c6f600fc271'
        self.client.get(url,
                        headers={'Authorization': 'Bearer ' + self.token})
        

class ApiUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(5.0, 10.0)
    host = "http://localhost:5000"

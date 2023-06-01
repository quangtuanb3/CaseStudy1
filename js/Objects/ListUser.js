function ListUser() {
    this.listUsers = [
        {
            "email": "admin1@gmail.com",
            "pw": "123456",
            'phone': '0129476383',
            'firstName': 'Bui',
            'lastName': 'Tuan',
            'auth': 1,
            'listInCart':[],
        },
        {
            "email": "user1@gmail.com",
            "pw": "123456",
            'phone': '084627284',
            'firstName': 'John',
            'lastName': 'Canary',
            'auth': 0,
            'listInCart':[],
        },
    ];
    this.AddUser = function (newUser) {
        console.log(newUser);
        this.listUsers.push(newUser);
    }
}
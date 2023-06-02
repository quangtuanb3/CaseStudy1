
class Memory {
    constructor(userList) {
        this.userList = userList;
    }

    addNewUser(newUser) {
        this.userList.push(newUser);
    }
    
    isExist(user) {
        console.log("this.userList: " + this.userList);
        if (this.userList.some(obj => obj.email === user.email)) {
            return true;
        }
        return false;
    }

    overrideUser(user) {
        console.log(this.userList);
        this.userList.forEach((obj, index) => {
            if (obj.email === user.email) {
                this.userList[index] = user;
                console.log(this.userList[index]);
            }
        });

    };

}


// function Memory() {
//     this.listUser = [];
//     this.addNewUser = function (newUser) {
//         this.listUser.push(newUser);
//     }
//     this.isExist = function (user) {
//         if (this.listUser.some(obj => obj.email === user.email)) {
//             return true;
//         }
//         return false;
//     }
//     this.replaceUser = function (user) {
//         this.listUser = this.listUser.map(obj => {
//             if (obj.email === user.email) {
//                 return user;
//             } else {
//                 return obj;
//             }
//         });
//     }
//     this.overrideUser = function (user) {
//         this.listUser.forEach((obj, index) => {
//             if (obj.email === user.email) {
//                 this.listUser[index] = user;
//             }
//         });
//     };

// }
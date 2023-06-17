
export default class userDTO {
    constructor(user){
    this.cart_user_id= user.user._id
    this.full_name=`${user.user.first_name} ${user.user.last_name}`;
    this.email= user.user.email;
    this.role= user.user.role;

    }
}



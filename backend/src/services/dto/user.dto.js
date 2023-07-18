
export default class userDTO {
    constructor(user){
    this.cart_user_id= user.prop._id
    this.full_name=`${user.prop.first_name} ${user.prop.last_name}`;
    this.email= user.prop.email;
    this.role= user.prop.role;

    }
}


